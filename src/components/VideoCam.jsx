import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import React from "react";
import Message from "./Message";
import styles from "./VideoCam.module.css";
import Poster from "./assets/Face_ID_Poster.webp"

export default function VideoCam() {
    // variables & hooks
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [message, setMessage] = useState(false);
    // not used in real time
    const [startCam, setStartCam] = useState(false);
    const [loadingModel, setloadingModel] = useState(false);
    // WEBCAM

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    // loadModels();
                    videoRef.current.play(); // Ensure video starts before detection
                };
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            setMessage(true);
        }
    };

    // LOAD MODILS FROM FACE API
    const loadModels = async () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]).then(() => {
            faceMyDetect();
        });
    };
    const faceMyDetect = () => {
        setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
            // DROW YOU FACE IN WEB CAM
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
                videoRef.current
            );
            faceapi.matchDimensions(canvasRef.current, { width: 940, height: 650 });

            const resize = faceapi.resizeResults(detections, {
                width: 940,
                height: 650,
            });

            faceapi.draw.drawDetections(canvasRef.current, resize);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resize);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resize);
            console.log(detections);
        }, 1000);
    };
    function startModel() {
        startVideo();
        videoRef && loadModels();
    }
    const reloadPage = () => {
        window.location.reload();
    };
    return message ? (
        <Message
            value={"I can't access the camera 🔐"}
            className={"error message"}
            type={"error"}
        >
            <button onClick={reloadPage}>Reload page</button>
        </Message>
    ) : (
        <div >
            <button style={{ zIndex: 33333 }} onClick={startModel} className={styles.startBTN}>
                Start Camera
            </button>
            <div className={styles.appvideo}>
                <video
                    poster={Poster}
                    ref={videoRef}
                    crossOrigin={"anonymous"}
                    className={styles.video}
                    autoPlay
                    muted
                    playsInline
                ></video>
                <canvas
                    ref={canvasRef}

                    className={styles.canvas}></canvas>
            </div>

        </div>
    );
}