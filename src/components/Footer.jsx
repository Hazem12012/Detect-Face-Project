/** @format */

import React from "react";
import styles from "./Footer.module.css";
import Copyright from "./Copyright";
import Logo from "./assets/logo.png";
import DemoImage from "./assets/demo-Image.jpg";

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.image}>
                        <img src={Logo} alt="Not Found" />
                    </div>
                    <h1 >This web site created by frisit teem  from himit to Dr Ahmed Eltoukhy 💼</h1>
                    <ul>
                        <li>
                            <a
                                target="_balnk"
                                href="https://github.com/Hazem12012?tab=overview&from=2025-03-01&to=2025-03-05">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="https://www.facebook.com/profile.php?id=100041358217464&locale=ar_AR">
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="https://www.linkedin.com/in/hazem-abo-el-seoud-168bb4290/">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_balnk"
                                href="mailto:hazmadwalswd813@gmail.com?subject=contact">
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <div className={styles.team_members}>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3>Hazem Mahmoud Abo El-Seoud</h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3></h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3></h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3></h3>
                        </div>
                        <div className={styles.member}>
                            <img src={DemoImage} alt="Not found" />
                            <h3></h3>
                        </div>
                    </div>
                </div>
                <div className={styles.box}></div>
            </div>
            <div className={styles.footer_background}></div>

            <Copyright />
        </div>
    );
}

export default Footer;
