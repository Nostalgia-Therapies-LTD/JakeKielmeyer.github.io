import React, { useState, useEffect } from "react";
import pupper from "../images/Pupper.jpg";
import VideoSlider from "../component/VideoSlider";

//dummy backend service
import radioImage from "../services/imageService";
import { momentImage } from "../services/imageService";
import { tvImage } from "../services/imageService";
import { puzzleImage } from "../services/imageService";

//mui stuff
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Skeleton from "@material-ui/lab/Skeleton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
    backgroundImage: `url(${pupper})`,
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
});

function Video() {
  const [allUrls, setallUrls] = useState(null);

  const classes = useStyles();

  return (
    // <React.Fragment>
    <div>
      <div className={classes.welcome}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Video Page</Typography>
        </Box>
      </div>
      <div className={classes.contents}>
        <VideoSlider genre="horror" />
        <VideoSlider genre="animation" />
        <VideoSlider genre="action" />
        {/* {testGeturl} */}
        {/* <button onClick={calculation}>Increment </button>
        <ContentRow rowName="Bonanza" images={radioImage} />
        <ContentRow rowName="Historical Moments" images={momentImage} />
        <ContentRow rowName="Commercials" images={tvImage} /> */}
      </div>
    </div>
    // </React.Fragment>
  );
}

export default Video;
