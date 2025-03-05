import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import React from "react";

function Navbar() {
    return (
        <nav className={`${styles.nav}`}>
            <Link to="/" className={styles.logo_link}><img src={logo} alt="not found" className={styles.logo} /></Link>
            <ul className="nav-links">
                <li>
                    <NavLink className={styles.navLink} to="/">Registration</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navLink} to="/Login">Login</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navLink} to="/User_guide">User guide</NavLink>
                </li>
            </ul>
        </nav >
    );
}

export default Navbar;
