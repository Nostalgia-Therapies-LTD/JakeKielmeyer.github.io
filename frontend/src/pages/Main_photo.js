import React from 'react';
import Animals from "../../src/images/moments/Animals.jpg";
import erik from "../../src/images/moments/erik.jpg";
import panda from "../../src/images/moments/Panda.jpg";
import rush from "../../src/images/moments/terence.jpg";
import My_Moments from "../../src/images/moments/My Moments.png";
import Nature from "../../src/images/moments/Nature.jpg";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseLine from "@material-ui/core/CssBaseline";


function Main_photo(props) {
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
       
        <div className="Photocontent" >
        <Typography
          variant="h4"
          style={{ color: "white", paddingLeft: "4rem" }}
        >
          {" "}
          Categories {" "}
        </Typography>
      <div className="PhotoApp" >
      <form className="img-grid">
     <button className="img-wrap" onClick={()=>{props.history.push("/photo/My moments")}} style={{backgroundColor:"rgba(0, 0, 0, 0.952)", color:"white", font: "inherit", border:"none", borderRight:"2.5px solid whiteSmoke"}}  ><img src={My_Moments} alt="My Moments"/></button>
      <button className="img-wrap" onClick={()=>{props.history.push("/photo/Cats")}}><img src={erik} alt="cat"/></button>
      <button className="img-wrap" onClick={()=>{props.history.push("/photo/Nature")}}> <img src={Nature} alt="Classic Cars"/></button>
      <button className="img-wrap" onClick={()=>{props.history.push("/photo/Dogs")}}><img src={Animals} alt="dog"/></button>
      <button className="img-wrap" onClick={()=>{props.history.push("/photo/Places")}}> <img src={rush} alt="Classic Cars"/></button>
      <button className="img-wrap" onClick={()=>{props.history.push("/photo/Wildlife")}}><img src={panda} alt="dog"/></button>
      </form>
      </div>
  </div>
    </div>
    
  )
}

export default Main_photo;