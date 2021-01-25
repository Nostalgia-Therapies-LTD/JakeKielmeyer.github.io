import { useState, useEffect } from "react";
import  { db} from "../backend/functions/index";

const useFirestore =(collection) => {
    const [docs, setdocs] = useState([]);
    const[imgarr,setimgarr]=useState([]);

    useEffect(() => {
       const unsub =  db.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
            let documents = [];
            let arr=[];
            snap.forEach(doc =>{
            documents.push({...doc.data(), id: doc.id});
            arr.push(doc.id);
            console.log(arr)
        });
      setdocs(documents);
      setimgarr(arr);
    })
        
    return() => unsub();
    }, [collection])

    return {docs,imgarr} ;
}   

export default useFirestore;