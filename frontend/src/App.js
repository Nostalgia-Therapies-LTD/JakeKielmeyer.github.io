import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";

//mui stuff
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./photo.css";

//pages
import Login from "./pages/login";
import Home from "./pages/home";
import Puzzle from "./pages/Puzzle";
import Footer from "./component/Footer";
import Video from "./pages/Video";
import Music from "./pages/Music";
import Main_photo from "./pages/Main_photo";
import My_moments from "./pages/My_moments";
import Cat_folder from "./component/photo_coms/folders/Cat_folder";
import Dog_folder from "./component/photo_coms/folders/Dog_folder";
import Nature_folder from "./component/photo_coms/folders/Nature_folder";
import Places_folder from "./component/photo_coms/folders/Places_folder";
import Wildlife_folder from "./component/photo_coms/folders/Wildlife_folder";

//jwt
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL=  "https://us-central1-nostalgiadev-1f319.cloudfunctions.net/api";
const theme = createMuiTheme({
  typography: {
    fontFamily: "KOW, sans-serif",
  },
  palette: {
    primary: {
      main: "#0f499d",
    },
    secondary: {
      main: "#18a3f8",
    },
  },
});

const token = localStorage.getItem('FBIdToken');
console.log(token);
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log (decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("FBIdToken");
    window.location.href="/";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
      <Switch>
      <Route exact path="/">
      <Login authenticated />
      </Route>
      <div>
        <Navbar />
        <div className="container">          
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/puzzle">
              <Puzzle />
            </Route>
            <Route exact path="/video">
              <Video />
            </Route>
            <Route exact path="/music">
              <Music />
            </Route>
            <Route exact path="/photo" component={Main_photo}></Route>
            <Route exact path="/photo/My moments" component={My_moments}></Route>
            <Route exact path="/photo/Cats" component={Cat_folder}></Route>
            <Route exact path="/photo/Dogs" component={Dog_folder}></Route>
            <Route exact path="/photo/Nature" component={Nature_folder}></Route>
            <Route exact path="/photo/Places" component={Places_folder}></Route>
            <Route exact path="/photo/Wildlife" component={Wildlife_folder}></Route>
          </div>
          </div>
        </Switch>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
