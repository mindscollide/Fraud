import React, { useEffect, useState } from "react";

import { Typography, Radio, Tooltip, Row, Col } from "antd";

import { DownloadUploadFile } from "../../../../store/actions/reports_actions";

import {
  Modal,
  GroupedButtons,
  Paper,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Notification,
  Table,
  Loader,
  FormattedInputs,
} from "../../../../Components/Elements";
import Helper from "../../../../Common/Functions/history_logout";
import { enableGoBack } from "../../../../store/actions/ui-actions";

import {
  DateDisplayFormat,
  CommaFormter,
  TimeDisplayFormat,
} from "../../../../Common/Functions/date-formatter";

import {
  AddApprovalReason,
  RejectReason,
} from "../../../../store/actions/investigation-manager-actions";

import {
  HideNotification,
  GetCreditCardDisputesByCnic,
} from "../../../../store/actions/investigation-officer-actions";
import { useDispatch, useSelector } from "react-redux";

const ViewCustomerDetails = () => {
  var cnic = localStorage.getItem("cnic");

  var userID = localStorage.getItem("CurrentUserID");

  const { Title } = Typography;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [fraudType, setFraudType] = useState([]);

  const { setupForms, investigationOfficer, reports, investigationManager } =
    state;

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [FDCustomer, setFDCustomer] = useState({
    CNICNumber: "",
    CustomerName: "",
    CMCity: "",
  });

  const [
    ListOfCreditCardDisputeDocuments,
    setListOfCreditCardDisputeDocuments,
  ] = useState([]);

  const [transactionDetails, setTransactionDetails] = useState([]);

  const [disputeDetails, setDisputeDetails] = useState({
    refrenceNumber: "",
    customerName: "",
    creditCardLimit: -99999999999999999999,
    cnicNumber: "",
    caseReceivedChannel: "",
    isCaseResolved: true,
    totalTransactionAmount: -99999999999999999999,
    isTC40Reporting: true,
    isSafeReporting: true,
    caseDecision: "",
    isPOC: true,
    pocIdentified: "",
    recovery: -99999999999999999999,
    eventIdSAS: "",
    aging: -1,
    caseClosedTAT: -1,
    fK_FTID: 0,
    fK_CTID: 0,
  });

  //View Page
  var TTID = localStorage.getItem("FK_TTID");
  var TTIDQM = localStorage.getItem("ttid");
  let navigate = Helper.navigate;

  const getFilter = () => {
    let filteredItems = ListOfCreditCardDisputeDocuments;
    filteredItems = ListOfCreditCardDisputeDocuments.filter(
      (item) => item.DisplayFileName !== "",
    );
    return filteredItems;
  };

  useEffect(() => {}, [disputeDetails]);

  useEffect(() => {
    const ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
    const CNICNumber = localStorage.getItem("CNICNumber");
    let Data = { CNICNumber: CNICNumber, ReferenceNumber: ReferenceNumber };
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (TTIDQM === null) {
        if (TTID === "1") {
          dispatch(GetCreditCardDisputesByCnic(Data, TTID));
          navigate("/Fraud/DisputeCases/ViewCustomerDetails");
        } else {
          dispatch(GetCreditCardDisputesByCnic(Data));
        }
      } else {
        let TTIDvalue = true;
        dispatch(enableGoBack());
        dispatch(GetCreditCardDisputesByCnic(Data, TTIDvalue));
      }
    }
  }, []);

  useEffect(() => {
    setFDCustomer({
      ...FDCustomer,
      ["CNICNumber"]: cnic,
    });
  }, []);

  useEffect(() => {}, [fraudType]);

  //Details of Input Fields
  useEffect(() => {
    let newData = investigationOfficer.GetCreditCardDisputesData.disputeDetails;
    if (newData !== undefined && newData !== null) {
      setDisputeDetails({
        refrenceNumber: newData.refrenceNumber,
        cardNumber: newData.cardNumber,
        customerName: newData.customerName,
        cnicNumber: newData.cnicNumber,
        creditCardLimit: newData.creditCardLimit,
        fK_FTID: newData.fK_FTID,
        fK_CTID: newData.fK_CTID,
        caseReceivedChannel: newData.caseReceivedChannel,
        isCaseResolved: newData.isCaseResolved,
        totalTransactionAmount: newData.totalTransactionAmount,
        isTC40Reporting: newData.isTC40Reporting,
        isSafeReporting: newData.isSafeReporting,
        isPOC: newData.isPOC,
        pocIdentified: newData.pocIdentified,
        caseDecision: newData.caseDecision,
        caseClosedTAT: newData.caseClosedTAT,
        aging: newData.aging,
        recovery: newData.recovery,
        eventIdSAS: newData.eventIdSAS,
        caseRecievedDate: newData.caseRecievedDate,
        caseResolvedDate: newData.caseResolvedDate,
        tC40ReportingDate: newData.tC40ReportingDate,
        safeReportingDate: newData.safeReportingDate,
      });
    }
    if (investigationOfficer.GetCreditCardDisputesData) {
      let listOfCCDDocuments =
        investigationOfficer.GetCreditCardDisputesData
          .creditCardDisputeDocuments;
      if (listOfCCDDocuments !== undefined && listOfCCDDocuments !== null) {
        let tem = [];
        listOfCCDDocuments.map((data, index) => {
          tem.push({
            PK_CCDDID: data.pK_CCDDID,
            FK_CCDID: data.fK_CCDID,
            FK_GSSUserID: data.fK_GSSUserID,
            OriginalFileName: data.originalFileName,
            DisplayFileName: data.displayFileName,
          });
        });
        setListOfCreditCardDisputeDocuments(tem);
      }
    }
  }, [investigationOfficer.GetCreditCardDisputesData]);

  //Transaction Details Mapping
  useEffect(() => {
    let data =
      investigationOfficer.GetCreditCardDisputesData
        .creditCardTransactionDetails;
    if (data !== undefined && data !== null) {
      setTransactionDetails(data);
    }
  }, [investigationOfficer.GetCreditCardDisputesData]);

  // For FraudType DropDown SetState
  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (disputeDetails.fK_FTID === data.pK_FTID) {
        setFraudType(data.name);
      }
    });
  }, [setupForms.FraudTypeData]);

  const [cityValue, setCityValue] = useState("");

  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (disputeDetails.fK_CTID === data.pK_CTID) {
        setCityValue(data.name);
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {}, [cityValue]);

  useEffect(() => {
    let newData = reports.uploadDocumentsList;
    if (newData !== undefined && newData !== null && newData.length !== 0) {
      let Data = {
        PK_CCDDID: 0,
        FK_CCDID: 0,
        FK_GSSUserID: 0,
        OriginalFileName: newData.originalFileName,
        DisplayFileName: newData.displayFileName,
      };
      setListOfCreditCardDisputeDocuments([
        ...ListOfCreditCardDisputeDocuments,
        Data,
      ]);
    }
  }, [reports.uploadDocumentsList]);

  //Loader Notification
  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.Message,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ShowNotification]);

  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.Message,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.Loading]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Transaction Time",
      dataIndex: "transactionTime",
      key: "transactionTime",
      align: "center",
      width: "220px",
      render: (text) => TimeDisplayFormat(text),
    },

    {
      title: "Transaction Amount PKR",
      dataIndex: "transactionAmountPKR",
      key: "transactionAmountPKR",
      align: "center",
      width: "190px",
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Transaction Billed Amount",
      dataIndex: "transactionBilledAmount",
      key: "transactionBilledAmount",
      align: "center",
      width: "230px",
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Approval Code",
      dataIndex: "approvalCode",
      key: "approvalCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Point Of Sale Mode",
      dataIndex: "posMode",
      key: "posMode",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant Name",
      dataIndex: "merchantName",
      key: "merchantName",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant Number",
      dataIndex: "merchantNumber",
      key: "merchantNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant City",
      dataIndex: "merchantCity",
      key: "merchantCity",
      align: "center",
      width: "220px",
    },
    {
      title: "On Us / Off Us",
      dataIndex: "oN_OFF_US",
      key: "oN_OFF_US",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) === "false") {
          return "Off Us";
        } else if (String(text) === "true") {
          return "On Us";
        }
      },
    },
    {
      title: "Merchant Category Code",
      dataIndex: "categoryCodeMCC",
      key: "categoryCodeMCC",
      align: "center",
      width: "180px",
    },
    {
      title: "POS/ATM",
      dataIndex: "poS_ATM",
      key: "poS_ATM",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Name",
      dataIndex: "acquirerName",
      key: "acquirerName",
      align: "center",
      width: "5%",
    },
    {
      title: "Acquirer ID",
      dataIndex: "acquirerID",
      key: "acquirerID",
      align: "center",
      width: "220px",
    },
    {
      title: "ARN",
      dataIndex: "arn",
      key: "arn",
      align: "center",
      width: "220px",
    },
  ];

  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 1,
    };
    dispatch(DownloadUploadFile(data));
  };

  const column = [
    {
      title: "File Name",
      name: "DisplayFileName",
      dataIndex: "DisplayFileName",
      key: "DisplayFileName",
      align: "center",
      width: "2%",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            className="u-cursor-pointer u-color-blue"
            onClick={(e) => downloadUploadDocument(e, record)}
          >
            {text}
          </i>
        </Tooltip>
      ),
    },
  ];

  //Approve Dispute
  const [approveDispute, setApproveDispute] = useState({
    FK_TTID: 0,
    FK_DID: 0,
    Comments: "",
    FK_AORID: 0,
  });

  //Reject Dispute
  const [rejectDispute, setRejectDispute] = useState({
    FK_TTID: 0,
    FK_DID: 0,
    Comments: "",
    FK_AORID: 0,
  });

  //Reasons
  const [btnStatus, setBtnStatus] = useState(true);
  const [approvalReason, setApprovalReason] = useState([]);
  const [approvalReasonValue, setApprovalReasonValue] = useState([]);
  const [rejectionReason, setRejectionReason] = useState([]);
  const [rejectionReasonValue, setRejectionReasonValue] = useState([]);

  const [modal, setModal] = useState({
    approval: false,
    rejection: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Selected Dropdown value of Approval
  const approvalReasonHandler = (e, value) => {
    setApprovalReasonValue(value);
    let setApprovalReason = setupForms.ApprovalReasonsData;
    setApprovalReason.map((data, index) => {
      if (value === data.reason) {
        let id = data.pK_ARID;
        setApproveDispute({
          ...approveDispute,
          ["FK_AORID"]: parseInt(id),
        });
      }
    });
  };

  // Approval Description
  const handleChangeApprove = (e) => {
    setApproveDispute({
      ...approveDispute,
      ["Comments"]: e.target.value,
    });
  };

  // Selected Dropdown value of Rejection
  const rejectionReasonHandler = (e, value) => {
    setRejectionReasonValue(value);
    let setRejectionReason = setupForms.RejectionReasonsData;
    setRejectionReason.map((data, index) => {
      if (value === data.reason) {
        let id = data.pK_RRID;
        setRejectDispute({
          ...rejectDispute,
          ["FK_AORID"]: parseInt(id),
        });
      }
    });
  };

  const handleChangeReject = (e) => {
    setRejectDispute({
      ...rejectDispute,
      ["Comments"]: e.target.value,
    });
  };

  //Approve Reason API Call
  const handleProceedApprove = async () => {
    setIsModalVisible(false);
    setBtnStatus(true);
    let flag = true;
    localStorage.setItem("FlagValue", flag);
    await dispatch(AddApprovalReason(approveDispute));
    navigate("/Fraud/DisputeCases/PendingApprovals");
    setApprovalReasonValue([]);
    setApproveDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
  };

  const handleProceedReject = () => {
    setIsModalVisible(false);
    setBtnStatus(true);
    let flag = true;
    localStorage.setItem("FlagValue", flag);
    dispatch(RejectReason(rejectDispute));
    navigate("/Fraud/DisputeCases/PendingApprovals");
    setRejectDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setRejectionReasonValue([]);
  };

  //Cancel Button
  const handleCancel = () => {
    setIsModalVisible(false);
    setBtnStatus(true);
    setModal({
      approval: false,
      rejection: false,
    });
    setApprovalReasonValue([]);
    setApproveDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setRejectDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setRejectionReasonValue([]);
  };

  const ApproveDisputeHandler = () => {
    showModal();
    setModal({
      ...modal,
      rejection: false,
      approval: true,
    });
    let fk_TTID = 1;
    let newData = investigationOfficer.GetCreditCardDisputesData.disputeDetails;
    let pK_did = newData.pK_CCDID;
    setApproveDispute({
      ...approveDispute,
      FK_TTID: fk_TTID,
      FK_DID: pK_did,
    });
  };

  const RejectDisputeHandler = () => {
    showModal();
    setModal({
      ...modal,
      rejection: true,
      approval: false,
    });
    let fk_TTID = 1;
    let newData = investigationOfficer.GetCreditCardDisputesData.disputeDetails;
    let pK_did = newData.pK_CCDID;
    setRejectDispute({
      ...rejectDispute,
      FK_TTID: fk_TTID,
      FK_DID: pK_did,
    });
  };

  const buttonPropsApprove = {
    primaryButton: {
      disable: btnStatus,
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleProceedApprove(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  //Modal Buttons For Reject
  const buttonPropsReject = {
    primaryButton: {
      disable: btnStatus,
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleProceedReject(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  useEffect(() => {}, [approvalReason]);

  useEffect(() => {}, [rejectionReason]);

  useEffect(() => {
    let nameApproval = setupForms.ApprovalReasonsData;
    setApprovalReason(
      nameApproval.map((data, index) => {
        return data.reason;
      }),
    );
  }, [setupForms.ApprovalReasonsData]);

  // For Rejection Reasons DropDown SetState
  useEffect(() => {
    let nameRejection = setupForms.RejectionReasonsData;
    if (nameRejection !== undefined && nameRejection !== null) {
      setRejectionReason(
        nameRejection.map((data, index) => {
          return data.reason;
        }),
      );
    }
  }, [setupForms.RejectionReasonsData]);

  useEffect(() => {
    let comment = approveDispute.Comments;
    if (approvalReasonValue.length > 0 && comment.length > 0) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [approvalReasonValue, approveDispute.Comments]);

  useEffect(() => {
    let comment = rejectDispute.Comments;
    if (rejectionReasonValue.length > 0 && comment.length > 0) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [rejectionReasonValue, rejectDispute.Comments]);

  useEffect(() => {
    if (
      investigationManager.SaveApprovalData.responseMessage ===
      "The Dispute Has Been Approved"
    ) {
      setOpen({
        flag: true,
        message: investigationManager.SaveApprovalData.responseMessage,
      });
    }
  }, [investigationManager.SaveApprovalData]);

  //Rejection Message Popup
  useEffect(() => {
    if (
      investigationManager.SaveRejectionData.responseMessage ===
      "The Dispute Has Been Rejected"
    ) {
      setOpen({
        flag: true,
        message: investigationManager.SaveRejectionData.responseMessage,
      });
    }
  }, [investigationManager.SaveRejectionData]);

  return (
    <>
      <Title level={3}>View Credit Card Disputes</Title>
      <form>
        <Paper padding="1">
          <Row gutter={16}>
            <Col lg={18} md={18}>
              <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
                Customer Details
              </h1>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                disable
                label={"Reference #"}
                fullWidth
                value={disputeDetails.refrenceNumber}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                size="small"
                value={disputeDetails.customerName}
                label="Customer Name"
                fullWidth
                textLength={7}
                name="CustomerName"
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select City"
                value={cityValue}
                name="fK_CTID"
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="CreditCardGrid">
              <TextField
                size="small"
                label="Card Number"
                value={disputeDetails.cardNumber}
                fullWidth
                textLength={16}
                name="CardNumber"
                disable={true}
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                size="small"
                value={disputeDetails.cnicNumber}
                label="CNIC"
                fullWidth
                disable
                name="CNICNumber"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                size="small"
                value={
                  disputeDetails.creditCardLimit === -99999999999999999999 ||
                  disputeDetails.creditCardLimit === null
                    ? null
                    : CommaFormter(disputeDetails.creditCardLimit)
                }
                label="Credit Card Limit"
                fullWidth
                disable
                name="CreditCardLimit"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Fraud Type"
                name="FK_FTID"
                value={fraudType}
                disable={true}
              />
            </Col>
          </Row>
          <div className="u-margin-top-20px" />
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <div className="TransactionHeading">Transaction Details</div>
            <Table
              rows={transactionDetails}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 100,
                showSizeChanger: true,
                pageSizeOptions: ["30", "40", "50", "100", "200"],
              }}
            />
          </Col>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Date
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
              <DatePicker
                label={"Case Received Date"}
                size="large"
                width="100%"
                DateRange
                name="CaseReceivedDate"
                value={
                  disputeDetails.caseRecievedDate
                    ? DateDisplayFormat(disputeDetails.caseRecievedDate)
                    : null
                }
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Received Channel"
                value={disputeDetails.caseReceivedChannel}
                size="small"
                textLength={30}
                name="CaseReceivedChannel"
                disable={true}
              />
            </Col>
            <Col
              lg={4}
              md={4}
              sm={24}
              xs={24}
              className="u-text-align-center u-margin-top-15px"
            >
              <label>
                <b>Case Resolved</b>
              </label>
              <br />
              <Radio.Group
                name="IsCaseResolved"
                value={disputeDetails.isCaseResolved}
                disable={true}
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                label={"Case Resolved Date"}
                size="large"
                width="100%"
                DateRange
                placeholder={"Case Resolved Date"}
                name="CaseResolvedDate"
                value={
                  disputeDetails.caseResolvedDate
                    ? DateDisplayFormat(disputeDetails.caseResolvedDate)
                    : null
                }
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <Paper ml="1.5">
                <FormattedInputs
                  name="TotalTransactionAmount"
                  value={
                    disputeDetails.totalTransactionAmount === null ||
                    disputeDetails.totalTransactionAmount ===
                      -99999999999999999999
                      ? null
                      : disputeDetails.totalTransactionAmount
                  }
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  size="small"
                  Label={"Total Billed Amount*"}
                  fullWidth
                  disable
                />
              </Paper>
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Other Details
            </h1>
          </Col>
          <Row gutter={8}>
            <Col
              lg={4}
              md={4}
              sm={24}
              xs={24}
              className="u-text-align-center u-margin-top-10px"
            >
              <label>
                <b>TC 40 Reporting</b>
              </label>
              <br />
              <Radio.Group
                name="IsTC40Reporting"
                value={disputeDetails.isTC40Reporting}
                disable
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                label={"Select TC 40 Reporting Date"}
                size="large"
                width="100%"
                DateRange
                placeholder={"TC 40 Reporting Date"}
                name="TC40ReportingDate"
                value={
                  disputeDetails.tC40ReportingDate
                    ? DateDisplayFormat(disputeDetails.tC40ReportingDate)
                    : null
                }
                disable={true}
              />
            </Col>
            <Col
              lg={4}
              md={4}
              sm={24}
              xs={24}
              className="u-text-align-center u-margin-top-10px"
            >
              <label>
                <b>Safe Reporting</b>
              </label>
              <br />
              <Radio.Group
                name="isSafeReporting"
                value={disputeDetails.isSafeReporting}
                disable={true}
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                label={"Select Safe Reporting Date"}
                size="large"
                width="100%"
                DateRange
                placeholder="Safe Reporting Date"
                name="SafeReportingDate"
                value={
                  disputeDetails.safeReportingDate
                    ? DateDisplayFormat(disputeDetails.safeReportingDate)
                    : null
                }
                disable={true}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Closure Details
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={10} md={10} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Case Decision"
                size="small"
                name="CaseDecision"
                value={disputeDetails.caseDecision}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>Point Of Compromise Identified</b>
              </label>
              <br />
              <Radio.Group
                name="IsPOC"
                value={disputeDetails.isPOC}
                disable={true}
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Point Of Compromise Identified"
                size="small"
                name="POCIdentified"
                value={disputeDetails.pocIdentified}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Recovery"
                size="small"
                name="Recovery"
                value={
                  disputeDetails.recovery === -99999999999999999999 ||
                  disputeDetails.recovery === null
                    ? null
                    : CommaFormter(disputeDetails.recovery)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-21px">
              <TextField
                fullWidth
                label="Event ID SAS"
                size="small"
                name="EventIdSAS"
                value={disputeDetails.eventIdSAS}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                size="small"
                label="Aging"
                name="Aging"
                value={
                  disputeDetails.aging === -1 || disputeDetails.aging === null
                    ? null
                    : disputeDetails.aging
                }
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                size="small"
                label="Case Closed TAT"
                name="CaseClosedTAT"
                value={
                  disputeDetails.caseClosedTAT === -1 ||
                  disputeDetails.caseClosedTAT === null
                    ? null
                    : disputeDetails.caseClosedTAT
                }
                disable={true}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-25px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Files Upload
            </h1>
          </Col>
          <Row gutter={8}>
            <div className="u-margin-top-5pct" />
            <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
              <Table
                rows={getFilter()}
                columns={column}
                scroll={{ x: "max-content" }}
                pagination={{
                  defaultPageSize: 100,
                  showSizeChanger: true,
                  pageSizeOptions: ["30", "40", "50", "100", "200"],
                }}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-25px" />
        {userID === "4" ? (
          <Row gutter={16} justify="center">
            <Col lg={6} md={6} sm={24}></Col>
            <Col lg={6} md={6} sm={24}>
              <Button
                text="Approve"
                type="submit"
                icon={<i className="icon-check icon-size-one"></i>}
                applyClass="buttonPrimaryLarge"
                size="large"
                click={() => ApproveDisputeHandler()}
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <Button
                text="Reject"
                icon={<i className="icon-close icon-size-one"></i>}
                applyClass="btnBorderStyledRed"
                size="large"
                click={() => RejectDisputeHandler()}
              />
            </Col>
            <Col lg={6} md={6} sm={24}></Col>
          </Row>
        ) : null}
      </form>
      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
        modalTitle={
          <Title level={3}>
            {modal.approval && "Accept"}
            {modal.rejection && "Reject"}
          </Title>
        }
      >
        {modal.approval && (
          <>
            <div className="u-padding-bottom-40px u-padding-left-20px u-padding-right-20px u-display-flex u-justify-content-center">
              <Col lg={24} md={24} sm={24} xs={24}>
                <SelectBox
                  option={approvalReason}
                  propertyName={"title"}
                  change={approvalReasonHandler}
                  label="Select Approval Reason"
                  required
                  value={approvalReasonValue}
                  name="SelectApprovalReason"
                />
              </Col>
            </div>
            <div className="u-padding-bottom-80px u-padding-left-20px u-padding-right-20px u-display-flex u-justify-content-center">
              <Col lg={24} md={24} sm={24} xs={24}>
                <TextField
                  multiline
                  rows={6}
                  autoComplete="off"
                  label="Description"
                  change={handleChangeApprove}
                  value={approveDispute.Comments}
                  fullWidth
                  required
                  textLength={500}
                />
              </Col>
            </div>
            <GroupedButtons data={buttonPropsApprove} />
          </>
        )}
        {modal.rejection && (
          <>
            <div className="u-padding-bottom-40px u-padding-left-20px u-padding-right-20px u-display-flex u-justify-content-center">
              <Col lg={24} md={24} sm={24} xs={24}>
                <SelectBox
                  option={rejectionReason}
                  propertyName={"title"}
                  change={rejectionReasonHandler}
                  label="Select Rejection Reason"
                  required
                  value={rejectionReasonValue}
                  name="SelectRejectionReason"
                />
              </Col>
            </div>
            <div className="u-padding-bottom-80px u-padding-left-20px u-padding-right-20px u-display-flex u-justify-content-center">
              <Col lg={24} md={24} sm={24} xs={24}>
                <TextField
                  multiline
                  rows={6}
                  label="Description"
                  autoComplete="off"
                  change={handleChangeReject}
                  value={rejectDispute.Comments}
                  fullWidth
                  required
                  textLength={500}
                />
              </Col>
            </div>
            <GroupedButtons data={buttonPropsReject} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewCustomerDetails;
