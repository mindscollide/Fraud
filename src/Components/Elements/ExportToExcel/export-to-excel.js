import React, { useEffect } from "react";
import styles from "./style.module.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ExportToExcel({ btnText, id, fileName }) {
  useEffect(() => {
    let el = document.getElementById("test-table-xls-button");
  }, []);
  return (
    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className={styles.downloadTableXlsButton}
      table={id ? id : "File"}
      filename={fileName ? fileName : "File"}
      sheet="tablexls"
      buttonText={btnText ? btnText : "Click"}
    />
  );
}

export default ExportToExcel;
