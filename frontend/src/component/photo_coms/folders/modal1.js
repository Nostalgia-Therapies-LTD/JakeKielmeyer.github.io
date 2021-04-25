import React from "react";
import Carousel from "react-material-ui-carousel";
import useFirestore from "../../../hooks/useFirestore";
import axios from "axios";
import firebase from "firebase/app";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

// My Moments Content

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "rgba(30, 30, 36, 0.92)",
    position: "fixed", /* Stay in place */
    zIndex: "1", /* Sit on top */
    left: "0",
    top: "0",
    width: "100%", /* Full width */
    height: "100%", /* Full height */
    overflow: "auto",
    '@media (orientation:portrait)': { /* Location of the box */
      paddingTop: "20%", 
    },
    '@media (orientation:landscape)': { /* Location of the box */
      paddingTop: "10%", 
    },
  
    // iPad
  '@media (max-width:1024px) and (max-height: 768px) and (orientation:landscape)': {
    paddingTop:"8%",
  },
  
  // iPhone X/XS iOS12
  '@media (max-width:812px) and (max-height: 375px) and (orientation:landscape)': {
    paddingTop:"4%",
  },
  
  '@media (max-width:375px) and (max-height: 812px) and (orientation:portrait)': {
    paddingTop:"50%",
  },
  
  // iPhone 6/7/8 Plus + Regular
  '@media (max-width:736px) and (max-height: 414px) and (orientation:landscape)': {
    paddingTop:"8%",
  },
  
  // Samsung S9/S9+
  '@media (max-width:740px) and (max-height: 360px) and (orientation:landscape)': {
    paddingTop:"4%",
  },
}, 

  img:{
     margin:"auto",
     display:"block",
      maxWidth: "70%",
      maxHeight: "70%",
      boxSizing:"border-box",
      filter: "drop-shadow(0 0 0.1rem white)",
    
      // Standard Portrait Mode
      '@media (orientation:portrait)': {
        width:"220vh",
        height:"65vh",
    },
  
      // Standard Landscape Mode
      '@media (orientation:landscape)': {
        width:"220vh",
        height:"75vh",
    },
    
    // iPad
    '@media (max-width:1024px) and (max-height: 768px) and (orientation:landscape)': {
      width:"55vh",
      height:"75vh",
    },

    // iPhone X/XS iOS12
    '@media (max-width:375px) and (max-height: 812px) and (orientation:portrait)': {
      width:"50vh",
      height:"50vh",
  },
  
  '@media (max-width:812px) and (max-height: 375px) and (orientation:landscape)': {
    width:"65vh",
    height:"75vh",
  },

  // iPhone 6/7/8
  '@media (max-width:736px) and (max-height: 414px) and (orientation:landscape)': {
    width:"55vh",
    height:"70vh",
  },

    },
    
  }));

function Modal1({ selectedImg, setselectedImg,modalOpen,setModalOpen, props }) {
  const { docs, imgarr } = useFirestore(props);
  const classes = useStyles();
 
  const handleClose = (e) => {
    setselectedImg(null);
    setModalOpen(false);
  };
  const handleDelete = (e) => {
    const config = {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
      data: {
        name: selectedImg.name,
      },
    };
    firebase.auth().onAuthStateChanged((user) => {
          
      if (user) {
        console.log(user.uid)
         axios.delete(`/image/${user.uid}`, config).then(() => setselectedImg(null));
      } 
    });
    ;
  };
  
  
return (
    <Modal
    open={modalOpen}
    onClose={handleClose}
    className={classes.modal}
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,}}
    >
 
     <Fade in={modalOpen}>
       <div style={{textAlign:"center"}}>
       
      {/* <button className="close"  onClick={handleClose}>
        Close
      </button> */}
    
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
        // navButtonsAlwaysVisible={true}
      >
        {selectedImg && docs.map((doc) => <img className ={classes.img} src={doc.url} alt={doc.name} />)}
      </Carousel>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
      </div>
      </div> 
      </Fade>
    </Modal>
 );
};

export default Modal1;
