import React, { useState } from "react";
import ImgGrid from "./imgGrid";
import Modal from "./modal";

function Cat_folder() {
  const [selectedImg, setselectedImg] = useState();

  return (
    <div className="App">
      <div className="title">
        <h2>Cute Cats</h2>
      </div>
      <ImgGrid props="cats" setselectedImg={setselectedImg} />
      {selectedImg && (
        <Modal
          props="cats"
          selectedImg={selectedImg}
          setselectedImg={setselectedImg}
        />
      )}
    </div>
  );
}

export default Cat_folder;
