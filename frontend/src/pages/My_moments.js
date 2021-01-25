import React, {useState} from 'react';
import ImgGrid from "../component/photo_coms/folders/imgGrid"
import Modal from "../component/photo_coms/folders/modal";

function My_moments() {
  const [selectedImg, setselectedImg] = useState();
 
  return (
    <div className="App">
      <div className="title"><h2>My Moments</h2></div>
      <ImgGrid setselectedImg={setselectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
  );
}

export default My_moments;