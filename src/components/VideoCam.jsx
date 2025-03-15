/** @format */

import { useRef, useEffect, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import React from "react";
import Message from "./Message";
import styles from "./VideoCam.module.css";
import Poster from "./assets/Face_ID_Poster.webp";
import Loading from "./Loading";

export default function VideoCam({ sendData, detectCheck }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [image, setImage] = useState(null);
  const detectIntervalRef = useRef(null);

  useEffect(() => {
    detectCheck(faceDetected);
  }, [faceDetected, detectCheck]);

  // Start Webcam
  const startVideo = useCallback(async () => {
    try {
      // Video streaming is stored in various formats.
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setMessage(true);
    }
  }, []);
  // Load Face-API Models
  const loadModels = useCallback(async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      setModelsLoaded(true);
    } catch (error) {
      console.error("Error loading models:", error);
    }
  }, []);

  // Face Detection

  const faceMyDetect = useCallback(() => {
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
    }
    detectIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 160 })
        ) // Smaller input size = faster processing
        .withFaceLandmarks()
        .withFaceExpressions();
      const canvas = canvasRef.current;
      const video = videoRef.current;

      faceapi.matchDimensions(canvas, {
        width: video.videoWidth,
        height: video.videoHeight,
      });

      const resizedDetections = faceapi.resizeResults(detections, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      setFaceDetected(detections.length > 0 && detections.length <= 1);
    }, 300);

    // Faster updates
  }, []);

  // Take Photo
  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      sendData(imageUrl);
    }
  }, []);

  // Stop Webcam
  const stopVideo = () => {
    // Stop face detection interval
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
      detectIntervalRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Start Video & Load Models on Component Mount
  useEffect(() => {
    loadModels();
    startVideo();
  }, [startVideo, loadModels]);

  // Start Face Detection Once Models Are Loaded

  useEffect(() => {
    loadModels().then(() => {
      faceMyDetect();
    });

    return () => stopVideo(); // Cleanup function
  }, [loadModels, faceMyDetect]);

  // Take Photo When Face is Detected
  useEffect(() => {
    if (faceDetected) {
      setTimeout(() => {
        takePhoto();
        stopVideo();
      }, 400);
    }
  }, [faceDetected, takePhoto, image]);

  // Reload Page
  const reloadPage = () => {
    window.location.reload();
  };
  return message ? (
    <Message
      value={"I can't access the camera 🔐"}
      className={"error message"}
      type={"error"}>
      <button onClick={reloadPage} className={styles.reloadBtn}>
        Reload page
      </button>
    </Message>
  ) : (
    <div className={styles.appvideo}>
      {!modelsLoaded && <Loading />}
      {!image && (
        <>
          <video
            poster={Poster}
            ref={videoRef}
            crossOrigin="anonymous"
            className={styles.video}
            autoPlay
            muted
            playsInline></video>
          <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </>
      )}
      {image && (
        <div className={styles.photoContainer}>
          <img src={image} alt="Captured" className={styles.imageCaptured} />
        </div>
      )}
    </div>
  );
}
