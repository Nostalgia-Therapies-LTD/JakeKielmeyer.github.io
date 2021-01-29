import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";

//mui stuff
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./photo.css";
//pages
import Home from "./pages/home";
import Slide from "./component/Slide";
import Footer from "./component/Footer";
import Video from "./pages/Video";
import Main_photo from './pages/Main_photo';
import My_moments from './pages/My_moments';
import Cat_folder from "./component/photo_coms/folders/Cat_folder";
import Dog_folder from "./component/photo_coms/folders/Dog_folder";
import Nature_folder from "./component/photo_coms/folders/Nature_folder";

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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
              <Route exact path="/photo" component={Main_photo}></Route>
              <Route exact path="/photo/My moments" component={My_moments}></Route>
              <Route exact path="/photo/Cats" component={Cat_folder}></Route>
              <Route exact path="/photo/Dogs" component={Dog_folder}></Route>
              <Route exact path="/photo/Nature" component={Nature_folder}></Route>
            <Route exact path="/puzzle">
              <Slide />
            </Route>
            {/* <Route exact path="/video">
              <Video />
            </Route> */}
          </Switch>
        </div>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
