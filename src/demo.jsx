// const videoRef = useRef(null);


// useEffect(() => {
//     const startVideo = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (err) {
//             console.error("Error accessing webcam:", err);
//         }
//     };
//     startVideo();
// }, [])
//************************************************************************* */
// /** @format */

// import { useRef, useEffect, useState } from "react";
// import * as faceapi from "face-api.js";
// import React from "react";
// import Message from "./Message";

// export default function VideoCam() {
//     // variables & hooks
//     const videoRef = useRef();
//     const canvasRef = useRef();
//     const [message, setMessage] = useState(false);
//     // WEBCAM
//     const startVideo = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (err) {
//             console.error("Error accessing webcam:", err);
//             setMessage(true);
//         }
//     };
//     // LOAD MODILS FROM FACE API
//     const loadModels = async () => {
//         Promise.all([
//             faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//             faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//             faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//             faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//         ]).then(() => {
//             faceMyDetect();
//         });
//     };
//     // LOAD FORM USE EFFECT
//     useEffect(() => {
//         startVideo();
//         videoRef && loadModels();
//     }, []);
//     const faceMyDetect = () => {
//         setInterval(async () => {
//             const detections = await faceapi
//                 .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//                 .withFaceLandmarks()
//                 .withFaceExpressions();
//             // DROW YOU FACE IN WEB CAM
//             canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
//                 videoRef.current
//             );
//             faceapi.matchDimensions(canvasRef.current, { width: 940, height: 650 });

//             const resize = faceapi.resizeResults(detections, {
//                 width: 940,
//                 height: 650,
//             });

//             faceapi.draw.drawDetections(canvasRef.current, resize);
//             faceapi.draw.drawFaceLandmarks(canvasRef.current, resize);
//             faceapi.draw.drawFaceExpressions(canvasRef.current, resize);
//         }, 1000);
//     };

//     return message ? (
//         <Message
//             value={"I can't access the camera 🔐"}
//             className={"error message"}
//             type={"error"}
//         />
//     ) : (
//         <div className="appvideo">
//             <video
//                 ref={videoRef}
//                 crossOrigin={"anonymous"}
//                 className="video"
//                 autoPlay
//                 muted></video>
//             <canvas
//                 ref={canvasRef}
//                 width={"940"}
//                 height={"650"}
//                 className="canvas"></canvas>
//         </div>
//     );
// }


