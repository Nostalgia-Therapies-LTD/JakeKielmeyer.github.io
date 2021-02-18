import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal from './modal';
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
          <Typography variant="h3">Cute Cats</Typography>
          <Box mt={5}>
            <Typography variant="h4">If you love cats, then this is the album for you!</Typography>
            <Typography variant="h4">Enjoy and reminisce to dozens of of adorable cats</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Cute Cats {" "}
     </Typography>
    <div className="PhotoApp">
      <ImgGrid1 props="cats" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal props="cats" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
    </div>
    </div>
  );
}

export default Cat_folder;
