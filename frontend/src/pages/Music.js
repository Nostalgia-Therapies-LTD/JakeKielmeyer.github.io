import React, { useState, useEffect } from "react";
import pupper from "../images/Pupper.jpg";
import MusicPlayer from "../component/MusicPlayer";

//mui stuff
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Slider from "@material-ui/core/Slider";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

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

  gridContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0",
  },

  gridClass: {
    padding: "0",
    margin: "0",
    marginTop: "20px",
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    bottom: "0",
  },
  paper: {
    position: "relative",
    width: "110%",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    // padding: theme.spacing(2),
    padding: "0",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    outline: "none",
    border: "none",
    left: "-10px",
  },

  musicCard: {
    boxShadow: "none",
    display: "flex",
    width: "110%",
    // marginRight: "auto",
    // backgroundColor: "rgba(249,222,169,255)",
    backgroundColor: "rgb(64, 64, 64)",

    // borderTop: "4mm solid #eab676 !important",
  },

  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  nextButton: {
    color: "rgba(255,255,255,1) !important",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
    // color: "rgba(0, 0, 0, 0.9) !important",
    color: "rgba(255,255,255,1)",
  },

  contents: {
    position: "relative",
    color: "white",
    minHeight: "800px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "3rem",
    // paddingBottom: "20px",
    // marginBottom: "100px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  rows: {
    paddingBottom: "50px",
  },

  rowsTitle: {
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

const PrettoSlider = withStyles({
  root: {
    color: "rgba(0,0,0,1)",
    height: 8,
  },
  thumb: {
    height: 12,
    width: "12px",
    backgroundColor: "rgba(213,183,185,255)",
    border: "2px solid currentColor",
    marginTop: -2.5,
    marginLeft: -2,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {
    marginRight: 10,
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function Music() {
  //style
  const classes = useStyles();

  //set states
  const [musicGenre, setmusicGenre] = useState(null);
  const [childData, setchildData] = useState(null);
  const [musicAl, setmusicAl] = useState(null);
  const [musicTr, setmusicTr] = useState(null);
  const [musicArt, setmusicArt] = useState(null);
  const [musicPlaying, setmusicPlaying] = useState(null);
  const [counter, setcounter] = useState(null);
  const [showStopButton, setshowStopButton] = useState(1);

  //functions
  function playMusic() {
    counter !== childData.length - 1 ? setcounter(counter + 1) : setcounter(0);
  }

  function changeCounter() {
    if (counter == null) {
      setcounter(0);
    }
  }

  function playMusicPlayer() {
    setshowStopButton(null);
    let musicID = document.getElementById("parentAudioPlayer");
    musicID.play();
    if (musicID.currentTime == 0) {
      axios
        .get(
          `/getMusicOnClick/${
            childData[counter].musicAdd.split("%2F")[
              childData[counter].musicAdd.split("%2F").length - 1
            ]
          }`
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function stopMusic() {
    setshowStopButton(1);
    let musicID = document.getElementById("parentAudioPlayer");
    musicID.pause();
  }

  function changeCounterFromChild(counter) {
    setcounter(counter);
  }

  //constents
  const getMusicName = childData ? (
    <div className={classes.gridClass}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} className="gridStyle">
          <Paper className={classes.paper}>
            <audio
              controls
              controlsList="nodownload"
              className="audioFiles hidden"
              id="parentAudioPlayer"
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
                {/* <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {musicArt}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {musicAl}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {musicTr}
                  </Typography>
                </CardContent> */}

                <div className={classes.controls}>
                  <div className="musicPlayerTitle">
                    <Typography
                      component="h5"
                      variant="h5"
                      display="block"
                      align="left"
                    >
                      {musicArt}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      display="block"
                      align="left"
                      color="inherit"
                    >
                      {musicAl}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      display="block"
                      align="left"
                      color="inherit"
                    >
                      {musicTr}
                    </Typography>
                  </div>
                  {showStopButton ? (
                    <IconButton
                      aria-label="play/pause"
                      onClick={() => playMusicPlayer()}
                    >
                      <PlayCircleOutlineIcon className={classes.playIcon} />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="play/pause"
                      onClick={() => stopMusic()}
                    >
                      <PauseCircleOutlineIcon className={classes.playIcon} />
                    </IconButton>
                  )}

                  <IconButton
                    aria-label="next"
                    onClick={() => playMusic()}
                    className={classes.nextButton}
                  >
                    <SkipNextIcon />
                  </IconButton>
                  {/* <div className="musicSlider"> */}
                  {/* <PrettoSlider
                      valueLabelDisplay="off"
                      aria-label="pretto slider"
                    /> */}
                  {/* </div> */}
                </div>
              </div>

              <CardMedia
                className={classes.cover}
                title="Live from space album cover"
              />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div></div>
  );

  const musicComp = musicGenre ? (
    <div className="container">
      {musicGenre.map((dat) => (
        <div>
          <Typography variant="h4" component="h2" className="videoTitle">
            {dat}
          </Typography>
          <Divider className="videoDivider" />
          <MusicPlayer
            folderName={dat}
            childToParentCallback={dataFromChild}
            childToParentCounter={changeCounterFromChild}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.loader}>
      <CircularProgress color="secondary" />
    </div>
  );

  //Effects
  useEffect(() => {
    if (counter != null) {
      setmusicPlaying(
        childData[counter].musicAdd.split("%2F")[
          childData[counter].musicAdd.split("%2F").length - 1
        ]
      );
      let url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${childData[counter].musicAdd}?alt=media&token=${childData[counter].musicToken}`;
      let musicID = document.getElementById("parentAudioPlayer");
      musicID.src = url;
      setshowStopButton(null);
      musicID.play();
      if (showStopButton) {
      } else {
        musicID.play();

        axios
          .get(
            `/getMusicOnClick/${
              childData[counter].musicAdd.split("%2F")[
                childData[counter].musicAdd.split("%2F").length - 1
              ]
            }`
          )
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [counter]);

  useEffect(() => {
    if (musicPlaying) {
      axios
        .get(`/getMusicInformation/${musicPlaying}`)
        .then((res) => {
          setmusicAl(res.data[0].musicAlbum);
          setmusicArt(res.data[0].musicTrack);
          setmusicTr(res.data[0].musicArtist);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [musicPlaying]);

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

  useEffect(() => {
    if (childData != null) {
      let chiDataSize = childData.length - 1;
      let counterVal = counter;

      setcounter(generateRandom(0, chiDataSize, counterVal));
    }
  }, [childData]);

  //Functions
  function generateRandom(min, max, except) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num === except ? generateRandom(min, max) : num;
  }

  function dataFromChild(input) {
    setchildData(input);
  }

  return (
    <div>
      <div
        className="welcome"
        style={{
          backgroundImage:
            'url("http://3.bp.blogspot.com/-KgZ1XvqDJnU/Ud2HY5wgf4I/AAAAAAAAheE/QlL9UG811k4/s1600/John+Collier+-+Around+the+Jukebox.+Dance+hall,+Richwood,+West+Virginia,+1942.jpg")',
        }}
      >
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Welcome to Nostalgia Radio</Typography>
          <Box mt={5}>
            <Typography variant="h4">
              With stations like Pop-Socks! and Boomer Heyday,
            </Typography>
            <Typography variant="h4">
              there's great music for everyone </Typography>
          </Box>
        </Box>
      </div>
      <div className={classes.contents}>
        {musicComp}
        <div className="emptyInvisibleDiv"></div>
        <div className="containMusicPlayer">{getMusicName}</div>
        {/* having for loop to read the name of the folders in music on storage and return the music component*/}
      </div>
    </div>
  );
}

export default Music;
