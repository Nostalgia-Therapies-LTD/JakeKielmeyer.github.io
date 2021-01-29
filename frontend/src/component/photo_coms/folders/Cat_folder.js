import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";




function Cat_folder() {
    const [selectedImg, setselectedImg] = useState();
      
  return (
    <div>
      <div className="welcome" style={{backgroundImage:'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fcats%2Fisabela-ferreira-MQMVPYh3bhk-unsplash.jpg?alt=media&token=a0d4619e-6b3c-40d1-a24a-494df5d6c565")'}}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h4">Photos</Typography>
          <Box mt={5}>
            <Typography variant="h5">Let's go back to this moment and live it in forever</Typography>
            <Typography variant="h5">Take me away to better days</Typography>
          </Box>
        </Box>
      </div>
      <div className="content">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Cute Cats {" "}
     </Typography>
    <div className="App">
      <ImgGrid1 props="cats" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="cats" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
    </div>
    </div>
  );
}

export default Cat_folder;