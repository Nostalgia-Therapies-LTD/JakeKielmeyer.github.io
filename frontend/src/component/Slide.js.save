import React, { useState } from "react";
import images from "./imageService";

//components
import PuzzleCard from "../component/PuzzleCard";
import Puzzle from "../pages/Puzzle";

//react-slick-carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./sliderSettings";

//mui stuff
import { withStyles } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  slider: {
    padding: "10px",
    marginTop: "80px",
    marginBottom: "100px",
  },
});

function Slide(props) {
  const { classes } = props;
  const [puzzlePiecesState, setPuzzlePiecesState] = useState({
    pieces: [],
    background: "",
  });

  const splitter = (imageId, tileNumber) => {
    const canvas = document.getElementById("canvas");
    const image = document.getElementById(imageId);
    const tilePieceSide = image.naturalWidth / tileNumber;
    const puzzlePieceSide = tileNumber === 4 ? "98" : "48";
    canvas.width = puzzlePieceSide;
    canvas.height = puzzlePieceSide;

    const pieces = [];
    let background = " ";

    const context = canvas.getContext("2d");
    for (let j = 0; j < tileNumber; j++) {
      for (let i = 0; i < tileNumber; i++) {
        context.clearRect(0, 0, puzzlePieceSide, puzzlePieceSide);

        // context.drawImage(
        //   img,
        //   sourceX, sourceY, sourceWidth, sourceHeight,
        //   destinationX, destinationY, destinationWidth, destinationHeight
        // );

        context.drawImage(
          image,
          i * tilePieceSide,
          j * tilePieceSide,
          tilePieceSide,
          tilePieceSide,
          0,
          0,
          puzzlePieceSide,
          puzzlePieceSide
        );
        pieces.push(canvas.toDataURL());
      }
    }

    context.clearRect(0, 0, puzzlePieceSide, puzzlePieceSide);

    canvas.width = "400";
    canvas.height = "400";
    const anotherContext = canvas.getContext("2d");
    anotherContext.globalAlpha = 0.4;
    anotherContext.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      400,
      400
    );

    background = canvas.toDataURL();

    setPuzzlePiecesState({ pieces, background });
  };

  return (
    <div style={{ marginBottom: "100px", textAlign: "center" }}>
      <Typography variant="h2" color="primary">
        {" "}
        Puzzle
      </Typography>
      <div className={classes.slider}>
        <Slider {...settings}>
          {images.map((image) => {
            return (
              <PuzzleCard
                key={image.id}
                src={image.src}
                id={image.id}
                handleClick={splitter}
              />
            );
          })}
        </Slider>
        <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>

      <Puzzle puzzlePiecesProps={puzzlePiecesState} />
    </div>
  );
}

export default withStyles(styles)(Slide);
