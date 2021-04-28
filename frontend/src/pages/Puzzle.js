// import React, { useState } from "react";
// import images from "../component/imageService";
// import pupper from "../images/Pupper.jpg";

// //components
// import PuzzleCard from "../component/PuzzleCard";
// import PuzzlePlay from "../component/PuzzlePlay";

// //mui stuff
// import withStyles from "@material-ui/core/styles/withStyles";
// import Typography from "@material-ui/core/Typography";
// import GridList from "@material-ui/core/GridList";
// import Box from "@material-ui/core/Box";
// import CssBaseLine from "@material-ui/core/CssBaseline";

// const styles = () => ({
//   welcome: {
//     color: "white",
//     display: "flex",
//     paddingLeft: "4rem",
//     minHeight: "600px",
//     backgroundSize: "cover",
//     backgroundImage: `url(${pupper})`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     backgroundAttachment: "fixed",
//   },

//   content: {
//     marginBottom: "100px",
//     padding: "80px 0px 200px 0px",
//     backgroundColor: "rgba(0, 0, 0, 0.9)",
//     minHeight: "800px",
//   },

//   slider: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     margin: "60px 40px 200px 0px",
//   },

//   gridList: {
//     flexWrap: "nowrap",
//     transform: "translateZ(0)",

//     "&::-webkit-scrollbar": {
//       width: "2px",
//     },
//   },
// });

// const Slide = (props) => {
//   const { classes } = props;
//   const [modalOpen, setModalOpen] = useState(false);
//   const [puzzlePiecesState, setPuzzlePiecesState] = useState({
//     pieces: [],
//     background: "",
//   });

//   const splitter = (imageId, tileNumber) => {
//     const canvas = document.getElementById("canvas");
//     const image = document.getElementById(imageId);
//     const tilePieceSide = image.naturalWidth / tileNumber;

//     // 98px for 4x4 puzzle, 48px for 8x8 puzzle
//     const puzzlePieceSide =
//       tileNumber === 4 ? "98" : tileNumber === 3 ? "131" : "48";
//     canvas.width = puzzlePieceSide;
//     canvas.height = puzzlePieceSide;

//     const pieces = [];
//     let background = " ";

//     const context = canvas.getContext("2d");

//     //creating the puzzle tiles
//     for (let j = 0; j < tileNumber; j++) {
//       for (let i = 0; i < tileNumber; i++) {
//         //clearing any previous draw in canvas
//         context.clearRect(0, 0, puzzlePieceSide, puzzlePieceSide);

//         //drawing the puzzle tile in the canvas
//         context.drawImage(
//           image,
//           i * tilePieceSide,
//           j * tilePieceSide,
//           tilePieceSide,
//           tilePieceSide,
//           0,
//           0,
//           puzzlePieceSide,
//           puzzlePieceSide
//         );
//         //storing the tile piece to pieces array
//         pieces.push(canvas.toDataURL());
//       }
//     }

//     //creating the background for the solve board in puzzle
//     canvas.width = "400";
//     canvas.height = "400";

//     const anotherContext = canvas.getContext("2d");

//     //setting transperency for the background picture
//     anotherContext.globalAlpha = 0.4;

//     //drawing the background
//     anotherContext.drawImage(
//       image,
//       0,
//       0,
//       image.naturalWidth,
//       image.naturalHeight,
//       0,
//       0,
//       400,
//       400
//     );

//     //storing the background photo
//     background = canvas.toDataURL();
//     setPuzzlePiecesState({ pieces, background });
//     setModalOpen(true);

//     //scrolling to the puzzle board
//     window.location.href = "#puzzleBoard";
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       {/* Top Banner with welcome note */}
//       <div
//         className="welcome"
//         style={{
//           backgroundImage:
//             'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/puzzles%2Fimage_2021-02-12_154657.png?alt=media&token=c017b480-a750-49d7-af7b-45662feb8701")',
//         }}
//       >
//         <CssBaseLine />
//         <Box mt={9}>
//           <Typography variant="h3">Tucker the Dog</Typography>
//           <Box mt={5}>
//             <Typography variant="h4">
//               Try our newest puzzle, Tucker the dog!
//             </Typography>
//           </Box>
//         </Box>
//       </div>

//       {/* Section with puzzle photo selection contents */}
//       <div className={classes.content}>
//         <Typography
//           variant="h4"
//           style={{ color: "white", paddingLeft: "4rem" }}
//         >
//           {" "}
//           Animals{" "}
//         </Typography>

//         {/* horizontal scrolling slider with photos */}
//         <div className={classes.slider}>
//           <GridList className={classes.gridList} cols={2.5}>
//             {images.map((image) => {
//               return (
//                 <PuzzleCard
//                   key={image.id}
//                   src={image.src}
//                   id={image.id}
//                   handleClick={splitter}
//                 />
//               );
//             })}
//           </GridList>

//           {/* hidden canvas to create the puzzle */}
//           <canvas id="canvas" style={{ display: "none" }}></canvas>
//         </div>

//         {/* puzzle solve board rendering from this component */}
//         <PuzzlePlay
//           puzzlePiecesProps={puzzlePiecesState}
//           modalOpen={modalOpen}
//           handleClose={handleModalClose}
//         />
//       </div>
//     </>
//   );
// };

// export default withStyles(styles)(Slide);
