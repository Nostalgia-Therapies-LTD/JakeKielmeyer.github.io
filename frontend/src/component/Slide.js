import React, { useState } from "react";
import images from "./imageService";
import pupper from "../images/Pupper.jpg";

//components
import PuzzleCard from "../component/PuzzleCard";
import Puzzle from "../pages/Puzzle";

//mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";

const styles = () => ({
  welcome: {
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

  content: {
    marginBottom: "100px",
    padding: "80px 0px 200px 0px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    minHeight: "800px",
  },

  slider: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: "60px 40px 200px 0px",
  },

  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",

    "&::-webkit-scrollbar": {
      width: "2px",
    },
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
    <>
      <div className={classes.welcome}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Puzzle</Typography>
          <Box mt={5}>
            <Typography variant="h5">Puppies and more in this</Typography>
            <Typography variant="h5">new Nostalgic Moments album</Typography>
          </Box>
        </Box>
      </div>
      <div className={classes.content}>
        <Typography
          variant="h4"
          style={{ color: "white", paddingLeft: "4rem" }}
        >
          {" "}
          Animals{" "}
        </Typography>
        <div className={classes.slider}>
          <GridList className={classes.gridList} cols={2.5}>
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
          </GridList>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
        </div>

        <Puzzle puzzlePiecesProps={puzzlePiecesState} />
      </div>
    </>
  );
}

export default withStyles(styles)(Slide);
