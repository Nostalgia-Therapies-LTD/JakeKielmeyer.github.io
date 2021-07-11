import React, { useEffect, useState } from "react";
import Bonanza from "../images/tv/Bonanza.jpg";
import VideoSlider from "../component/VideoSlider";
import { useLocation } from "react-router-dom";

//mui stuff
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import CssBaseLine from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

//axios
import axios from "axios";

//External Styles
import "../css/videoStyle.css";

const useStyles = makeStyles({
  welcome: {
    position: "relative",
    color: "white",
    display: "flex",
    paddingLeft: "4rem",
    minHeight: "600px",
    backgroundSize: "cover",
    backgroundImage: `url(${Bonanza})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },

  contents: {
    position: "relative",
    color: "white",
    minHeight: "800px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  rows: {
    paddingBottom: "50px",
  },

  rowsTitle: {
    // position: "relative",
    paddingBottom: "40px",
    justifyContent: "space-around",
  },

  circProgress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function Video() {
  const location = useLocation();
  //states
  const [firstLevelFolderName, setfirstLevelFolderName] = useState(null);
  const [folderName, setfolderName] = useState(null);
  //const [ifChanged, setifChanged] = useState(false);
  const [nextPath, setnextPath] = useState(null);
  const [hrefLocation, setHrefLocation] = useState(null);
  //styles
  const classes = useStyles();

  const repeatMovieCode =
    firstLevelFolderName && nextPath ? (
      <div>
        {firstLevelFolderName.map((element, key) => (
          <div
            id={element.split("/")[1]}
            key={key}
            onLoad={() => setHrefLocation(element.split("/")[1])}
          >
            <VideoSlider
              genre={element.split("/")[1]}
              path={element}
              obj={folderName}
              nextP={nextPath}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className={classes.circProgress}>
        <CircularProgress disableShrink />
      </div>
    );

  //effects

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .post("/getFoldersName", {
        filename: "movies",
      })
      .then((item) => {
        setfolderName(item);
      });
  }, []);

  useEffect(() => {
    // setHrefLocation(location.genreDash);
    if (
      hrefLocation != null &&
      location.genreDash != null &&
      hrefLocation == location.genreDash
    ) {
      document.getElementById(location.genreDash).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [hrefLocation]);

  useEffect(() => {
    let arr = [];
    let arrNextPath = [];
    if (folderName != null) {
      folderName.data.forEach((obj) => {
        let tempVar = obj.path.split("/");
        if (
          obj.type === "application/x-www-form-urlencoded;charset=UTF-8" &&
          tempVar.length === 3
        ) {
          arr.push(obj.path);
        } else if (
          obj.type === "application/x-www-form-urlencoded;charset=UTF-8" &&
          tempVar.length === 4
        ) {
          arrNextPath.push(obj.path);
        }
      });
      setfirstLevelFolderName(arr);
      setnextPath(arrNextPath);
    }
  }, [folderName]);

  return (
    <div>
      {/* <div
        className="welcome"
        style={{
          backgroundImage:
            'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/movies%2FBonanza.jpg?alt=media&token=1edcccae-15b1-4901-946c-59c2d24f3ccc")',
        }}
      >
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Bonanza</Typography>
          <Box mt={5}>
            <Typography variant="h4">Watch the classic show today!</Typography>
          </Box>
        </Box>
      </div> */}
      <div className={classes.contents}>{repeatMovieCode}</div>
    </div>
  );
}

export default Video;
