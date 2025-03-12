/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import LoginImage from "../components/assets/loginImage.webp";
import Popup from "../components/Popup";
import DemoImage from "../components/assets/demo-Image.jpg";
import ResponseMessage from "../components/ResponseMessage";

export default function Login() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formatData, setFormatData] = useState({
    image: null,
    name: "",
    id: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormatData({ ...formatData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formatData.image) {
      setResponseMessage("Please select an image!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    if (formatData.image.startsWith("data:image")) {
      const base64Response = await fetch(formatData.image);
      const blob = await base64Response.blob();
      formData.append("image", blob, "image.jpg");
    } else {
      formData.append("image", formatData.image);
    }

    formData.append("student_id", formatData.id); // Match API expectation
    formData.append("name", formatData.name);

    try {
      const response = await fetch(
        "https://faceattend.up.railway.app/api/v1/students/register",
        {
          method: "POST",
          body: formData,
          // Let browser set the Content-Type header for FormData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      const data = await response.json();
      console.log("Success:", data);
      setResponseMessage("Registration successful!✅");

      setFormatData({
        image: null,
        name: "",
        id: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = (file) => {
    if (file instanceof File) {
      setFormatData((prev) => ({ ...prev, image: file }));
    } else {
      setResponseMessage("❌ Invalid file received");
      console.error("❌ Invalid file received:", file);
    }
  };

  return (
    <div className={styles.LoginForm}>
      <div className={"container"}>
        <div className={styles.content}>
          {responseMessage && (
            <ResponseMessage
              className={`Instructive_text`}
              value={responseMessage}
              onClick={() => setResponseMessage("")}
            />
          )}
          <div className={styles.image}>
            <img src={LoginImage} alt="Login" />
          </div>
          {/* Popup for Image Upload */}
          <Popup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            onDataReceived={(data) =>
              setFormatData((prev) => ({ ...prev, image: data }))
            }
            setBackImage={(data) =>
              setFormatData((prev) => ({ ...prev, image: data }))
            }
          />

          {/* Start Form */}
          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <button
              className={styles.imageUpload}
              onClick={(e) => {
                e.preventDefault(); // Fixed preventDefault syntax
                setShowPopup(true);
              }}
              disabled={isLoading}>
              <img
                src={formatData.image || DemoImage}
                alt="Uploaded"
                className={styles.imagePreview}
                onChange={handleImageUpload}
              />
            </button>

            {/* Name Input */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                value={formatData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
                disabled={isLoading}
                placeholder=""
              />
              <label className={styles.label}>Full Name</label>
            </div>

            {/* ID Input */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="id"
                value={formatData.id}
                onChange={handleChange}
                className={styles.inputField}
                required
                disabled={isLoading}
                placeholder=""
              />
              <label className={styles.label}>ID</label>
            </div>

            {/* Submit Button */}
            <div className={styles.loginRegistered}>
              <Link to="/">Are you already registered?</Link>
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              onClick={handleForm}
              disabled={isLoading}>
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
