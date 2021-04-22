import React from "react";
import Carousel from "react-material-ui-carousel";
import useFirestore from "../../../hooks/useFirestore";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

// Provided Content

const useStyles = makeStyles((theme) => ({
  modal: {
  backgroundColor: "rgba(30, 30, 36, 0.92)",
  position: "fixed", /* Stay in place */
  zIndex: "1", /* Sit on top */
  paddingTop: ".5%", /* Location of the box */
  left: "0",
  top: "0",
  width: "100%", /* Full width */
  height: "100%", /* Full height */
  overflow: "auto",
}, 

  img:{
   margin:"auto",
   display:"block",
  //  width:"220vh",
  //  height:"90vh",
    maxWidth: "70%",
    maxHeight: "70%",
    boxSizing:"border-box",
    filter: "drop-shadow(0 0 0.1rem white)",
  
  //   '@media (orientation:portrait)': {
  //     width:"220vh",
  //     height:"85vh",
  // },
     
  },
  
}));

function Modal2({ selectedImg, setselectedImg,modalOpen,setModalOpen, props }) {
  const { docs, imgarr } = useFirestore(props);
  const classes = useStyles();
 
  const handleClose = (e) => {
    setselectedImg(null);
    setModalOpen(false);
  };

  return (
    <Modal
   open={modalOpen}
   onClose={handleClose}
   className={classes.modal}
  BackdropComponent={Backdrop}
  BackdropProps={{
          timeout: 500,
        }}
    >
     <Fade in={modalOpen}>
       <div style={{textAlign:"center"}}>
     
      <button className="close" style={{width:'70%'}} onClick={handleClose}>
        Close
      </button>
    
      <div>
      <Carousel
        index={imgarr.indexOf(selectedImg.id)}
        autoPlay={false}
        fullHeightHover={true}
        animation={'fade'}
        timeout={120}
        indicatorContainerProps={{
          style: { width: "0px", height: "0px" },
        }}
        navButtonsAlwaysVisible={true}
      >
        {selectedImg && docs.map((doc) => <img className ={classes.img} src={doc.url} alt={doc.name} />)}
      </Carousel>
      </div>
      </div> 
      </Fade>
    </Modal>
 );
};
export default Modal2;
