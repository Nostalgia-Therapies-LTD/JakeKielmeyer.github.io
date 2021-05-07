import React, { useEffect } from "react";
// import useStorage from "../../../hooks/useStorage";
import useUserStorage from "../../../hooks/useUserStorage";

const PhotoFile = ({ files, setfiles }) => {
  // const url= useStorage(file);
  const url = useUserStorage(files);
  
  useEffect(() => {
    
    if (url) {
      
      setfiles([]);
    }
  }, [url, setfiles]);

  return <div></div>;
};

export default PhotoFile;
