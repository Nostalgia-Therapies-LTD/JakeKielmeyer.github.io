import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal from './modal';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";




function Places_folder() {
    const [selectedImg, setselectedImg] = useState();
      
  return (
    <div>
      <div className="welcome" style={{backgroundImage:'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fplaces%2Fshan-elahi-DDiLYt_F88w-unsplash.jpg617?alt=media&token=91a772d8-9644-4c6b-9e5f-0c6e9e230875")'}}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Famous Places</Typography>
          <Box mt={5}>
            <Typography variant="h4">Enjoy and reminsice to some of the most</Typography>
            <Typography variant="h4">iconic places in the world</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Famous Places {" "}
     </Typography>
    <div className="PhotoApp">
      <ImgGrid1 props="places" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal props="places" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
    </div>
    </div>
  );
}

export default Places_folder;
