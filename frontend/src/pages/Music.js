import React, { useState, useEffect } from "react";
import pupper from "../images/Pupper.jpg";
import MusicPlayer from "../component/MusicPlayer";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

//axios
import axios from "axios";

//External Styles
import "../css/videoStyle.css";

const useStyles = makeStyles((theme) => ({
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

  loader: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Music() {
  //style
  const classes = useStyles();

  //set states
  const [musicGenre, setmusicGenre] = useState(null);

  //constents
  const musicComp = musicGenre ? (
    <div className="container">
      {musicGenre.map((dat) => (
        <div>
          <Typography variant="h4" component="h2" className="videoTitle">
            {dat}
          </Typography>
          <Divider className="videoDivider" />
          <MusicPlayer folderName={dat} />
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.loader}>
      <CircularProgress color="secondary" />
    </div>
  );

  //functions
  useEffect(() => {
    axios
      .get(`/getMusicInfo`)
      .then((res) => {
        setmusicGenre(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
  <div className="welcome" style={{backgroundImage:'url("http://3.bp.blogspot.com/-KgZ1XvqDJnU/Ud2HY5wgf4I/AAAAAAAAheE/QlL9UG811k4/s1600/John+Collier+-+Around+the+Jukebox.+Dance+hall,+Richwood,+West+Virginia,+1942.jpg")'}}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Welcome to Nostalgia Radio</Typography>
          <Box mt={5}>
            <Typography variant="h4">With stations like Pop-Socks! Boomer Heyday,</Typography>
            <Typography variant="h4">and 70's time machine,there's great </Typography>
            <Typography variant="h4">music for everyone </Typography>
          </Box>
        </Box>
      </div>
      <div className={classes.contents}>
        {musicComp}
        {/* having for loop to read the name of the folders in music on storage and return the music component*/}
      </div>
    </div>
  );
}

export default Music;
