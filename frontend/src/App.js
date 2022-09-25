import React from "react";
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/protectedRoute";
import Preloader from './component/preloader';
//mui stuff
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import { ThemeProvider } from "@material-ui/core/styles";
import "./photo.css";
import MobileNavbar from "./component/MobileNavBar";
//pages
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Reset from "./pages/resetPassword";
import Home from "./pages/home";
//mport Puzzle from "./pages/Puzzle";
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
import Subscription from "./component/Subscription";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Payment from "./component/Payment";

//jwt
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-nostalgiadev-1f319.cloudfunctions.net/api";
let theme = createMuiTheme({
  typography: {
    h6: {
      fontFamily: "Leviathan",
      textTransform: "capitalize",
      textShadow: "1px 1px 4px #000",
    },

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

theme = responsiveFontSizes(theme);
const token = localStorage.getItem("FBIdToken");
//console.log(token);
//let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  //console.log (decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("FBIdToken");
    window.location.href = "/";
  }
  //authenticated = false;
  // } else {
  //   //authenticated = true;
  // }
}
// const Page404 = ({ location }) => (
//   <div className="welcome">
//   <div style={{margin:'10% 20% 60% 20%'}}>
//      <h2>Opps! Sorry, No match found for <code>{location.pathname}</code></h2>
//      <div style={{margin:'2% 30%'}}><h3>Return to <a className="newlink" href="/home">Home</a></h3></div>
//   </div>
//   </div>
// );

function App() {
  const [loading, setLoading]=useState(false);
  

  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
   
  }, [])
  return (
    <ThemeProvider theme={theme}>
      {loading ?

      <header>
      <Preloader/>
      </header>:

      <Router>
        <Switch>
          {/* <Route exact path="/" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/reset" component={Reset}></Route>
          <Route exact path="/subscription" component={Subscription}></Route>
          <Route exact path="/terms" component={Terms}></Route>
          <Route exact path="/privacy" component={Privacy}></Route>
          <Route exact path="/payment_management" component={Payment}></Route> */}
          <React.Fragment>
            <Navbar />
            <MobileNavbar />
            <div className="container">
            <ProtectedRoute
              exact
              path="/"
              component={Home}>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/home"
                component={Home}
              ></ProtectedRoute>
              {/* <ProtectedRoute
                exact
                path="/puzzle"
                component={Puzzle}
              ></ProtectedRoute> */}
              <ProtectedRoute
                exact
                path="/video"
                component={Video}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/music"
                component={Music}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo"
                component={Main_photo}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/My moments"
                component={My_moments}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/Cats"
                component={Cat_folder}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/Dogs"
                component={Dog_folder}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/Nature"
                component={Nature_folder}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/Places"
                component={Places_folder}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/photo/Wildlife"
                component={Wildlife_folder}
              ></ProtectedRoute>
            </div>
          </React.Fragment>
        </Switch>
        <Footer />
      </Router>}
    </ThemeProvider>
    
  );
}

export default App;
