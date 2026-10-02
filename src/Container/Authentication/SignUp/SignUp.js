import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Input, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  InputWithBtn,
  Loader,
  Notification,
  MultipleSelectCheckmarks,
  MaxWidthContainer,
} from "../../../Components/Elements";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorBar from "./ErrorBar/error-bar";
import {
  validateEmailAddress,
  validateEmailAndPassword,
  signUp,
  clearestate,
  clearestateBackbutton,
} from "./../../../store/actions/auth-actions";
import TextField from "../../../Components/Elements/InputFields/TextField/text-field";
import Select from "../../../Components/Elements/InputFields/SelectBox/select-box";
import GroupedButtons from "../../../Components/Elements/GroupedButtons/grouped-buttons";
import {
  GetAllTransactionTypes,
  GetAllRoles,
  GetAllRegion,
} from "../../../store/actions/setup-forms-actions";

const SignUp = () => {
  // to be use when get the api
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [finishStatus, setfinishStatus] = useState(false);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const [fields, setFields] = useState(false);
  const { Title } = Typography;
  const [btnDisable, setbtnDisable] = useState(false);
  const [emailAfterVerify, setEmailAfterVerify] = useState();
  const [emailAfterVerifyError, setEmailAfterVerifyError] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const errorMessagesStr = {
    notVerified: `could not be verified`,
    emptyField: `Please Enter`,
  };

  const [credentialsp, setCredentialsp] = useState({ fakePassword: "" });
  const [credentials, setCredentials] = useState({
    emailAddress: {
      content: "",
      isError: true,
      isSuccess: false,
      errorMessage: "",
      isFail: false,
    },
    password: {
      content: "",
      isSuccess: false,
      isError: true,
      errorMessage: "",
      isFail: false,
    },
    completed: false,
  });

  const [bio, setBio] = useState({
    email: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    userName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    firstName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    lastName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    transactionType: {
      content: [],
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    FK_RID: {
      content: 0,
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    FK_GSSUserRoleID: {
      content: 0,
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
  });

  // handler just to clear all values from fields to state on goback:
  const goback = () => {
    setbtnDisable(false);
    setCredentials({
      ...credentials,
      emailAddress: {
        content: "",
        isError: true,
        isSuccess: false,
        errorMessage: "",
        isFail: false,
      },
      password: {
        content: "",
        isSuccess: false,
        isError: true,
        errorMessage: "",
        isFail: false,
      },
      completed: false,
    });
    setBio({
      ...bio,
      email: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      userName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      firstName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      lastName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      transactionType: {
        content: [],
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      FK_RID: {
        content: 0,
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      FK_GSSUserRoleID: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
    });
    if (btnDisable === true) {
      navigate();
      gobackHandler();
    } else {
      navigate("/");
      dispatch(clearestate());
    }
  };

  const gobackHandler = () => {
    navigate("/");
    dispatch(clearestate());
  };

  useEffect(() => {
    if (
      auth.ResponseMessage !=
        "User already exists in Fraud System. Please use other credentials" &&
      auth.ResponseMessage !=
        "Signup request for the Login ID is in pending state. Please use a different ID"
    ) {
      setOpen({
        ...open,
        open: true,
        message: auth.ResponseMessage,
      });
    }
  }, [auth.ResponseMessage]);

  // handler just to set values from fields to state:
  const setFieldsHandler = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    switch (fieldName) {
      case "emailAddress":
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "password":
        let numChars = fieldValue;
        let showText = "";
        for (let i = 0; i < numChars.length; i++) {
          showText += "•";
        }
        setCredentialsp({
          ...credentialsp,
          ["fakePassword"]: showText,
        });
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "firstName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "lastName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;

      case "transactionType":
        break;

      case "FK_RID":
        break;

      case "FK_GSSUserRoleID":
        break;

      default:
        return null;
    }
  };

  const gobackBrowserHandler = () => {
    setbtnDisable(false);
    setCredentials({
      ...credentials,
      emailAddress: {
        content: "",
        isError: true,
        isSuccess: false,
        errorMessage: "",
        isFail: false,
      },
      password: {
        content: "",
        isSuccess: false,
        isError: true,
        errorMessage: "",
        isFail: false,
      },
      completed: false,
    });
    setBio({
      ...bio,
      email: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      userName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      firstName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      lastName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      transactionType: {
        content: [],
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      FK_RID: {
        content: 0,
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      FK_GSSUserRoleID: {
        content: 0,
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
    });
    dispatch(clearestateBackbutton());
  };

  //SignUpData Set
  const [SignupData, setSignupData] = useState({
    FK_GSSUserRoleID: 0,
  });

  //For User Roles
  const [userRoleName, setUserRoleName] = useState([]);
  const [userRole, setUserRole] = useState([]);

  //For Regions
  const [regionName, setRegionName] = useState([]);
  const [region, setRegion] = useState([]);

  //For Transaction Types
  const [selected, setSelected] = React.useState([]);
  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  const transactionTypeHandler = (e, value) => {};

  // For User Roles DropDown SetState
  useEffect(() => {
    let transactionName = setupForms.TransactionTypesData;
    setTransactionTypes(
      transactionName.map((data, index) => {
        return data.ttName;
      }),
    );
  }, [setupForms.TransactionTypesData]);

  // Selected Dropdown value
  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem = [...tem, pkID];
        }
      });
    });
  }, [selectedTransactionTypeName]);

  useEffect(() => {}, [transactionTypes]);

  // For User Roles
  // Selected Dropdown value
  const roleHandler = (e, value) => {
    setUserRoleName(value);
    let nameRole = setupForms.UserRolesData;
    nameRole.map((data, index) => {
      if (value === data.roleName) {
        let id = data.roleID;
        setBio({
          ...bio,
          ["FK_GSSUserRoleID"]: parseInt(id),
        });
      }
    });
  };

  // For UserRoles DropDown SetState
  useEffect(() => {
    let nameRole = setupForms.UserRolesData;
    setUserRole(
      nameRole.map((data, index) => {
        return data.roleName;
      }),
    );
  }, [setupForms.UserRolesData]);

  //UserRole clear state
  useEffect(() => {}, [userRole]);

  // For User Roles
  // Selected Dropdown value
  const regionHandler = (e, value) => {
    setRegionName(value);
    let nameRegion = setupForms.RegionData;
    nameRegion.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_RID;
        setBio({
          ...bio,
          ["FK_RID"]: parseInt(id),
        });
      }
    });
  };

  // For Region DropDown SetState
  useEffect(() => {
    let nameRegion = setupForms.RegionData;
    setRegion(
      nameRegion.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.RegionData]);

  //UserRole clear state
  useEffect(() => {}, [region]);

  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem = [...tem, pkID];
        }
      });
    });
    setBio({
      ...bio,
      ["transactionType"]: tem,
    });
  }, [selectedTransactionTypeName]);

  useEffect(() => {}, [transactionTypes]);

  useEffect(() => {
    dispatch(GetAllTransactionTypes());
    dispatch(GetAllRoles());
    dispatch(GetAllRegion());
  }, []);

  // to set body backgound
  useEffect(() => {
    gobackBrowserHandler();
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  // for notifications for signup
  useEffect(() => {
    if (ui.SomeThingWentWrong === true) {
      setOpen({
        ...open,
        open: true,
        message: "SomeThing Went Wrong Please Check Your Internet Connection",
      });
    }
  }, [ui.SomeThingWentWrong]);

  // for email validate error handle
  useEffect(() => {
    if (!auth.isError) {
      setbtnDisable(true);
      setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: auth.isError,
          isFail: auth.isFail,
          isSuccess: true,
        },
      });
    }
  }, [auth.isError, auth.isFail]);

  // for email verification id
  useEffect(() => {
    setEmailAfterVerifyError(auth.ResponseMessage);
  }, [auth.ResponseMessage]);

  useEffect(() => {}, [emailAfterVerifyError]);

  // checky validity
  const checkValidity = async (section) => {
    let email = credentials.emailAddress.content;
    switch (section) {
      case "verify-email":
        function validateEmail(email) {
          const re = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@hbl([\.])com/g;
          return re.test(String(email).toLowerCase());
        }
        if (
          !validateEmail(email) &&
          (credentials.emailAddress.content === "" ||
            credentials.emailAddress.content !== "")
        ) {
          // for Error message
          if (
            !validateEmail(email) &&
            credentials.emailAddress.content !== ""
          ) {
            setEmailAfterVerifyError("Enter your correct Email address");
          } else if (credentials.emailAddress.content === "") {
            setEmailAfterVerifyError("Please enter Email Address");
          }
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: true,
              content: "",
              isFail: true,
            },
          });
        } else if (validateEmail(email)) {
          await dispatch(
            validateEmailAddress(credentials.emailAddress.content),
          );
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: auth.isError,
              isFail: auth.isFail,
              isSuccess: true,
            },
          });
          setEmailAfterVerify(credentials.emailAddress.content);
        }
        break;
      case "verify-password":
        if (credentials.password.content === "") {
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: true,
              isFail: true,
              content: "",
            },
            completed: false,
          });
        } else {
          dispatch(
            validateEmailAndPassword(
              emailAfterVerify,
              credentials.password.content,
            ),
          );
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: false,
              isSuccess: true,
            },
            completed: true,
          });
        }
        break;
      case "verify-bio":
        let keys = Object.keys(bio);
        var copyState = { ...bio };
        await keys.forEach((item) => {
          if (copyState[item].content === "") {
            copyState[item].isError = true;
            copyState[item].errorMessage = "The Field is Empty";
          }
        });
        setBio({ ...copyState });
        dispatch(signUp(copyState));
        break;
      default:
        break;
    }
  };

  //  For button
  const buttonProps = {
    primaryButton: {
      text: "SIGN UP",
      icon: <i className="icon-sent icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeachSignup",
      size: "small",
      disable: false,
      click: () => checkValidity("verify-bio"),
    },
    secondaryButton: {
      text: "Go Back",
      icon: null,
      endIcon: "",
      class: "btnBorderStyledRedSignup",
      size: "small",
      disable: false,
      click: () => goback(),
    },
  };

  // set response data into form
  useEffect(() => {
    setBio({
      ...bio,
      email: {
        ...credentials.email,
        content: auth.responseData.email,
      },
      userName: {
        ...credentials.userName,
        content:
          auth.responseData.userName === null ||
          auth.responseData.userName === "" ||
          auth.responseData.userName === undefined
            ? null
            : auth.responseData.userName.search("@") !== -1
              ? auth.responseData.userName.split("@")[0]
              : auth.responseData.userName,
      },
      firstName: {
        ...credentials.firstName,
        content: auth.responseData.firstName,
      },
      lastName: {
        ...credentials.lastName,
        content: auth.responseData.lastName,
      },
    });
  }, [auth.responseData.email]);

  if (
    bio.userName.content !== null &&
    bio.userName.content !== "" &&
    bio.userName.content !== undefined
  ) {
    if (bio.userName.content.search("@") !== -1) {
    } else {
    }
  }

  // set verify email password
  const verifyEmailPassword = async (email, password) => {
    // for Error message
    if (email === "") {
      await setEmailAfterVerifyError("Please enter Email Address");
      await setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: true,
          content: "",
          isFail: true,
        },
      });
    } else {
      await dispatch(validateEmailAndPassword(email, password));
      await setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: auth.isError,
          isFail: auth.isFail,
          isSuccess: true,
        },
      });
      await setEmailAfterVerify(email);
    }
    await setFields(true);
  };

  useEffect(() => {}, [auth.isFail, auth.isError]);

  return (
    <MaxWidthContainer>
      <div
        className={`${styles.boxHeightLogin} u-display-flex u-align-items-center`}
      >
        <Row justify="end" style={{ width: "100%" }}>
          <Col lg={12} md={12} sm={24}></Col>
          <Col lg={12} md={12} sm={24} className="u-text-align-right">
            <div className={styles.loginBody}>
              <Title level={2} className={styles.fraudMainTitle}>
                Fraud Digitization Portal
              </Title>
              <Title level={4} className={styles.fraudMainTitle}>
                Signup Request
              </Title>
              <div className={styles.margin6p} />
              {/* first step code */}
              {auth.isError ? (
                <>
                  <div className={styles.positionRelative}>
                    <Input
                      onChange={setFieldsHandler}
                      placeholder="Enter LDAP ID"
                      size="large"
                      fullWidth
                      name="emailAddress"
                      autoComplete="off"
                      autoFocus
                    />
                    <span>
                      <i className="icon-user SignupIconEmail icon-size-one"></i>
                    </span>
                  </div>
                  <InputWithBtn
                    placeholder="Enter Password"
                    onchange={setFieldsHandler}
                    autoComplete="off"
                    className={styles.passwordInputField}
                    type="text"
                    size="medium"
                    name="password"
                    fullWidth
                    textFieldSize="small"
                    click={() =>
                      verifyEmailPassword(
                        credentials.emailAddress.content,
                        credentials.password.content,
                      )
                    }
                    applyClass="next"
                    classpas="disc"
                    icon={
                      credentials.password.isError === false ? (
                        <i className="icon-check  icon-size-one"></i>
                      ) : (
                        <i className="icon-arrow-right icon-size-one"></i>
                      )
                    }
                  />
                  {/* ErrorBar of Email */}
                  {credentials.password.isFail && (
                    <ErrorBar errorText="This is a error" />
                  )}
                  {credentials.emailAddress.isFail && (
                    <ErrorBar errorText={emailAfterVerifyError} />
                  )}
                  <Col md={24} lg={24} className="u-text-align-center">
                    <div className={styles.marginTop30px} />
                    <Button
                      text="Go Back"
                      icon={null}
                      endIcon=""
                      applyClass="btnBorderStyledRedSignup"
                      disable={false}
                      click={goback}
                    />
                  </Col>
                </>
              ) : (
                <Row gutter={40} className="u-text-align-left">
                  <Col md={12} lg={12}>
                    <label className={styles.lable}>Email</label>
                    <TextField
                      size="small"
                      placeholder="Enter Email"
                      disable
                      value={bio.email.content}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Col>
                  <Col md={12} lg={12}>
                    <label className={styles.lable}>Username</label>
                    <TextField
                      size="small"
                      placeholder="Enter User Name"
                      disable
                      value={bio.userName.content}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Col>
                  <div className={styles.marginTop30px} />
                  <Col md={12} lg={12}>
                    <label className={styles.lable}>First Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter First Name"
                      name="firstName"
                      change={setFieldsHandler}
                      value={bio.firstName.content}
                      required={true}
                    />

                    {bio.firstName.isError && (
                      <ErrorBar errorText={bio.firstName.errorMessage} />
                    )}
                  </Col>
                  <Col md={12} lg={12}>
                    <label className={styles.lable}>Last Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter Last Name"
                      name="lastName"
                      change={setFieldsHandler}
                      value={bio.lastName.content}
                      required={true}
                    />
                    {bio.lastName.isError && (
                      <ErrorBar errorText={bio.lastName.errorMessage} />
                    )}
                  </Col>
                  <Col
                    lg={24}
                    md={24}
                    sm={24}
                    className="MultipleSelectClass SignUp u-margin-bottom-20px"
                  >
                    <MultipleSelectCheckmarks
                      selected={selected}
                      setSelected={setSelected}
                      selectedUserRoleName={selectedTransactionTypeName}
                      setSelectedUserRoleName={setSelectedTransactionTypeName}
                      lable="Transaction Type *"
                      change={transactionTypeHandler}
                      option={transactionTypes}
                      name="transactionType"
                      required
                    />
                    {bio.transactionType.isError && (
                      <ErrorBar errorText={bio.transactionType.errorMessage} />
                    )}
                  </Col>
                  <Col md={24} lg={24}>
                    <label className={styles.lable}>Region</label>
                    <Select
                      value={regionName}
                      option={region}
                      placeholder="Select Region"
                      name="FK_RID"
                      change={regionHandler}
                      required={true}
                    />
                    {bio.FK_RID.isError && (
                      <ErrorBar errorText={bio.FK_RID.errorMessage} />
                    )}
                  </Col>
                  <div className={styles.marginTop30px} />
                  <Col md={24} lg={24}>
                    <label className={styles.lable}>Role</label>
                    <Select
                      value={userRoleName}
                      option={userRole}
                      placeholder="Select"
                      name="FK_GSSUserRoleID"
                      change={roleHandler}
                      required={true}
                    />
                    {bio.FK_GSSUserRoleID.isError && (
                      <ErrorBar errorText={bio.FK_GSSUserRoleID.errorMessage} />
                    )}
                    {auth.pendingError ? (
                      <ErrorBar errorText={auth.ResponseMessage} />
                    ) : null}
                  </Col>
                  <Col md={24} lg={24} className="u-text-align-center">
                    <div className={styles.marginTop30px} />
                    <GroupedButtons data={buttonProps} />
                  </Col>
                </Row>
              )}
              {/* second step component  */}
            </div>
          </Col>
        </Row>
      </div>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </MaxWidthContainer>
  );
};

export default SignUp;
