import React from "react";
import useFirestore1 from "../../../hooks/useFirestore1";
import { motion } from "framer-motion";

const ImgGrid = ({ setselectedImg,setModalOpen,props }) => {
  const { docs } = useFirestore1(props);

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
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};
export default ImgGrid;
