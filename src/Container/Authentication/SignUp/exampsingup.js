import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { Loader, Notification } from "../../../components/Layout/Common";
import { UserContext } from "../../../context";

const SignUp = ({ ...props }) => {
  const [state, setState] = useState({
    DepartmentID: "",
    Email: "",
    PersonalNumber: "",
    RoleID: 4,
    Username: "",
    firstName: "",
    lastName: "",
    UserEmail: "",
  });

  const SignupContext = useContext(UserContext);
  const { userSignUp, getDepartments, Departments, getRoles, Roles, loading } =
    SignupContext;
  const route = useRouteMatch();
  const path = route.path;
  const [Errors, SetErrors] = useState({});
  const [displaySignUpVerification, setDisplaySignUpVerification] =
    useState("true");
  const [displayVerifyEmailAddress, setDisplayVerifyEmailAddress] =
    useState("true");
  const [displayVerifypassword, setDisplayVerifypassword] = useState("none");
  const [displaySignUpAfterApproval, setDisplaySignUpAfterApproval] =
    useState("none");
  const [userErroMessage, setUserErroMessage] = useState("");
  const [inputLoader, setInputLoader] = useState(
    "input-group align-items-center verifyemail-input"
  );
  const [inputIcon, setInputIcon] = useState("icon-arrow-right color-white");
  const [passwordLoader, setPasswordLoader] = useState(
    "input-group align-items-center verifyPassword-input"
  );

  const signUpSwitch = () => {
    setTimeout(() => {
      setPasswordLoader(
        "input-group align-items-center verifyPassword-input verifying"
      );
    }, 1000);
    setDisplaySignUpVerification("none");
    setDisplayVerifyEmailAddress("none");
    setDisplayVerifypassword("none");
    setDisplaySignUpAfterApproval(true);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    SetErrors({});
    const { errors, isvalid } = Validation(state);
    if (isvalid) {
      userSignUp(state);
    } else {
      SetErrors(errors);
    }
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserEmail = () => {
    setInputLoader(
      "input-group align-items-center verifyemail-input verifying"
    );
    SetErrors({});
    const { errors, isvalid } = ValidateUserEmail(state);
    if (isvalid) {
      setInputLoader("input-group align-items-center verifyemail-input");
      setInputIcon("color-white icon-check");
      setDisplayVerifypassword(true);
    } else {
      SetErrors(errors);
    }
  };
  const ValidateUserEmail = (state) => {
    const { UserEmail } = state;
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    let isvalid = true;
    let errors = {};
    if (!validateEmail(UserEmail)) {
      isvalid = false;
      setTimeout(() => {
        setInputLoader("input-group align-items-center verifyemail-input");
      }, 1000);

      setUserErroMessage("Email Address could not be verified");
      errors.UserEmail = true;
      errors.UserEmailsempty = false;
    }
    if (UserEmail === "") {
      isvalid = false;
      setTimeout(() => {
        setInputLoader("input-group align-items-center verifyemail-input");
      }, 1000);
      setUserErroMessage("Please Enter Email Address");
      errors.UserEmailsempty = true;
      errors.UserEmail = false;
    }
    return { errors, isvalid };
  };

  const Validation = (state) => {
    const {
      DepartmentID,
      Email,
      PersonalNumber,
      RoleID,
      Username,
      firstName,
      lastName,
      UserEmail,
    } = state;
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    let isvalid = true;
    let errors = {};
    if (!validateEmail(Email)) {
      isvalid = false;
      errors.Email = true;
    }

    if (firstName === "") {
      isvalid = false;
      errors.firstName = true;
    }
    if (lastName === "") {
      isvalid = false;
      errors.lastName = true;
    }
    if (DepartmentID === "") {
      isvalid = false;
      errors.DepartmentID = true;
    }
    if (PersonalNumber === "") {
      isvalid = false;
      errors.PersonalNumber = true;
    }
    if (RoleID === "") {
      isvalid = false;
      errors.RoleID = true;
    }
    if (Username === "") {
      isvalid = false;
      errors.Username = true;
    }

    return { errors, isvalid };
  };
  useEffect(() => {
    if (path === "/Signup") {
      document.body.className = "login-page";
    }
    getRoles();
    getDepartments();
    return () => {
      document.body.className = "";
    };
  }, [displayVerifypassword]);
  return (
    <div>
      <section className="body-content-container">
        <section className="inner-content-wrapper">
          <div className="login-body-container clearfix">
            <div className="Signup-body">
              <div className="h-xl color-white text-center mt-3 fw-semi-bold">
                Sign Up Request
              </div>

              <div
                className="form-horizontal varify-email-pass fade show"
                id="signUpVerification"
                style={{ display: displaySignUpVerification }}
              >
                <div
                  className="verifyemail-input-container signup-form-verifyEmailAddress fade show mb-3"
                  id="verifyEmailAddress"
                  style={{ display: displayVerifyEmailAddress }}
                >
                  <div className={inputLoader}>
                    <input
                      type="email"
                      className="form-control"
                      id="UserEmail"
                      name="UserEmail"
                      onChange={(e) => handleInput(e)}
                      placeholder="Enter email address"
                      required
                    />
                    <button
                      className="input-group-text bg-primary color-white p-2 EmailVerificationbtn btn p-0 border-0"
                      id="EmailVerificationTrigger"
                      onClick={() => handleUserEmail()}
                    >
                      <i className={inputIcon}></i>
                    </button>
                    <div className="loader-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <span
                    className={
                      Errors.UserEmail || Errors.UserEmailsempty
                        ? " error with-bg fade show "
                        : "error with-bg fade"
                    }
                  >
                    {userErroMessage}
                  </span>
                  {/* <span className={!Errors.UserEmailsempty ? "error with-bg fade  " : "error color-red"}>Please Enter Email</span> */}
                </div>

                <div
                  className="verifypassword-input-container signup-form-verifyPassword   mb-3"
                  id="verifypassword"
                  style={{ display: displayVerifypassword }}
                >
                  <div className={passwordLoader}>
                    <input
                      type="password"
                      className="form-control"
                      id="userPassword"
                      name="userPassword"
                      placeholder="Enter Password"
                      required
                    />
                    <button
                      className="input-group-text bg-primary color-white p-2 PasswordVerificationbtn btn p-0 border-0"
                      id="PasswordVerificationTrigger"
                      onClick={signUpSwitch}
                    >
                      <i className="icon-arrow-right color-white"></i>
                    </button>
                    <div className="loader-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="form-horizontal"
                method="post"
                onSubmit={handleLogin}
                style={{ display: displaySignUpAfterApproval }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div className="col">
                    <div className="form-group Email">
                      <label className="color-white mb-1 fw-semi-bold">
                        Email<span className="color-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Email"
                        name="Email"
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter Email"
                        disabled
                      />
                      {/* <span className={!Errors.Email ? "error with-bg fade" : "error with-bg fade show"}>Please Enter Valid Email</span> */}
                    </div>
                  </div>
                  <div className="col ml-5">
                    <div className="form-group Username">
                      <label className="color-white mb-1 fw-semi-bold">
                        Username<span className="color-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => handleInput(e)}
                        id="Username"
                        name="Username"
                        placeholder="Enter Username"
                        disabled
                      />
                      {/* <span className={!Errors.Username ? "error with-bg fade" : "error with-bg fade show"}>Please Enter User Name</span> */}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="col">
                    <div className="form-group FirstName">
                      <label className="color-white mb-1 fw-semi-bold">
                        First Name<span className="color-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter First Name"
                      />
                      <span
                        className={
                          !Errors.firstName
                            ? "error with-bg fade"
                            : "error with-bg fade show"
                        }
                      >
                        Please Enter First Name
                      </span>
                    </div>
                  </div>
                  <div className="col ml-5">
                    <div className="form-group LastName">
                      <label className="color-white mb-1 fw-semi-bold">
                        Last Name<span className="color-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter Last Name"
                      />
                      <span
                        className={
                          !Errors.lastName
                            ? "error with-bg fade"
                            : "error with-bg fade show"
                        }
                      >
                        Please Enter Last Name{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="col">
                    <div className="form-group PhoneNumber">
                      <label className="color-white mb-1 fw-semi-bold">
                        Personal Number<span className="color-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="PersonalNumber"
                        name="PersonalNumber"
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter Personal Number"
                      />
                      <span
                        className={
                          !Errors.PersonalNumber
                            ? "error with-bg fade"
                            : "error with-bg fade show"
                        }
                      >
                        Please Enter Personal Number{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="col mb-3">
                    <div className="Department select2-form-control">
                      <label className="color-white mb-1 fw-semi-bold">
                        Department<span className="color-red">*</span>
                      </label>
                      <select
                        name="DepartmentID"
                        id="DepartmentID"
                        onChange={(e) => handleInput(e)}
                        className="form-control input-placeholder-animate select-option select2-hidden-accessible Bottom-Margin"
                        area-placeholder="Department"
                      >
                        {Departments.map((department, index) => {
                          return (
                            <option key={index} value={department.departmentID}>
                              {department.departmentName}
                            </option>
                          );
                        })}
                      </select>

                      <span
                        className={
                          !Errors.DepartmentID
                            ? "error with-bg fade"
                            : "error with-bg fade show"
                        }
                      >
                        Please Select Department
                      </span>
                    </div>
                  </div>
                  <div className="col mb-3 ml-5">
                    <div className="Role select2-form-control">
                      <label className="color-white mb-1 fw-semi-bold">
                        Role<span className="color-red">*</span>
                      </label>
                      <select
                        name="RoleID"
                        id="RoleID"
                        onChange={(e) => handleInput(e)}
                        className="form-control input-placeholder-animate select-option select2-hidden-accessible Bottom-Margin"
                        area-placeholder="Steward"
                      >
                        {Roles.map((Role, index) => {
                          return (
                            <option key={index} value={Role.roleID}>
                              {Role.roleName}{" "}
                            </option>
                          );
                        })}
                        {/* <option  value={4}>
                                                    {"Steward"} </option> */}
                      </select>
                      <span
                        className={
                          !Errors.RoleID
                            ? "error with-bg fade"
                            : "error with-bg fade show"
                        }
                      >
                        Please Select Role{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="form-action text-center mb-3 u-display-flex u-flex-direction-row u-justify-content-space-around"
                >
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-primary btn-md radius-top-left radius-bottom-right"
                  >
                    <i className="icon-sent mr-3"></i>Sign Up
                  </button>
                  <Link
                    className="btn btn-danger radius-top-left radius-bottom-right px-3 py-2"
                    to="/"
                  >
                    Go Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
      {loading ? <Loader /> : null}
      <Notification />
    </div>
  );
};

export default SignUp;
