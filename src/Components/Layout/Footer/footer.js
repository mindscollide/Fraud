import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  // code to get year
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <section className={styles.footer}>
        <section className={styles.innerContent}>
          <div>
            <small>Privacy policy | Disclaimer</small>{" "}
          </div>
          <div>
            <small>{`© ${year} HBL All Rights Reserved`}</small>{" "}
          </div>
        </section>
      </section>
    </>
  );
};

export default Footer;
