const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const { filesUpload } = require("./middleware");
const { v4: uuidv4 } = require("uuid");
const { v1: uuidv1 } = require("uuid");
const app = require("express")();
const cors = require("cors");
app.use(cors());

admin.initializeApp();
const config = {
  apiKey: "AIzaSyAzJtyyhhXUj2cFikqsfbRhtFjAoa21UCY",
  authDomain: "nostalgiadev-1f319.firebaseapp.com",
  databaseURL: "https://nostalgiadev-1f319.firebaseio.com",
  projectId: "nostalgiadev-1f319",
  storageBucket: "nostalgiadev-1f319.appspot.com",
  messagingSenderId: "300938565566",
  appId: "1:300938565566:web:0ca714470c623a5a7ccbef",
  measurementId: "G-LE3W9VF6VC",
};

// to create the download url for images uploaded
const createPersistentDownloadUrl = (bucket, pathToFile, downloadToken) => {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    pathToFile
  )}?alt=media&token=${downloadToken}`;
};

const firebase = require("firebase");
const { firestore } = require("firebase-admin");
const { ref } = require("firebase-functions/lib/providers/database");
firebase.initializeApp(config);

const db = admin.firestore();
const storageRef = admin.storage().bucket();

//Authentication Validation
const FBAuth = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ error: "The user is Unauthorized" });
  }
};

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const { uid } = decodedToken;
        req.userId = uid;
        next();
      });
  } else {
    return res.status(403).json({ error: "The user is Unauthorized" });
  }
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string === "") return true;
  else return false;
};
//signup route

app.post("/signup", (req, res) => {
  //req.body = { email: "email", password:"password", confirmPassword:"confirmPassword", firstName:"firstname", lastName:"lastname"}
  const newUser = {
    ...req.body,
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (newUser.password != newUser.confirmPassword){errors.confirmPassword = "Passwords must match";}
  

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let token, userId;

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((IdToken) => {
      token = IdToken;
      const userCredential = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${userCredential.userId}`).set(userCredential);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ general: "This email address is already registered" });
      } else if (err.code === "auth/weak-password") {
        return res
          .status(400)
          .json({ password: "Password must be atleast six(6) characters" });
      } else {
        return res.status(500).json({ general: "Something went wrong, please try again" });
      }
    });
});

//login route

app.post("/login", (req, res) => {
  const user = {
    ...req.body,
  };
  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';
  
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((idToken) => {
      return res.status(200).json({ token: idToken });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
});

//reset route
app.post("/reset", (req, res) => {
  const emailAddress = req.email;

  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
      return res
        .status(200)
        .json({ message: "reset link has been emailed to you" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

//get movie urls
app.get("/getInfo/:genre", (req, res) => {
  let movieUrl = [];
  db.collection("movie")
    .where("genre", "==", req.params.genre)
    .get()
    .then((doc) => {
      doc.forEach((snap) => {
        movieUrl.push({
          imageurl: snap.data().imageURL,
          movieurl: snap.data().url,
          desc: snap.data().description,
          movName: snap.data().name,
        });
      });
      return res.json(movieUrl);
    })
    .catch((err) => {
      console.error(err);
    });
});

//extract all info about the video
app.post("/getInfoTest", (req, res) => {
  let movieUrl = [];
  let finalObj = [];
  let tempUrl = [];
  let data = req.body;
  let dataArray = [];
  data.forEach((dat) => {
    let movieName = dat.movieurl.split(
      "gs://nostalgiadev-1f319.appspot.com/"
    )[1];

    let imageName = dat.imageurl.split(
      "gs://nostalgiadev-1f319.appspot.com/"
    )[1];

    dataArray.push({
      movName: movieName,
      imgName: imageName,
      movDesc: dat.desc,
      movRealName: dat.movName,
    });
  });

  admin
    .storage()
    .bucket()
    .getFiles()
    .then((urll) => {
      const temparray = urll[0];
      const tempUrl = [];
      let imgtoken = "";
      let movtoken = "";
      dataArray.forEach((urlss) => {
        temparray.forEach((data) => {
          if (
            data.metadata.name == urlss.imgName &&
            data.metadata.contentType == "image/jpeg"
          )
            imgtoken = data.metadata.metadata.firebaseStorageDownloadTokens;
          if (
            data.metadata.name == urlss.movName &&
            data.metadata.contentType == "video/mp4"
          )
            movtoken = data.metadata.metadata.firebaseStorageDownloadTokens;
        });
        imgLoc = urlss.imgName.replace(/\//g, "%2F");
        movLoc = urlss.movName.replace(/\//g, "%2F");

        tempUrl.push({
          imageToken: imgtoken,
          movieToken: movtoken,
          imageLocation: imgLoc,
          movieLocation: movLoc,
          movieName: urlss.movRealName,
          movieDesc: urlss.movDesc,
        });
      });
      return res.json(tempUrl);
    });
});

app.post("/upload", isAuthenticated, filesUpload, async (req, res) => {
  try {
    // image name to hide from attackers
    const imageName = uuidv1();

    // access token for the images uploaded
    const uuid = uuidv4();

    // file reference
    const file = storageRef.file(
      `userImages/${req.userId}/${imageName}${path.extname(
        req.files[0].originalname
      )}`
    );
    await file.save(req.files[0].buffer, {
      metadata: { metadata: { firebaseStorageDownloadTokens: uuid } },
    });

    // store the details in firestore
    // stored in users/userId/images collection
    const fileUrl = createPersistentDownloadUrl(
      config.storageBucket,
      `userImages/${req.userId}/${imageName}${path.extname(
        req.files[0].originalname
      )}`,
      uuid
    );
    await db.collection(`users/${req.userId}/images`).add({
      url: fileUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      name: `${imageName}${path.extname(req.files[0].originalname)}`,
    });
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    return res.status(404).json({ error: error.toString() });
  }
});

app.delete(
  "/image",

  isAuthenticated,
  async (req, res) => {
    try {
      // get the file name
      const { name } = req.body;

      // file reference
      const file = storageRef.file(`userImages/${req.userId}/${name}`);
      // delete the file
      await file.delete();
      // remove the file document from the firestore
      const querySnapshots = await db
        .collection(`users/${req.userId}/images`)
        .where("name", "==", name)
        .get();
      querySnapshots.forEach((doc) => doc.ref.delete());

      return res.status(200).json({ message: "Deleted the file successfully" });
    } catch (error) {
      return res.status(404).json({ error: error.toString() });
    }
  }
);

//Music modules
app.get("/getMusicInfo", (req, res) => {
  let arr = [];
  let final = null;
  let st = admin.storage().bucket();
  st.getFiles()
    .then((data) => {
      data[0].map((dat) => {
        if (dat.metadata.name.includes("musics")) {
          let output = dat.metadata.name.split("/");
          if (output[1] != "") arr.push(output[1]);
          final = [...new Set(arr)];
        }
      });
      return res.json(final);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/getMusics/:foldername", (req, res) => {
  let arr = [];
  let final = null;
  let st = admin.storage().bucket();
  st.getFiles()
    .then((data) => {
      data[0].map((dat) => {
        if (dat.metadata.name.includes(req.params.foldername)) {
          let output = dat.metadata.name.split("/");
          if (output[2] != "")
            arr.push({
              musicAdd: dat.metadata.name.replace(/\//g, "%2F"),
              musicToken: dat.metadata.metadata.firebaseStorageDownloadTokens,
            });
        }
      });
      final = [...new Set(arr)];
      return res.json(final);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/getMusicInformation/:musicname", (req, res) => {
  const musicInf = [];
  db.collection("music")
    .where("musicName", "==", req.params.musicname)
    .get()
    .then((doc) => {
      doc.forEach((snap) => {
        musicInf.push({
          musicAlbum: snap.data().album,
          musicTrack: snap.data().track,
          musicArtist: snap.data().artist,
        });
      });
      return res.json(musicInf);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/getMusicOnClick/:musicname", async (req, res) => {
  db.collection("music")
    .where("musicName", "==", req.params.musicname)
    .limit(1)
    .get()
    .then((docs) => {
      const documentName = docs.docs[0].ref.path.split("/")[
        docs.docs[0].ref.path.split("/").length - 1
      ];
      const docRef = db.collection("music").doc(documentName);

      db.runTransaction(async (t) => {
        const doc = await t.get(docRef);
        const newPopulation = doc.data().click + 1;
        t.update(docRef, { click: newPopulation });
      });
      return res.json("Transaction success!");
    })
    .catch((err) => {
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);
