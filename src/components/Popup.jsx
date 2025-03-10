/** @format */
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Popup.module.css";
import VideoCam from "./VideoCam";
import { useState } from "react";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
const Popup = ({ isOpen, onClose, onDataReceived, setBackImage, type }) => {
  const [image, setImage] = useState(null)
  const [check, setCheck] = useState(null)

  return (
    <AnimatePresence>
      {isOpen && ( // AnimatePresence works correctly now
        <motion.div
          className={styles.overlay}
          initial="hidden"
          animate="visible"
          exit="exit">
          <motion.div className={styles.popup} variants={popupVariants}>
            <VideoCam sendData={(data) => {
              setImage(data);
            }}
              detectCheck={(data) => {
                setCheck(data)
              }}  
            />
            <div>
              {" "}
              <button className={styles.closeBtn} onClick={() => {
                setImage(null);
                onClose();
              }}>
                Close
              </button>
              {type == "registration" || !check ? "" : <button className={styles.okBtn} onClick={() => {
                setBackImage(image);
                onDataReceived(image);
                onClose()
              }}>
                OK
              </button>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
