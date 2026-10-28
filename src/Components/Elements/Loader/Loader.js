import React from "react";
import styles from "./style.module.css";

// Full-screen loader in the login panel's style: a small orange card with
// floating shapes, the portal name and bouncing dots. CSS-only; it waits a
// moment before appearing so quick requests don't flash it.
const Loader = () => {
  return (
    <div id="overlay" className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.card}>
        <span className={`${styles.shape} ${styles.triangle}`} />
        <span className={`${styles.shape} ${styles.circle}`} />
        <span className={`${styles.shape} ${styles.diamond}`} />

        <div className={styles.title}>Fraud Digitization Portal</div>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className={styles.visuallyHidden}>Loading…</span>
      </div>
    </div>
  );
};

export default Loader;
