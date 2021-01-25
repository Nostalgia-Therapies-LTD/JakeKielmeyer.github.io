import React from 'react';
import Animals from "../../src/images/moments/Animals.jpg";
import My_Moments from "../../src/images/moments/My Moments.png";



function Main_photo(props) {
     
  return (
    <div>
       <div className="title ">
      <h2>Photos</h2>
    </div>
      <form className="form1">
     <button className="wrapper" onClick={()=>{props.history.push("/photo/My moments")}} style={{backgroundColor:"rgba(0, 0, 0, 0.952)", color:"white", font: "inherit" }} >My Moments</button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/Cats")}}><img src={Animals} alt="Classic Cars"/></button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/My moments")}}> <img src={My_Moments} alt="Classic Cars"/></button>
      <button className="wrapper" onClick={()=>{props.history.push("/photo/Cats")}}><img src={Animals} alt="Classic Cars"/></button>
      </form>
    </div>
  )
}

export default Main_photo;