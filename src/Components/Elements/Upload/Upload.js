import React, { useState } from "react";
import styles from "./upload.module.css";
import { Input, Button } from "antd";
import { ArrowUpOutlined as ArrowUpwardIcon } from "@ant-design/icons";

const CustomUpload = ({change,file, onClick}) => {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const uploadHandler = (e) => {
//     const uplaodFilePath = e.target.value;
//     setUploadedFile(uplaodFilePath);

//     change(e.target.files[0])
//   };

  return (
    <div className="u-display-flex">
      {/* <Input value={file} disabled={file ? false : true} /> */}
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={change}
        onClick={onClick}
        accept='.doc, .docx, .xls, .xlsx,.pdf,.png,.txt,.jpg, .jpeg,.gif'
        // inputProps={{ acceptOnly: '.doc, .docx, .xls, .xlsx,.pdf,.png' }}
        // restrictions={{
        //   allowedExtensions: [".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png"],
        // }}
      />
      <label htmlFor="contained-button-file">
        <Button type="primary" size="large" className="UploadFileButton">
          <i className="icon-file-upload uploadfile"></i>Upload File
        </Button>
      </label>
    </div>
  );
};

export default CustomUpload;