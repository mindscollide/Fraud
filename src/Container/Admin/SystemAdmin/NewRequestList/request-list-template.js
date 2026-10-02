import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import {
  saveUserRequest,
  newRequestList,
} from "./../../../../store/actions/request-actions";
import styles from "../../../Authentication/SignUp/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Button,
  Loader,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import { ControlOutlined } from "@ant-design/icons";

const RequestListTemplate = ({ data }) => {
  const { item, index } = data;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { requestReducer } = state;
  const [userRequestDetails, setUserRequestDetails] = useState(
    requestReducer.UserRequestDetails
  );
  const [btndisplay, setBtnDisplay] = useState(true);
  const Approved = 6;
  const Rejected = 7;
  const [comment, setComment] = useState("");
  const Comments = (e) => {
    let value = e.target.value;
    setComment(value);
    if (value.length > 0) {
      setBtnDisplay(false);
    } else {
      setBtnDisplay(true);
    }
  };
  let transactionTypeIDs = item.transactionTypeIDs;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const goToSaveHandler = (data, Status) => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let UserID = UserDetails.userID;
    setBtnDisplay(true);
    dispatch(saveUserRequest(data, Status, comment, UserID));
    setComment("");
  };

  const transitionHandler = (text) => {
    if (text !== undefined && text !== null) {
      let tem = [];
      text.map((data, index) => {
        let n = data.transactionName;
        if (tem === []) {
          tem = [n];
        } else {
          tem = [...tem, n];
        }
      });
      return tem.join(", ");
    } else {
      return "";
    }
  };
  // for notifications for Save or Reject
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    if (requestReducer.ResponseMessage === "Save Successfully") {
      setOpen({
        ...open,
        flag: true,
        message: "Record saved",
      });
      setComment("");
    }
    setComment("");
  }, [requestReducer.ResponseMessage]);
  useEffect(() => {}, [comment]);

  return (
    <>
      <Paper padding="1" index={index}>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              First Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.firstName}</span>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              Last Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.lastName}</span>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              Email
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.email}</span>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              User Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.loginID}</span>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              Role
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">
              {item.roleID === 4
                ? "Investigation Manager"
                : item.roleID === 3
                ? "Investigation Officer"
                : item.roleID === 7
                ? "Auditor"
                : item.roleID === 5
                ? "QA Manager"
                : item.roleID === 6
                ? "MIS Manager"
                : item.roleID === 2
                ? "System Administrator"
                : item.roleID === 1
                ? "Security Administrator"
                : null}
            </span>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0 u-color-b27706">
              Transaction Type
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            {item.transactionTypeIDs !== undefined &&
            item.transactionTypeIDs !== null
              ? transitionHandler(transactionTypeIDs)
              : null}
          </Col>
        </Row>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={4} xs={4}>
            <p className="m-0 u-color-b27706">
              Type your Comments<span className="u-color-ce0000">*</span>
            </p>
          </Col>
          <Col lg={18} md={18} sm={20} xs={20}>
            <TextField
              multiline
              rows={4}
              change={Comments}
              value={comment}
              fullWidth
              name="Comments"
              autoComplete="off"
              required={true}
            />
          </Col>
        </Row>
        <div className="u-margin-top-20px" />
        <Row gutter={8}>
          <Col md={8} lg={8} sm={24}></Col>
          <Col md={16} lg={16} sm={24}>
            <div className="u-display-flex">
              <div style={{ width: "20%" }}>
                <Button
                  applyClass="buttonPrimary3"
                  text="Approve"
                  icon={<i className="icon-check icon-size-one "></i>}
                  click={() => goToSaveHandler(item, Approved)}
                  disableBtn={btndisplay}
                />
              </div>
              <div className="u-margin-0-5px-0-5px" />
              <div style={{ width: "25%" }}>
                <Button
                  applyClass="btnBorderStyledRed"
                  text="Reject"
                  icon={<i className="icon-close icon-size-one"></i>}
                  click={() => goToSaveHandler(item, Rejected)}
                  disableBtn={btndisplay}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Paper>
      <div className="u-margin-top-20px" />
    </>
  );
};
export default RequestListTemplate;
