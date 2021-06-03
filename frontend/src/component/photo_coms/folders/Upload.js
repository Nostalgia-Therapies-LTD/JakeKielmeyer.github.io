import React, { useState } from "react";
import PhotoFile from "./PhotoFile";
import CircularProgress from "@material-ui/core/CircularProgress";


const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [files, setfiles] = useState([]);
  const [error, seterror] = useState(null);
  //const types =['image/jpeg','image/png'];
  //const [size,setSize]=useState(0);
  const changeHandler = (e) => {
    setLoading(true)
    e.preventDefault();
    let selected = e.target.files;
    if (selected.length !== 0) {
      // [...selected].forEach(imgfile=>
      //     setfile(imgfile));
      //setfiles((files) => [...files, selected])
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
        <p className="upload">Upload</p>
      </label>
      <div>
      
        {error && <div>{error}</div>}
        {files.length !== 0 && <PhotoFile setLoading={setLoading} files={files} setfiles={setfiles} />}
      </div>
      {loading && (
                <CircularProgress text="NT" size={30}  />
              )}
    </form>
  );
};

export default Upload;
