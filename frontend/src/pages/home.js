import React from "react";
import pupper from "../images/Pupper.jpg";
import ContentRow from "../component/ContentRow";

//dummy backend service
import radioImage from "../services/imageService";
import { momentImage } from "../services/imageService";
import { tvImage } from "../services/imageService";
import { puzzleImage } from "../services/imageService";

//mui stuff
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
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

  contents: {
    color: "white",
    minHeight: "800px",
    paddingLeft: "4rem",
    paddingTop: "3rem",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  rows: {
    paddingBottom: "50px",
  },

  rowsTitle: {
    paddingBottom: "40px",
    justifyContent: "space-around",
  },
};

const Home = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.welcome}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Baby Animals</Typography>
          <Box mt={5}>
            <Typography variant="h5">Puppies and more in this</Typography>
            <Typography variant="h5">new Nostalgic Moments album</Typography>
          </Box>
        </Box>
      </div>
      <div className={classes.contents}>
        <ContentRow rowName="Nostalgia Radio" images={radioImage} />
        <ContentRow rowName="Nostalgia Moments" images={momentImage} />
        <ContentRow rowName="Nostalgia TV" images={tvImage} />
        <ContentRow rowName="Puzzles" images={puzzleImage} />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Home);
