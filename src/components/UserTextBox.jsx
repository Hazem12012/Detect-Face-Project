/** @format */

import styles from "./UserTextBox.module.css";
function UserTextBox({ textValue, titleValue }) {
    return (
        <div className={styles.textBox}>
            {titleValue && <h1 className="title">
                <i className="fas fa-angle-double-right"></i>
                {titleValue}
            </h1>}
            {textValue && <p className="textGuide" styles={{ color: "red" }}>
                <i class="fa-solid fa-circle-dot"></i>
                {textValue}
            </p>}
        </div>
    );
}

export default UserTextBox;
