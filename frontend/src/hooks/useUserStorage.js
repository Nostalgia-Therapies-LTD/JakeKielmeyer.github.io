import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import axios from "axios";

async function fileUpload(file, token) {
  const url = apiUrl + "/upload";
  const formData = new FormData();
  formData.append("file", file);

  // check for auth token
  const config = token
    ? {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
  return await axios.post(url, formData, config);
}

const useUserStorage = (file) => {
  //const [progress, setprogess] = useState(0);
  const [error, seterror] = useState(null);
  const [url, seturl] = useState(null);

  useEffect(async () => {
    try {
      const { url } = await fileUpload(file);
      seturl(url);
    } catch (error) {
      seterror(error.toString());
    }
  }, [file, fileUpload]);

  return { url, error };
};

export default useUserStorage;
