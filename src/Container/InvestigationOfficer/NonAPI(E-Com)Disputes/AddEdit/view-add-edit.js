import React, { useEffect, useState, useRef } from "react";


import { PlusOutlined as AddIcon } from "@ant-design/icons";

import { Typography, Radio, Space, Empty, Tooltip, Row, Col } from "antd";

import {
  Paper,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Notification,
  Table,
  Message,
  Loader,
  FormattedInputs,
  // Upload,
  uploadButton,
  Modal,
  GroupedButtons,
} from "../../../../Components/Elements";

import Helper from "../../../../Common/Functions/history_logout";

import moment from "moment";

import {
  setStateOfUploadDocumentCreditCard,
  DownloadUploadFile,
} from "../../../../store/actions/reports_actions";

import {
  DateDisplayFormat,
  DateSendingFormat,
  RemoveTimeDashes,
  NumberFormater,
  CommaFormter,
  TimeDisplayFormat,
} from "../../../../Common/Functions/date-formatter";

import {
  AddApprovalReason,
  RejectReason,
} from "../../../../store/actions/investigation-manager-actions";

import { SearchNonApiDisputesByCnicAndReferenceNumber } from "../../../../store/actions/investigation-officer-actions";
import { enableGoBack } from "../../../../store/actions/ui-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewCustomerDetailsNONAPI = () => {
  var cnic = localStorage.getItem("CNICNumber");
  var userID = localStorage.getItem("CurrentUserID");
  const navigate = useNavigate();
  const { Title } = Typography;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [fraudType, setFraudType] = useState([]);

  const {
    setupForms,
    investigationOfficer,
    selectedRowKeys,
    investigationManager,
  } = state;

  // for select rows from table
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const [fDCusotmerAccount, sefDCusotmerAccount] = useState({
    AccountNumber: "",
    CNICNumber: "",
    CustomerName: "",
    fK_CTID: 0,
  });

  const [cityValue, setCityValue] = useState("");

  const [CardDetails, setCardDetails] = useState({
    CardNumber: "",
    FK_DisputeTableID: 0,
  });

  const [NPIDispute, setNPIDispute] = useState({
    FK_FTID: 0,
    CaseReceivedChannel: "",
    CaseResolvedDate: "",
    CaseReceivedDate: "",
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    IsTC40Reporting: false,
    TC40ReportingDate: "",
    SafeReportingDate: "",
    IsSafeReportingDate: false,
    FK_CSID: 1,
    CaseDecision: "",
    IsPOC: false,
    POCIdentified: "",
    EventIDSAS: "",
    CaseClosedTAT: -1,
    InFavourOfCM: "",
    CustomerLiability: "",
    Remarks: "",
    ReferenceNumber: "",
  });

  // uploadlist
  const [ListOfDebitCardDisputeDocuments, setListOfDebitCardDisputeDocuments] =
    useState([]);

  useEffect(() => {}, [NPIDispute]);

  const [trsDetails, setTrsDetails] = useState([]);

  // List of Transaction Details already esist
  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);

  //For Fraud ID to Name
  useEffect(() => {
    let customerDetails = investigationOfficer.GetNonApiDisputesData.npiDispute;
    let nameFraud = setupForms.FraudTypeData;
    if (customerDetails !== undefined && customerDetails !== null) {
      nameFraud.map((data, index) => {
        if (customerDetails.fK_FTID === data.pK_FTID) {
          setFraudType(data.name);
          setNPIDispute({
            ...NPIDispute,
            ["fK_FTID"]: parseInt(data.pK_FTID),
          });
        }
      });
    }
  }, [setupForms.FraudTypeData]);

  // manual transection list table column
  const colu = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
      align: "center",
      width: "220px",
    },
    {
      title: "HBL Account Number",
      dataIndex: "hblAccountNumber",
      key: "hblAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Other Bank Account Number",
      dataIndex: "otherBankAccountNumber",
      key: "otherBankAccountNumber",
      align: "center",
      width: "220px",
    },

    {
      title: "Branch Code",
      dataIndex: "otherBankBranchCode",
      key: "otherBankBranchCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Name",
      dataIndex: "otherBankBranchName",
      key: "otherBankBranchName",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "") {
          return DateDisplayFormat(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Transaction Time",
      dataIndex: "transactionTime",
      key: "transactionTime",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "") {
          return TimeDisplayFormat(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Potential Save",
      dataIndex: "potentialSave",
      key: "potentialSave",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Exposure / Dispute Amount",
      dataIndex: "disputeAmount",
      key: "disputeAmount",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Currency Code",
      dataIndex: "transactionCurrencyCode",
      key: "transactionCurrencyCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Approval Code",
      dataIndex: "approvalCode",
      key: "approvalCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
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
      title: "Merchant ID",
      dataIndex: "merchantID",
      key: "merchantID",
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
      width: "220px",
    },
    {
      title: "Approval Reference Number",
      dataIndex: "arn",
      key: "arn",
      align: "center",
      width: "220px",
    },
    {
      title: "Source",
      dataIndex: "fK_SID",
      key: "fK_SID",
      align: "center",
      width: "220px",
      render: (text) => {
        return setupForms.SourceData.map((data, index) => {
          if (text === data.pK_SID) {
            return data.name;
          }
        });
      },
    },
    {
      title: "Acquirer ID",
      dataIndex: "acquirerID",
      key: "acquirerID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Terminal ID",
      dataIndex: "acquirerTerminalID",
      key: "acquirerTerminalID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Institution",
      dataIndex: "acquirerInstitution",
      key: "acquirerInstitution",
      align: "center",
      width: "220px",
    },
  ];

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
      align: "center",
      width: "220px",
    },
    {
      title: "HBL Account Number",
      dataIndex: "hblAccountNumber",
      key: "hblAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Other Bank Account Number",
      dataIndex: "otherBankAccountNumber",
      key: "otherBankAccountNumber",
      align: "center",
      width: "220px",
    },

    {
      title: "Branch Code",
      dataIndex: "otherBankBranchCode",
      key: "otherBankBranchCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Name",
      dataIndex: "otherBankBranchName",
      key: "otherBankBranchName",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "") {
          return DateDisplayFormat(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Transaction Time",
      dataIndex: "transactionTime",
      key: "transactionTime",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "") {
          return TimeDisplayFormat(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Potential Save",
      dataIndex: "potentialSave",
      key: "potentialSave",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Exposure / Dispute Amount",
      dataIndex: "disputeAmount",
      key: "disputeAmount",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Currency Code",
      dataIndex: "transactionCurrencyCode",
      key: "transactionCurrencyCode",
      align: "center",
      width: "4%",
    },
    {
      title: "Approval Code",
      dataIndex: "approvalCode",
      key: "approvalCode",
      align: "center",
      width: "4%",
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      align: "center",
      width: "4%",
    },
    {
      title: "Point Of Sale POS Mode",
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
      title: "Merchant ID",
      dataIndex: "merchantID",
      key: "merchantID",
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
      width: "220px",
    },
    {
      title: "Approval Reference Number",
      dataIndex: "arn",
      key: "arn",
      align: "center",
      width: "220px",
    },
    {
      title: "Source",
      dataIndex: "fK_SID",
      key: "fK_SID",
      align: "center",
      width: "220px",
      render: (text) => {
        return setupForms.SourceData.map((data, index) => {
          if (text === data.pK_SID) {
            return data.name;
          }
        });
      },
    },
    {
      title: "Acquirer ID",
      dataIndex: "acquirerID",
      key: "acquirerID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Terminal ID",
      dataIndex: "acquirerTerminalID",
      key: "acquirerTerminalID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Institution",
      dataIndex: "acquirerInstitution",
      key: "acquirerInstitution",
      align: "center",
      width: "220px",
    },
  ];

  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 4,
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

  var TTID = localStorage.getItem("FK_TTID");
  var TTIDQM = localStorage.getItem("ttid");
  var Fk_TTID = localStorage.getItem("fk_TTID");
  localStorage.setItem("FK_TTID", TTID);

  useEffect(() => {
    const ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
    const CNICNumber = localStorage.getItem("CNICNumber");
    let Data = { CNICNumber: CNICNumber, ReferenceNumber: ReferenceNumber };

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (TTIDQM === null) {
        if (TTID === "4") {
          dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data, TTID));
          navigate("/Fraud/DisputeCases/ViewCustomerDetailsNonApi");
        } else {
          dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data));
        }
      } else {
        let TTIDvalue = true;
        dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data, TTIDvalue));
      }
      dispatch(enableGoBack());
    }
  }, []);

  // For Row slection
  const rowSelection = {
    selectedRowKeys,
    onChange: (listOfTransactionDetailsAlreadyExsist) => {
      setSelect({
        ...select,
        selectedRowKeys: listOfTransactionDetailsAlreadyExsist,
      });
    },
    selectedRowKeys: listOfTransactionDetailsAlreadyExsist
      .filter((item) => item.preIdentifiedDataType === 2)
      .map((item) => item.key),
    getCheckboxProps: (listOfTransactionDetailsAlreadyExsist) => ({
      disabled: listOfTransactionDetailsAlreadyExsist.preIdentifiedDataType,
      name: listOfTransactionDetailsAlreadyExsist.preIdentifiedDataType,
    }),
  };

  useEffect(() => {
    let newData = investigationOfficer.GetNonApiDisputesData.npiDispute;
    if (newData !== undefined && newData !== null) {
      setNPIDispute({
        FK_FTID: newData.fK_FTID,
        CaseReceivedChannel: newData.caseReceivedChannel,
        CaseResolvedDate: newData.caseResolvedDate,
        CaseReceivedDate: newData.caseReceivedDate,
        IsCaseResolved: newData.isCaseResolved,
        TotalTransactionAmount: newData.totalTransactionAmount,
        IsTC40Reporting: newData.isTC40Reporting,
        TC40ReportingDate: newData.tC40ReportingDate,
        FK_CSID: 1,
        IsPOC: newData.isPOC,
        POCIdentified: newData.pocIdentified,
        EventIDSAS: newData.eventIDSAS,
        Aging: newData.caseAging,
        CaseClosedTAT: newData.caseClosedTAT,
        Remarks: newData.remarks,
        ReferenceNumber: newData.refrenceNumber,
      });
    }
    let newDataFDCustomer =
      investigationOfficer.GetNonApiDisputesData.fdCustomer;
    if (newDataFDCustomer !== undefined && newDataFDCustomer !== null) {
      sefDCusotmerAccount({
        CNICNumber: newDataFDCustomer.cnicNumber,
        CustomerName: newDataFDCustomer.customerName,
        fK_CTID: newDataFDCustomer.fK_CTID,
      });
      let cityValue = setupForms.CityData;
      cityValue.map((data, index) => {
        if (newDataFDCustomer.fK_CTID === data.pK_CTID) {
          setCityValue(data.name);
        }
      });
    }
    let newDataCardDetail =
      investigationOfficer.GetNonApiDisputesData.cardDetails;
    if (newDataCardDetail !== undefined && newDataCardDetail !== null) {
      setCardDetails({
        CardNumber: newDataCardDetail.cardNumber,
      });
    }
    let alreadyexist =
      investigationOfficer.GetNonApiDisputesData.irisTransactionDetails;
    if (
      alreadyexist !== undefined &&
      alreadyexist !== null &&
      alreadyexist !== null
    ) {
      let GetTransactionDetailsByCNICArray = alreadyexist.map((item, index) => {
        var i = index;
        i = index + 1;
        return { ...item, key: i + "" };
      });
      setListOfTransactionDetailsAlreadyExsist(
        GetTransactionDetailsByCNICArray
      );
    }
    if (investigationOfficer.GetNonApiDisputesData) {
      let listOfNPIDocuments =
        investigationOfficer.GetNonApiDisputesData.listOfNPIDisputeDocuments;
      if (listOfNPIDocuments !== undefined && listOfNPIDocuments !== null) {
        let tem = [];
        listOfNPIDocuments.map((data, index) => {
          tem.push({
            PK_DCDDID: data.pK_DCDDID,
            FK_DCDID: data.fK_DCDID,
            FK_GSSUserID: data.fK_GSSUserID,
            OriginalFileName: data.originalFileName,
            DisplayFileName: data.displayFileName,
          });
        });
        setListOfDebitCardDisputeDocuments(tem);
      }
    }
  }, [investigationOfficer.GetNonApiDisputesData]);

  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (fDCusotmerAccount.fK_CTID === data.pK_CTID) {
        setCityValue(data.name);
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {}, [cityValue]);

  //Transaction Details Mapping
  useEffect(() => {
    let data = investigationOfficer.GetNonApiDisputesData.transactionDetails;
    if (data !== undefined && data !== null && data.length > 0) {
      setTrsDetails(data);
    }
  }, [investigationOfficer.GetNonApiDisputesData]);

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

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

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
    let fk_TTID = 4;
    let newData = investigationOfficer.GetNonApiDisputesData.npiDispute;
    let pK_did = newData.pK_NAPIDID;
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
    let fk_TTID = 4;
    let newData = investigationOfficer.GetNonApiDisputesData.npiDispute;
    let pK_did = newData.pK_NAPIDID;
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
      })
    );
  }, [setupForms.ApprovalReasonsData]);

  // For Rejection Reasons DropDown SetState
  useEffect(() => {
    let nameRejection = setupForms.RejectionReasonsData;
    if (nameRejection !== undefined && nameRejection !== null) {
      setRejectionReason(
        nameRejection.map((data, index) => {
          return data.reason;
        })
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
      <Title level={3}>View Non API (E-Com) Disputes</Title>
      <Paper padding="1">
        <Row gutter={16}>
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              Customer Details
            </h1>
          </Col>
        </Row>
        <Row gutter={16} className="u-margin-top-20px">
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="ReferenceNumber"
              size="small"
              disable
              value={NPIDispute.ReferenceNumber}
              label={"Reference #"}
              fullWidth
            />
          </Col>
          <Col lg={4} md={4} sm={24} xs={24}>
            <TextField
              name="CNIC"
              size="small"
              disable
              value={cnic}
              label={"CNIC"}
              fullWidth
            />
          </Col>
          <Col lg={4} md={4} sm={24} xs={24}>
            <TextField
              name="CustomerName"
              size="small"
              disable
              value={fDCusotmerAccount.CustomerName}
              label={"Customer Name"}
              fullWidth
            />
          </Col>

          <Col lg={4} md={4} sm={24} xs={24}>
            <SelectBox
              label="City"
              value={cityValue}
              name="fK_CTID"
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="CardNumber"
              size="small"
              disable
              value={CardDetails.CardNumber}
              label={"Card Number"}
              fullWidth
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <SelectBox
              name="Fraud Type"
              disable
              value={fraudType}
              label="Select Fraud Type"
            />
          </Col>
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <div className="TransactionHeading">
              System Fetched Transactions
            </div>
            <Table
              rows={listOfTransactionDetailsAlreadyExsist}
              columns={columns}
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
      <div className="u-margin-top-20px" />
      <Paper padding="1">
        <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
          <div className="TransactionHeading">Manually Entered Transaction</div>
          <Table
            rows={trsDetails}
            columns={colu}
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
          <h1
            className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
          >
            Date
          </h1>
        </Col>
        <Row gutter={8}>
          <Col lg={4} md={4} sm={24} className="u-margin-bottom-20px">
            <DatePicker
              label={"Case Received Date"}
              size="large"
              width="100%"
              DateRange
              name="CaseReceivedDate"
              value={
                NPIDispute.CaseReceivedDate
                  ? DateDisplayFormat(NPIDispute.CaseReceivedDate)
                  : null
              }
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label="Case Received Channel"
              size="small"
              textLength={30}
              name="CaseReceivedChannel"
              value={NPIDispute.CaseReceivedChannel}
              disable
            />
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="u-text-align-center u-margin-top-15px">
            <label>
              <b>Case Resolved</b>
            </label>
            <br />
            <Radio.Group
              name="IsCaseResolved"
              disable={true}
              value={NPIDispute.IsCaseResolved}
            >
              <Radio disabled value={true}>
                Yes
              </Radio>
              <Radio disabled value={false}>
                No
              </Radio>
            </Radio.Group>
          </Col>
          <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
            <DatePicker
              size="large"
              width="100%"
              DateRange
              name="CaseResolvedDate"
              value={
                NPIDispute.CaseResolvedDate
                  ? DateDisplayFormat(NPIDispute.CaseResolvedDate)
                  : null
              }
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <Paper ml="1.5">
              <TextField
                fullWidth
                label="Total Dispute Amount"
                value={
                  NPIDispute.TotalTransactionAmount === null ||
                  NPIDispute.TotalTransactionAmount === -99999999999999999999
                    ? null
                    : CommaFormter(NPIDispute.TotalTransactionAmount)
                }
                size="small"
                textLength={30}
                name="TotalTransactionAmount"
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
          <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center u-margin-top-15px">
            <label>
              <b>TC 40 Reporting</b>
            </label>
            <br />
            <Radio.Group
              name="IsTC40Reporting"
              disable
              value={NPIDispute.IsTC40Reporting}
            >
              <Radio disabled value={true}>
                Yes
              </Radio>
              <Radio disabled value={false}>
                No
              </Radio>
            </Radio.Group>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <DatePicker
              label={"TC40 Reporting Date"}
              size="large"
              width="100%"
              DateRange
              placeholder={"Select TC 40 Reporting Date"}
              value={
                NPIDispute.TC40ReportingDate
                  ? DateDisplayFormat(NPIDispute.TC40ReportingDate)
                  : null
              }
              name="TC40ReportingDate"
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center u-margin-top-15px">
            <label>
              <b>Point Of Compromise Identified</b>
            </label>
            <br />
            <Radio.Group name="IsPOC" disable value={NPIDispute.IsPOC}>
              <Radio disabled value={true}>
                Yes
              </Radio>
              <Radio disabled value={false}>
                No
              </Radio>
            </Radio.Group>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label="Point Of Compromise Identified"
              value={NPIDispute.POCIdentified}
              size="small"
              name="POCIdentified"
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label="Remarks"
              size="small"
              name="Remarks"
              value={NPIDispute.Remarks}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label="Event ID (SAS REF #)"
              size="small"
              name="EventIDSAS"
              value={NPIDispute.EventIDSAS}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              fullWidth
              size="small"
              label="Aging"
              name="Aging"
              value={
                NPIDispute.Aging === null || NPIDispute.Aging === -1
                  ? null
                  : NPIDispute.Aging
              }
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              fullWidth
              size="small"
              label="Case Closed TAT"
              name="CaseClosedTAT"
              value={
                NPIDispute.CaseClosedTAT === null ||
                NPIDispute.CaseClosedTAT === -1
                  ? null
                  : NPIDispute.CaseClosedTAT
              }
              disable
            />
          </Col>
        </Row>
      </Paper>
      <div className="u-margin-top-25px" />
      <Paper padding="1">
        <Col lg={18} md={18} sm={18} xs={24}>
          <h1
            className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
          >
            Files Upload
          </h1>
        </Col>
        <Row gutter={8}>
          <div className="u-margin-top-5pct" />
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <Table
              rows={ListOfDebitCardDisputeDocuments}
              columns={column}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
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
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewCustomerDetailsNONAPI;
