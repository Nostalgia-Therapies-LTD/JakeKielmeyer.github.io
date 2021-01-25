import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';

function Cat_folder() {
    const [selectedImg, setselectedImg] = useState();
 
  return (
    <div className="App">
    <div className="title">
        <h2>Cute Cats</h2></div>
      <ImgGrid1 props="cats" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="cats" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
  );
}

export default Cat_folder;