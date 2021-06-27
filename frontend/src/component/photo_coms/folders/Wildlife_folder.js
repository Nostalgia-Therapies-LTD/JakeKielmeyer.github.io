import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal from './modal';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";




function Wildlife_folder() {
    const [selectedImg, setselectedImg] = useState();
    const [modalOpen, setModalOpen] = useState(false); 
  return (
    <div>
      {/* <div className="welcome" style={{backgroundImage:'url("https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fwildlife%2Figor-talanov-SeVOHQ4FQYQ-unsplash.jpg305?alt=media&token=21f9cb30-173e-4ac0-9846-ebe5896a4146")'}}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Wonderful Wildlife</Typography>
          <Box mt={5}>
            <Typography variant="h4">If you love seeing animals in their</Typography>
            <Typography variant="h4">natural habbitat, this is the album for you</Typography>
          </Box>
        </Box>
      </div> */}
      <div className="Photocontent">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Wonderful Wildlife {" "}
     </Typography>
    <div className="PhotoApp">
      <ImgGrid1 props="wildlife" setselectedImg={setselectedImg}  setModalOpen={setModalOpen}/>
      {selectedImg  && <Modal props="wildlife" selectedImg={selectedImg} setselectedImg={setselectedImg}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}/>}
    </div>
    </div>
    </div>
  );
}

export default Wildlife_folder;
