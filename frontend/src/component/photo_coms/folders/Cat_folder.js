import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';

function Cat_folder() {
    const [selectedImg, setselectedImg] = useState();
 
  return (
    <div className="App">
    <div className="title">
        <h2>Animals</h2></div>
      <ImgGrid1 props="Cats" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="Cats" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
  );
}

export default Cat_folder;