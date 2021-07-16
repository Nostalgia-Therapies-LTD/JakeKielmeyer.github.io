import React, { useEffect } from "react";
// import pupper from "../images/Pupper.jpg";
import ContentRow from "../component/ContentRow";

//dummy backend service
import radioImage from "../services/imageService";
import { momentImage } from "../services/imageService";
import { tvImage } from "../services/imageService";
//import { puzzleImage } from "../services/imageService";

//mui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import { db } from "../config";

const styles = {
  welcome: {
    minHeight: "800px",
    // color: "white",
    // display: "flex",
    // paddingLeft: "4rem",
    // minHeight: "600px",
    // backgroundSize: "cover",
    // backgroundImage: `url(${pupper})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundAttachment: "fixed",
  },

  contents: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "white",
    paddingLeft: "3rem",
    paddingBottom: "5rem",
  },

  rowsTitle: {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    justifyContent: "space-around",
  },
};

const Home = (props) => {
  const { classes } = props;
  const userID = localStorage.getItem("norman");

  // useEffect(() => {
  //   if (userID) db.collection("customers").doc(userID).set({ Home: true });
  // }, []);

  return (
    <React.Fragment>
      <a href="photo/Dogs">
        <div
          className="welcome"
          style={{
            backgroundImage:
              'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fdogs%2Fryan-walton-pWBAwqUUWkk-unsplash.jpg?alt=media&token=82738075-659f-4a3b-b7bc-f1d115497ec0")',
          }}
        >
          <CssBaseLine />
          <Box mt={9}>
            <Typography variant="h3">Dashing Dogs</Typography>
            <Box mt={5}>
              <Typography variant="h4">
                Do you and your loved one have a soft spot for dogs?
              </Typography>
              <Typography variant="h4">
                Check out out this new Nostalgic Moments album
              </Typography>
              <Typography variant="h4">
                and reminsice about four legged friends!
              </Typography>
            </Box>
          </Box>
        </div>
      </a>

      <div className={classes.contents}>
        <Grid item xs={11} className={classes.rowsTitle}>
          <Typography variant="h4" style={{ marginTop: "2.5%" }}>
            Nostalgic Moments
          </Typography>
        </Grid>
        <ContentRow rowName="Nostalgic Moments" images={momentImage} />

        <Grid item xs={11} className={classes.rowsTitle}>
          <Typography variant="h4">Nostalgia Radio</Typography>
        </Grid>
        <ContentRow rowName="Nostalgia Radio" images={radioImage} />

        <Grid item xs={11} className={classes.rowsTitle}>
          <Typography variant="h4">Nostalgia TV</Typography>
        </Grid>
        <ContentRow rowName="Nostalgia TV" images={tvImage} />

        {/* <Grid item xs={11} className={classes.rowsTitle}>
          <Typography variant="h4">Nostalgia Puzzles</Typography>
        </Grid>
        <ContentRow rowName="Puzzles" images={puzzleImage} /> */}
      </div>
      {/* <ContentRow rowName="Nostalgia Radio" images={radioImage} />
      <ContentRow rowName="Nostalgia Moments" images={momentImage} />
      <ContentRow rowName="Nostalgia TV" images={tvImage} />
      <ContentRow rowName="Puzzles" images={puzzleImage} /> */}
      {/* <Subscription /> */}
    </React.Fragment>
  );
};

export default withStyles(styles)(Home);
