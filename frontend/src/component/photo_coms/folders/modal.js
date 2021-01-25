import React from 'react'
import  {storage,db} from "../../../backend/functions/index";
import Carousel from 'react-material-ui-carousel'
import useFirestore from "../../../hooks/useFirestore";


function Modal({selectedImg, setselectedImg}) {
const { docs, imgarr } = useFirestore ("images");

 const handleClick = (e)=> {
    setselectedImg(null);
 }
 const handleDelete = (e)=> {
    //let docid= docs.map(doc => doc.id)
    //let id = e.target.src(docid)
    db.collection("images").doc(selectedImg.id).delete();
    var storeref=storage.ref(selectedImg.name)
    storeref.delete().then(function(){}).catch(function(error){});
    setselectedImg(null);
    
 }


    return (
        <div className="backdrop" >
            {/* <img src={selectedImg.url} alt={selectedImg.name}/> */}
            <button className="close"
            onClick={handleClick}
            >Close</button>
            <button className="delete"
           onClick={handleDelete}
            >Delete</button>
            
            <Carousel
              index={imgarr.indexOf(selectedImg.id)}
              autoPlay={false}
              animation={'fade'}
              timeout={200}
              indicatorContainerProps={{style:{width:"0px", height:"0px", 
             marginTop:'60%'}}}
              navButtonsAlwaysVisible={true}
            >   
            {selectedImg && docs.map((doc)=> <img src={doc.url} alt={doc.name}/>)}
            </Carousel> 
            
            
        </div>
    )
}

export default Modal;