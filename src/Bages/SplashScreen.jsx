import React, { useEffect } from "react";
import styles from "../Bages/SplashScreen.module.css"
import splashLogo from "../components/assets/splash screen.png";

const SplashScreen = ({ onFinish }) => {    
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onFinish]);


    return (
        <div className={styles.splashScreen}>
            <img src={splashLogo} alt="Splash Logo" className={styles.splashImage} />
            <p className={styles.splashText}>Welcome to Our App</p>
        </div>
    );
};

export default SplashScreen;
