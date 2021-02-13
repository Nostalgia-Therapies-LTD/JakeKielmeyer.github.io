//mui stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  appBar: {
    background: "transparent",
    boxShadow: "none",
    paddingLeft: "2rem",
  },

  brandName: {
    color: "#3fa9f5",
    fontSize: "1.18rem",
    fontFamily: "Leviathan",
    textTransform: "capitalize",
  },

  navContainer: {
    display: "flex",
    color: "white",
    width: "60vw",
    justifyContent: "space-between",
  },

  navLink: {
    fontFamily: "KOJ",
    fontSize: "1.15rem",
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <ToolBar className={classes.navContainer}>
        <Link to="/home">
          <Button color="inherit" className={classes.brandName}>
            Nostalgia Therapy
          </Button>
        </Link>{" "}
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
        <Link to="/photo">
          <Button color="inherit" className={classes.navLink}>
            Photos{" "}
          </Button>
        </Link>
        <Link to="/puzzle">
          <Button color="inherit" className={classes.navLink}>
            Puzzle
          </Button>
        </Link>
        <Link to="/">
          <Button color="inherit" className={classes.navLink}>
            Logout
          </Button>
        </Link>
      </ToolBar>
    </AppBar>
  );
}

export default withStyles(styles)(Navbar);
