import React from "react";
import { useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../config";

//mui stuff
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import GoogleButton from 'react-google-button';

//axios
import axios from "axios";

const styles = {
  form: {
    paddingTop: "100px",
    height: "100vh",
    // backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  logo: {
    fontFamily: "Leviathan",
    color: "#3fa9f5",
  },

  textField: {
    marginTop: "10px",
  },
  
  button: {
    marginTop: "20px",
    position: "relative",
 
  },

  progress: {
    position: "absolute",
  },

  customError:{
    color:"red",
    fontSize:"1rem",
    marginTop:'10px'
  }

};

const Login = (props) => {
  const[googleIn, setGoogleIn]=useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { classes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("/login", user)
      .then((res) => {
        setLoading(false);
        //console.log(res.data.token);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false)

      })
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setUser({ email: event.target.value, password: user.password });
    } else {
      setUser({ email: user.email, password: event.target.value });
    }
  };
// google signin
  const handleGoogle=()=>{
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
    .then((result) => {
      let token = result.credential.idToken;
      let isnewUser = result.additionalUserInfo.isNewUser;
      let profile=result.additionalUserInfo.profile;
      let uid=result.user.uid;
      localStorage.setItem("FBIdToken", `Bearer ${token}`);
      history.push("/home");
      const userCredential = {
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        createdAt: new Date().toISOString(),
        userId:uid,
      };

      if (isnewUser){
        db.doc(`/users/${userCredential.userId}`).set(userCredential)
      }
      console.log(isnewUser,userCredential);
      
    
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
    
  });
};

  
  return (
    <Grid container className={classes.form}>
      <CssBaseline />
      <Grid item sm />
      <Grid item sm>
        <Typography className={classes.logo} variant="h5">
          Nostalgia Therapy
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
            color="primary"
            className={classes.button}
            onSubmit={handleSubmit}
            fullWidth
            disabled={loading}
          >
            {" "}
            log in
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
    
          <Button
            type="link"
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            href="/signup"
          >
            {" "}
            not registered? sign up 
          </Button>
        </form>
        <hr></hr>
        <GoogleButton style={{width:"100%", marginTop:"20px", textAlign:"center"}} 
          label='Log in with Google' type="light"  onClick={handleGoogle}/>
        <Typography className="forgotPassword" variant="subtitle1">
          <a href="/reset">Forgot password?</a>
          </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Login);
