import React from "react";
import styles from "./error.module.css";
const ErrorBar = ({ errorText }) => {
  return (
    <div className={styles.error}>
      {" "}
      <span className={styles.caption}>{errorText}</span>
    </div>
  );
};

export default ErrorBar;
