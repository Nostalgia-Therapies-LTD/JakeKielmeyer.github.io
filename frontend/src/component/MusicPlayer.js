import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//material-UI
import Skeleton from "@material-ui/lab/Skeleton";
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
  const [musicImages, setmusicImages] = useState(null);

  // useEffect(() => {}, []);

  // useEffect(() => {});

  useEffect(() => {
    axios
      .post("/getMusicImage", { name: props.folderName })
      .then((dat) => {
        setmusicImages(dat);
      })
      .catch((err) => {
        console.log(err);
      });

    if (localStorage.getItem(props.folderName)) {
      setmusicName(JSON.parse(localStorage.getItem(props.folderName)));
    } else {
      axios
        .get(`/getMusics/${props.folderName}`)
        .then((res) => {
          setmusicName(res.data);
          localStorage.setItem(props.folderName, JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.folderName]);

  function playMusicPlayer() {
    props.childToParentCallback(musicName);
  }

  const getMusicName = musicName ? (
    <div className={classes.gridClass}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {musicImages ? (
              <div className="musicImageContainer">
                <img
                  src={musicImages.data.path}
                  className="musicImage"
                  onClick={() => playMusicPlayer()}
                />
              </div>
            ) : (
              <div></div>
            )}
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
