/** @format */

import React from "react";
import { useState } from "react";
import styles from "./Registration.module.css";
import FaceIdImage from "../components/assets/Face_ID_Poster.webp";
import Button from "../components/Button";
import Popup from '../components/Popup';
function Registration() {
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(false);


  
  const handleForm = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("يرجى اختيار صورة!");
      return;
    }

    const formData = new FormData();
    formData.append("image",image);

    console.log(formData)
    try {
      const response = await fetch(
        "end point",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("فشل في رفع الصورة");

      console.log("✅ تم رفع الصورة بنجاح!");
    } catch (error) {
      console.error("❌ خطأ:", error);
    }
  };
  return (
    <div className={styles.registration}>
      <div className={"container"}>
        <div className={styles.preview}>
          {/* <VideoCam /> */}
          <div className={styles.image_poster}>
            <img src={FaceIdImage} alt="NotFound" />
          </div>
          <div className={styles.accessCam}>
            <p><span><i className="fa-solid fa-hand-point-right"></i></span>To start scanning your face, please allow access to the camera.</p>
            <Button className="start_btn" value={"Start Camera"} action={()=>setShowPopup(true )}>
              <i className="fa-solid fa-camera"></i>
            </Button>
          </div>
        </div>
      </div>
      {/* Webcam Popup */}
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}type="registration" />
    </div>
  );
}

export default Registration;

