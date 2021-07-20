import React, { useState } from "react";
import PhotoFile from "./PhotoFile";
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Upload = () => {
 
  const [loading, setLoading] = useState(0);
  const [files, setfiles] = useState([]);
  const [error, seterror] = useState(null);
  
  const changeHandler = (e) => {
    //setLoading(true)
    e.preventDefault();
    let selected = e.target.files;
    if (selected.length !== 0) {
      setfiles(selected);
      seterror("");
    } else {
      setfiles([]);
      seterror("Please choose image file (jpeg or png)");
    }
  };

  return (
    <form className="form" encType="multipart/form-data">
 
      <label className="photolabel">
     
        <input
          className="photolabel input"
          type="file"
          name="file"
          multiple
          accept=".png, .jpg, .jpeg"
          onChange={changeHandler}
        />
        <span>+</span>
      </label>
      <p className="upload">Upload</p>
      <div>
      {loading > 0 && <Box position="relative" display="inline-flex">
        <CircularProgress label={loading} variant="determinate" value= {loading} size={50}/> 
        <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
       <Typography variant="caption">{`${loading}%`}</Typography>
      </Box>
      </Box> } 
     
      </div>
      <div>
      
        {error && <div>{error}</div>}
        {files.length !== 0 && <PhotoFile setLoading={setLoading} files={files} setfiles={setfiles} />}
      </div>
      
    </form>
  );
};

export default Upload;
