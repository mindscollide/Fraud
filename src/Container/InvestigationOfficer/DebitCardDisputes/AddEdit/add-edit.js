import React, { useEffect, useState } from "react";
import { Typography, Row, Col } from "antd";
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
  GetTransactionDetailsByAccountNumber,
  GetAllAccountsByCnic,
  GetAllCnicByAccountNumber,
  GetTransactionDetailsByAccountAndCnicDC,
  SearchTransactionDetailsByAccountNumberInIRIS,
  customerFoundModal,
  accountNumberFoundModal,
  accountNumberNotFoundModal,
} from "../../../../store/actions/investigation-officer-actions";

const AddEditDebitCardDispute = () => {
  const { Title } = Typography;
  const state = useSelector((state) => state);
  const { investigationOfficer } = state;
  const dispatch = useDispatch();

  const date2 = moment().format("YYYYMMDD");
  const previousYearDate = moment().subtract(6, "months").format("YYYYMMDD");
  const defaultDates = { FromDate: previousYearDate, ToDate: date2 };

  // true = search by CNIC, false = search by Account Number
  const [isCnicNo, setIsCnicNo] = useState(true);

  // CNIC flow
  const [inputData, setInputData] = useState("");
  const [cnicFound, setCnicFound] = useState(false);
  const [account, setAccount] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountFound, setAccountFound] = useState(false);

  // Account Number flow
  const [inputDataAC, setInputDataAC] = useState("");
  const [inputDataACModal, setInputDataACModal] = useState("");
  const [cnicList, setCnicList] = useState([]);
  const [selectedCnic, setSelectedCnic] = useState("");

  const [btnStatus, setBtnStatus] = useState(true);

  // Bumping clearDateSelect remounts the date pickers so they show a reset range
  const [State, setState] = useState(defaultDates);
  const [clearDateSelect, setDateClearSelect] = useState(0);

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  useEffect(() => {
    dispatch(RESETALLSTATE());
  }, []);

  // Clears everything that belongs to the searched CNIC (accounts, selection, date step)
  const clearCnicResults = () => {
    setCnicFound(false);
    setAccount([]);
    setAccountNumber("");
    setAccountFound(false);
  };

  // Clears the CNIC choices fetched for the searched account
  const clearAccountResults = () => {
    setCnicList([]);
    setSelectedCnic("");
  };

  // Back to a blank page: closes every modal, clears the store and all inputs
  const resetPage = () => {
    dispatch(RESETALLSTATE());
    clearCnicResults();
    clearAccountResults();
    setInputData("");
    setInputDataAC("");
    setInputDataACModal("");
    setBtnStatus(true);
    setState(defaultDates);
    setDateClearSelect((key) => key + 1);
  };

  const cnicSectionHandler = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setInputData(value);
      setBtnStatus(value.length !== 13);
      // a different CNIC makes the previous account list stale
      clearCnicResults();
    }
  };

  const accountSectionHandler = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setInputDataAC(value);
      setBtnStatus(value.length < 14);
      // a different account makes the previous CNIC list stale
      clearAccountResults();
    }
  };

  // Selected account from the dropdown (CNIC flow)
  const accountNumberHandler = (e, value) => {
    setAccountNumber(value || "");
    setAccountFound(false);
  };

  // Selected CNIC from the dropdown (Account Number flow)
  const cnicSelectHandler = (e, value) => {
    setSelectedCnic(value || "");
  };

  const changeSelectCnicNumber = () => {
    resetPage();
    setIsCnicNo(true);
  };

  const changeSelectAccountNumber = () => {
    resetPage();
    setIsCnicNo(false);
  };

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

  // ---- CNIC flow ----

  const cnicSearchHandler = () => {
    if (inputData) {
      clearCnicResults();
      dispatch(GetAllAccountsByCnic({ object: inputData, setCnicFound }));
    }
  };

  // Account picked from the dropdown: check Fraud DB for CNIC + account
  const accountSearchHandler = () => {
    if (inputData && accountNumber) {
      dispatch(
        GetTransactionDetailsByAccountAndCnicDC({
          AccountNumber: accountNumber,
          CNIC: inputData,
        })
      );
    }
  };

  // Proceed: not in Fraud DB — lock the account and show the date range + Search for IRIS
  const newDataHAndler = () => {
    dispatch(customerFoundModal(false));
    setAccountFound(true);
  };

  const searchHandlerForAccount = () => {
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(1));
    let Data = {
      AccountNumber: accountNumber,
      CNIC: inputData,
      From: State.FromDate,
      To: State.ToDate,
    };
    setInputDataACModal(accountNumber);
    dispatch(SearchTransactionDetailsByAccountNumberInIRIS(Data));
  };

  // ---- Account Number flow ----

  const accountSearch2Handler = () => {
    clearAccountResults();
    setInputDataACModal(inputDataAC);
    dispatch(GetTransactionDetailsByAccountNumber(inputDataAC));
  };

  // Proceed: not in Fraud DB — fetch the CNICs linked to this account so
  // the user can pick one before searching IRIS
  const newDataHAndlerForAccount = async () => {
    dispatch(accountNumberFoundModal(false));
    const cnics = await dispatch(GetAllCnicByAccountNumber(inputDataAC));
    setCnicList(cnics || []);
    if (cnics && cnics.length === 1) {
      setSelectedCnic(cnics[0]);
    }
  };

  // Search IRIS with the account + the CNIC picked from the dropdown
  const searchHandlerForAccountCnic = () => {
    if (!selectedCnic) return;
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("route", JSON.stringify(2));
    let Data = {
      AccountNumber: inputDataAC,
      From: State.FromDate,
      To: State.ToDate,
      CNIC: selectedCnic,
    };
    dispatch(SearchTransactionDetailsByAccountNumberInIRIS(Data));
  };

  // ---- Modal buttons ----

  // Discard / Ok on "CNIC not in IRIS": start over
  const handleCancel = () => {
    resetPage();
  };

  // Ok on "not found in IRIS": close it but keep the inputs so the
  // user can change the date range / CNIC and search again
  const handleCancel2 = () => {
    dispatch(accountNumberNotFoundModal(false));
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
  const okayButtonProp2 = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel2(),
    },
    secondaryButton: {
      text: "",
    },
  };

  // The dropdown shows only once the CNIC search actually returned accounts
  useEffect(() => {
    let numberAccount = investigationOfficer.AccountsData;
    if (numberAccount && numberAccount.length > 0) {
      setAccount(numberAccount);
      setCnicFound(true);
    } else {
      setAccount([]);
      setCnicFound(false);
    }
  }, [investigationOfficer.AccountsData]);

  return (
    <>
      <Title level={4}>Add / Edit Debit Card Disputes</Title>
      <>
        <div className="u-margin-top-100px" />
        {/* gutter needs a [horizontal, vertical] pair — a single number only
            spaces columns horizontally; these columns wrap onto a second
            line (the CNIC/Account toggle buttons above, the search field
            below), and without a vertical gutter that wrapped line sits
            flush against the one above it with no gap at all. */}
        <Row gutter={[16, 16]}>
          <Col lg={8} md={8} sm={0} xs={0}></Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass={isCnicNo ? "btnDarkSolidEdit" : "btnDarkSolid"}
              text="CNIC Number"
              className="downloadButton"
              click={changeSelectCnicNumber}
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              applyClass={isCnicNo ? "btnDarkSolid" : "btnDarkSolidEdit"}
              text="Account Number"
              className="downloadButton"
              click={changeSelectAccountNumber}
            />
          </Col>
          <Col lg={8} md={8} sm={0} xs={0}></Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {isCnicNo ? (
              <>
                <InputWithBtn
                  onchange={cnicSectionHandler}
                  label={inputData !== "" && "Enter CNIC Number"}
                  placeholder={"Enter CNIC Number *"}
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
                        label={
                          accountNumber?.length > 0 && "Select Account Number"
                        }
                        placeholder={"Select Account Number *"}
                        textFieldSize="small"
                        fullWidth
                        autoComplete="off"
                        required
                        option={account}
                        click={accountSearchHandler}
                        change={accountNumberHandler}
                        value={accountNumber}
                        disable={accountFound}
                      />
                    </div>
                    <div className="dateRangePicker u-margin-top-15px u-display-flex u-justify-content-space-between">
                      {/* {accountFound ? (
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
                      ) : null} */}
                      {accountFound ? (
                        <Col lg={4} md={4} sm={24}>
                          <Button
                            applyClass="btnDarkSolidEdit"
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
            ) : (
              <>
                <InputWithBtn
                  onchange={accountSectionHandler}
                  label={inputDataAC !== "" && "Enter Account Number"}
                  placeholder={"Enter Account Number"}
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search-cnic"
                  minLength={14}
                  textLength={14}
                  icon={<i className="icon-search icon-size-one"></i>}
                  disable={btnStatus}
                  value={inputDataAC}
                  required
                  name="AccountNumber"
                  click={accountSearch2Handler}
                />
                {/* <div className="dateRangePicker">
                  <StartToEndDate
                    size="large"
                    DateRange
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
                </div> */}
                {cnicList.length > 0 ? (
                  <div className="u-margin-top-15px">
                    <SelectBoxWithButton
                      icon={<i className="icon-search icon-size-one"></i>}
                      text="Search"
                      name="CNIC"
                      applyClass="account-number"
                      label={selectedCnic !== "" && "Select CNIC"}
                      placeholder={"Select CNIC"}
                      textFieldSize="small"
                      fullWidth
                      autoComplete="off"
                      required
                      option={cnicList}
                      click={searchHandlerForAccountCnic}
                      change={cnicSelectHandler}
                      value={selectedCnic}
                    />
                  </div>
                ) : null}
              </>
            )}
          </Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
          <Col lg={12} md={12} sm={24} xs={24} className="u-display-flex">
            <Col
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="u-text-align-center"
            ></Col>
          </Col>
          <Col lg={6} md={6} sm={0} xs={0}></Col>
        </Row>
      </>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerFoundModal}
        width={650}
      >
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
            <div className="u-display-flex u-justify-content-center">
              {/* <GroupedButtons data={okayButtonProp} /> */}
              <Button
                text="Ok"
                type={"primary"}
                size="large"
                applyClass="btnBorderStyledBeach"
                click={handleCancel}
                // click= () => handleCancel(),
              />
            </div>
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.AccountNumberFoundModal}
        width={650}
      >
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
        closeModal={handleCancel2}
        modalState={investigationOfficer.AccountNumberNotFoundModal}
        width={650}
      >
        {/* Not found in IRIS / no CNIC for the account */}
        {investigationOfficer.AccountNumberNotFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>{investigationOfficer.ResponseMessage}</p>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                System will not create new record.
              </Title>
            </div>
            <div className="u-display-flex u-justify-content-center">
              {/* <GroupedButtons data={okayButtonProp} /> */}
              <Button
                text="Ok"
                type={"primary"}
                size="large"
                applyClass="btnBorderStyledBeach"
                click={handleCancel}
                // click= () => handleCancel(),
              />
            </div>
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditDebitCardDispute;
