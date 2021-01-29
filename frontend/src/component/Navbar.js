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
    zIndex: 100000,
  },

  brandName: {
    color: "#3fa9f5",
    fontSize: "1rem",
    fontFamily: "Leviathan",
    textTransform: "capitalize",
    zIndex: 2,
  },

  navContainer: {
    display: "flex",
    color: "white",
    width: "60vw",
    justifyContent: "space-between",
    zIndex: 2,
  },

  navLink: {
    fontFamily: "KOJ",
    zIndex: 2,
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
        <Link to="/video">
          <Button color="inherit" className={classes.navLink}>
            Video
          </Button>
        </Link>
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
