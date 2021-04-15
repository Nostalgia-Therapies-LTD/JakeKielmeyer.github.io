import React from "react";
import useFirestore from "../../../hooks/useFirestore";
import { motion } from "framer-motion";

const ImgGrid1 = ({ setselectedImg,setModalOpen,props }) => {
  const { docs } = useFirestore(props);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setselectedImg(doc)
              setModalOpen(true)}
            }
          >
            <motion.img
              src={doc.url}
              alt={doc.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};
export default ImgGrid1;
