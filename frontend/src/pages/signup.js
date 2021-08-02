import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config";

//mui stuff
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    padding: "55px",
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

  button: {
    marginTop: "20px",
    position: "relative",
    textTransform: "none",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "#3fa9f5",
  },

  progress: {
    position: "absolute",
  },
  resize: {
    fontSize: "15px",
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
  link:{
    textDecoration:"underline",
    "&:hover": {
        color: "#3fa9f5",
    },
  }
  
};

const SignUp = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { classes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("/signup", user)
      .then((res) => {
        //console.log("Input sign up:", res);
        setLoading(false);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        // history.push("/home");
        localStorage.setItem("norman", res.data.userId);
        const isLocation = db.collection("customers").doc(res.data.userId);
        if (isLocation) {
          isLocation.collection("subscriptions").onSnapshot((snapShot) => {
            if (snapShot.docs.length !== 0) {
              //console.log("Home");
              history.push({ pathname: "/home" });
            } else {
              //console.log("Subscription");
              history.push({ pathname: "/subscription" });
            }
          });
          // });
        }
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setErrors({});
    if (event.target.name === "firstName") {
      setUser({
        firstName: event.target.value,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    } else if (event.target.name === "lastName") {
      setUser({
        firstName: user.firstName,
        lastName: event.target.value,
        email: user.email,
        password: user.password,
      });
    } else if (event.target.name === "email") {
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: event.target.value,
        password: user.password,
      });
    } else if (event.target.name === "password") {
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: event.target.value,
      });
    }
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
            Sign up
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="standard-name"
              type="text"
              name="firstName"
              label="First Name"
              value={user.firstName}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              id="standard-name"
              type="lastName"
              name="lastName"
              label="Last Name"
              value={user.lastName}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
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
              id="standard-password-input"
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

           <Typography variant="body2" className={classes.textField}>
                By clicking Sign up you agree to our 
                <a className={classes.link} href="https://www.termsfeed.com/live/e80ff337-86fb-46a8-85bb-e99af248e61b" target="blank"> Terms and Conditions </a> 
                and <a className={classes.link} href= "https://www.termsfeed.com/live/f5b96439-0422-4218-b816-9673ea5917af" target="blank"> Privacy Policy</a>
              .</Typography>

            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              onSubmit={handleSubmit}
              fullWidth
              disabled={loading}
            >
              <Typography variant="h5"> Sign up </Typography>
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <h4 className="or">
              <span>OR</span>
            </h4>
            <Button
              type="link"
              variant="contained"
              className={classes.button}
              fullWidth
              href="/"
            >
              <Typography variant="h5"> Login </Typography>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUp);
