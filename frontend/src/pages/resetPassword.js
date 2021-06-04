import React from "react";
import { useState } from "react";

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
    minWidth:"300px"
  },
  formContent: {
    padding: "55px",
    textAlign: "left",
    width: "100%",
    marginTop:"15%",
    boxShadow:" 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
    textTransform: "none", 
    borderRadius: "4px",
    color:"white",
    backgroundColor:"#3fa9f5",

  },

  progress: {
    position: "absolute",
  },

  customError:{
    color:"red",
    fontSize:"1rem",
    marginTop:'10px'
  },
  header: {
    marginTop: "25px",
    paddingLeft: "2rem",
  },
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
<div>
<header className={classes.header}>
      <Typography className={classes.logo} variant="h5">
          Nostalgia Therapy
      </Typography>
      </header>
      <CssBaseline />
      <div className={classes.formBody}>
       <div className={classes.formContent}>
      <Typography variant="h4" style={{fontSize: "2rem"}}>
          Reset your password
        </Typography>   
<Typography className={classes.textField2} variant="body1">
  Enter your Nostalgia Therapy email address to receive the link to reset your password
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
          className={classes.button}
          onSubmit={handleSubmit}
          fullWidth
          disabled={loading}
        >
   <Typography variant = "h5">{" "} Reset Password </Typography>
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
  </Button>
</form>
<Typography className="forgotPassword" variant="subtitle1">
   <a href="/login"> Back to log in </a>
</Typography>
{msg}
      </div>
      </div>

    
</div>
     
  );
};

export default withStyles(styles)(Reset);
