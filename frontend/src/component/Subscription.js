import React, { useEffect, useState } from "react";
import pupper from "../images/Pupper.jpg";
import Bonanza from "../images/tv/Bonanza.jpg";
import VideoSlider from "../component/VideoSlider";
import { db } from "../config";
import getStripe from "../component/getStripe";
import CircularProgress from "@material-ui/core/CircularProgress";

//mui stuff
import makeStyles from "@material-ui/core/styles/makeStyles";

//axios
import axios from "axios";

//External Styles
import "../css/videoStyle.css";

function Subscription(props) {
  const userID = localStorage.getItem("norman");

  const sendToCkeckOut = async (userID) => {
    const docRef = await db
      .collection("customers")
      .doc(userID)
      .collection("checkout_sessions")
      .add({
        price: "price_1IlhtTCmldA3mk4tlb9YRTb8",
        success_url: "https://nostalgiadev-1f319.web.app/home",
        cancel_url: "https://nostalgiadev-1f319.web.app/",
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  useEffect(() => {
    sendToCkeckOut(userID);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Subscription;
