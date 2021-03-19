import React from "react";
import { useState } from "react";

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
    marginTop: "20px",
  },

  textField2: {
    marginTop: "20px",
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

const Reset = (props) => {
  const [user, setUser] = useState({
    email: "",
  });
  const[msg, setMsg]=useState("")
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { classes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/reset", user)
      .then((res) => {
        setLoading(false);
        setMsg(<body style={{textAlign:"center", fontSize:"1.2em", color:"green"}}>
        A reset link has been emailed to you.
        </body>)
        setErrors({})
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false)

      })
  };

  const handleChange = (event) => {
      setUser({ email: event.target.value});
  };

  return (
    <Grid container className={classes.form}>
      <CssBaseline />
      <Grid item sm />
      <Grid item sm>
        <Typography className={classes.logo} variant="h5">
          Nostalgia Therapy
        </Typography>
        <Typography className={classes.textField2} variant="body1">
          Please enter your registered email address and you will recieve a link to create a new password via email.
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
            Send Request
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
        <Typography className="forgotPassword" variant="subtitle1">
           <a href="/login"> Back to log in </a>
        </Typography>
        {msg}
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Reset);
