import { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/app";
import Upload from "../component/photo_coms/folders/Upload";

const useUserStorage = (files) => {
  const [error, seterror] = useState(null);
  const [url, seturl] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    //console.log(files);
    const uploadFile = async () => {
      //[...files].map( (eachFile) => {
      try {
        const formData = new FormData();

        [...files].forEach((file) => {
          formData.append("file", file);
        });

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.FBIdToken,
          },
        };
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
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
  }, [files]);

  return { url, error };
};

export default useUserStorage;
