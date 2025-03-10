import React from 'react'
import styles from './Copyright.module.css'

function Copyright() {
    const copyStyles = {
        color: "#CDDC39",
        fontize: "16px",
        fontWeight: " bold",
    }
    return (
        <p className={styles.copyright}>
            &copy; Copyright <span style={copyStyles}>{new Date().getFullYear()}</span> by Frist Teem  Inc.
        </p>
    )
}

export default Copyright