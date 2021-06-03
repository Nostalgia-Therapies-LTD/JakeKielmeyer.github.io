import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { app } from "../config";

function Payment() {
  const goToBillingPortal = async () => {
    const functionRef = app
      .functions("us-central1")
      .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
    const { data } = await functionRef({
      returnUrl: "https://nostalgiadev-1f319.web.app/home",
    });
    //window.location.origin
    window.location.assign(data.url);
  };

  useEffect(() => {
    goToBillingPortal();
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

export default Payment;
