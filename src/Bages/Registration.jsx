/** @format */

import React from "react";
import styles from "./Registration.module.css";
import VideoCam from "../components/VideoCam";
function Registration() {
  return (
    <div className={styles.registration}>
      <div className={"container"}>
        <div className={styles.preview}>
          <VideoCam />
        </div>
      </div>

    </div>
  );
}

export default Registration;
