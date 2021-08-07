import React from "react";
import Carousel from "react-material-ui-carousel";
import useFirestore1 from "../../../hooks/useFirestore1";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt,faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from "@material-ui/core";

// My Moments Content
const useStyles = makeStyles((theme) => ({
  dialogbox:{
      fontFamily:"KOJ",
      fontSize: "22px",
      color:"#000"
  },
  modal: {
    outlineStyle:"none",
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
    outlineStyle:"none",
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

    // iPhone X/XS iOS12
    '@media (max-width:375px) and (max-height: 812px) and (orientation:portrait)': {
      width:"50vh",
      height:"50vh",
  },
  
  '@media (max-width:812px) and (max-height: 375px) and (orientation:landscape)': {
    width:"100vh",
    height:"65vh",
  },
  
  // iPhone X/XS 12 Portrait
  '@media (max-width: 375px) and (max-height: 812px)': {
    paddingRight: "17px",
    paddingLeft: "17px",
  },
  
  
  // iPhone 6/7/8 Regular and Plus Portrait
  '@media (max-width: 414px) and (max-height: 736px)': {
    paddingRight: "15px",
    paddingLeft: "15px",
  },
  
  
  // Galaxy S9 Portrait
  '@media (max-width: 360px) and (max-height: 740px)': {
    paddingRight: "10px",
    paddingLeft: "10px",
  },
},

    
  }));

function Modal1({ selectedImg, setselectedImg,modalOpen,setModalOpen, props }) {
  const { docs, imgarr } = useFirestore1(props);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose =() =>{
    setOpen(false);
  }
 
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
 
    const userID = localStorage.getItem("norman");
    if (userID) {
        //console.log(userID)
           axios.delete(`/image/${userID}`, config).then(() => setselectedImg(null));
        } 

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
        {selectedImg && docs.map((doc) => <img className ={classes.img} src={doc.url} alt={doc.name} key={doc.id}/>)}
      </Carousel>
      <div>
      <button className="delete" onClick={handleClickOpen}>
      <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon> 
      </button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="alert-dialog-title"
      >
     <div style={{padding:"2em"}}><Typography  className={classes.dialogbox} variant="h7">Are you sure you want to delete this photo permanently?</Typography></div>
     
     <DialogActions>
          <Button onClick={handleClickClose} color="secondary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary" >
            Yes
          </Button>
          </DialogActions>
      </Dialog>
      <button className="close" onClick={handleClose}>
      <FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
      </button> 
      </div>
      </div>
      </div> 
      </Fade>
    </Modal>
 );
};

export default Modal1;
