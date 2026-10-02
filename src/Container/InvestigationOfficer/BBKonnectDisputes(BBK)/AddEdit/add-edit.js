import React, { useEffect, useState } from "react";
import { Typography, DatePicker, Row, Col } from "antd";
import moment from "moment";
import {
  InputWithBtn,
  Button,
  Notification,
  Loader,
  SelectBoxWithButton,
  StartToEndDate,
  GroupedButtons,
  Modal,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
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
  customerNotFoundModal,
  customerFoundModal,
  accountNumberFoundModal,
  accountNumberNotFoundModal,
  mobileNumberFoundModal,
  mobileNumberNotFoundModal,
  GetTransactionDetailsByMobileNumberBBK,
  GetAllAccountsByMobileNumberBBK,
  SearchTransactionDetailsByMobileNumberInIRISBBK,
} from "../../../../store/actions/investigation-officer-actions";
import { HideNotification } from "../../../../store/actions/setup-forms-actions";

const AddEditBBKDispute = () => {
  const { Title } = Typography;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [found, setFound] = useState(false);
  const [inputData, setInputData] = useState("");
  const [inputDataAC, setInputDataAC] = useState("");
  const [inputDataMobile, setInputDataMobile] = useState("");
  const [inputDataACModal, setInputDataACModal] = useState("");
  const [inputDataMobileModal, setInputDataMobileModal] = useState("");
  const [btnClassCNIC, setBtnClassCNIC] = useState("btnDarkSolidEdit");
  const [btnClassAccount, setBtnClassAccount] = useState("btnDarkSolid");
  const [btnClassMobile, setBtnClassMobile] = useState("btnDarkSolid");
  const [isCnicNo, setIsCnicNo] = useState(true);
  const [isAccountNo, setIsAccountNo] = useState(true);
  const [cnicFound, setCnicFound] = useState(false);
  const [account, setAccount] = useState([]);
  const [accountForMobile, setAccountForMobile] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const state = useSelector((state) => state);
  const { investigationOfficer } = state;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [accountFound, setAccountFound] = useState(false);

  // for rest all sate
  useEffect(() => {
    dispatch(RESETALLSTATE());
  }, []);

  const [cnicLogin, setCnicLogin] = useState({
    CNIC: "",
    AccountNumber: "",
  });

  //Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

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

  const accountSectionHandler = (e) => {
    const telNo = e.target.value;
    const re = /^[0-9\b]+$/;
    if (telNo === "" || re.test(telNo)) {
      let Data = e.target.value;
      if (Data.length >= 8) {
        setBtnStatus(false);
        setInputDataAC(Data);
      } else if (Data.length < 8) {
        setBtnStatus(true);
      }
      setInputDataAC(Data);
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

  const changeSelectCnicNumber = () => {
    setBtnClassAccount("btnDarkSolid");
    setBtnClassMobile("btnDarkSolid");
    setBtnClassCNIC("btnDarkSolidEdit");
    setIsCnicNo(true);
    setIsAccountNo(false);
    setBtnStatus(true);
    setInputData("");
    setCnicFound(false);
    dispatch(RESETALLSTATE());
  };

  const changeSelectAccountNumber = () => {
    setBtnClassAccount("btnDarkSolidEdit");
    setBtnClassCNIC("btnDarkSolid");
    setBtnClassMobile("btnDarkSolid");
    setIsCnicNo(false);
    setIsAccountNo(true);
    setBtnStatus(true);
    setInputData("");
    setInputDataAC("");
    dispatch(RESETALLSTATE());
  };

  const changeSelectMobileNumber = () => {
    setBtnClassMobile("btnDarkSolidEdit");
    setBtnClassCNIC("btnDarkSolid");
    setBtnClassAccount("btnDarkSolid");
    setIsCnicNo(false);
    setIsAccountNo(false);
    setBtnStatus(true);
    setInputData("");
    setInputDataAC("");
    setCnicFound(false);
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

  const newDataHAndler = async (e) => {
    await dispatch(customerFoundModal(false));
    setAccountFound(true);
    setBtnStatusSelect(true);
    // setIsModalVisible(false);
    // dispatch(RESETALLSTATE());
    // if (inputData) {
    //   dispatch(GetAllAccountsByCnicBBK(inputData));
    // }
    // dispatch(customerFoundModal(false));
    // dispatch(customerNotFoundModal(false));
    // dispatch(accountNumberFoundModal(false));
    // dispatch(accountNumberNotFoundModal(false));
    // setBtnStatus(true);
    // setCnicFound(true);
  };

  const newDataHAndlerForAccount = async (e) => {
    setBtnStatus(true);
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(2));
    let Data = {
      AccountNumber: inputDataAC,
      From: State.FromDate,
      To: State.ToDate,
    };
    await dispatch(customerFoundModal(false));
    await dispatch(customerNotFoundModal(false));
    await dispatch(accountNumberFoundModal(false));
    await dispatch(accountNumberNotFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  const newDataHAndlerForMobile = (e) => {
    setIsModalVisible(false);
    dispatch(RESETALLSTATE());
    if (inputDataMobile) {
      dispatch(GetAllAccountsByMobileNumberBBK(inputDataMobile));
    }
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    dispatch(accountNumberFoundModal(false));
    dispatch(accountNumberNotFoundModal(false));
    dispatch(mobileNumberFoundModal(false));
    dispatch(mobileNumberNotFoundModal(false));
    setBtnStatus(true);
    setCnicFound(true);
  };

  const handleCancel = () => {
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    dispatch(accountNumberFoundModal(false));
    dispatch(accountNumberNotFoundModal(false));
    dispatch(mobileNumberFoundModal(false));
    dispatch(mobileNumberNotFoundModal(false));
    setBtnStatus(true);
    setInputData("");
    setInputDataMobile("");
    setCnicFound(false);
    dispatch(RESETALLSTATE());
    setAccountNumber("");
    setAccountFound(false);
  };

  //   check data input for enable button for search
  const cnicSearchHandler = () => {
    // dispatch(GetTransactionDetailsByCnicBBK(inputData));
    // setAccountNumber("");
    // setIsModalVisible(false);
    // dispatch(RESETALLSTATE());
    if (inputData) {
      dispatch(GetAllAccountsByCnicBBK(inputData));
    }
    // dispatch(customerFoundModal(false));
    // dispatch(customerNotFoundModal(false));
    // dispatch(accountNumberFoundModal(false));
    // dispatch(accountNumberNotFoundModal(false));
    setBtnStatus(true);
    setCnicFound(true);
  };

  const mobileSearchHandler = () => {
    dispatch(GetTransactionDetailsByMobileNumberBBK(inputDataMobile));
    setAccountNumber("");
  };

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

  const addButtonPropsForMobile = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => newDataHAndlerForMobile(),
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
    setAccountFound(false);
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
    if (inputData) {
      let splicedVariable = accountNumber;
      splicedVariable = splicedVariable.split(" ", 1);
      let Data = {
        AccountNumber: splicedVariable[0].trim(),
        CNIC: inputData,
      };
      // let Data = {
      //   AccountNumber: accountNumber,
      //   CNIC: inputData,
      // };
      dispatch(GetTransactionDetailsByCnicBBK(Data));
    }

    // setFound(true);
    // localStorage.setItem("State", JSON.stringify(State));
    // localStorage.setItem("route", JSON.stringify(1));
    // let splicedVariable = accountNumber;
    // splicedVariable = splicedVariable.split(" ", 1);
    // let Data = {
    //   AccountNumber: splicedVariable[0].trim(),
    //   From: State.FromDate,
    //   To: State.ToDate,
    // };
    // setInputDataACModal(splicedVariable);
    // dispatch(accountNumberFoundModal(false));
    // dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  const accountSearch2Handler = async () => {
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(2));
    setInputDataACModal(inputDataAC);
    await dispatch(GetTransactionDetailsByAccountNumberBBK(inputDataAC));
    // dispatch(RESETALLSTATE());
    setFound(true);
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
    dispatch(mobileNumberFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };

  // For AccountNumber DropDown SetState
  useEffect(() => {
    let numberAccount = investigationOfficer.AccountsDataBBK;
    if (
      numberAccount !== undefined &&
      numberAccount !== null &&
      numberAccount.length > 0
    ) {
      setAccount(
        numberAccount.map((data, index) => {
          return data;
        })
      );
    }
  }, [investigationOfficer.AccountsDataBBK]);

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

  // For AccountNumberOptions
  useEffect(() => {}, [account]);

  // For AccountNumberOptions
  useEffect(() => {}, [accountForMobile]);

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

  //for rest all sate
  useEffect(() => {
    dispatch(RESETALLSTATE());
  }, []);

  // useEffect(() => {
  //   if (State.FromDate && State.ToDate !== "" && accountNumber !== "") {
  //     setBtnStatusSelect(false);
  //   } else {
  //     setBtnStatusSelect(true);
  //   }
  // }, [State]);

  useEffect(() => {
    if (State.FromDate && State.ToDate !== "" && accountNumber !== "") {
      setBtnStatusSelect(false);
    } else {
      setBtnStatusSelect(true);
    }
  }, [accountNumber]);

  useEffect(() => {
    setCnicFound(false);
  }, [investigationOfficer.CustomerNotFoundModal]);
  const searchHandlerForAccount = () => {
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
    setInputDataACModal(splicedVariable);
    dispatch(accountNumberFoundModal(false));
    dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data));
  };
  return (
    <>
      <Title level={4}>Add / Edit BB - Konnect Disputes</Title>
      <>
        <div className="u-margin-top-100px" />
        {/* gutter needs a [horizontal, vertical] pair — a single number only
            spaces columns horizontally; these columns wrap onto a second
            line (the CNIC/Account toggle buttons above, the search field
            below), and without a vertical gutter that wrapped line sits
            flush against the one above it with no gap at all. */}
        <Row gutter={[16, 16]}>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass={btnClassCNIC}
              text="CNIC Number"
              className="downloadButton"
              click={changeSelectCnicNumber}
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass={btnClassAccount}
              text="Account Number"
              className="downloadButton"
              click={changeSelectAccountNumber}
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass={btnClassMobile}
              text="Mobile Number"
              className="downloadButton"
              click={changeSelectMobileNumber}
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
                  autoComplete="off"
                  textFieldSize="small"
                  applyClass="search-cnic"
                  textLength={13}
                  minLength={13}
                  icon={<i className="icon-search icon-size-one"></i>}
                  disable={btnStatus}
                  required
                  value={inputData}
                  name="CnicNumber"
                  click={cnicSearchHandler}
                />
                {cnicFound ? (
                  <>
                    <div className="u-margin-top-15px">
                      <SelectBoxWithButton
                        icon={<i className="icon-search icon-size-one"></i>}
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
                    <div
                      className="dateRangePicker u-margin-top-15px u-display-flex u-justify-content-space-between"
                    >
                      {accountFound ? (
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
                      ) : null}
                      {accountFound ? (
                        <Col lg={4} md={4} sm={24}>
                          <Button
                            applyClass={btnClassCNIC}
                            text="Search"
                            className="downloadButton"
                            click={searchHandlerForAccount}
                          />
                        </Col>
                      ) : null}
                    </div>
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
                  autoComplete="off"
                  textFieldSize="small"
                  applyClass="search-cnic"
                  minLength={14}
                  textLength={14}
                  // maxLength={14}
                  icon={<i className="icon-search icon-size-one"></i>}
                  disable={btnStatus}
                  value={inputDataAC}
                  required
                  name="AccountNumber"
                  click={accountSearch2Handler}
                />
                <div className="dateRangePicker">
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
                  value={inputDataMobile}
                  name="MobileNumber"
                  click={mobileSearchHandler}
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
                <span>{inputDataACModal}</span>
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
                <span>{inputDataACModal}</span>
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
        modalState={investigationOfficer.MobileNumberFoundModal}
        width={650}
      >
        {/* this data will be pass to modal when Add Fraud Type btn will be clicked */}
        {investigationOfficer.MobileNumberFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for Mobile Number in Fraud DB</p>
                <span>{inputDataMobile}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Do you wish to create a new record?
              </Title>
            </div>
            <GroupedButtons data={addButtonPropsForMobile} />
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

export default AddEditBBKDispute;
