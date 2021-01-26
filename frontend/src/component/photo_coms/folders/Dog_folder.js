import React, {useState} from 'react';
import ImgGrid1 from "./imgGrid1"
import Modal1 from './modal1';


function Dog_folder() {
    const [selectedImg, setselectedImg] = useState();
 
  return (
    <div className="App">
    <div className="title">
        <h2>Dhashing Dogs</h2></div>
      <ImgGrid1 props="dogs" setselectedImg={setselectedImg}  />
      {selectedImg  && <Modal1 props="dogs" selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
    </div>
  );
}

export default Dog_folder;