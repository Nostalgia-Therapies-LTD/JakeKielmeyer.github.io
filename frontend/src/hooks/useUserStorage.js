import { useState, useEffect } from "react";
import axios from "axios";

const useUserStorage = (files) => {
  
  const [error, seterror] = useState(null);
  const [url, seturl] = useState(null);
  //const[sizeError,setSizeError]=useState(null);
  const size = file =>file.size >5 *1024 *1024;
  const sizeErr=[...files].some(size);
  if (sizeErr){
    alert("Photo size must me 5MB or less")
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    //console.log(files[0].size);
    const uploadFile = async () => {
      try {
        const formData = new FormData();
        // if ([...files].forEach(file=>file.size>5 *1024 *1024)){
        //   setSizeError(true)
        // };
       
        //setSizeError();
        const nFiles=[...files].filter(file=>file.size < 5 * 1024 * 1024);
        //console.log(nFiles);
        nFiles.forEach((file) => {
          formData.append("file", file);
        });

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.FBIdToken,
          },
        };
        const userID = localStorage.getItem("norman");
       
        if (userID) {
           const { url } =  axios.post(`/upload/${userID}`, formData, config);
         

             seturl(url); 
          
              
            }

      } catch (error) {
        seterror(error);
      }
    };
   
    uploadFile();
   
    return () => {
      source.cancel();
    };
  }, [files]);
  //console.log(sizeError);
  return { url, error };
};

export default useUserStorage;
