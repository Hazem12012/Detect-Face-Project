/** @format */

import styles from "./ResponseMessage.module.css";
import { motion } from "framer-motion";


function ResponseMessage({ value, className, children, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transform: "revert-layer" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`${styles[className]}`}
            style={{ transform: "revertLayer" }}
            onClick={onClick}

        >
            <p>{value}</p>
            {children}
        </motion.div>
    );
}

export default ResponseMessage;
