import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

// Which auth page was shown last in this tab. Arriving at the other one slides
// the panel across however the switch happened (panel button, Go Back,
// browser back/forward, redirects); a fresh page load starts with null, so it
// doesn't slide. Kept in memory (not in an unmount cleanup) because React
// renders the new page before the old page's cleanup runs.
let lastAuthMode = null;

// how long the panel takes to grow to full screen before the page switches
const GROW_MS = 450;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split-screen shell for Login / Sign Up: a white form side and an orange
// panel that swaps sides when switching between the two. Switching grows the
// panel to full screen, then the next page shrinks it back from the other side.
// switchRef (optional) receives the switch function, for buttons in the form.
const AuthLayout = ({ mode, onSwitch, switchRef, children }) => {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const [slideIn] = useState(() => lastAuthMode !== null && lastAuthMode !== mode);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    lastAuthMode = mode;
  }, [mode]);

  const switchPage = () => {
    if (expanding) return;
    const go = () => {
      const target = isLogin ? "/SignUp" : "/";
      if (onSwitch) onSwitch();
      // onSwitch may already have navigated (Sign Up's clearestate() does);
      // don't push the same page onto the history twice
      if (window.location.pathname.toLowerCase() !== target.toLowerCase()) {
        navigate(target);
      }
    };
    if (prefersReducedMotion()) {
      go();
      return;
    }
    setExpanding(true);
    setTimeout(go, GROW_MS);
  };
  if (switchRef) switchRef.current = switchPage;

  return (
    <div
      className={`${styles.shell} ${isLogin ? styles.loginMode : styles.signupMode} ${
        slideIn ? styles.slideIn : ""
      } ${expanding ? styles.expanding : ""}`}
    >
      <section className={styles.formSide}>
        <div className={styles.brand}>Fraud Digitization Portal</div>
        <div className={styles.formInner}>{children}</div>
      </section>

      {/* animated cover used when switching pages (see style.module.css) */}
      <div className={styles.curtain} aria-hidden="true" />

      <aside className={styles.panel}>
        <span className={`${styles.shape} ${styles.triangleBig}`} />
        <span className={`${styles.shape} ${styles.triangleSmall}`} />
        <span className={`${styles.shape} ${styles.diamond}`} />
        <span className={`${styles.shape} ${styles.circleBig}`} />
        <span className={`${styles.shape} ${styles.dotOne}`} />
        <span className={`${styles.shape} ${styles.dotTwo}`} />
        <span className={`${styles.shape} ${styles.bar}`} />

        <div className={styles.panelContent}>
          <h2 className={styles.panelTitle}>
            {isLogin ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className={styles.panelText}>
            {isLogin
              ? "New to the portal? Send a signup request and start your journey with us."
              : "To keep connected with us, please sign in with your LDAP ID."}
          </p>
          <button type="button" className={styles.ghostButton} onClick={switchPage}>
            {isLogin ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AuthLayout;
