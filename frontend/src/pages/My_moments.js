import React, { useState } from "react";
import ImgGrid from "../component/photo_coms/folders/imgGrid";
import Upload from "../component/photo_coms/folders/Upload";
import Modal1 from "../component/photo_coms/folders/modal1";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
//jwt
//import jwtDecode from "jwt-decode";
import firebase from "firebase/app";

function My_moments() {
  const [selectedImg, setselectedImg] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [uid,setUid]=useState(null)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid)
    } 
  });
 // console.log(uid);
 //console.log(modalOpen)
  return (
    <div>
      <div className="welcome">
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">My Moments</Typography>
          <Box mt={5}>
            <Typography variant="h4">
              This is a personal album for you and your loved one.</Typography>
            <Typography variant="h4">Add pictures of precious moments, family,</Typography>
            <Typography variant="h4">friends, and anything else you want.</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
        <Typography
          variant="h4"
          style={{ color: "white", paddingLeft: "4rem" }}
        >
          My Moments
        </Typography>
        <div className="PhotoApp">
          <div className="img-grid">
            <div></div>
            <div className="img-wrap">
              <Upload />
              <p className="upload">Upload</p>
            </div>
</div>
          {localStorage.FBIdToken && (
            <ImgGrid
              setselectedImg={setselectedImg}
              setModalOpen={setModalOpen}
              props={`users/${
                uid
              }/images`}
            />
          )}
          
          {selectedImg && (
            <Modal1
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              selectedImg={selectedImg}
              setselectedImg={setselectedImg}
              props={`users/${uid}/images`}
            />
          )}
          
        </div>
      </div>
    </div>
  
  );
}

export default My_moments;
