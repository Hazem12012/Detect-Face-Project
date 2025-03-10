/** @format */

import React from "react";
import styles from "./Footer.module.css";
import Copyright from "./Copyright";
import Logo from "./assets/logo.png";
import Logo_2 from "./assets/splash screen.png";

import DemoImage from "./assets/demo-Image.jpg";
import HazemImage from "./assets/hazem.jpg"
import AnasImage from "./assets/anas.jpg"
import MohamedImage from  "./assets/mohamed.jpg"
// import Post from "./post.jsx";

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.image}>
                        <img src={Logo} alt="Not Found" />
                    </div>
                    <h1>
                        This web site created by frisit teem from himit to Dr Ahmed
                        Eltoukhy.
                    </h1>
                    <ul>
                        <li>
                            <a
                                target="_balnk"
                                href="https://github.com/Hazem12012?tab=overview&from=2025-03-01&to=2025-03-05">
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="https://www.facebook.com/profile.php?id=100041358217464&locale=ar_AR">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="https://www.linkedin.com/in/hazem-abo-el-seoud-168bb4290/">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="mailto:hazmadwalswd813@gmail.com?subject=contact">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <div className={styles.team_members}>
                        <div className={styles.member}>
                            <img src={HazemImage || DemoImage} alt="Not found" />
                            <h3>Hazem Mahmoud Abo El-Seoud</h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3>Mahmoud Gamal Abdel Majeed</h3>
                        </div>
                        <div className={styles.member}>
                            <img src={MohamedImage || DemoImage} alt="Not found" />
                            <h3>Mohamed Wajih Ali
                            </h3>
                        </div>
                        <div className={styles.member}>
                            <img src={AnasImage || DemoImage} alt="Not found" />
                            <h3>Anas Mohammed Fathy Mohamed</h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3>Khaled Mohamed Ahmed</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <img src={Logo_2} alt="Not Found" className={styles.logo_2} />

                    <div className={styles.details}>
                        <span >
                            <i className="fa-solid fa-location-dot"></i>
                            <h3>Egypt</h3>
                        </span>
                        <span >
                            <i className="fa-solid fa-school"></i>
                            <h3>HIMIT</h3>
                        </span>
                    </div>
                    {/* <Post /> */}
                </div>
            </div>
            <div className={styles.footer_background}></div>

            <Copyright />
        </div>
    );
}

export default Footer;
