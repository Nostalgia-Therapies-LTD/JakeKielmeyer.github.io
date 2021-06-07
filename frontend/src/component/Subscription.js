import React, { useEffect } from "react";
import { db } from "../config";
import getStripe from "../component/getStripe";
import CircularProgress from "@material-ui/core/CircularProgress";
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
        //for localhost:
        success_url: "http://localhost:3000/home",
        cancel_url: "http://localhost:3000/deleteSubscription",
        //for hosting:
        // success_url: "https://nostalgiadev-1f319.web.app/home",
        // cancel_url: "https://nostalgiadev-1f319.web.app/",
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
