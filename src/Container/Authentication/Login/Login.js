import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.css";
import { Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Loader, Notification, AuthLayout } from "../../../Components/Elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signupREsponseMessageCleare,
} from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";
import { clearestateBackbutton } from "./../../../store/actions/auth-actions";
import ErrorBar from "../SignUp/ErrorBar/error-bar";
const Login = () => {
  const state = useSelector((state) => state);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const { auth, ui } = state;
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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ UserName: "", Password: "" });

  const setCredentialHandler = (e) => {
    const { name, value } = e.target;

    // clear the error for the field being edited
    // setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "Password") {
      let showText = "";
      for (let i = 0; i < value.length; i++) {
        showText += "•";
      }
      setCredentials({
        ...credentials,
        [name]: value,
        fakePassword: showText,
      });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const validateHandler = (e) => {
    e.preventDefault();

    const newErrors = {
      UserName:
        credentials.UserName.trim() === "" ? "Please enter LDAP ID" : "",
      Password: credentials.Password === "" ? "Password must not be empty" : "",
    };
    setErrors(newErrors);

    if (newErrors.UserName || newErrors.Password) return;

    dispatch(signIn(credentials));
  };
  // const setCredentialHandler = (e) => {
  //   if (e.target.name === "Password") {
  //     let numChars = e.target.value;
  //     let showText = "";
  //     for (let i = 0; i < numChars.length; i++) {
  //       showText += "•";
  //     }
  //     setCredentials({
  //       ...credentials,
  //       [e.target.name]: e.target.value,
  //       ["fakePassword"]: showText,
  //     });
  //   } else {
  //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
  //   }
  // };

  // const validateHandler = (e) => {
  //   e.preventDefault();
  //   if (credentials.UserName === "" || credentials.Password === "") {
  //     setOpen({
  //       ...open,
  //       open: true,
  //       message: "Please fill all fields",
  //     });
  //   } else {
  //     dispatch(signIn(credentials));
  //   }
  // };

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
    <>
      <AuthLayout mode="login">
        <form onSubmit={(e) => validateHandler(e)} className={styles.form}>
          <h1 className={styles.formTitle}>Fraud Digitization Portal</h1>
          <h1 className={styles.formTitle}>Sign in to the Portal</h1>
          <p className={styles.formSubtitle}>
            Use your LDAP User ID and password
          </p>

          <Input
            name="UserName"
            size="large"
            placeholder="User ID"
            prefix={<UserOutlined />}
            onChange={setCredentialHandler}
            value={credentials.UserName}
            ref={UserIDInput}
            autoComplete="off"
            className={styles.field}
            status={errors.UserName ? "error" : ""}
          />
          <Input
            status={errors.Password ? "error" : ""}
            name="Password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            suffix={
              <span
                className={styles.eye}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((shown) => !shown)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            }
            onChange={setCredentialHandler}
            autoComplete="off"
            className={`${styles.field} ${
              showPassword ? "" : styles.passwordInputField
            }`}
            type="text"
          />
          {errors.UserName && <ErrorBar errorText={errors.UserName} />}
          {errors.Password && !errors.UserName && (
            <ErrorBar errorText={errors.Password} />
          )}
          {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
            <div className={styles.error + " " + styles.fade}>
              {auth.ResponseMessage}
            </div>
          ) : null}

          <button type="submit" className={styles.primaryButton}>
            SIGN IN
          </button>
        </form>
      </AuthLayout>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </>
  );
};

export default Login;
