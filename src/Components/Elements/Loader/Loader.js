import React from "react";
import styles from "./style.module.css";
const Loader = () => {
  return (
    <div id="overlay" className={styles.overlay}>
      <div className={styles.containerloader}>
        <span className={styles.Loaderlogo}>
          Fraud Digitization Portal
        </span>
        <div className={styles.line}>
          <div className={styles.inner}></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
