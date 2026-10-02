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
  MaxWidthContainer,
} from "../../../../Components/Elements";
import RequestListTemplate from "./request-list-template";
import { ControlOutlined } from "@ant-design/icons";

const NewRequestList = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { wofApprovals, requestReducer, ui } = state;
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
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const goToSaveHandler = (data, Status) => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let UserID = UserDetails.userID;
    let comments = comment;
    setComment("");
    setBtnDisplay(true);
    dispatch(saveUserRequest(data, Status, comments, UserID));
  };
  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserDetails.userID;
    dispatch(newRequestList(userid));
  }, []);
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    setComment("");
  }, [requestReducer.UserRequestDetails]);
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
      <MaxWidthContainer>
        {userRequestDetails !== null && userRequestDetails.length > 0 ? (
          <>
            <Title level={3}>
              <div className="NotificationTitle">Pending Signup Requests</div>
            </Title>
            <Row gutter={8}>
              <Col lg={24} md={24} sm={24}>
                <Title level={5}>
                  <div className="NotificationDescription">
                    Below are the pending Sign Up requests for your approval
                  </div>
                </Title>
              </Col>
            </Row>
            {userRequestDetails.map((item, index) => (
              <RequestListTemplate
                data={{
                  item: item,
                  index: index,
                }}
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <Title level={3}>
              <div className="NotificationTitle">Pending Signup Requests</div>
            </Title>
            <Row gutter={8}>
              <Col lg={24} md={24} sm={24}>
                <Title level={5}>
                  <div className="NotificationDescription">
                    You do not have any Pending Signup Request
                  </div>
                </Title>
              </Col>
            </Row>
          </>
        )}
        <Notification
          setOpen={setOpen}
          open={open.flag}
          message={open.message}
        />
        {requestReducer.Loading ? <Loader /> : null}
      </MaxWidthContainer>
    </>
  );
};
export default NewRequestList;
