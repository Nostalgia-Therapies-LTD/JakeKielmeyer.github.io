import React, { useState, useEffect, useCallback } from "react";
//import Grid from "@material-ui/core/Grid";
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
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
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
// import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
// import Button from "@material-ui/core/Button";
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
    backgroundColor: "#eeeee4",
    height: "100%",
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
    // fontFamily: "Arial",
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
    // overflowY: "auto",
    borderRadius: "7px",
  },

  modalContentHeader: {
    height: "40vh",
    position: "relative",
    backgroundImage: `url(${headerImage})`,
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
    height: "100%",
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

  const [allUrls, setallUrls] = useState(null);
  const [imageIndex, setimageIndex] = useState(0);
  const [carouselAvailableImages, setcarouselAvailableImages] = useState(5);
  // const [windowSize, setWindowSize] = useState(window.innerWidth);
  // const [carouselScrollLeft, setcarouselScrollLeft] = useState(0);
  // const [pageLoadCount, setpageLoadCount] = useState(0);
  const [buttonName, setbuttonName] = useState(null);
  const [runOnce, setrunOnce] = useState(true);
  //const [showVideo, setShowVideo] = useState(true);
  const [movieIndex, setmovieIndex] = useState(null);
  const [folderNames, setfolderNames] = useState(null);
  const [modalContentState, setmodalContentState] = useState(null);
  const [modalContentMovImg, setmodalContentMovImg] = useState(null);
  const [open, setOpen] = React.useState(null);
  const [openDial, setOpenDial] = useState(false);
  const [dialogZIndex, setdialogZIndex] = useState(-1300);
  const [movieURL, setmovieURL] = useState(null);

  const handleDialClickOpen = () => {
    setOpenDial(true);
  };

  const handleDialClose = () => {
    let myModal = document.getElementById("movieModal");
    if (myModal != null) myModal.style.zIndex = 1400;
    setmovieURL(null);
    // setOpenDial(false);
    setdialogZIndex(-1300);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const body = (
    // <div className="videoPlayer" id="videoPlayer">
    //   <div className="videoWrapper" id="videoWrapper">
    //     <video
    //       autoPlay="autoplay"
    //       allowFullScreen="true"
    //       width="100%"
    //       controls
    //       controlsList="nodownload"
    //       disablePictureInPicture
    //       id="videoFile"
    //       onEnded={() => playNextVideo()}
    //     >
    //       <source type="video/mp4" />
    //     </video>
    //     <IconButton className="closeButton" onClick={closeVideoPage}>
    //       <CancelIcon className="closeButtonIcon" />
    //     </IconButton>
    //   </div>
    <Dialog
      fullScreen
      open={openDial}
      onClose={handleDialClose}
      TransitionComponent={Transition}
      style={{ zIndex: dialogZIndex }}
    >
      <div className="closeButtonDiv">
        <AppBar className={classes.appBar}>
          {/* <Toolbar> */}
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleDialClose}
            className={classes.closeButton}
          >
            Close
          </Button>
          {/* <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton> */}
          {/* </Toolbar> */}
        </AppBar>
      </div>
      <div className="videoPlayer" id="videoPlayer">
        <div className="videoWrapper" id="videoWrapper">
          <video
            autoPlay="autoplay"
            allowFullScreen="true"
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
          {/* <IconButton className="closeButton" onClick={closeVideoPage}>
            <CancelIcon className="closeButtonIcon" />
          </IconButton> */}
        </div>
      </div>
    </Dialog>
    // </div>
  );

  function playNextVideo() {
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
    // if (movieIndex < allUrls.length - 1) {
    //   const movIndex = movieIndex + 1;
    //   console.log("index", movIndex);
    //   setmovieIndex(movIndex);
    //   const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${allUrls[movIndex].movieLocation}?alt=media&token=${allUrls[movIndex].movieToken}`;
    //   const videoFileName = document.getElementById("videoFile");
    //   videoFileName.src = url;
    // } else {
    //   const movIndex = 0;
    //   setmovieIndex(movIndex);
    //   const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${allUrls[movIndex].movieLocation}?alt=media&token=${allUrls[movIndex].movieToken}`;
    //   const videoFileName = document.getElementById("videoFile");
    //   videoFileName.src = url;
    // }
  }

  function clickPrevious() {
    const gap = 6;
    const carousel = document.getElementById(`carousel${props.genre}`),
      content = document.getElementById(`content${props.genre}`),
      next = document.getElementById(`next${props.genre}`),
      prev = document.getElementById(`prev${props.genre}`);
    let width = carousel.offsetWidth;
    if (carousel.scrollLeft - width - gap <= 0) {
      setbuttonName("prev1");
    } else {
      setbuttonName("prev2");
    }

    if (carousel.scrollLeft - width - gap <= 0) {
      prev.style.display = "none";
    }
    if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "flex";
    }
  }

  function clickNext() {
    const gap = 6;
    const carousel = document.getElementById(`carousel${props.genre}`),
      content = document.getElementById(`content${props.genre}`),
      next = document.getElementById(`next${props.genre}`),
      prev = document.getElementById(`prev${props.genre}`),
      imageContainer = document.getElementsByClassName(
        `imageContainers${props.genre}`
      );
    let width = carousel.offsetWidth;
    if (
      imageContainer[imageIndex + carouselAvailableImages].offsetLeft +
        carouselAvailableImages * (imageContainer[0].offsetWidth + gap) <
      content.scrollWidth
    ) {
      setbuttonName("next1");
    } else {
      setbuttonName("next2");
    }
    if (carousel.scrollWidth !== 0) {
      prev.style.display = "flex";
    }
    if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "none";
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
    // setShowVideo(false);
  }

  // function playVideo(token, location, index) {
  //   setmovieIndex(index);
  //   const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${location}?alt=media&token=${token}`;
  //   const elements = document.getElementsByClassName("flexContainer");
  //   const videodivider = document.getElementsByClassName("videoDivider");
  //   const videotitle = document.getElementsByClassName("videoTitle");
  //   const appbar = document.getElementsByClassName("MuiAppBar-root");

  //   const modalName = document.getElementById("videoPlayer");
  //   const videoFileName = document.getElementById("videoFile");
  //   videoFileName.src = url;

  //   videoFileName.style.display = "flex";
  //   modalName.style.display = "flex";
  //   for (var i = 0; i < elements.length; i++) {
  //     elements[i].style.display = "none";
  //   }
  //   for (var j = 0; j < videodivider.length; j++) {
  //     videodivider[j].style.display = "none";
  //   }
  //   for (var k = 0; k < videotitle.length; k++) {
  //     videotitle[k].style.display = "none";
  //   }
  //   for (var m = 0; m < appbar.length; m++) {
  //     appbar[m].style.display = "none";
  //   }
  // }

  function playVideo(token, location) {
    const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${location.replace(
      /\//g,
      "%2F"
    )}.mp4?alt=media&token=${token}`;
    setmovieURL(url);
    // const elements = document.getElementsByClassName("flexContainer");
    // const videodivider = document.getElementsByClassName("videoDivider");
    // const videotitle = document.getElementsByClassName("videoTitle");
    // const appbar = document.getElementsByClassName("MuiAppBar-root");

    // const modalName = document.getElementById("videoPlayer");
    // const videoFileName = document.getElementById("videoFile");
    // videoFileName.src = url;
    let myModal = document.getElementById("movieModal");
    myModal.style.zIndex = 1200;
    // setOpenDial(true);
    setdialogZIndex(1300);

    // videoFileName.style.display = "flex";
    // modalName.style.display = "flex";
    // for (var i = 0; i < elements.length; i++) {
    //   elements[i].style.display = "none";
    // }
    // for (var j = 0; j < videodivider.length; j++) {
    //   videodivider[j].style.display = "none";
    // }
    // for (var k = 0; k < videotitle.length; k++) {
    //   videotitle[k].style.display = "none";
    // }
    // for (var m = 0; m < appbar.length; m++) {
    //   appbar[m].style.display = "none";
    // }
  }

  function onClickImages(genreCat) {
    if (modalContentState != null) {
      let outputArr = [];
      modalContentState.forEach((value, key) => {
        if (key.split("/")[key.split("/").length - 2] == genreCat) {
          outputArr.push(
            <div className={classes.videoImagesContainer}>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${key.replace(
                  /\//g,
                  "%2F"
                )}.jpg?alt=media&token=${value.imageToken}`}
                className={classes.imgOfMovies}
              ></img>

              <IconButton className="playButtons">
                <PlayCircleFilledIcon
                  fontSize="large"
                  onClick={() => playVideo(value.movieToken, key)}
                />
              </IconButton>
            </div>
          );
        }
      });
      setmodalContentMovImg(outputArr);
    }
  }

  //useeffects
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
      // document.body.style.overflow = "hidden";
    }
  }, [modalContentMovImg]);

  useEffect(() => {
    if (buttonName === "prev1") {
      setimageIndex(0);
    } else if (buttonName === "prev2") {
      setimageIndex(imageIndex - carouselAvailableImages);
    } else if (buttonName === "next1") {
      setimageIndex(imageIndex + carouselAvailableImages);
    } else if (buttonName === "next2") {
      const imageContainer = document.getElementsByClassName(
        `imageContainers${props.genre}`
      );
      setimageIndex(imageContainer.length - carouselAvailableImages);
    }
  }, [buttonName]);

  useEffect(() => {
    let gap = 6;
    let width = null;
    const carousel = document.getElementById(`carousel${props.genre}`);
    if (carousel) {
      width = carousel.offsetWidth;
      if (buttonName === "prev1" || buttonName === "prev2") {
        carousel.scrollBy(-(width + gap), 0);
      } else if (buttonName === "next1" || buttonName === "next2") {
        carousel.scrollBy(width + gap, 0);
      }
    }
  }, [imageIndex]);

  useEffect(() => {
    function handleResize() {
      const carousel = document.getElementById(`carousel${props.genre}`);
      const imageContainer = document.getElementsByClassName(
        `imageContainers${props.genre}`
      );
      if (carousel) {
        carousel.scrollLeft = imageContainer[imageIndex].offsetLeft;
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const gap = 6;
    const carousel = document.getElementById(`carousel${props.genre}`),
      content = document.getElementById(`content${props.genre}`),
      next = document.getElementById(`next${props.genre}`),
      prev = document.getElementById(`prev${props.genre}`),
      imageContainer = document.getElementsByClassName(
        `imageContainers${props.genre}`
      );

    if (carousel && runOnce) {
      let width = carousel.offsetWidth;
      setrunOnce(false);
      if (content.scrollWidth - width - gap <= carousel.scrollLeft) {
        next.style.display = "none";
      } else {
        next.style.display = "flex";
      }
      if (carousel.scrollLeft <= 0) {
        prev.style.display = "none";
      } else {
        prev.style.display = "flex";
      }
    }
  });

  // useEffect(() => {
  //   if (localStorage.getItem(props.genre)) {
  //     console.log(
  //       "Information data:",
  //       JSON.parse(localStorage.getItem(props.genre))
  //     );
  //     setallUrls(JSON.parse(localStorage.getItem(props.genre)));
  //   } else {
  //     axios
  //       .get(`/getInfo/${props.genre}`)
  //       .then((res) => {
  //         return res.data;
  //       })
  //       .then((obj) => {
  //         axios.post(`/getInfoTest`, obj).then((info) => {
  //           console.log("Information data before caching:", info.data);
  //           setallUrls(info.data);
  //           localStorage.setItem(props.genre, JSON.stringify(info.data));
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [props.genre]);

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
          // console.log("path encode:", items.path.replace(/\//g, "%2F"));
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
      setmodalContentState(map);
    }
  }, [props.obj]);

  // const modalContentArr=[];
  // const modalContentMovImgElements = modalContentMovImg ? (
  //   <div>
  //     {modalContentMovImg.map((items) => (
  //       <div>{items}</div>
  //     ))}
  //   </div>
  // ) : (
  //   <div></div>
  // );

  // const handleOpen = (genreCat) => {
  // console.log("Genre Name:", genreCat);
  // onClickImages(genreCat);
  // };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = null;
    // document.body.style.overflow = "visible";
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
          <div className={classes.modalContentHeader}>
            <div className={classes.fadeHeader}></div>
          </div>
          <GridList className={classes.gridList} cols={4}>
            {/* <div className={classes.modalContainingImgMovies}> */}
            {modalContentMovImg.map((items, key) => (
              <GridListTile key={key}>{items}</GridListTile>
            ))}
            {/* </div> */}
          </GridList>
        </div>
      </Fade>
    </Modal>
  ) : (
    <div></div>
  );

  const testFolderNames = folderNames ? (
    //testing
    <div className="flexContainer">
      <div id={`wrapper${props.genre}`} className="wrapper">
        <div id={`carousel${props.genre}`} className="carousel">
          <div id={`content${props.genre}`} className="content">
            {folderNames.map((names, ind) => (
              <div
                id="imageContainers"
                className={`imageContainers${props.genre}`}
              >
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
        </div>
        <IconButton
          className="prevButton"
          id={`prev${props.genre}`}
          onClick={clickPrevious}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          className="nextButton"
          id={`next${props.genre}`}
          onClick={clickNext}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );

  const testGeturl = allUrls ? (
    <div className="flexContainer">
      <div id={`wrapper${props.genre}`} className="wrapper">
        <div id={`carousel${props.genre}`} className="carousel">
          <div id={`content${props.genre}`} className="content">
            {allUrls.map((val, ind) => (
              <div
                id="imageContainers"
                className={`imageContainers${props.genre}`}
              >
                <Card className="carousel-items">
                  <CardMedia
                    className={classes.media}
                    image={`https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${val.imageLocation}?alt=media&token=${val.imageToken}`}
                    title="Movie Title"
                  />
                  <CardContent className={classes.texts}>
                    <Typography gutterBottom variant="h7" component="h4">
                      {val.movieName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {val.movieDesc}
                    </Typography>
                  </CardContent>
                  {/* </CardActionArea> */}
                </Card>
                <IconButton className="playButtons">
                  <PlayCircleFilledIcon
                    fontSize="large"
                    onClick={() =>
                      playVideo(val.movieToken, val.movieLocation, ind, allUrls)
                    }
                  />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <IconButton
          className="prevButton"
          id={`prev${props.genre}`}
          onClick={clickPrevious}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          className="nextButton"
          id={`next${props.genre}`}
          onClick={clickNext}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <Skeleton variant="rect" width={300} height={200} />
  );

  return (
    <div className="container">
      <Typography variant="h5" component="h3" className="videoTitle">
        {props.genre}
      </Typography>
      {/* <Divider className="videoDivider" /> */}
      {/* {testGeturl} */}
      {/* {body} */}
      {/* {testFolderNames} */}

      {testFolderNames}
      {modalValues}
      {body}
    </div>
  );
}

export default VideoSlider;
