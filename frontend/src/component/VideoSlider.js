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

  divider: {
    backgroundColor: "white",
    marginBottom: "1rem",
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

  const body = (
    <div className="videoPlayer">
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
    const modalName = document.getElementById("myModal");
    const videoFile = document.getElementById("videoFile");
    videoFile.pause();
    modalName.style.display = "none";
  }

  function playVideo(name, token, location) {
    const url = `https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/${location}%2F${name}?alt=media&token=${token}`;
    const modalName = document.getElementById("myModal");
    const videoFileName = document.getElementById("videoFile");
    videoFileName.src = url;
    videoFileName.style.display = "block";
    modalName.style.display = "block";
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
      console.log("Length:", imageContainer.length);
      console.log("available images:", carouselAvailableImages);
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
        console.log("img1:", imageIndex);
        carousel.scrollBy(-(width + gap), 0);
      } else if (buttonName == "next1" || buttonName == "next2") {
        console.log("img2:", imageIndex);
        carousel.scrollBy(width + gap, 0);
      }
    }
  }, [imageIndex]);

  useEffect(() => {
    function handleResize() {
      console.log("image index1:", imageIndex);
      const carousel = document.getElementById(`carousel${props.genre}`);
      const imageContainer = document.getElementsByClassName(
        `imageContainers${props.genre}`
      );
      if (carousel) {
        console.log("image index:", imageIndex);
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
        console.log("width me:", width);
        console.log("width scroll:", content.scrollWidth);
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
    // let genre = "horror";
    axios
      .get(`/getInfo/${props.genre}`)
      .then((res) => {
        return res.data;
      })
      .then((obj) => {
        axios.post(`/getInfoTest`, obj).then((info) => {
          console.log("Hello everyone!", info.data);
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
    // <Grid>
    <div className="container">
      <Typography variant="h4" component="h2">
        {props.genre}
      </Typography>
      <Divider className={classes.divider} />
      {testGeturl}
      <div className="modal" id="myModal">
        <div className="modal-body">{body}</div>
      </div>
      {/* <Grid item xs={11} className={classes.rowsTitle}>
        <Typography variant="h5">{props.rowName}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.rowsTitle}>
        <Typography variant="body1">view more</Typography>
      </Grid> */}
      {/* {props.images.map((image) => (
        <Grid key={image.title} item xs={3}>
          <a href="#">
            <img src={image.url} alt={image.title} className={classes.image} />
          </a>
        </Grid>
      ))} */}
    </div>
    // </Grid>
  );
}

export default VideoSlider;
