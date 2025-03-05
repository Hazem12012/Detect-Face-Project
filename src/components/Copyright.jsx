import React from 'react'
import styles from './Copyright.module.css'

function Copyright() {
    return (
        <p className={styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by Frist Teem  Inc.
        </p>
    )
}

export default Copyright