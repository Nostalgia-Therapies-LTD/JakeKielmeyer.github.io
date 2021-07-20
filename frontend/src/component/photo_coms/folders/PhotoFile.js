import React, { useEffect } from "react";
// import useStorage from "../../../hooks/useStorage";
import useUserStorage from "../../../hooks/useUserStorage";

const PhotoFile = ({ files, setfiles, setLoading }) => {
  // const url= useStorage(file);
  const {url} = useUserStorage(files, setLoading);
  
  useEffect(() => {
    
    if (url) {
      // setLoading(100);
      // setLoading(()=>{
      //   setTimeout(()=> {setLoading(0)
      //  },1000
      //   )
      // }
      // )      
      setfiles([]);
    }
  }, [url, setfiles]);

  return <div></div>;
};

export default PhotoFile;
