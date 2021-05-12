import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../config";

//mui stuff
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import GoogleButton from "react-google-button";

//axios
import axios from "axios";

const styles = {
  formBody: {
    margin: "0 auto",
    padding: "0 5%",
    width: "50%",
    minHeight: "90vh",
    minWidth: "300px",
  },
  formContent: {
    padding: "2.5em",
    textAlign: "left",
    width: "100%",
    marginTop: "15%",
    boxShadow: " 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  logo: {
    fontFamily: "Leviathan",
    color: "#3fa9f5",
  },

  textField: {
    marginTop: "10px",
  },

  forgotPassword: {
    marginRight: "50px",
  },

  button: {
    marginTop: "20px",
    position: "relative",
    color: "white",
    backgroundColor: "#3fa9f5",
  },

  progress: {
    position: "absolute",
  },

  customError: {
    color: "red",
    fontSize: "1rem",
    marginTop: "10px",
  },

  header: {
    marginTop: "25px",
    paddingLeft: "2rem",
  },

  google: {
    width: "100%",
    fontFamily: "KOW, sans-serif",
    fontWeight: "400",
    fontSize: "1.3rem",
    lineHeight: "2.5",
    backgroundColor: "#ED2939",
    color: "white",
  },
};

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isClick, setIsClick] = useState(false);
  // var isCalled = true;
  // const [googleError, setgoogleError] = useState("");
  const history = useHistory();
  const { classes } = props;

  useEffect(() => {
    if (isClick) {
      axios.post("/login", user).then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
      });
    }
  }, [isClick]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setIsClick(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setLoading(false);
        console.log(uid);
        localStorage.setItem("norman", uid);

        axios.post("/checkSubscription", { uid: uid }).then((output) => {
          //console.log("very good:", output.data);
          if (output.data.length != 0) {
            //console.log("Home:");
            history.push({ pathname: "/home" });
          } else {
            //console.log("Subscription");
            history.push({ pathname: "/subscription" });
          }
        });

        // const isLocation = db.collection("customers").doc(uid);
        // if (isLocation) {
        //   isLocation.collection("subscriptions").onSnapshot((snapShot) => {
        //     if (snapShot.docs.length !== 0) {
        //       console.log("Ah khodaye", snapShot.docs);
        //       isLocation
        //         .collection("subscriptions")
        //         .where("cancel_at_period_end", "===", false)
        //         .limit(1)
        //         .get()
        //         .then((snapShot) => {
        //           console.log("Ah khodaye man:", snapShot.data());
        //           if (snapShot.docs.length != 0) {

        //           } else {

        //           }
        //         });
        //     } else {
        //       console.log("Subscription");
        //       history.push({ pathname: "/subscription" });
        //     }
        //   });
        // }
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    // axios
    //   .post("/login", user)
    //   .then((res) => {
    //     setLoading(false);
    //     // console.log("input data:", res);
    //     localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
    //     // console.log(res.data());
    //     // history.push("/home");
    //     //------------------------
    //     localStorage.setItem("norman", res.data.userId);
    //     const isLocation = db.collection("customers").doc(res.data.userId);
    //     if (isLocation) {
    //       isLocation.collection("subscriptions").onSnapshot((snapShot) => {
    //         if (snapShot.docs.length !== 0) {
    //           console.log("Home");
    //           history.push({ pathname: "/home" });
    //         } else {
    //           console.log("Subscription");
    //           history.push({ pathname: "/subscription" });
    //         }
    //       });
    //       // });
    //     }
    //     //------------------------
    //   })
    //   .catch((err) => {
    //     setErrors(err.response.data);
    //     setLoading(false);
    //   });
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setUser({ email: event.target.value, password: user.password });
    } else {
      setUser({ email: user.email, password: event.target.value });
    }
  };
  // google signin
  const handleGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        // let acctoken = result.credential.accessToken;
        let token = result.credential.idToken;
        let isnewUser = result.additionalUserInfo.isNewUser;
        let profile = result.additionalUserInfo.profile;
        let uid = result.user.uid;
        //console.log("uid=",uid, "token=",token);
        localStorage.setItem("FBIdToken", `Bearer ${token}`);
        localStorage.setItem("norman", uid);
        const isLocation = db.collection("customers").doc(uid);
        if (isLocation) {
          isLocation.collection("subscriptions").onSnapshot((snapShot) => {
            if (snapShot.docs.length !== 0) {
              console.log("Home");
              history.push({ pathname: "/home" });
            } else {
              console.log("Subscription");
              history.push({ pathname: "/subscription" });
            }
          });
          // });
        }

        const userCredential = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          createdAt: new Date().toISOString(),
          userId: uid,
        };

        if (isnewUser) {
          db.doc(`/users/${userCredential.userId}`).set(userCredential);
        }
        // sendToCkeckOut(result.user.uid);
        //console.log(isnewUser,userCredential,acctoken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <header className={classes.header}>
        <Typography className={classes.logo} variant="h5">
          Nostalgia Therapy
        </Typography>
      </header>
      <CssBaseline />
      <div className={classes.formBody}>
        <div className={classes.formContent}>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={user.email}
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              value={user.password}
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              onSubmit={handleSubmit}
              fullWidth
              disabled={loading}
              style={{ textTransform: "none", borderRadius: "4px" }}
            >
              <Typography variant="h5"> Login</Typography>

              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
          <GoogleButton
            style={{
              width: "100%",
              fontFamily: "KOW, sans-serif",
              fontWeight: "400",
              fontSize: "1.25rem",
              lineHeight: "2.5",
              backgroundColor: "white",
              color: "grey",
            }}
            label="Log in with Google"
            type="light"
            onClick={handleGoogle}
          />

          <Typography className="forgotPassword" variant="subtitle1">
            <a href="/reset">Forgot password?</a>
          </Typography>

          <div style={{ textAlign: "left" }}>
            <h4 className="or">
              <span>OR</span>
            </h4>
            <Button
              type="link"
              variant="contained"
              className={classes.button}
              fullWidth
              href="/signup"
              style={{ textTransform: "none", borderRadius: "4px" }}
            >
              <Typography variant="h5"> Sign up </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
