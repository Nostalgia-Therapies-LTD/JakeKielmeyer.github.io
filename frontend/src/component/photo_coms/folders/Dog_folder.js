import React, { useState } from "react";
import ImgGrid from "./imgGrid";
import Modal from "./modal";

function Dog_folder() {
  const [selectedImg, setselectedImg] = useState();

  return (
    <div className="App">
      <div className="title">
        <h2>Dhashing Dogs</h2>
      </div>
      <ImgGrid props="dogs" setselectedImg={setselectedImg} />
      {selectedImg && (
        <Modal
          props="dogs"
          selectedImg={selectedImg}
          setselectedImg={setselectedImg}
        />
      )}
    </div>
  );
}

export default Dog_folder;
