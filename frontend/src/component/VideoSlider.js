import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
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
});

function VideoSlider(props) {
  const classes = useStyles();

  const [allUrls, setallUrls] = useState(null);
  const [imageIndex, setimageIndex] = useState(0);
  const [carouselAvailableImages, setcarouselAvailableImages] = useState(5);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [carouselScrollLeft, setcarouselScrollLeft] = useState(0);
  const [pageLoadCount, setpageLoadCount] = useState(0);
  const [buttonName, setbuttonName] = useState(null);
  const [runOnce, setrunOnce] = useState(true);
  const [showVideo, setShowVideo] = useState(true);

  const body = (
    <div className="videoPlayer" id="videoPlayer">
      <video
        autoplay="autoplay"
        allowfullscreen="true"
        width="100%"
        controls
        controlsList="nodownload"
        disablePictureInPicture
        id="videoFile"
      >
        <source type="video/mp4" />
      </video>
      <IconButton className="closeButton" onClick={closeVideoPage}>
        <CancelIcon fontSize="large" />
      </IconButton>
    </div>
  );

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

  function playVideo(name, token, location) {
    const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${location}%2F${name}?alt=media&token=${token}`;
    const elements = document.getElementsByClassName("flexContainer");
    const videodivider = document.getElementsByClassName("videoDivider");
    const videotitle = document.getElementsByClassName("videoTitle");
    const appbar = document.getElementsByClassName("MuiAppBar-root");

    const modalName = document.getElementById("videoPlayer");
    const videoFileName = document.getElementById("videoFile");
    videoFileName.src = url;

    videoFileName.style.display = "flex";
    modalName.style.display = "block";
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    for (var j = 0; j < videodivider.length; j++) {
      videodivider[j].style.display = "none";
    }
    for (var k = 0; k < videotitle.length; k++) {
      videotitle[k].style.display = "none";
    }
    for (var m = 0; m < appbar.length; m++) {
      appbar[m].style.display = "none";
    }
  }

  useEffect(() => {
    if (buttonName == "prev1") {
      setimageIndex(0);
    } else if (buttonName == "prev2") {
      setimageIndex(imageIndex - carouselAvailableImages);
    } else if (buttonName == "next1") {
      setimageIndex(imageIndex + carouselAvailableImages);
    } else if (buttonName == "next2") {
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
      if (buttonName == "prev1" || buttonName == "prev2") {
        carousel.scrollBy(-(width + gap), 0);
      } else if (buttonName == "next1" || buttonName == "next2") {
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

  useEffect(() => {
    axios
      .get(`/getInfo/${props.genre}`)
      .then((res) => {
        return res.data;
      })
      .then((obj) => {
        axios.post(`/getInfoTest`, obj).then((info) => {
          setallUrls(info.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.genre]);

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
                <div
                  className="carousel-items"
                  id={`videoImageId${props.genre}`}
                  style={{
                    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/movieImages%2F${val.imageName}?alt=media&token=${val.imageToken})`,
                  }}
                ></div>
                <IconButton className="playButtons">
                  <PlayCircleFilledIcon
                    fontSize="large"
                    onClick={() =>
                      playVideo(
                        val.movieName,
                        val.movieToken,
                        val.movieLocation
                      )
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
      <Typography variant="h4" component="h2" className="videoTitle">
        {props.genre}
      </Typography>
      <Divider className="videoDivider" />
      {testGeturl}
      {body}
    </div>
  );
}

export default VideoSlider;
