import React from "react";
import Carousel from "react-material-ui-carousel";
import useFirestore from "../../../hooks/useFirestore";

function Modal({ selectedImg, setselectedImg, props }) {
  const { docs, imgarr } = useFirestore(props);

  const handleClick = (e) => {
    setselectedImg(null);
  };

  return (
    <div className="backdrop">
      <button className="close" style={{ width: "100%" }} onClick={handleClick}>
        Close
      </button>

      <Carousel
        index={imgarr.indexOf(selectedImg.id)}
        autoPlay={false}
        fullHeightHover={false}
        animation={"fade"}
        timeout={12}
        indicatorContainerProps={{
          style: {
              marginTop: '60%', // 5
              width: "0px",
              height: "0px",
          }
        }}
      
        // indicatorContainerProps={{
        //   style: { width: "0px", height: "0px", marginTop: "60%" },
        // }}
        navButtonsAlwaysVisible={true}
      >
        {selectedImg && docs.map((doc) => <img src={doc.url} alt={doc.name} />)}
      </Carousel>
    </div>
  );
}

export default Modal;
