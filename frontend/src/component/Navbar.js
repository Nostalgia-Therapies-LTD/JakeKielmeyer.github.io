//mui stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  appBar: {
    background: "transparent",
    boxShadow: "none",
    paddingLeft: "2rem",
  },

  brandName: {
    color: "#3fa9f5",
    fontSize: "1rem",
    fontFamily: "Leviathan",
  },

  navContainer: {
    display: "flex",
    color: "white",
    width: "60vw",
    justifyContent: "space-between",
  },

  navLink: {
    fontFamily: "KOJ",
  },
});

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <ToolBar className={classes.navContainer}>
        <Link to="/">
          <Button color="inherit" className={classes.brandName}>
            Nostalgia Therapy
          </Button>
        </Link>{" "}
        <Button color="inherit" className={classes.navLink}>
          Music{" "}
        </Button>
        <Button color="inherit" className={classes.navLink}>
          Video{" "}
        </Button>
        <Button color="inherit" className={classes.navLink}>
          Photos{" "}
        </Button>
        <Link to="/puzzle">
          <Button color="inherit" className={classes.navLink}>
            Puzzle
          </Button>
        </Link>
      </ToolBar>
    </AppBar>
  );
}

export default Navbar;
