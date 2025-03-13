/** @format */

import React, { useState } from "react";
import styles from "./Registration.module.css";
import FaceIdImage from "../components/assets/Face_ID_Poster.webp";
import Button from "../components/Button";
import Popup from "../components/Popup";
import ResponseMessage from "../components/ResponseMessage";

function Registration() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Initially false to avoid blocking
  const [responseMessage, setResponseMessage] = useState("");
  const [formatData, setFormatData] = useState({ image: null });


  const handleImageUpload = (file) => {
    if (file instanceof File) {
      setFormatData((prev) => ({ ...prev, image: file }));
    }
  };

  // Handle Form Submission
  const handleImage = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setResponseMessage(""); // Clear old messages

    if (!formatData.image) {
      // setResponseMessage("❌ Please select an image!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    try {
      if (
        typeof formatData.image === "string" &&
        formatData.image.startsWith("data:image")
      ) {
        const base64Response = await fetch(formatData.image);
        const blob = await base64Response.blob();
        formData.append("image", blob, "image.jpg");
      } else {
        formData.append("image", formatData.image);
      }

      const response = await fetch(
        "https://faceattend.up.railway.app/api/v1/attendance/mark-attendance",
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }
      const data = await response.json();
      setResponseMessage(
        `${data.student_name.toUpperCase()} : ${data.message} in ${data.attendance_date
        } .`
      );
      setFormatData({ image: null });
    } catch (error) {
      setResponseMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setShowPopup(false);
    }
  };



  return (
    <div className={styles.registration}>
      <div className="container">
        {/* Response Message */}
        {responseMessage && (
          <ResponseMessage
            className="Instructive_text"
            value={responseMessage}
            onClick={() => setResponseMessage("")}
          />
        )}

        <div className={styles.preview}>
          <div className={styles.image_poster}>
            <img src={FaceIdImage} alt="Face ID Poster" />
          </div>

          <div className={styles.accessCam}>
            <p>
              <span>
                <i className="fa-solid fa-hand-point-right"></i>
              </span>
              To start scanning your face, please allow access to the camera.
            </p>

            <Button
              className="start_btn"
              value={"Start Camera"}
              action={() => setShowPopup(true)}>
              <i className="fa-solid fa-camera"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Webcam Popup */}
      <Popup
        isLoading={isLoading}
        handleImage={handleImage}
        isOpen={showPopup}
        type="registration"
        onClose={() => setShowPopup(false)}
        onDataReceived={(data) => {
          setFormatData((prev) => ({ ...prev, image: data }));
          handleImageUpload();
        }}
        setBackImage={(data) => {
          setFormatData((prev) => ({ ...prev, image: data }))
        }
        }
      />
    </div>
  );
}

export default Registration;
