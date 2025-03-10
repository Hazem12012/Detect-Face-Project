/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import LoginImage from "../components/assets/loginImage.webp";
import Popup from "../components/Popup";
import DemoImage from "../components/assets/demo-Image.jpg";

export default function Login() {
  const [showPopup, setShowPopup] = useState(false);
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
    console.log("Submitted Data:", formatData);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!formatData.image) {
      alert("يرجى اختيار صورة!");
      return;
    }

    const formData = new FormData();
    formData.append("image", formatData.image);
    formData.append("name", formData.name);
    formData.append("id", formData.id);

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
    <div className={styles.LoginForm}>
      <div className={"container"}>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={LoginImage} alt="Login" />
          </div>

          {/* Popup for Image Upload */}
          <Popup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            onDataReceived={(data) => setFormatData((prev) => ({ ...prev, image: data }))}
            setBackImage={(data) => setFormatData((prev) => ({ ...prev, image: data }))}
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
            >
              <img
                src={formatData.image || DemoImage}
                alt="Uploaded"
                className={styles.imagePreview}
                onChange={handleChange}
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
              />
              <label className={styles.label}>ID</label>
            </div>

            {/* Submit Button */}
            <div className={styles.loginRegistered}>
              <Link to="/">Are you already registered?</Link>
            </div>
            <button type="submit" className={styles.submitButton} onClick={handleForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
