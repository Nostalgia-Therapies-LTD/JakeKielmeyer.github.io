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
import PauseIcon from "@material-ui/icons/Pause";

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
    width: "100%",
    marginRight: "auto",
    backgroundColor: "#eeeee4",
    borderTop: "4mm solid #eab676 !important",
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: "1 0 auto",
    textAlign: "left",
    borderTop: "2px",
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
    color: "rgba(0, 0, 0, 0.9) !important",
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

  playIconDisable: {
    pointerEvents: "none",
    color: "rgba(0, 0, 0, 0.54)",
  },

  previousButton: {
    color: "rgba(0, 0, 0, 0.54)",
    pointerEvents: "none",
  },

  nextButton: {
    color: "rgba(0, 0, 0, 0.9) !important",
  },
}));

function MusicPlayer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [musicName, setmusicName] = useState(null);
  const [counter, setcounter] = useState(null);
  const [musicPlaying, setmusicPlaying] = useState(null);
  const [showStopButton, setshowStopButton] = useState(1);
  const [musicAl, setmusicAl] = useState(null);
  const [musicTr, setmusicTr] = useState(null);
  const [musicArt, setmusicArt] = useState(null);
  // const [runOnce, setrunOnce] = useState(true);
  // const [showVideo, setShowVideo] = useState(true);

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
    if (counter != null) {
      setmusicPlaying(
        musicName[counter].musicAdd.split("%2F")[
          musicName[counter].musicAdd.split("%2F").length - 1
        ]
      );
      let url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${musicName[counter].musicAdd}?alt=media&token=${musicName[counter].musicToken}`;
      let musicID = document.getElementById(`musicAudio${props.folderName}`);
      musicID.src = url;
      if (showStopButton) {
      } else {
        musicID.play();
      }
    }
  }, [counter]);

  useEffect(() => {
    if (musicPlaying) {
      axios
        .get(`/getMusicInformation/${musicPlaying}`)
        .then((res) => {
          console.log(res);
          setmusicAl(res.data[0].musicAlbum);
          setmusicArt(res.data[0].musicTrack);
          setmusicTr(res.data[0].musicArtist);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [musicPlaying]);

  function playMusic() {
    counter != musicName.length - 1 ? setcounter(counter + 1) : setcounter(0);
  }

  function changeCounter() {
    if (counter == null) {
      setcounter(0);
    }
  }

  function playMusicPlayer() {
    setshowStopButton(null);
    let musicID = document.getElementById(`musicAudio${props.folderName}`);
    musicID.play();
  }

  function stopMusic() {
    setshowStopButton(1);
    let musicID = document.getElementById(`musicAudio${props.folderName}`);
    musicID.pause();
  }

  const getMusicName = musicName ? (
    <div className={classes.gridClass}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <audio
              controls
              controlsList="nodownload"
              className="audioFiles hidden"
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

            <Card className={classes.musicCard}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {musicArt}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {musicAl}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {musicTr}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton
                    aria-label="previous"
                    className={classes.previousButton}
                  >
                    {theme.direction === "rtl" ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  {showStopButton ? (
                    <IconButton
                      aria-label="play/pause"
                      onClick={() => playMusicPlayer()}
                    >
                      <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="play/pause"
                      onClick={() => stopMusic()}
                    >
                      <PauseIcon className={classes.playIcon} />
                    </IconButton>
                  )}

                  <IconButton aria-label="next" className={classes.nextButton}>
                    {theme.direction === "rtl" ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon onClick={() => playMusic()} />
                    )}
                  </IconButton>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                // image="someImages.jpg"
                title="Live from space album cover"
              />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Skeleton variant="rect" width={300} height={200} />
  );

  return <div className="container">{getMusicName}</div>;
}

export default MusicPlayer;
