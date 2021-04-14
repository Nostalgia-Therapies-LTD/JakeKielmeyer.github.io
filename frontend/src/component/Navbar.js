import { Link } from "react-router-dom";

//mui stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  appBar: {
    background: "transparent",
    boxShadow: "none",
    paddingLeft: "2rem",
    '@media (max-width:760px)': {
      display: "none",
    },
  },

  brandName: {
    color: "#3fa9f5",
    fontFamily: "Leviathan",
    textTransform: "capitalize",
    textShadow: "1px 1px 4px #000",
  },

  navContainer: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
  },

  navLink: {
    padding: "0 3rem",
    fontFamily: "KOJ",
    fontSize: "5rem",
    display: "flex",
    textShadow: "1px 1px 4px #000",
    textTransform: "capitalize",
    '@media (min-width:760px)': {
      padding: "0 .25rem",
      fontSize: '1.5rem',
   },
  },
};

function logoutHandle() {
  localStorage.clear();
}

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <ToolBar className={classes.navContainer}>
        <Link to="/home">
          <Button color="inherit" className={classes.brandName}>
            <Typography variant="h6">Nostalgia Therapy</Typography>
          </Button>
        </Link>{" "}
        <Link to="/photo">
          <Button color="inherit" className={classes.navLink}>
            Photos{" "}
          </Button>
        </Link>
        <Link to="/music">
          <Button color="inherit" className={classes.navLink}>
            Music{" "}
          </Button>
        </Link>
        <Link to="/video">
          <Button color="inherit" className={classes.navLink}>
            Video
          </Button>
        </Link>
        <Link to="/puzzle">
          <Button color="inherit" className={classes.navLink}>
            Puzzle
          </Button>
        </Link>
        <Link to="/">
          <Button
            color="inherit"
            className={classes.navLink}
            onClick={logoutHandle}
          >
            Logout
          </Button>
        </Link>
      </ToolBar>
    </AppBar>
  );
}

export default withStyles(styles)(Navbar);

