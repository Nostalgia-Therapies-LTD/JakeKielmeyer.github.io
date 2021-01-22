import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";

//mui stuff
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";

//pages
import Home from "./pages/home";
import Slide from "./component/Slide";
import Footer from "./component/Footer";
import Video from "./pages/Video";

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
            <Route exact path="/puzzle">
              <Slide />
            </Route>
            <Route exact path="/video">
              <Video />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
