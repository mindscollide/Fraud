import React from "react";
import logo from "../../../assets/images/HBL-Logo.png";
import styles from "./style.module.css";
const Loader = () => {
  return (
    <div id="overlay" className={styles.overlay}>
      <div className={styles.containerloader}>
        <span className={styles.Loaderlogo}>
          <img src={logo} alt="loading" />
        </span>
        <div className={styles.line}>
          <div className={styles.inner}></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
