// import React, { useState } from "react";
// import styles from "./upload.module.css";
// import { Input } from "antd";
// import Button from "@mui/material/Button";
// import { ArrowUpOutlined as ArrowUpwardIcon } from "@ant-design/icons";
// // import { UploadOutlined } from "@ant-design/icons";
// import Table from "../Table/table";
import styles from "./upload.module.css";
import { ArrowUpOutlined as ArrowUpwardIcon } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
// const CustomUpload = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const uploadHandler = (e) => {
//     const uplaodFilePath = e.target.value;
//     var filename = uplaodFilePath.replace(/^.*[\\\/]/, "");
//     alert(filename);
//     var dat = [
//       {
//         title: "File Name",
//         dataIndex: "filename",
//         key: "filename",
//         align: "center",
//         width: "2%",
//       },
//     ];
//     setUploadedFile(...filename);
//   };
//   const column = [
//     {
//       title: "File Name",
//       dataIndex: "miSysCode",
//       key: "miSysCode",
//       align: "center",
//       width: "2%",
//     },
//     {
//       title: "Delet",
//       dataIndex: "miSysCode",
//       key: "miSysCode",
//       align: "center",
//       width: "2%",
//     },
//   ];

//   return (
//     <div className="u-display-flex">
//       {/* <Input value={uploadedFile} disabled={uploadedFile ? false : true} /> */}
//       <Table
//         rows={uploadedFile}
//         columns={column}
//         scroll={{ x: "max-content" }}
//       />
//       <input
//         className={styles.uploadText}
//         id="contained-button-file"
//         type="file"
//         onChange={uploadHandler}
//       />
//       <label htmlFor="contained-button-file">
//         <Button
//           variant="contained"
//           color="primary"
//           component="span"
//           className={styles.btnSecondarySolid}
//         >
//           {/* <ArrowUpwardIcon /> */}
//           {/* <UploadOutlined className="u-font-size-16px" /> */}
//           <p
//             className="icon-file-upload "
//             style={{
//               marginTop: "7px",
//               marginBottom: "9px",
//               fontSize: "18px",
//             }}
//           ></p>
//           Upload File
//         </Button>
//       </label>
//     </div>
//   );
// };

// export default CustomUpload;
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUploadList } from "../../../store/actions/setup-forms-actions";

const Uploads = () => {
  const dispatch = useDispatch();
  const props = {
    onChange: (info) => {},
  };
  return (
    <Upload {...props} accept={".pdf"} showUploadList={false}>
      <Button className="UploadFileButton">
        <i className="icon-file-upload uploadfile"></i>Upload File
      </Button>
    </Upload>
  );
};
export default Uploads;
