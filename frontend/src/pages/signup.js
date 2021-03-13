import React from "react";
import {useState } from "react";
import {useHistory } from "react-router-dom";

//mui stuff
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  resize:{
    fontSize:"15px",
  },
  customError:{
    color:"red",
    fontSize:"1rem",
    marginTop:'10px'
  }
};

const SignUp = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
    
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
        setLoading(false);  
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);  
       history.push("/home")
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false)

      })
  };

  const handleChange = (event) => {
    if (event.target.name === "firstName") {
      setUser({ firstName:event.target.value, lastName:user.lastName, email: user.email, password: user.password, confirmPassword: user.comfirmPassword});
    }else if (event.target.name === "lastName") {
      setUser({ firstName:user.firstName, lastName:event.target.value, email: user.email, password: user.password, confirmPassword: user.comfirmPassword});
    }
    else if (event.target.name === "email") {
      setUser({ firstName:user.firstName, lastName:user.lastName, email: event.target.value, password: user.password, confirmPassword: user.comfirmPassword});
    } else if (event.target.name === "password") {
      setUser({ firstName:user.firstName, lastName:user.lastName, email: user.email, password: event.target.value, confirmPassword: user.comfirmPassword});
    } else if (event.target.name === "confirmPassword") {
      setUser({ firstName:user.firstName, lastName:user.lastName, email: user.email, password: user.password, confirmPassword: event.target.value });
    }
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
          <TextField
            id="standard-confirmpassword-input"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={user.confirmPassword}
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
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
            sign up
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
            href="/"
          >
            {" "}
            Already have an account? log in 
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(SignUp);
