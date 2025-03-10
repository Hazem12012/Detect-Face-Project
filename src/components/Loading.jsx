import styles from "./Loading.module.css"
function Loading({ className }) {
    return (
        <div className={className || styles.loading}>
            Loading...
        </div>
    )
}

export default Loading
