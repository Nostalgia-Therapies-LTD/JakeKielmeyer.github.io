import { useState, useEffect } from "react";
import { db } from "../config";

const useFirestore = (collection) => {
  const [docs, setdocs] = useState([]);
  const [imgarr, setimgarr] = useState([]);

  useEffect(() => {
    let documents = [];
    let arr = [];
    let unsub = null;
    if (
      localStorage.getItem(collection + "1") &&
      localStorage.getItem(collection + "2")
    ) {
      const snap1 = JSON.parse(localStorage.getItem(collection + "1"));
      const snap2 = JSON.parse(localStorage.getItem(collection + "2"));
      setdocs(snap1);
      setimgarr(snap2);
    } else {
      unsub = db
        .collection(collection)
        .orderBy("createdAt", "desc")
        .onSnapshot((snap) => {
          // console.log("first", snap);
          snap.forEach((doc) => {
            console.log(doc.data());
            documents.push({ ...doc.data(), id: doc.id });
            arr.push(doc.id);
          });
          localStorage.setItem(collection + "1", JSON.stringify(documents));
          localStorage.setItem(collection + "2", JSON.stringify(arr));
          setdocs(documents);
          setimgarr(arr);
        });
    }

    // return () => unsub();
  }, [collection]);

  return { docs, imgarr };
};

export default useFirestore;
