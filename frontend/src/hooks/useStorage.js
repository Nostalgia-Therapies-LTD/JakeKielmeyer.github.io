import { useState, useEffect } from "react";
import { db, storage, timestamp } from "../config";

const useStorage = (file) => {
  //const [progress, setprogess] = useState(0);
  const [error, seterror] = useState(null);
  const [url, seturl] = useState(null);

  useEffect(() => {
    const time = new Date().getMilliseconds();
    const storageRef = storage.ref("/photofolders/nature").child(file.name);
    const collectionref = db.collection("nature");
    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        seterror(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        const imgname = file.name;
        collectionref.add({ url: url, createdAt: createdAt, name: imgname });
        seturl(url);
      }
    );
  }, [file]);

  return { url, error };
};

export default useStorage;
