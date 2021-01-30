import React, {useState} from 'react';
import ImgGrid from "../component/photo_coms/folders/imgGrid"
import Modal from "../component/photo_coms/folders/modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";


function My_moments() {
 
  const [selectedImg, setselectedImg] = useState();
 
  return (
    <div>
<div className="welcome">
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Photos</Typography>
          <Box mt={5}>
            <Typography variant="h5">Let's go back to this moment and live it in forever</Typography>
            <Typography variant="h5">Take me away to better days</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
      <Typography
          variant="h4"
          style={{ color: "white", paddingLeft: "4rem" }}
        >
          {" "}
          My Moments {" "}
        </Typography>
        
    <div className="PhotoApp">
      <ImgGrid setselectedImg={setselectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
    </div>
    </div>
  );
}

export default My_moments;
