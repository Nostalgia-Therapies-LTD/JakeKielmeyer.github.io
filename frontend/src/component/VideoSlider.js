import React, { useState, useEffect, useCallback } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

//material-UI
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Skeleton from "@material-ui/lab/Skeleton";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CancelIcon from "@material-ui/icons/Cancel";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import headerImage from "../images/movie/header4.jpg";

//axios
import axios from "axios";

const useStyles = makeStyles({
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

  media: {
    height: 120,
    backgroundColor: "#eeeee4",
  },

  texts: {
    textAlign: "left",
    backgroundColor: "white",
    height: "100%",
    color: "black",
    margin: "0",
    padding: "0",
  },
  caption: {
    position: "relative",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px",
  },

  modalcontent: {
    background: "white",
    height: "80vh",
    width: "80vw",
    outline: "none",
    borderRadius: "7px",
  },

  modalContentHeader: {
    height: "40vh",
    position: "relative",
    backgroundImage: `url(${headerImage})`,
    objectFit: "fill",
    backgroundSize: "cover",
  },

  fadeHeader: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "1000000000",
    height: "50%",
    background:
      "linear-gradient(to top, rgba(255,255,255,255), rgba(200,200,200,0))",
  },

  videoImagesContainer: {
    padding: "5px",
    width: "100%",
    height: "100%",
  },
  modalContainingImgMovies: {
    padding: "10px",
  },

  gridList: {
    width: "100%",
    height: "28vh",
    padding: "20px",
  },

  imgOfMovies: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  },
  appBar: {
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    padding: "0",
    margin: "0",
  },

  closeButton: {
    width: "100%",
    margin: "0",
    borderRadius: "0",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Arial",
    fontStyle: "normal",
    fontVariantLigatures: "normal",
    fontVariantCaps: "normal",
    fontVariantNumeric: "normal",
    fontVariantEastAsian: "normal",
    fontWeight: "400",
    fontStretch: "normal",
    fontSize: "13.3333px",
    lineHeight: "normal",
    textTransform: "capitalize",
    padding: "12px 20px",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "rgba(225,226,220,255)",
      color: "rgba(0,0,0,1)",
      fontFamily: "Arial",
    },
  },
});

function VideoSlider(props) {
  const classes = useStyles();

  const [folderNames, setfolderNames] = useState(null);
  const [modalContentState, setmodalContentState] = useState(null);
  const [modalContentMovImg, setmodalContentMovImg] = useState(null);
  const [open, setOpen] = React.useState(null);
  const [openDial, setOpenDial] = useState(false);
  const [dialogZIndex, setdialogZIndex] = useState(-1300);
  const [movieURL, setmovieURL] = useState(null);
  const [modalDescription, setmodalDescription] = useState(null);
  const [modalHeaderImage, setmodalHeaderImage] = useState(null);
  const [randomImage, setrandomImage] = useState(null);
  const [modaltitle, setmodaltitle] = useState(null);
  const [currentMovieURL, setcurrentMovieURL] = useState(null);
  const [videoPlayIndex, setvideoPlayIndex] = useState(null);

  const handleDialClickOpen = () => {
    setOpenDial(true);
  };

  const handleDialClose = () => {
    let myModal = document.getElementById("movieModal");
    if (myModal != null) myModal.style.zIndex = 1400;
    setmovieURL(null);
    setdialogZIndex(-1300);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const body = (
    <Dialog
      fullScreen
      open={openDial}
      onClose={handleDialClose}
      TransitionComponent={Transition}
      style={{ zIndex: dialogZIndex }}
    >
      <div className="closeButtonDiv">
        <AppBar className={classes.appBar}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleDialClose}
            className={classes.closeButton}
          >
            Close
          </Button>
        </AppBar>
      </div>
      <div className="videoPlayer" id="videoPlayer">
        <div className="videoWrapper" id="videoWrapper">
          <video
            autoPlay="autoplay"
            allowFullScreen={true}
            width="100%"
            controls
            controlsList="nodownload"
            disablePictureInPicture
            id="videoFile"
            onEnded={() => playNextVideo()}
            src={movieURL}
          >
            <source type="video/mp4" />
          </video>
        </div>
      </div>
    </Dialog>
  );

  function playNextVideo() {
    if (videoPlayIndex != null && currentMovieURL != null) {
      let indx = videoPlayIndex;
      indx++;
      let movieUr = currentMovieURL;
      if (indx < movieUr.length) {
        setmovieURL(movieUr[indx]);
        setvideoPlayIndex(indx);
      } else {
        indx = 0;
        setmovieURL(movieUr[indx]);
        setvideoPlayIndex(indx);
      }
    }
  }

  function closeVideoPage() {
    const modalName = document.getElementById("videoPlayer");
    const videoFile = document.getElementById("videoFile");

    const elements = document.getElementsByClassName("flexContainer");
    const videodivider = document.getElementsByClassName("videoDivider");
    const videotitle = document.getElementsByClassName("videoTitle");
    const appbar = document.getElementsByClassName("MuiAppBar-root");

    videoFile.pause();
    modalName.style.display = "none";
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "flex";
    }
    for (var j = 0; j < videodivider.length; j++) {
      videodivider[j].style.display = "flex";
    }
    for (var k = 0; k < videotitle.length; k++) {
      videotitle[k].style.display = "flex";
    }
    for (var m = 0; m < appbar.length; m++) {
      appbar[m].style.display = "flex";
    }
  }

  function playVideo(token, location, indx) {
    setvideoPlayIndex(indx);
    const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${location.replace(
      /\//g,
      "%2F"
    )}.mp4?alt=media&token=${token}`;
    setmovieURL(url);
    let myModal = document.getElementById("movieModal");
    myModal.style.zIndex = 1200;
    setdialogZIndex(1300);
  }

  function onClickImages(genreCat) {
    if (modalContentState != null && modalDescription != null) {
      let outputArr = [];
      let arr = [];
      let movieUrl = [];
      modalContentState.forEach((value, indx) => {
        if (
          value.path.split("/")[value.path.split("/").length - 2] == genreCat
        ) {
          setmodaltitle(value.path.split("/")[2]);
          let modalHeaderUrl = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${value.path.replace(
            /\//g,
            "%2F"
          )}.jpg?alt=media&token=${value.tokens.imageToken}`;
          arr.push(modalHeaderUrl.replace(/ /g, "%20"));

          movieUrl.push(
            `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${value.path.replace(
              /\//g,
              "%2F"
            )}.mp4?alt=media&token=${value.tokens.movieToken}`
          );

          outputArr.push(
            <div className={classes.videoImagesContainer}>
              <Card className="carousel-items">
                <CardMedia
                  className={classes.media}
                  image={`https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${value.path.replace(
                    /\//g,
                    "%2F"
                  )}.jpg?alt=media&token=${value.tokens.imageToken}`}
                />
                <CardContent className={classes.texts}>
                  <Typography gutterBottom className="cardTitle">
                    {typeof modalDescription.get(`${value.path}.mp4`) !=
                    "undefined" ? (
                      modalDescription.get(`${value.path}.mp4`).name
                    ) : (
                      <div></div>
                    )}
                  </Typography>
                </CardContent>
              </Card>
              <IconButton className="playButtons">
                <PlayCircleFilledIcon
                  fontSize="large"
                  onClick={() =>
                    playVideo(value.tokens.movieToken, value.path, indx)
                  }
                />
              </IconButton>
            </div>
          );
        }
      });
      setmodalContentMovImg(outputArr);
      setmodalHeaderImage(arr);
      setcurrentMovieURL(movieUrl);
    }
  }

  //useeffects
  useEffect(() => {
    if (modalHeaderImage != null) {
      let endRand = modalHeaderImage.length;
      let randomNum = Math.floor(Math.random() * endRand);
      let arr = modalHeaderImage;
      let url = arr[randomNum];
      setrandomImage(url);
    }
  }, [modalHeaderImage]);

  useEffect(() => {
    if (dialogZIndex == 1300) {
      setOpenDial(true);
    } else {
      setOpenDial(false);
    }
  }, [dialogZIndex]);

  useEffect(() => {
    if (modalContentMovImg != null) {
      setOpen(true);
    }
  }, [modalContentMovImg]);

  useEffect(() => {
    let map = new Map();
    if (props.path != null && props.nextP != null) {
      if (localStorage.getItem(props.nextP)) {
        JSON.parse(localStorage.getItem(props.nextP)).forEach((items) => {
          map.set(items.path, {
            desc: items.description,
            name: items.name,
            genre: items.genre,
          });
        });
      } else {
        props.nextP.forEach((item) => {
          if (item.includes(props.path)) {
            axios
              .post(`/getMovieFilesPath`, { genre: item.split("/")[2] })
              .then((res) => {
                res.data.forEach((data) => {
                  map.set(data.path, {
                    name: data.name,
                    desc: data.description,
                    genre: data.genre,
                  });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
        setmodalDescription(map);
      }
    }
  }, [props.nextP, props.path]);

  useEffect(() => {
    if (props.obj != null) {
      let tempArr = [];
      let map = new Map();
      props.obj.data.forEach((items) => {
        if (
          items.path.includes(props.path) &&
          items.path.trim().split("/").length === 3 &&
          items.type === "image/jpeg"
        ) {
          tempArr.push(items);
        } else if (
          items.path.includes(props.path) &&
          items.path.trim().split("/").length === 4 &&
          items.type === "video/mp4"
        ) {
          let tempVar = items.path.trim().split(".mp4")[0];
          if (map.has(tempVar)) {
            let add = map.get(tempVar);
            add.movieToken = items.token;
            map.set(tempVar, add);
          } else {
            map.set(tempVar, { movieToken: items.token });
          }
        } else if (
          items.path.includes(props.path) &&
          items.path.trim().split("/").length === 4 &&
          items.type === "image/jpeg"
        ) {
          let tempVar = items.path.trim().split(".jpg")[0];
          if (map.has(tempVar)) {
            let add = map.get(tempVar);
            add.imageToken = items.token;
            map.set(tempVar, add);
          } else {
            map.set(tempVar, { imageToken: items.token });
          }
        }
      });
      setfolderNames(tempArr);
      setmodalContentState(
        Array.from(map).map(([path, tokens]) => ({
          path,
          tokens,
        }))
      );
    }
  }, [props.obj]);

  const handleClose = () => {
    setOpen(false);
    setrandomImage(null);
    document.body.style.overflow = null;
  };

  const modalValues = open ? (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      id="movieModal"
    >
      <Fade in={open}>
        <div className={classes.modalcontent}>
          <div
            className={classes.modalContentHeader}
            style={{ backgroundImage: `url(${randomImage})` }}
          >
            <div className={classes.fadeHeader}></div>
          </div>
          <div>
            {modaltitle != null ? (
              <div className="modalTitleBar">{modaltitle}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="gridListController">
            <GridList className={classes.gridList} cols={4}>
              {modalContentMovImg.map((items, key) => (
                <GridListTile key={key} className="grid__list__tile">
                  {items}
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </Fade>
    </Modal>
  ) : (
    <div></div>
  );

  const testFolderNames = folderNames ? (
    //testing
    <section className="videoSection">
      <div className="flexContainer">
        {folderNames.map((names, ind) => (
          <div className="imageContainer" id="imageContainers">
            <div className="innerImgContainer">
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${names.path.replace(
                  /\//g,
                  "%2F"
                )}?alt=media&token=${names.token}`}
                className="carousel-items"
                onClick={() =>
                  onClickImages(names.path.split("/")[2].split(".")[0])
                }
              />
            </div>
            <div
              className="caption"
              onClick={() =>
                onClickImages(names.path.split("/")[2].split(".")[0])
              }
            >
              <div className="captionText">
                {names.path.split("/")[2].split(".")[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );

  return (
    <div className="container">
      <Typography variant="h4" component="h3" className="videoTitle">
        {props.genre}
      </Typography>
      {testFolderNames}
      {modalValues}
      {body}
    </div>
  );
}

export default VideoSlider;
