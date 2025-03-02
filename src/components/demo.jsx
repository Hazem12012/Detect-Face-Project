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