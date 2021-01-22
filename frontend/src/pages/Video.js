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
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
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
});

function Video() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.welcome}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Video Page</Typography>
        </Box>
      </div>
      <div className={classes.contents}>
        <ContentRow rowName="Bonanza" images={radioImage} />
        <ContentRow rowName="Historical Moments" images={momentImage} />
        <ContentRow rowName="Commercials" images={tvImage} />
      </div>
    </React.Fragment>
  );
  //   const testGettingURLs = () => {
  //     let genre = "horror";
  //     let st = Firebase.storage();
  //     var url = null;
  //     var allurl = [];
  //     axios
  //       .get(`/getInfo/${genre}`)
  //       .then((res) => {
  //         return res.data;
  //       })
  //       .then((val) => {
  //         val.map((dat) => {
  //           st.refFromURL(dat.imageurl)
  //             .getDownloadURL()
  //             .then((urll) => {
  //               return urll;
  //             })
  //             .then((rest) => {
  //               st.refFromURL(dat.movieurl)
  //                 .getDownloadURL()
  //                 .then((url) => {
  //                   let obj = { imageurll: rest, movieurll: url };
  //                   // allUrl.push(obj);
  //                   if (this.state.allUrls) allurl = this.state.allUrls;
  //                   allurl.push(obj);
  //                   //add allurl to allUrls
  //                   this.setState({ allUrls: allurl }, () => {
  //                     console.log("test:", this.state.allUrls);
  //                   });
  //                 });
  //             });
  //         });
  //       })
  //       // .then(() => {
  //       //   callback();
  //       // })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     // return allurl;
  //   };
}

export default Video;
