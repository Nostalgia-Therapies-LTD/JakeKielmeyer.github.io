import React, { useState } from "react";
import ImgGrid from "./imgGrid";
import Modal from "./modal";

function Nature_folder() {
  const [selectedImg, setselectedImg] = useState();

  return (
    <div className="App">
      <div className="title">
        <h2>Natural Beauty</h2>
      </div>
      <ImgGrid props="nature" setselectedImg={setselectedImg} />
      {selectedImg && (
        <Modal
          props="nature"
          selectedImg={selectedImg}
          setselectedImg={setselectedImg}
        />
      )}
    </div>
  );
}

export default Nature_folder;
