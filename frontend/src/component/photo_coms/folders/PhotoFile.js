import React, { useEffect } from "react";
// import useStorage from "../../../hooks/useStorage";
import useUserStorage from "../../../hooks/useUserStorage";

const PhotoFile = ({ file, setfile }) => {
  // const url= useStorage(file);
  const url = useUserStorage(file);
  
  useEffect(() => {
    if (url) {
      setfile(null);
    }
  }, [url, setfile]);

  return <div></div>;
};

export default PhotoFile;