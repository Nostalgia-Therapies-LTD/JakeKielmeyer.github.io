import { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/app";

const useUserStorage = (file) => {
  //const [progress, setprogess] = useState(0);
  const [error, seterror] = useState(null);
  const [url, seturl] = useState(null);
  //const [uid,setUid]=useState(null);
 
  
  useEffect(() => {
    const source = axios.CancelToken.source();

    const uploadFile = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.FBIdToken,
          },
        };
        firebase.auth().onAuthStateChanged((user) => {
          
          if (user) {
            console.log(user.uid)
            const { url } = axios.post(`/upload/${user.uid}`, formData, config);
            seturl(url);
            
          } 
        });
      
        
        
      } catch (error) {
        seterror(error);
      }
    };

    uploadFile();
    return () => {
      source.cancel();
    };
  }, [file]);
  
  return { url, error };
  
};

export default useUserStorage;
