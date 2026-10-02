import React from "react";
import styles from "./max-width-container.module.css";

// Replaces MUI's <Container maxWidth="lg">, which every real usage in this
// app called with no other props. MUI's "lg" breakpoint is 1200px.
const MaxWidthContainer = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default MaxWidthContainer;
