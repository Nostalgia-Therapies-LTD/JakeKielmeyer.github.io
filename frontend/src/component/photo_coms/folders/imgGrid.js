import React from 'react';
import useFirestore from "../../../hooks/useFirestore";
import Upload from "./Upload";
import {motion} from "framer-motion";

 const ImgGrid = ({setselectedImg}) => {
    const { docs } = useFirestore ("images");
    /*const photoClick = (e)=> {
        setselectedImg(e.url);
        setselectId(e)
     }*/
    
    return (
       
        <div className="img-grid">
            <div className= "img-wrap"><Upload/>
            <p className="upload">Upload</p>
            </div>
    
          {docs && docs.map(doc => (
              <motion.div className= "img-wrap" key ={doc.id}
              layout
              whileHover={{opacity: 1}}
               onClick={()=> setselectedImg(doc)}
               >
          
          <motion.img src ={doc.url} alt={doc.name}
          initial={{opacity:0}} 
          animate={{opacity:1}}
          />
          </motion.div> ))} 
    
        </div>
    )
}
export default ImgGrid; 
