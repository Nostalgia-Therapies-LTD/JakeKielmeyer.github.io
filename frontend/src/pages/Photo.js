import React from 'react';
import Main_photo from './Main_photo';
import My_moments from './My_moments';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import Cat_folder from "../component/photo_coms/folders/Cat_folder";
import Dog_folder from "../component/photo_coms/folders/Dog_folder";
import Nature_folder from "../component/photo_coms/folders/Nature_folder";
import "../photo.css"
//import Folder2 from './comps/Folder2';
//import Folder3 from './comps/Folder3';

function Photo() {
 
  return (
<BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/photo" component={Main_photo}></Route>
        <Route exact path="/photo/My moments" component={My_moments}></Route>
        <Route exact path="/photo/Cats" component={Cat_folder}></Route>
        <Route exact path="/photo/Dogs" component={Dog_folder}></Route>
        <Route exact path="/photo/Nature" component={Nature_folder}></Route>
    </Switch>
  </div>
  </BrowserRouter>
  );
}

export default Photo;

