import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
};

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { classes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("/login", user)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setUser({ email: event.target.value, password: user.password });
    } else {
      setUser({ email: user.email, password: event.target.value });
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
            id="email"
            name="email"
            type="email"
            label="email"
            value={user.email}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="password"
            value={user.password}
            className={classes.textField}
            onChange={handleChange}
            fullWidth
          />
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
            sign in
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
          >
            {" "}
            not registered? sign up
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Login);
