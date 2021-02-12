import React, { useState } from "react";
import ImgGrid1 from "../component/photo_coms/folders/imgGrid1";
import Upload from "../component/photo_coms/folders/Upload";
import Modal1 from "../component/photo_coms/folders/modal1";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
//jwt
import jwtDecode from "jwt-decode";

function My_moments() {
  const [selectedImg, setselectedImg] = useState();

  return (
    <div>
      <div className="welcome">
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Photos</Typography>
          <Box mt={5}>
            <Typography variant="h5">
              Let's go back to this moment and live it in forever
            </Typography>
            <Typography variant="h5">Take me away to better days</Typography>
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
            <ImgGrid1
              setselectedImg={setselectedImg}
              props={`users/${
                jwtDecode(localStorage.FBIdToken).user_id
              }/images`}
            />
          )}
          
          {selectedImg && (
            <Modal1
              selectedImg={selectedImg}
              setselectedImg={setselectedImg}
              props={`users/${
                jwtDecode(localStorage.FBIdToken).user_id
              }/images`}
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default My_moments;
