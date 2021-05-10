import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { db } from "../config";

function DeleteSubscription() {
  const uid = localStorage.getItem("norman");
  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("subscriptions")
        .limit(1)
        .get()
        .then((snapShot) => {
          console.log(snapShot);
        });
    }
  }, [uid]);

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

export default DeleteSubscription;
