import { useState, useEffect } from "react";
import axios from "axios";

const useUserStorage = (files, setLoading) => {
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
          onUploadProgress: (progressEvent) => {
              const loaded =progressEvent.loaded;
              const total=progressEvent.total;
              let percent=Math.floor(loaded *100 / total)
               console.log(` ${loaded}kb of ${total}kb | ${percent}% `)

               if (percent<100){
                setLoading(percent)
               }
             }

        };
        const userID = localStorage.getItem("norman");
       
        if (userID) {
            axios.post(`/upload/${userID}`, formData, config)
           .then((res)=> {
            seturl(res.data.url);
            setLoading(100);
            setLoading(()=>{
            setTimeout(()=> {setLoading(0)
            },2500
             )})          
              
            })
            .catch((err) => {
              console.error(err);})

            }}
      catch (error) {
      seterror(error);
      }
    };
   
    uploadFile();
   
    return () => {
      source.cancel();
    };
  }, [files]);
  //console.log(url,upPercent);
  return { url };
};

export default useUserStorage;
