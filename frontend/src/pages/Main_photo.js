import React from 'react';
import Animals from "../../src/images/moments/Animals.jpg";
import erik from "../../src/images/moments/erik.jpg"
import My_Moments from "../../src/images/moments/My Moments.png";
import Nature from "../../src/images/moments/Nature.jpg";




function Main_photo(props) {
  return (
    <div>
      <form className="form1">
     <button className="wrapper" onClick={()=>{props.history.push("/photo/My moments")}} style={{backgroundColor:"rgba(0, 0, 0, 0.952)", color:"white", font: "inherit" }}  ><img src={My_Moments} alt="My Moments"/></button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/Cats")}}><img src={erik} alt="cat"/></button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/Nature")}}> <img src={Nature} alt="Classic Cars"/></button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/Dogs")}}><img src={Animals} alt="dog"/></button>
      </form>
    </div>
    
  )
}

export default Main_photo;