import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const app = require("express")();

// admin.initializeApp();

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

// const firebase = require("firebase");
//const { firestore } = require("firebase-admin");
firebase.initializeApp(config);
const storage=firebase.storage()
const db = firebase.firestore();
const timestamp =firebase.firestore.FieldValue.serverTimestamp;
export {db,storage,timestamp}
//signup route

// app.post("/signup", (req, res) => {
//   //req.body = { email: "email", password:"password", confirmPassword:"confirmPassword", firstName:"firstname", lastName:"lastname"}
//   const newUser = {
//     ...req.body,
//   };

//   let token;

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(newUser.email, newUser.password)
//     .then((data) => {
//       userId = data.user.uid;
//       return data.user.getIdToken();
//     })
//     .then((IdToken) => {
//       token = IdToken;
//       const userCredential = {
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         createdAt: new Date().toISOString(),
//         userId,
//       };
//       return db.doc(`/users/${userCredential.userId}`).set(userCredential);
//     })
//     .then(() => {
//       console.log(token);
//       return res.status(201).json({ token });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.code === "auth/email-already-in-use") {
//         return res.status(400).json({ email: "Email elready registered" });
//       } else {
//         return res.status(500).json({ error: err });
//       }
//     });
// });

// //login route

// app.post("/login", (req, res) => {
//   user = {
//     ...req.body,
//   };

//   firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then((data) => {
//       return data.user.getIdToken();
//     })
//     .then((idToken) => {
//       return res.status(200).json({ token: idToken });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err });
//     });
// });

// //reset route
// app.post("/reset", (req, res) => {
//   const emailAddress = req.email;

//   firebase
//     .auth()
//     .sendPasswordResetEmail(emailAddress)
//     .then(() => {
//       return res
//         .status(200)
//         .json({ message: "reset link has been emailed to you" });
//     })
//     .catch((err) => {
//       return res.status(500).json({ error: err });
//     });
// });

// //get movie urls
// app.get("/getInfo/:genre", (req, res) => {
//   let movieUrl = [];
//   db.collection("movie")
//     .where("genre", "==", req.params.genre)
//     .get()
//     .then((doc) => {
//       doc.forEach((snap) => {
//         movieUrl.push({
//           imageurl: snap.data().imageURL,
//           movieurl: snap.data().url,
//         });
//       });
//       return res.json(movieUrl);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

// //extract all info about the video
// app.get("/getInfoTest", (req, res) => {
//   let movieUrl = [];
//   let finalObj = [];
//   let tempUrl = [];
//   let data = req.body;
//   let dataArray = [];
//   data.forEach((dat) => {
//     let movieName = dat.movieurl.split(
//       "gs://nostalgiadev-1f319.appspot.com/"
//     )[1];

//     let imageName = dat.imageurl.split(
//       "gs://nostalgiadev-1f319.appspot.com/"
//     )[1];

//     dataArray.push({ movName: movieName, imgName: imageName });
//   });

//   admin
//     .storage()
//     .bucket()
//     .getFiles()
//     .then((urll) => {
//       const temparray = urll[0];
//       const tempUrl = [];
//       let imgtoken = "";
//       let movtoken = "";
//       dataArray.forEach((urlss) => {
//         temparray.forEach((data) => {
//           if (
//             data.metadata.name == urlss.imgName &&
//             data.metadata.contentType == "image/jpeg"
//           )
//             imgtoken = data.metadata.metadata.firebaseStorageDownloadTokens;
//           if (
//             data.metadata.name == urlss.movName &&
//             data.metadata.contentType == "video/mp4"
//           )
//             movtoken = data.metadata.metadata.firebaseStorageDownloadTokens;
//         });
//         let imgLocIndex = urlss.imgName.indexOf("/");
//         let imgLoc = urlss.imgName.slice(0, imgLocIndex).trim();
//         let imgnam = urlss.imgName
//           .slice(imgLocIndex + 1, urlss.imgName.length)
//           .trim();
//         let movLocIndex = urlss.movName.indexOf("/");
//         let movLoc = urlss.movName.slice(0, movLocIndex).trim();
//         let movnam = urlss.movName
//           .slice(movLocIndex + 1, urlss.movName.length)
//           .trim();
//         tempUrl.push({
//           imageToken: imgtoken,
//           movieToken: movtoken,
//           imageLocation: imgLoc,
//           movieLocation: movLoc,
//           imageName: imgnam,
//           movieName: movnam,
//         });
//       });
//       return res.json(tempUrl);
//     });
// });

// exports.api = functions.https.onRequest(app);
