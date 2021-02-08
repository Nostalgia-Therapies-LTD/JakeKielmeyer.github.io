import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//material-UI
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Skeleton from "@material-ui/lab/Skeleton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CancelIcon from "@material-ui/icons/Cancel";
import Divider from "@material-ui/core/Divider";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";

//axios
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  rows: {
    paddingBottom: "50px",
  },

  rowsTitle: {
    paddingBottom: "40px",
    justifyContent: "space-around",
  },

  image: {
    width: "18vw",
    height: "18vw",
    objectFit: "cover",
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.04,1.04)",
    },
  },

  musicCard: {
    display: "flex",
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
  },

  gridClass: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  textStyle: {
    color: "white",
  },
}));

function MusicPlayer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [musicName, setmusicName] = useState(null);
  const [counter, setcounter] = useState(null);
  const [musicPlaying, setmusicPlaying] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [carouselScrollLeft, setcarouselScrollLeft] = useState(0);
  const [pageLoadCount, setpageLoadCount] = useState(0);
  const [buttonName, setbuttonName] = useState(null);
  const [runOnce, setrunOnce] = useState(true);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {}, []);

  useEffect(() => {});

  useEffect(() => {
    axios
      .get(`/getMusics/${props.folderName}`)
      .then((res) => {
        setmusicName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.folderName]);

  useEffect(() => {
    if (counter == 0) {
      setmusicPlaying(
        musicName[counter].musicAdd.split("%2F")[
          musicName[counter].musicAdd.split("%2F").length - 1
        ]
      );
      let url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${musicName[counter].musicAdd}?alt=media&token=${musicName[counter].musicToken}`;
      let musicID = document.getElementById(`musicAudio${props.folderName}`);
      musicID.src = url;
    } else if (counter != 0 && counter != null) {
      setmusicPlaying(
        musicName[counter].musicAdd.split("%2F")[
          musicName[counter].musicAdd.split("%2F").length - 1
        ]
      );
      let url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${musicName[counter].musicAdd}?alt=media&token=${musicName[counter].musicToken}`;
      let musicID = document.getElementById(`musicAudio${props.folderName}`);
      musicID.src = url;
      musicID.play();
    }
  }, [counter]);

  function playMusic() {
    console.log("Ended");
    counter != musicName.length - 1 ? setcounter(counter + 1) : setcounter(0);
  }

  function changeCounter() {
    if (counter == null) {
      console.log("Hello");
      setcounter(0);
    }
  }

  const getMusicName = musicName ? (
    <div className={classes.gridClass}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <audio
              controls
              controlsList="nodownload"
              className="audioFiles"
              id={`musicAudio${props.folderName}`}
              onLoadStart={() => {
                changeCounter();
              }}
              onEnded={() => {
                playMusic();
              }}
            >
              <source type="audio/mpeg"></source>
            </audio>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <marquee className="marquee" behavior="scroll" scrollamount="3">
              <span className={classes.textStyle}>{musicPlaying}</span>
            </marquee>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : (
    // <Card className={classes.musicCard}>
    //   <div className={classes.details}>
    //     <CardContent className={classes.content}>
    //       <Typography component="h5" variant="h5">
    //         Live From Space
    //       </Typography>
    //       <Typography variant="subtitle1" color="textSecondary">
    //         Mac Miller
    //       </Typography>
    //     </CardContent>
    //     <div className={classes.controls}>
    //       <IconButton aria-label="previous">
    //         {theme.direction === "rtl" ? (
    //           <SkipNextIcon />
    //         ) : (
    //           <SkipPreviousIcon />
    //         )}
    //       </IconButton>
    //       <IconButton aria-label="play/pause">
    //         <PlayArrowIcon className={classes.playIcon} />
    //       </IconButton>
    //       <IconButton aria-label="next">
    //         {theme.direction === "rtl" ? (
    //           <SkipPreviousIcon />
    //         ) : (
    //           <SkipNextIcon />
    //         )}
    //       </IconButton>
    //     </div>
    //   </div>
    //   <CardMedia
    //     className={classes.cover}
    //     // image="someImages.jpg"
    //     title="Live from space album cover"
    //   />
    // </Card>
    <Skeleton variant="rect" width={300} height={200} />
  );

  return <div className="container">{getMusicName}</div>;
}

export default MusicPlayer;
