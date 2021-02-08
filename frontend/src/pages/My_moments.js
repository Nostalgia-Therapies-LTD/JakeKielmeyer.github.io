import React, { useState } from "react";
import ImgGrid from "../component/photo_coms/folders/imgGrid";
import Upload from "../component/photo_coms/folders/Upload";
import Modal from "../component/photo_coms/folders/modal";

function My_moments() {
  const [selectedImg, setselectedImg] = useState();

  return (
    <div className="App">
      <div className="title">
        <h2>My Moments</h2>
      </div>
      <div className="img-grid">
        <div className="img-wrap">
          <Upload />
          <p className="upload">Upload</p>
        </div>
      </div>
      <ImgGrid setselectedImg={setselectedImg} props={`users/0/images`} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setselectedImg={setselectedImg} />
      )}
    </div>
  );
}

export default My_moments;
