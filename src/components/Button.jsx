
import styles from "./Button.module.css"
function Button({ value, className, action, children }) {
    return (
        <button className={`${styles[className]}`} onClick={action}>{value} {children}</button>
    )
}

export default Button
