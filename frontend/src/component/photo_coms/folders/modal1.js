import React from "react";
import Carousel from "react-material-ui-carousel";
import useFirestore from "../../../hooks/useFirestore";
import axios from "axios";

function Modal1({ selectedImg, setselectedImg, props }) {
  const { docs, imgarr } = useFirestore(props);

  const handleClose = (e) => {
    setselectedImg(null);
  };
  const handleDelete = (e) => {
    const config = {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
      data: {
        name: selectedImg.name,
      },
    };
    axios.delete("/image", config).then(() => setselectedImg(null));
  };

  return (
    <div className="backdrop">
      <button className="close" style={{ width: "50%" }} onClick={handleClose}>
        Close
      </button>
      <button className="close" style={{ width: "50%" }} onClick={handleDelete}>
        Delete Image
      </button>
      <Carousel
        index={imgarr.indexOf(selectedImg.id)}
        autoPlay={false}
        fullHeightHover={true}
        animation={"fade"}
        timeout={12}
        indicatorContainerProps={{
          style: { width: "0px", height: "0px", marginTop: "60%" },
        }}
        navButtonsAlwaysVisible={true}
      >
        {selectedImg && docs.map((doc) => <img src={doc.url} alt={doc.name} />)}
      </Carousel>
    </div>
  );
}

export default Modal1;
