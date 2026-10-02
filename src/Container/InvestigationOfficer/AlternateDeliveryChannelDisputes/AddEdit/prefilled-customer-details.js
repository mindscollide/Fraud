import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Typography, Radio, Space, Empty, Row, Col } from "antd";
import moment from "moment";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  TimePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  Table,
  Message,
  Loader,
  FormattedInputs,
  uploadButton,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import {
  GetBorrowerType,
  GetAdvanceClassification,
  GetManagementUnit,
  GetNatureofCharge,
  GetNatureOfSecurity,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import Uploads from "../../../../Components/Elements/Upload/Uploads";
const PreFilledCustomerDetails = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [misysError, setMisysError] = useState(false);
  const [misysErrMsg, setMisysErrMsg] = useState("");
  const [enableRadio, setEnableRadio] = useState(true);
  const [openApproval, setOpenApproval] = useState(false);
  const [openWriteoff, setOpenWriteoff] = useState(false);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const state = useSelector((state) => state);
  const {
    findCustomerFromMisys,
    findCustomerAccountDetailsFromMisys,
    setupForms,
  } = state;
  const [wofcode, setwofcode] = useState("");
  const [accountNumbersFromStore, setAccountNumbersFromStore] = useState(null);
  const [goToSave, setGoToSave] = useState(false);
  const [ButtonText, setButtonText] = useState("Add Record");
  const [consolidateCalculatorBox, setConsolidateCalculatorBox] = useState({
    ABNSOutstandingPrincipal: 0,
    ABNSOutstandingNominal: 0,
    ABNSOutstandingNonAccural: 0,
    ABNSOtherCharges: 0,
    ABNSPenalInterest: 0,
    ABNSTotal: 0,
    APBSOutstandingPrincipal: 0,
    APBSOutstandingNominal: 0,
    APBSOutstandingNonAccural: 0,
    APBSOtherCharges: 0,
    APBSPenalInterest: 0,
    APBSTotal: 0,
    FRAPrincipal: 0,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  const [dataUpload, setDataUpload] = useState([]);
  const [misysSection, setMisysSection] = useState({
    MisysCode: null,
    NPLCode: null,
    BorrowerName: null,
    AddressOfBorrower: null,
    NTNNumber: null,
    ManagementUnitID: null,
    SCode: null,
    SDescription: null,
    BorrowerTypeID: null,
    iParty: null,
  });
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([
    {
      DirectorTypeID: null,
      DirectorName: null,
      CNIC: null,
      FatherHusband: null,
      Address: null,
    },
  ]);
  const [AccountNumber, setAccountNumber] = useState("Select...");
  const [AccountSection, setAccountSection] = useState([]);
  const [allinput, setallinput] = useState(false);
  const [AccountDetails, setAccountDetails] = useState({
    FacCode: null,
    FacName: null,
    LRAmount: null,
    LRDate: "",
    BranchCode: "",
    BranchName: "",
    RegionCode: "",
    RegionName: "",
    ABNSOutstandingPrincipal: 0,
    ABNSOutstandingNominal: 0,
    ABNSOutstandingNonAccural: 0,
    ABNSOtherCharges: 0,
    ABNSPenalInterest: 0,
    ABNSTotal: 0,
    APBSOutstandingPrincipal: 0,
    APBSOutstandingNominal: 0,
    APBSOutstandingNonAccural: 0,
    APBSOtherCharges: 0,
    APBSPenalInterest: 0,
    APBSTotal: 0,
    FRAPrincipal: 0,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  const [additionalDetailsSection, setAdditionalDetailsSection] = useState({
    AdvanceClassificationID: "Loss",
    ChargeOfType: 1,
    ApprovalNumber: null,
    DateOfApproval: null,
    DateOfWriteoff: null,
    WriteOffReason: null,
    Remarks: -1,
  });

  const [collateralSection, setCollateralSection] = useState({
    NatureOfSecurity: null,
    NatureOfCharge: null,
    FSValue: null,
    DateOfValuation: null,
    SaleOfSecurity: null,
    DetailsOfSecurity: null,
    ChangeInSecurity: null,
    SecuritybyBankAtWriteOff: null,
    PledgeLifted: 3,
    ABInitioLevel: 3,
    WillfullDefaulter: 3,
    RightOfRecovery: 3,
  });

  const [recoveryWriteOffSection, setRecoveryWriteOffSection] = useState({
    DateOfRecovery: null,
    Principal: 0,
    Nominated: 0,
    Nonaccural: 0,
    OtherCharges: 0,
    PenalInterest: 0,
    Total: 0,
  });
  const [FinalDetails, setFinalDetails] = useState({});
  const goToSaveHandler = () => {};

  const columns = [
    {
      title: "Serial #",
      dataIndex: "miSysCode",
      key: "Serial",
      align: "center",
      width: "2%",
    },
    {
      title: "Transaction ID",
      dataIndex: "miSysCode",
      key: "miSysCode",
      align: "center",
      width: "2%",
    },
    {
      title: "HBL Account Number",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5%",
    },
    {
      title: "Other Bank Account Number",
      dataIndex: "OtherBankAccountNumber",
      key: "OtherBankAccountNumber",
      align: "center",
      width: "5%",
    },

    {
      title: "Branch Code",
      dataIndex: "BranchCode",
      key: "BranchCode",
      align: "center",
      width: "5%",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
      align: "center",
      width: "2%",
    },
    {
      title: "Transaction Date",
      dataIndex: "Transaction",
      key: "Transaction",
      align: "center",
      width: "2%",
    },
    {
      title: "Transaction Time",
      dataIndex: "Transaction",
      key: "Transaction",
      align: "center",
      width: "3%",
    },
    {
      title: "Point Of Sale Mode",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "5%",
    },
    {
      title: "Merchant Name",
      dataIndex: "ViewApprovalHistory",
      key: "ViewApprovalHistory",
      align: "center",
      width: "5%",
    },
    {
      title: "Merchant Number",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "5%",
    },
    {
      title: "Merchant City",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "5%",
    },
  ];

  const column = [
    {
      title: "File Name",
      name: "name",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: "2%",
    },
  ];
  useEffect(() => {
    let a = setupForms.UploadList;
    if (a !== undefined && a !== null && Object.keys(a).length !== 0) {
      setDataUpload({
        name: setupForms.UploadList.name,
        uid: setupForms.UploadList.uid,
      });
    }
  }, [setupForms.UploadList]);
  useEffect(() => {}, [dataUpload]);
  return !goToSave ? (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Paper padding="1">
          <Row gutter={16}>
            <Col lg={18} md={18} sm={18} xs={24}>
              <h1
                className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
              >
                Customer Details
              </h1>
            </Col>
            <Col lg={6} md={6} sm={6} xs={24} className="p-0 u-text-align-left">
              <div className="Level-Section">
                <div>
                  <i className="icon-card icon-size-one"></i>
                  <div
                    className="u-position-absolute u-right-105px u-top-51px"
                  >
                    <span className="LevelHeading">CNIC Number</span>
                    <br />
                    <span className="SubHeading">1111111111111</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="u-margin-top-30px" />
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer Name"
                disable
                value={"Parveen"}
                label={"Customer Name"}
                fullWidth
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer City"
                disable
                value={"PESHAWAR"}
                label={"Customer City"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Debit Card Number"
                disable
                value={"1234 xxxx xxxx 1234"}
                label={"Debit Card Number"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Account Number"
                disable
                value={"1234567-C01"}
                label={"Account Number"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Reference#"
                disable
                value={"1234567-C01"}
                label={"Reference #"}
                fullWidth
              />
            </Col>

            <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
              <div className="TransactionHeading">Transaction Details</div>
              <Table
                //   rows={rows}
                columns={columns}
                scroll={{ x: "max-content" }}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              Date
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24} className="u-margin-bottom-20px">
              <DatePicker
                size="large"
                width="100%"
                DateRange
                name="DateOfApproval"
                value={"25-01-2022"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <TextField
                fullWidth
                label="Enter Case Revised Channel"
                size="small"
                textLength={30}
                name="ApprovalNumber"
                value={additionalDetailsSection.ApprovalNumber}
                disable
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <label>
                <b>Case Resolved</b>
              </label>
              <br />
              <Radio.Group
                name="PledgeLifted"
                value={collateralSection.PledgeLifted}
                disable
              >
                <Radio disable defaultChecked value={1}>
                  Yes
                </Radio>
                <Radio disable defaultChecked={false} value={2}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-bottom-20px">
              <DatePicker
                size="large"
                width="100%"
                DateRange
                name="CaseReceivedDate"
                value={"07-01-2022"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-bottom-20px">
              <Paper ml="1.5">
                <TextField
                  fullWidth
                  label="Total Transaction Amount"
                  size="small"
                  textLength={30}
                  name="ApprovalNumber"
                  value={"32,499"}
                  disable={true}
                />
              </Paper>
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24} className="u-margin-bottom-20px">
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              Closure Details
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Case Decision"
                size="small"
                name=""
                value={"CM Liability"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Event ID (SAS Ref #)"
                size="small"
                name=""
                value={"123123"}
                disable
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="u-margin-bottom-20px">
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                name=""
                value={"Individual Case"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                name="DateOfApproval"
                value={"25-01-2022"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Case Closed TAT"
                size="small"
                name=""
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Expected Recovery"
                size="small"
                name=""
                value={"500,000"}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-bottom-20px u-text-align-center">
              <label>
                <b>Demographic Change</b>
              </label>
              <br />
              <Radio.Group name="PledgeLifted" disable>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="u-margin-bottom-20px">
              <label>
                <b>Flexi Loan</b>
              </label>
              <br />
              <Radio.Group
                name="PledgeLifted"
                value={collateralSection.PledgeLifted}
                disable
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Bill Information"
                size="small"
                name=""
                value={"500,000"}
                disable
              />
            </Col>
            <Col lg={14} md={14} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Information which customer claimed that caller have about Him/Her"
                size="small"
                name=""
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Expected Recovery from HBL Beneficiary"
                size="small"
                name=""
                value={"500,000"}
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Expected Recovery from Member Bank Beneficiary"
                size="small"
                name=""
                value={"500,000"}
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <label>
                <b>Customer / Beneficiary Sim Blocked</b>
              </label>
              <br />
              <Radio.Group disable>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Fun Layered A/C #"
                size="small"
                name=""
                value={"abc12345"}
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>Operating System</b>
              </label>
              <br />
              <Radio.Group disable>
                <Radio value={1}>Android</Radio>
                <Radio value={2}>iOS</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Source of IB Channel Creation"
                size="small"
                name=""
                value={"Debit Card"}
                disable
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              File Upload
            </h1>
          </Col>
          <Row gutter={8}>
            <Col md={24} lg={24} sm={24} className="u-text-align-left">
              <Uploads />
            </Col>
            <div className="u-margin-top-5pct" />
            <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
              <Table columns={column} scroll={{ x: "max-content" }} />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <div className="u-margin-top-45px" />
        <Row gutter={16} justify="center">
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Close"
              type="submit"
              icon={<i className="icon-close icon-size-one"></i>}
              applyClass="buttonPrimaryLarge"
              size="large"
            />
          </Col>
        </Row>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      <Notification
        setOpen={setOpenApproval}
        open={openApproval}
        message={"Select Date of Approval"}
        Type={Message.warning}
      />
      <Notification
        setOpen={setOpenWriteoff}
        open={openWriteoff}
        message={"Select Date of Write off"}
        Type={Message.warning}
      />
    </>
  ) : (
    <></>
  );
};

export default PreFilledCustomerDetails;
