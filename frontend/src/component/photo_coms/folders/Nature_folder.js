import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';

function Nature_folder() {
    const [selectedImg, setselectedImg] = useState();
 
  return (
    <div className="App">
    <div className="title">
        <h2>Natural Beauty</h2></div>
      <ImgGrid1 props="nature" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="nature" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
  );
}

export default Nature_folder;