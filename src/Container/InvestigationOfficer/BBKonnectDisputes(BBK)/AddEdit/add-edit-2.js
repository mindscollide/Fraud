import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Typography, Radio, DatePicker, Space, Row, Col } from "antd";
import moment from "moment";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  // DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  FormattedInputs,
  SelectBoxWithButton,
  StartToEndDate,
  GroupedButtons,
  Modal,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import Title from "antd/lib/skeleton/Title";
import CustomerDetailsDebitCardDispute from "./customer-details";
import PreFilledCustomerDetails from "./view-add-edit";
import AddNewCustomerDetails from "./add-new-customer-details";
import {
  DateDisplayFormat,
  DateSendingFormat,
} from "../../../../Common/Functions/date-formatter";
import {
  RESETALLSTATE,
  GetTransactionDetailsByAccountNumberBBK,
  GetAllAccountsByCnicBBK,
  GetTransactionDetailsByCnicBBK,
  SearchTransactionDetailsByAccountNumberInIRISBBK,
  GetAllAccountsByMobileNumberBBK,
  customerNotFoundModal,
  customerFoundModal,
  accountNumberFoundModal,
  accountNumberNotFoundModal,
} from "../../../../store/actions/investigation-officer-actions";
import { HideNotification } from "../../../../store/actions/setup-forms-actions";
import { useNavigate } from "react-router-dom";

const AddEditBBKDispute2 = () => {
  const { RangePicker } = DatePicker;
  const { Title } = Typography;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const navigate = useNavigate();
  const [found, setFound] = useState(false);
  const [inputData, setInputData] = useState("");
  const [inputDataMobile, setInputDataMobile] = useState("");
  const [isCnicNo, setIsCnicNo] = useState(true);
  const [isAccountNo, setIsAccountNo] = useState(true);
  const [cnicFound, setCnicFound] = useState(false);
  const [account, setAccount] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const [accountForMobile, setAccountForMobile] = useState([]);
  const [inputDataMobileModal, setInputDataMobileModal] = useState("");
  const state = useSelector((state) => state);
  const { investigationOfficer } = state;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  var cnic = localStorage.getItem("CNICNumber");
  var AccountNumber = localStorage.getItem("AccountNumber");
  var MobileNumber = localStorage.getItem("MobileNumber");
  var check = localStorage.getItem("flag");

  const [cnicLogin, setCnicLogin] = useState({
    CNIC: "",
    AccountNumber: "",
  });

  //Modal States

  const [actions, setAction] = useState({
    cnicNumberNotFound: false,
    accountNumbersNotFound: false,
    add: false,
  });

  //   check data input for enable button for search
  const cnicSectionHandler = (e) => {
    const telNo = e.target.value;
    const re = /^[0-9\b]+$/;
    if (telNo === "" || re.test(telNo)) {
      let Data = e.target.value;
      if (Data.length === 13) {
        setBtnStatus(false);
        setInputData(Data);
      } else if (Data.length < 13) {
        setBtnStatus(true);
      }
      setInputData(Data);
    }
  };

  const mobileSectionHandler = (e) => {
    const telNo = e.target.value;
    const re = /^[0-9\b]+$/;
    if (telNo === "" || re.test(telNo)) {
      let Data = e.target.value;
      if (Data.length >= 11) {
        setBtnStatus(false);
        setInputDataMobile(Data);
      } else if (Data.length < 11) {
        setBtnStatus(true);
      }
      setInputDataMobile(Data);
    }
  };

  const accountSectionHandler = (e) => {
    const telNo = e.target.value;
    const re = /^[0-9\b]+$/;
    if (telNo === "" || re.test(telNo)) {
      let Data = e.target.value;
      if (Data.length === 14) {
        setBtnStatus(false);
        setInputData(Data);
      } else if (Data.length < 14) {
        setBtnStatus(true);
      }
      setInputData(Data);
    }
  };

  useEffect(() => {
    dispatch(RESETALLSTATE());
  }, []);

  useEffect(() => {
    if (
      AccountNumber !== "" &&
      AccountNumber !== undefined &&
      AccountNumber !== null &&
      parseInt(check) === parseInt(2) &&
      check !== undefined &&
      check !== null &&
      check !== ""
    ) {
      setBtnStatus(true);
      setIsCnicNo(false);
      setIsAccountNo(true);
      setCnicFound(false);
      setInputData(AccountNumber);
      let Data = {
        AccountNumber: AccountNumber,
        From: State.FromDate,
        To: State.ToDate,
      };
    }
  }, [AccountNumber]);

  const changeSelectCnicNumber = () => {
    setIsCnicNo(true);
    setIsAccountNo(false);
    setBtnStatus(true);
    setInputData("");
    setCnicFound(false);
    dispatch(RESETALLSTATE());
  };

  const changeSelectAccountNumber = () => {
    setIsCnicNo(false);
    setBtnStatus(true);
    setInputData("");
    dispatch(RESETALLSTATE());
  };

  //DataRangeHandler
  const [clearDateSelect, setDateClearSelect] = useState("");
  const current = new Date();
  const date2 = moment().format("YYYYMMDD");
  const previousYearDate = moment().subtract(6, "months").format("YYYYMMDD");

  const [State, setState] = useState({
    FromDate: previousYearDate,
    ToDate: date2,
  });

  const setDate = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        FromDate: DateSendingFormat(e.endDate),
        ToDate: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        FromDate: "",
        ToDate: "",
      });
    }
  };

  const newDataHAndler = (e) => {
    dispatch(RESETALLSTATE());
    if (inputData) {
      dispatch(GetAllAccountsByCnicBBK(inputData));
    }
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    dispatch(accountNumberFoundModal(false));
    dispatch(accountNumberNotFoundModal(false));
    setBtnStatus(true);
    setCnicFound(true);
  };

  const newDataHAndlerForAccount = async (e) => {
    setBtnStatus(true);
    localStorage.setItem("State", JSON.stringify(State));
    let Data3 = { AccountNumber: inputData, Heading: "Account Number" };
    localStorage.setItem("route", JSON.stringify(2));
    let Data = {
      AccountNumber: inputData,
      From: State.FromDate,
      To: State.ToDate,
    };
    await dispatch(customerFoundModal(false));
    await dispatch(customerNotFoundModal(false));
    await dispatch(accountNumberFoundModal(false));
    await dispatch(accountNumberNotFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  const handleCancel = () => {
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    dispatch(accountNumberFoundModal(false));
    dispatch(accountNumberNotFoundModal(false));
    setBtnStatus(true);
    dispatch(RESETALLSTATE());
  };

  //   check data input for enable button for search

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => newDataHAndler(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonPropsForAccount = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => newDataHAndlerForAccount(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const okayButtonProp = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel(),
    },
    secondaryButton: {
      text: "",
    },
  };

  // Selected Dropdown value
  const accountNumberHandler = (e, value) => {
    setAccountNumber(value);
    let numberAccount = investigationOfficer.AccountsDataBBK;
    numberAccount.map((data, index) => {
      if (value === data) {
        setCnicLogin({
          ...cnicLogin,
          ["AccountNumber"]: data,
        });
      }
    });
  };

  const accountNumberForMobileHandler = (e, value) => {
    setAccountNumber(value);
    let numberAccount = investigationOfficer.AccountsDataForMobileBBK;
    numberAccount.map((data, index) => {
      if (value === data) {
        setCnicLogin({
          ...cnicLogin,
          ["AccountNumber"]: data,
        });
      }
    });
  };

  const accountSearchHandler = () => {
    setFound(true);
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(1));
    let splicedVariable = accountNumber;
    splicedVariable = splicedVariable.split(" ", 1);
    let Data = {
      AccountNumber: splicedVariable[0].trim(),
      From: State.FromDate,
      To: State.ToDate,
    };
    dispatch(accountNumberFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  const accountSearch2Handler = async () => {
    setBtnStatus(true);
    localStorage.setItem("State", JSON.stringify(State));
    let Data3 = { AccountNumber: inputData, Heading: "Account Number" };
    localStorage.setItem("route", JSON.stringify(2));
    let Data = {
      AccountNumber: AccountNumber,
      From: State.FromDate,
      To: State.ToDate,
    };
    await dispatch(customerFoundModal(false));
    await dispatch(customerNotFoundModal(false));
    await dispatch(accountNumberFoundModal(false));
    await dispatch(accountNumberNotFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  const accountForMobileSearchHandler = () => {
    setFound(true);
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(3));
    localStorage.setItem("mobileNumber", inputDataMobile);
    let Data = {
      AccountNumber: accountNumber,
      From: State.FromDate,
      To: State.ToDate,
    };
    setInputDataMobileModal(accountNumber);
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  useEffect(() => {}, [accountForMobile]);

  // For AccountNumber DropDown SetState
  useEffect(() => {
    if (investigationOfficer.AccountsDataBBK !== null) {
      let numberAccount = investigationOfficer.AccountsDataBBK;
      setAccount(
        numberAccount.map((data, index) => {
          return data;
        })
      );
    } else if (
      investigationOfficer.ResponseMessage === "No Records Found" &&
      !investigationOfficer.DCDModal &&
      parseInt(check) === parseInt(1) &&
      check !== undefined &&
      check !== null &&
      check !== ""
    ) {
      setCnicFound(false);
    }
  }, [investigationOfficer.AccountsDataBBK]);

  // For AccountNumber DropDown SetState
  useEffect(() => {
    if (
      MobileNumber !== "" &&
      MobileNumber !== undefined &&
      MobileNumber !== null &&
      parseInt(check) === parseInt(3) &&
      check !== undefined &&
      check !== null &&
      check !== ""
    ) {
      setBtnStatus(true);
      setIsCnicNo(false);
      setIsAccountNo(false);
      setCnicFound(false);
    }
  }, [MobileNumber]);

  useEffect(() => {
    if (cnic !== "" && cnic !== undefined && cnic !== null) {
      dispatch(GetAllAccountsByCnicBBK(cnic));
      setInputData(cnic);
      setCnicFound(true);
    }
    if (
      MobileNumber !== "" &&
      MobileNumber !== undefined &&
      MobileNumber !== null
    ) {
      dispatch(GetAllAccountsByMobileNumberBBK(MobileNumber));
      setInputDataMobile(MobileNumber);
      setCnicFound(true);
    }
  }, [cnic]);

  // For AccountNumber DropDown SetState
  useEffect(() => {
    let numberAccount = investigationOfficer.AccountsDataForMobileBBK;
    if (
      numberAccount !== undefined &&
      numberAccount !== null &&
      numberAccount.length > 0
    ) {
      setAccountForMobile(
        numberAccount.map((data, index) => {
          return data;
        })
      );
    }
  }, [investigationOfficer.AccountsDataForMobileBBK]);

  //Notification
  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ShowNotification]);

  useEffect(() => {
    if (State.FromDate && State.ToDate !== "" && accountNumber !== "") {
      setBtnStatusSelect(false);
    } else {
      setBtnStatusSelect(true);
    }
  }, [State]);

  useEffect(() => {
    if (State.FromDate && State.ToDate !== "" && accountNumber !== "") {
      setBtnStatusSelect(false);
    } else {
      setBtnStatusSelect(true);
    }
  }, [accountNumber]);

  return (
    <>
      <Title level={4}>Add / Edit BB Konnect Disputes</Title>
      <>
        <div className="u-margin-top-100px" />
        <Row gutter={16}>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass="btnDarkSolid"
              text="CNIC Number"
              className="downloadButton"
              click={changeSelectCnicNumber}
              disableBtn
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass="btnDarkSolid"
              text="Account Number"
              className="downloadButton"
              click={changeSelectAccountNumber}
              disableBtn
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass="btnDarkSolid"
              text="Mobile Number"
              className="downloadButton"
              disableBtn
            />
          </Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {isCnicNo ? (
              <>
                <InputWithBtn
                  isUpperCase={true}
                  onchange={cnicSectionHandler}
                  label="Enter CNIC"
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search-cnic"
                  textLength={13}
                  minLength={13}
                  icon={<i className="icon-search icon-size-one"></i>}
                  disable={btnStatus}
                  required
                  value={inputData}
                  name="CnicNumber"
                  disable1={true}
                />
                {cnicFound ? (
                  <>
                    <div className="u-margin-top-15px">
                      <SelectBoxWithButton
                        icon={
                          <i className="icon-arrow-right icon-size-one"></i>
                        }
                        name="AccountNumber"
                        applyClass="account-number"
                        label="Select Account Number"
                        textFieldSize="small"
                        fullWidth
                        autoComplete="off"
                        required
                        option={account}
                        click={accountSearchHandler}
                        change={accountNumberHandler}
                        value={accountNumber}
                        disable={btnStatusSelect}
                      />
                    </div>
                    <div className="u-margin-top-20px" />
                    <StartToEndDate
                      size="large"
                      change={setDate}
                      key={clearDateSelect}
                      startvalue={
                        State.FromDate !== null && State.FromDate !== ""
                          ? DateDisplayFormat(State.FromDate)
                          : null
                      }
                      endvalue={
                        State.ToDate !== null && State.ToDate !== ""
                          ? DateDisplayFormat(State.ToDate)
                          : null
                      }
                      className="DatePickerDC"
                      DateRange={true}
                      required
                    />
                  </>
                ) : null}
              </>
            ) : isAccountNo ? (
              <>
                <InputWithBtn
                  isUpperCase={true}
                  onchange={accountSectionHandler}
                  label="Enter Account Number"
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search-cnic"
                  disable1={true}
                  minLength={14}
                  textLength={14}
                  icon={<i className="icon-search icon-size-one"></i>}
                  value={inputData}
                  required
                  name="AccountNumber"
                  click={accountSearch2Handler}
                />
                <div className="u-margin-top-20px" />
                <StartToEndDate
                  size="large"
                  change={setDate}
                  key={clearDateSelect}
                  startvalue={
                    State.FromDate !== null && State.FromDate !== ""
                      ? DateDisplayFormat(State.FromDate)
                      : null
                  }
                  DateRange={true}
                  endvalue={
                    State.ToDate !== null && State.ToDate !== ""
                      ? DateDisplayFormat(State.ToDate)
                      : null
                  }
                  className="DatePickerDC"
                  required
                />
              </>
            ) : (
              <>
                <InputWithBtn
                  isUpperCase={true}
                  onchange={mobileSectionHandler}
                  label="Enter Mobile Number"
                  fullWidth
                  autoComplete="off"
                  textFieldSize="small"
                  applyClass="search-cnic"
                  textLength={11}
                  minLength={11}
                  icon={<i className="icon-search icon-size-one"></i>}
                  disable={btnStatus}
                  required
                  disable1={true}
                  value={inputDataMobile}
                  name="MobileNumber"
                />
                {cnicFound ? (
                  <>
                    <div className="u-margin-top-15px">
                      <SelectBoxWithButton
                        icon={
                          <i className="icon-arrow-right icon-size-one"></i>
                        }
                        name="AccountNumber"
                        applyClass="account-number"
                        label="Select Account Number"
                        textFieldSize="small"
                        fullWidth
                        autoComplete="off"
                        required
                        option={accountForMobile}
                        click={accountForMobileSearchHandler}
                        change={accountNumberForMobileHandler}
                        value={accountNumber}
                        disable={btnStatusSelect}
                      />
                    </div>
                    <div
                      className="dateRangePicker u-margin-top-15px"
                    >
                      <StartToEndDate
                        DateRange={true}
                        size="large"
                        change={setDate}
                        key={clearDateSelect}
                        startvalue={
                          State.FromDate !== null && State.FromDate !== ""
                            ? DateDisplayFormat(State.FromDate)
                            : null
                        }
                        endvalue={
                          State.ToDate !== null && State.ToDate !== ""
                            ? DateDisplayFormat(State.ToDate)
                            : null
                        }
                        className="DatePickerDC"
                        required
                      />
                    </div>
                  </>
                ) : null}
              </>
            )}
          </Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={12} md={12} sm={24} xs={24} className="u-display-flex">
            <Col lg={24} md={24} sm={24} xs={24} className="u-text-align-center"></Col>
          </Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
        </Row>
      </>
      {/* <Notification setOpen={setOpen} open={open.flag} message={open.message} /> */}

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerFoundModal}
        width={650}
      >
        {/* this data will be pass to modal when Add Fraud Type btn will be clicked */}
        {investigationOfficer.CustomerFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for CNIC Number in Fraud DB</p>
                <span>{inputData}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Do you wish to create a new record?
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerNotFoundModal}
        width={650}
      >
        {/* Customer Not Found Modal */}
        {/* this data will be pass to modal when Account Number is searched */}
        {investigationOfficer.CustomerNotFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for CNIC Number in IRIS.</p>
                <span>{inputData}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                System will not create new record.
              </Title>
            </div>
            <div className="u-margin-left-70px">
              <GroupedButtons data={okayButtonProp} />
            </div>
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.AccountNumberFoundModal}
        width={650}
      >
        {/* this data will be pass to modal when Add Fraud Type btn will be clicked */}
        {investigationOfficer.AccountNumberFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for Account Number in Fraud DB</p>
                <span>{accountNumber}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Do you wish to create a new record?
              </Title>
            </div>
            <GroupedButtons data={addButtonPropsForAccount} />
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.AccountNumberNotFoundModal}
        width={650}
      >
        {/* Customer Not Found Modal */}
        {/* this data will be pass to modal when Account Number is searched */}
        {investigationOfficer.AccountNumberNotFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for Account Number in IRIS.</p>
                <span>{accountNumber}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                System will not create new record.
              </Title>
            </div>
            <div className="u-margin-left-70px">
              <GroupedButtons data={okayButtonProp} />
            </div>
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.MobileNumberNotFoundModal}
        width={650}
      >
        {/* Customer Not Found Modal */}
        {/* this data will be pass to modal when Mobile Number is searched */}
        {investigationOfficer.MobileNumberNotFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for Mobile Number in Source System.</p>
                <span>{inputDataMobileModal}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                System will not create new record.
              </Title>
            </div>
            <div className="u-margin-left-70px">
              <GroupedButtons data={okayButtonProp} />
            </div>
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditBBKDispute2;
