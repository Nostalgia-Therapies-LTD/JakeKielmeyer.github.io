import React, {useEffect}from "react";
import useStorage from "../../../hooks/useStorage";

const PhotoFile = ({file, setfile}) => {
    const url= useStorage(file);
   
    useEffect(() => {
        if (url){ 
        setfile(null);
        }
    }, [url, setfile])
    
    return (
        <div>
         
        </div>
    )
}

export default PhotoFile;