import React from "react";

//mui
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  slideImage: {
    width: "20rem !important",
    border: "10px solid #a1e4ff",
    borderRadius: "5px",
  },

  slideImageFocus: {
    width: "20rem !important",
    outline: "none",
    position: "relative",
    marginRight: "5em",
  },
  slideImageAction: {
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "10px",
  },
});

const PuzzleCard = (props) => {
  const { classes, src, id, handleClick } = props;

  return (
    <div className={classes.slideImageFocus}>
      <img src={src} id={id} className={classes.slideImage} alt={id} />
      <Box ml={9}>
        <div className={classes.slideImageAction}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: "5px" }}
            onClick={() => handleClick(id, 3)}
          >
            3 X 3
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
            onClick={() => handleClick(id, 4)}
          >
            4 x 4
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "5px" }}
            onClick={() => handleClick(id, 8)}
          >
            8 x 8
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default withStyles(styles)(PuzzleCard);
