import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";
function Dog_folder() {
    const [selectedImg, setselectedImg] = useState();
 
  return (
    <div>
       <div className="welcome"style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/nostalgiadev-1f319.appspot.com/o/photofolders%2Fdogs%2Fdaniel-lincoln-u4SKJ1WN9AE-unsplash.jpg?alt=media&token=66231e5a-8361-465f-be32-8615d31b52e7)"}}>
        <CssBaseLine />
        <Box mt={9}>
        <Typography variant="h3">Dashing Dogs</Typography>
          <Box mt={5}>
            <Typography variant="h4">Do you and your loved one have a soft spot for dogs?</Typography>
            <Typography variant="h4">Check out out this new Nostalgic Moments album</Typography>
            <Typography variant="h4">and reminsice about four legged friends</Typography>
          </Box>
        </Box>
      </div>
      <div className="Photocontent">
    <Typography
       variant="h4"
       style={{ color: "white", paddingLeft: "4rem" }}
     >
       {" "}
       Dashing Dogs {" "}
     </Typography>
    <div className="PhotoApp">
      <ImgGrid1 props="dogs" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="dogs" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
    </div>
    </div>
  );
}

export default Dog_folder;
