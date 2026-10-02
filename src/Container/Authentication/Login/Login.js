import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.css";
import { Input, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Loader,
  Notification,
  MaxWidthContainer,
} from "../../../Components/Elements";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signupREsponseMessageCleare,
} from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";
import { clearestateBackbutton } from "./../../../store/actions/auth-actions";
const Login = () => {
  const state = useSelector((state) => state);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const { Title } = Typography;
  const navigate = useNavigate();
  Helper.navigate = navigate;
  const [credentials, setCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const validateHandler = (e) => {
    e.preventDefault();
    if (credentials.UserName === "" || credentials.Password === "") {
      setOpen({
        ...open,
        open: true,
        message: "Please fill all fields",
      });
    } else {
      dispatch(signIn(credentials));
    }
  };

  useEffect(() => {
    Helper.navigate = navigate;
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, [credentials]);
  useEffect(() => {
    if (ui.SomeThingWentWrong === true) {
      setOpen({
        ...open,
        open: true,
        message: "Your Session has expired. Please login again",
      });
    }
  }, [ui.SomeThingWentWrong]);
  useEffect(() => {
    dispatch(clearestateBackbutton());
  }, []);
  useEffect(() => {
    if (
      auth.SessionExpeireResponseMessage !== "" &&
      auth.SessionExpeireResponseMessage !== undefined &&
      auth.SessionExpeireResponseMessage !== null
    ) {
      setOpen({
        ...open,
        open: true,
        message: auth.SessionExpeireResponseMessage,
      });
    } else {
      if (auth.signUpResponseMessage !== "") {
        setOpen({
          ...open,
          open: false,
          message: "",
        });
      }
    }
  }, [auth.SessionExpeireResponseMessage]);

  // for notifications for signup
  useEffect(() => {
    if (auth.signUpResponseMessage !== "") {
      setOpen({
        ...open,
        open: true,
        message: auth.signUpResponseMessage,
      });
      setTimeout(() => {
        setOpen({
          ...open,
          open: false,
          message: "",
        });
      }, 10000);
      dispatch(signupREsponseMessageCleare());
    }
  }, [auth.signUpResponseMessage]);

  useEffect(() => {}, [auth.ResponseMessage]);
  useEffect(() => {
    if (UserIDInput.current) {
      UserIDInput.current.focus();
    }
  }, [UserIDInput]);

  return (
    <MaxWidthContainer>
      <form onSubmit={(e) => validateHandler(e)}>
        <div
          className={`${styles.boxHeightLogin} u-display-flex u-align-items-center`}
        >
          <Row justify="end" style={{ width: "100%" }}>
            <Col lg={12} md={12} sm={24}></Col>
            <Col lg={12} md={12} sm={24} className="u-text-align-right">
              <div className={styles.loginBody}>
                <Title level={3} className={styles.fraudMainTitle}>
                  Fraud Digitization Portal
                </Title>
                <div className={styles.margin6p} />
                <Title level={5} className={styles.labelLogin}>
                  User ID
                </Title>

                <Input
                  name="UserName"
                  size="large"
                  placeholder="User ID"
                  prefix={<UserOutlined />}
                  onChange={setCredentialHandler}
                  value={credentials.UserName}
                  ref={UserIDInput}
                  autoComplete="off"
                />
                <div className={styles.margin6p} />
                <Title level={5} className={styles.labelLogin}>
                  Password
                </Title>
                <Input
                  name="Password"
                  size="large"
                  placeholder="password"
                  onChange={setCredentialHandler}
                  autoComplete="off"
                  className={styles.passwordInputField}
                  type="text"
                />

                {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
                  <div className="u-text-align-center">
                    <div className={styles.error + " " + styles.fade}>
                      {auth.ResponseMessage}
                    </div>
                  </div>
                ) : null}

                <div className={styles.margin10p} />
                <div className="u-text-align-center u-display-flex u-justify-content-space-evenly">
                  <Button
                    applyClass="btnBorderStyled"
                    text="Login"
                    endIcon={<i className="icon-login icon-size-one"></i>}
                    type="submit"
                  />
                  <Link to="/Signup">
                    <Button
                      applyClass="btnBorderStyledRedSignup"
                      text="SIGN UP"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </MaxWidthContainer>
  );
};

export default Login;
