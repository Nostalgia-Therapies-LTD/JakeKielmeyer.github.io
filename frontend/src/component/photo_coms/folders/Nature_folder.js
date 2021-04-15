import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal from './modal';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";

function Nature_folder() {
    const [selectedImg, setselectedImg] = useState();
    const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="welcome" style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fnature%2Fneven-krcmarek-3ym-ev0Pe58-unsplash.jpg?alt=media&token=8b074837-d184-49a0-b133-c8a617b7f2f0)"}}>
        <CssBaseLine />
        <Box mt={9}>
          <Typography variant="h3">Mother Nature</Typography>
          <Box mt={5}>
            <Typography variant="h4">Enjoy and reminsice to beautiful</Typography>
            <Typography variant="h4">pictures of the great outdoors</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Mother Nature {" "}
     </Typography>
    <div className="PhotoApp">
      <ImgGrid1 props="nature" setselectedImg={setselectedImg} setModalOpen={setModalOpen} />
      {selectedImg  && <Modal props="nature" selectedImg={selectedImg} setselectedImg={setselectedImg}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}/>}
    </div>
    </div>
    </div>
  );
}

export default Nature_folder;
