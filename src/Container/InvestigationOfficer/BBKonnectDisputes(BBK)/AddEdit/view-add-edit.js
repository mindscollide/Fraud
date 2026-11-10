import React, { useEffect, useState, useMemo } from "react";

import { Typography, Radio, Tooltip, Row, Col } from "antd";

import {
  Paper,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Table,
  Loader,
  FormattedInputs,
  Modal,
  GroupedButtons,
} from "../../../../Components/Elements";

import { DownloadUploadFile } from "../../../../store/actions/reports_actions";

import moment from "moment";

import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
  TimeDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";

import { SearchBBKDisputesByCnicAndReferenceNumber } from "../../../../store/actions/investigation-officer-actions";

import {
  AddApprovalReason,
  RejectReason,
} from "../../../../store/actions/investigation-manager-actions";

import { enableGoBack } from "../../../../store/actions/ui-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewCustomerDetailsBBK = () => {
  var cnic = localStorage.getItem("CNICNumber");

  var userID = localStorage.getItem("CurrentUserID");

  const { Title } = Typography;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [fraudType,   setFraudType] = useState([]);

  // const [cityValue, setCityValue] = useState("");

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [searchData, setSearchData] = useState({
    TransactionDate: "",
    CaseRevisedDate: "",
    CaseResolvedDate: "",
    SafeReportingDate: "",
    ReportingDate: "",
  });

  const {
    setupForms,
    investigationOfficer,
    selectedRowKeys,
    investigationManager,
  } = state;
  // for select rows from table

  const [fDCusotmerAccount, sefDCusotmerAccount] = useState({
    AccountNumber: "",
    CNICNumber: "",
    CustomerName: "",
    fK_CTID: 0,
  });

  const [CardDetails, setCardDetails] = useState({
    CardNumber: "",
    FK_DisputeTableID: 0,
  });

  // const [FDCustomer, setFDCustomer] = useState({
  //   CNICNumber: "",
  //   CustomerName: "",
  //   fK_CTID: 0,
  // });

  const [BBKDispute, setBBKDispute] = useState({
    FK_FTID: 0,
    InitialBlockingDate: "",
    IsInitialBlock: true,
    CaseInitiatedDate: "",
    CustomerDisputeDate: "",
    CaseDetectionDate: "",
    CaseReceivedDate: "",
    CaseReceivedChannel: "",
    IsCaseResolved: false,
    TotalTransactionAmount: 0,
    CaseDecision: "",
    InFavorOfCustomer: -99999999999999999999,
    CustomerLiability: 0,
    Other: 0,
    Insurance: 0,
    Internally: -99999999999999999999,
    AnalystName: "",
    IsTrackingSheetAttached: false,
    Remarks: "",
    ReferenceNumber: "",
    CaseClosedDateTAT: -1,
    CaseClosedTAT: -1,
    NetWorkingTAT: -1,
    Aging: -1,
    FromDateForPreIdentifiedData: "",
    ToDateForPreIdentifiedData: "",
    fK_FTID: 0,
    // fK_CTID: 0,
  });
  const cityValue = useMemo(() => {
    const list = setupForms.CityData || [];
    const match = list.find(
      (c) => Number(c.pK_CTID) === Number(fDCusotmerAccount.fK_CTID)
    );
    return match ? match.name : "";
  }, [setupForms.CityData, fDCusotmerAccount.fK_CTID]);

  const fraudType = useMemo(() => {
    const dispute = investigationOfficer.GetBBKDisputesData?.bbKonnectDispute;
    const list = setupForms.FraudTypeData || [];
    if (!dispute) return "";
    const match = list.find(
      (f) => Number(f.pK_FTID) === Number(dispute.fK_FTID)
    );
    return match ? match.name : "";
  }, [
    setupForms.FraudTypeData,
    investigationOfficer.GetBBKDisputesData?.bbKonnectDispute,
  ]);

  // List of Transaction Details already esist
  // const [
  //   listOfTransactionDetailsAlreadyExsist,
  //   setListOfTransactionDetailsAlreadyExsist,
  // ] = useState([]);

  const BBKDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "CustomerLiability") {
      if (value.length <= 15) {
        setBBKDispute({
          ...BBKDispute,
          [name]: parseInt(value),
        });
      } else {
        value = value.slice(0, 15);
      }
    }

    if (name === "Other") {
      if (value.length <= 15) {
        setBBKDispute({
          ...BBKDispute,
          [name]: parseInt(value),
        });
      } else {
        value = value.slice(0, 15);
      }
    }

    if (name === "Internally") {
      if (value.length <= 15) {
        setBBKDispute({
          ...BBKDispute,
          [name]: parseInt(value),
        });
      } else {
        value = value.slice(0, 15);
      }
    }

    if (
      name !== "CustomerLiability" &&
      name !== "Other" &&
      name !== "Internally" &&
      (value !== "" || value === false)
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: value,
      });
    } else if (
      (name === "CustomerLiability" ||
        name === "Other" ||
        name === "Internally") &&
      value !== ""
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: parseFloat(value),
      });
    } else if (
      (name === "CustomerLiability" ||
        name === "Other" ||
        name === "Internally") &&
      value === ""
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: parseFloat(0),
      });
    } else {
      setBBKDispute({
        ...BBKDispute,
        [name]: "",
      });
    }
  };

  // const DateHandler = (e, val) => {
  //   let id =
  //     e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   if (value !== "") {
  //     setSearchData({
  //       ...searchData,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "TransactionDate" && value !== "") {
  //     setTrsDetails({
  //       ...trsDetails,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "TransactionPostingDate" && value !== "") {
  //     setTrsDetails({
  //       ...trsDetails,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "InitialBlockingDate" && value !== "") {
  //     setBBKDispute({
  //       ...BBKDispute,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "CaseInitiatedDate" && value !== "") {
  //     setBBKDispute({
  //       ...BBKDispute,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "CustomerDisputeDate" && value !== "") {
  //     setBBKDispute({
  //       ...BBKDispute,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "CaseDetectionDate" && value !== "") {
  //     setBBKDispute({
  //       ...BBKDispute,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  //   if (name === "CaseReceivedDate" && value !== "") {
  //     setBBKDispute({
  //       ...BBKDispute,
  //       [name]: DateSendingFormat(value),
  //     });
  //   }
  // };

  // uploadlist
  const [ListOfBBKDisputeDocuments, setListOfBBKDisputeDocuments] = useState(
    []
  );

  // const getFilter = () => {
  //   let filteredItems = ListOfBBKDisputeDocuments;
  //   filteredItems = ListOfBBKDisputeDocuments.filter(
  //     (item) => item.OriginalFileName !== ""
  //   );
  //   return filteredItems;
  // };

  useEffect(() => {}, [BBKDispute]);

  const [trsDetails, setTrsDetails] = useState([]);

  //Details of Input Fields

  // List of Transaction Details already esist
  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);

  //For Fraud ID to Name
  // useEffect(() => {
  //   let customerDetails =
  //     investigationOfficer.GetBBKDisputesData.bbKonnectDispute;
  //   let nameFraud = setupForms.FraudTypeData;
  //   if (customerDetails !== undefined && customerDetails !== null) {
  //     nameFraud.map((data, index) => {
  //       if (customerDetails.fK_FTID === data.pK_FTID) {
  //         setFraudType(data.name);
  //         setBBKDispute({
  //           ...BBKDispute,
  //           ["fK_FTID"]: parseInt(data.pK_FTID),
  //         });
  //       }
  //     });
  //   }
  // }, [setupForms.FraudTypeData]);

  //   for current date
  // const date = moment().format("YYYY-MM-DD");
  // const current = new Date();

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
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
      title: "Account Number",
      dataIndex: "hblAccountNumber",
      key: "hblAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
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
      key: "transactionDate",
      align: "center",
      width: "220px",
      render: (text) => TimeDisplayFormat(text),
    },

    {
      title: "Transaction Posting Date",
      dataIndex: "transactionPostingDate",
      key: "transactionPostingDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
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
      render: (text) => CommaFormter(text),
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
      title: "Response",
      dataIndex: "response",
      key: "response",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Mode",
      dataIndex: "transactionMode",
      key: "transactionMode",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction City",
      dataIndex: "transactionCity",
      key: "transactionCity",
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
  ];

  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 5,
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
        if (TTID === "5") {
          dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data, TTID));
          dispatch(enableGoBack());

          navigate("/Fraud/DisputeCases/ViewCustomerDetailsBBK");
        } else {
          dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data));
          dispatch(enableGoBack());
        }
      } else {
        let TTIDvalue = true;
        dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data, TTIDvalue));
        dispatch(enableGoBack());
      }
    }
  }, []);

  useEffect(() => {
    let newData = investigationOfficer.GetBBKDisputesData.bbKonnectDispute;
    if (newData !== undefined && newData !== null) {
      setBBKDispute({
        FK_FTID: newData.fK_FTID,
        InitialBlockingDate: newData.initialBlockingDate,
        IsInitialBlock: newData.isInitialBlock,
        CaseInitiatedDate: newData.caseInitiatedDate,
        CustomerDisputeDate: newData.customerDisputeDate,
        CaseDetectionDate: newData.caseDetectionDate,
        CaseReceivedDate: newData.caseReceivedDate,
        CaseResolvedDate: newData.caseResolvedDate,
        CaseReceivedChannel: newData.caseReceivedChannel,
        IsCaseResolved: newData.isCaseResolved,
        TotalTransactionAmount: newData.totalTransactionAmount,
        CaseDecision: newData.caseDecision,
        InFavorOfCustomer: newData.inFavorOfCustomer,
        CustomerLiability: newData.customerLiability,
        Other: newData.other,
        Insurance: newData.insurance,
        Internally: newData.internally,
        AnalystName: newData.analystName,
        IsTrackingSheetAttached: newData.isTrackingSheetAttached,
        Remarks: newData.remarks,
        ReferenceNumber: newData.referenceNumber,
        CaseClosedDateTAT: newData.caseCloseDateTAT,
        CaseClosedTAT: newData.caseClosedTAT,
        NetWorkingTAT: newData.netWorkingDaysTAT,
        Aging: newData.aging,
        FK_CSID: 1,
      });
    }
    let newDataFDCustomer = investigationOfficer.GetBBKDisputesData.fdCustomer;
    if (newDataFDCustomer !== undefined && newDataFDCustomer !== null) {
      sefDCusotmerAccount({
        CNICNumber: newDataFDCustomer.cnicNumber,
        CustomerName: newDataFDCustomer.customerName,
        fK_CTID: newDataFDCustomer.fK_CTID,
      });
      // let cityValue = setupForms.CityData;
      // cityValue.map((data, index) => {
      //   if (newDataFDCustomer.fK_CTID === data.pK_CTID) {
      //     setCityValue(data.name);
      //   }
      // });
    }
    let newDataCardDetail = investigationOfficer.GetBBKDisputesData.cardDetails;
    if (newDataCardDetail !== undefined && newDataCardDetail !== null) {
      setCardDetails({
        CardNumber: newDataCardDetail.cardNumber,
      });
    }
    let alreadyexist =
      investigationOfficer.GetBBKDisputesData.irisTransactionDetails;
    if (alreadyexist !== undefined && alreadyexist !== null) {
      let GetTransactionDetailsByCNICArray = alreadyexist.map((item, index) => {
        var i = index;
        i = index + 1;
        return { ...item, key: i + "" };
      });
      setListOfTransactionDetailsAlreadyExsist(
        GetTransactionDetailsByCNICArray
      );
    }
    if (investigationOfficer.GetBBKDisputesData) {
      let listOfBBKDocuments =
        investigationOfficer.GetBBKDisputesData.bbKonnectDisputeDocuments;
      if (listOfBBKDocuments !== undefined && listOfBBKDocuments !== null) {
        let tem = [];
        listOfBBKDocuments.map((data, index) => {
          tem.push({
            PK_DCDDID: data.pK_DCDDID,
            FK_DCDID: data.fK_DCDID,
            FK_GSSUserID: data.fK_GSSUserID,
            OriginalFileName: data.originalFileName,
            DisplayFileName: data.displayFileName,
          });
        });
        setListOfBBKDisputeDocuments(tem);
      }
    }
  }, [investigationOfficer.GetBBKDisputesData]);

  //Transaction Details Mapping
  useEffect(() => {
    let data = investigationOfficer.GetBBKDisputesData.transactionDetails;
    if (data !== undefined && data !== null && data.length > 0) {
      setTrsDetails(data);
    }
  }, [investigationOfficer.GetBBKDisputesData]);

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
    let fk_TTID = 5;
    let newData = investigationOfficer.GetBBKDisputesData.bbKonnectDispute;
    let pK_did = newData.pK_BBKDID;
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
    let fk_TTID = 5;
    let newData = investigationOfficer.GetBBKDisputesData.bbKonnectDispute;
    let pK_did = newData.pK_BBKDID;
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
      // dispatch(HideNotification());
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

  // useEffect(() => {
  //   let valueCity = setupForms.CityData;
  //   valueCity.map((data, index) => {
  //     if (fDCusotmerAccount.fK_CTID === data.pK_CTID) {
  //       setCityValue(data.name);
  //     }
  //   });
  // }, [setupForms.CityData]);

  // useEffect(() => {}, [cityValue]);

  // true when a field actually holds a value (treats "", null, undefined,
  // empty arrays and the -99999999999999999999 "empty number" sentinel as empty)
  const hasValue = (v) =>
    v !== undefined &&
    v !== null &&
    v !== "" &&
    v !== -99999999999999999999 &&
    !(Array.isArray(v) && v.length === 0);

  // show the label only when the field has a value, otherwise "" (placeholder only)
  const lbl = (value, text) => (hasValue(value) ? text : "");

  return (
    <>
      <Title level={3}>View BB Konnect Disputes</Title>
      <Paper section padding="1">
        <Row gutter={16}>
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-ec8d57">
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
              value={BBKDispute.ReferenceNumber}
              label={lbl(BBKDispute.ReferenceNumber, "Reference #")}
              placeholder={"Reference #"}
              fullWidth
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="CNIC"
              size="small"
              disable
              value={cnic}
              label={lbl(cnic, "CNIC")}
              placeholder={"CNIC"}
              fullWidth
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="CustomerName"
              size="small"
              disable
              value={fDCusotmerAccount.CustomerName}
              label={lbl(fDCusotmerAccount.CustomerName, "Customer Name")}
              placeholder={"Customer Name"}
              fullWidth
            />
          </Col>

          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              size="small"
              name="fK_CTID"
              disable={true}
              value={cityValue}
              label="City"
              fullWidth
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <SelectBox
              name="Fraud Type"
              disable
              value={fraudType}
              label={lbl(fraudType, "Select Fraud Type")}
              placeholder="Select Fraud Type"
            /> */}

            {/* <SelectBox
              // name="Fraud Type"
              name="pK_FTID"
              disable
              value={fraudType}
              label={lbl(fraudType, "Select Fraud Type")}
              placeholder="Select Fraud Type"
            /> */}

            <TextField
              size="small"
              name="pK_FTID"
              disable={true}
              value={fraudType}
              label="Fraud Type"
              fullWidth
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
      <Paper section padding="1">
        <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
          <div className="TransactionHeading">Manually Entered Transaction</div>
          <Table
            rows={trsDetails}
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
      <Paper section padding="1">
        <Col lg={18} md={18} sm={18} xs={24}>
          <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-ec8d57">
            Date
          </h1>
        </Col>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <DatePicker
              label={lbl(BBKDispute.CaseReceivedDate, "Case Received Date")}
              placeholder={"Case Received Date"}
              size="large"
              width="100%"
              DateRange
              name="CaseReceivedDate"
              value={
                BBKDispute.CaseReceivedDate
                  ? DateDisplayFormat(BBKDispute.CaseReceivedDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label={lbl(
                BBKDispute.CaseReceivedChannel,
                "Case Received Channel"
              )}
              placeholder="Case Received Channel"
              value={BBKDispute.CaseReceivedChannel}
              name="CaseReceivedChannel"
              change={BBKDisputeHandler}
              type="text"
              size="small"
              textLength={20}
              disable={true}
            />
          </Col>
          <Col
            lg={6}
            md={6}
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
              value={BBKDispute.IsCaseResolved}
              onChange={BBKDisputeHandler}
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
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <DatePicker
              size="large"
              width="100%"
              DateRange
              label={lbl(BBKDispute.CaseResolvedDate, "Case Resolved Date")}
              placeholder={"Case Resolved Date"}
              name="CaseResolvedDate"
              value={
                BBKDispute.CaseResolvedDate
                  ? DateDisplayFormat(BBKDispute.CaseResolvedDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
            <Paper>
              <TextField
                fullWidth
                label={lbl(
                  BBKDispute.TotalTransactionAmount,
                  "Total Dispute Amount"
                )}
                placeholder="Total Dispute Amount"
                value={
                  BBKDispute.TotalTransactionAmount === null ||
                  BBKDispute.TotalTransactionAmount === -99999999999999999999
                    ? null
                    : CommaFormter(BBKDispute.TotalTransactionAmount)
                }
                size="small"
                textLength={30}
                name="TotalTransactionAmount"
                disable={true}
              />
            </Paper>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={24}
            xs={24}
            className="u-margin-top-17px u-text-align-center"
          >
            <label>
              <b>Initial Block</b>
            </label>
            <br />
            <Radio.Group
              name="IsInitialBlock"
              value={BBKDispute.IsInitialBlock}
              onChange={BBKDisputeHandler}
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
              label={lbl(
                BBKDispute.InitialBlockingDate,
                "Initial Blocking Date"
              )}
              placeholder={"Initial Blocking Date"}
              size="large"
              width="100%"
              DateRange
              name="InitialBlockingDate"
              value={
                BBKDispute.InitialBlockingDate
                  ? DateDisplayFormat(BBKDispute.InitialBlockingDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <DatePicker
              label={lbl(BBKDispute.CaseInitiatedDate, "Case Initiated Date")}
              placeholder={"Case Initiated Date"}
              size="large"
              width="100%"
              DateRange
              name="CaseInitiatedDate"
              value={
                BBKDispute.CaseInitiatedDate
                  ? DateDisplayFormat(BBKDispute.CaseInitiatedDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <DatePicker
              label={lbl(
                BBKDispute.CustomerDisputeDate,
                "Customer Dispute Date"
              )}
              size="large"
              width="100%"
              DateRange
              placeholder={"Customer Dispute Date"}
              name="CustomerDisputeDate"
              value={
                BBKDispute.CustomerDisputeDate
                  ? DateDisplayFormat(BBKDispute.CustomerDisputeDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <DatePicker
              label={lbl(BBKDispute.CaseDetectionDate, "Case Detection Date")}
              size="large"
              width="100%"
              DateRange
              placeholder={"Case Detection Date"}
              name="CaseDetectionDate"
              value={
                BBKDispute.CaseDetectionDate
                  ? DateDisplayFormat(BBKDispute.CaseDetectionDate)
                  : null
              }
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
        </Row>
      </Paper>
      <div className="u-margin-top-20px" />
      <Paper section padding="1">
        <Col lg={18} md={18} sm={18} xs={24} className="u-margin-bottom-20px">
          <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-ec8d57">
            Closure Details
          </h1>
        </Col>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label={lbl(BBKDispute.CaseDecision, "Case Decision")}
              placeholder="Case Decision"
              size="small"
              name="CaseDecision"
              textLength={50}
              maxLength={50}
              value={BBKDispute.CaseDecision}
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              name="InFavorOfCustomer"
              value={
                BBKDispute.InFavorOfCustomer === null ||
                BBKDispute.InFavorOfCustomer === -99999999999999999999
                  ? null
                  : NumberFormater(BBKDispute.InFavorOfCustomer)
              }
              textLength={(999, 999, 999, 999, 999, 999, 999)}
              size="small"
              autoComplete="off"
              Label={lbl(BBKDispute.InFavorOfCustomer, "In Favor Of Customer")}
              placeholder={"In Favor Of Customer *"}
              fullWidth
              change={BBKDisputeHandler}
              required
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              name="CustomerLiability"
              value={
                BBKDispute.CustomerLiability === null ||
                BBKDispute.CustomerLiability === -99999999999999999999
                  ? null
                  : NumberFormater(BBKDispute.CustomerLiability)
              }
              textLength={(999, 999, 999, 999, 999, 999, 999)}
              size="small"
              Label={lbl(BBKDispute.CustomerLiability, "Customer Liability")}
              placeholder={"Customer Liability"}
              fullWidth
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              name="Other"
              value={
                BBKDispute.Other === null ||
                BBKDispute.Other === -99999999999999999999
                  ? null
                  : NumberFormater(BBKDispute.Other)
              }
              textLength={(999, 999, 999, 999, 999, 999, 999)}
              size="small"
              Label={lbl(BBKDispute.Other, "Other")}
              placeholder={"Other"}
              fullWidth
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              name="Insurance"
              value={
                BBKDispute.Insurance === null ||
                BBKDispute.Insurance === -99999999999999999999
                  ? null
                  : NumberFormater(BBKDispute.Insurance)
              }
              textLength={(999, 999, 999, 999, 999, 999, 999)}
              size="small"
              Label={lbl(BBKDispute.Insurance, "Insurance")}
              placeholder={"Insurance"}
              fullWidth
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              name="Internally"
              value={
                BBKDispute.Internally === null ||
                BBKDispute.Internally === -99999999999999999999
                  ? null
                  : BBKDispute.Internally
              }
              size="small"
              Label={lbl(BBKDispute.Internally, "Internally")}
              placeholder={"Internally"}
              fullWidth
              change={BBKDisputeHandler}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
            <TextField
              fullWidth
              label={lbl(BBKDispute.AnalystName, "Analyst Name")}
              placeholder="Analyst Name"
              size="small"
              name="AnalystName"
              value={BBKDispute.AnalystName}
              change={BBKDisputeHandler}
              textLength={50}
              disable={true}
            />
          </Col>
          <Col
            lg={6}
            md={6}
            sm={24}
            xs={24}
            className="u-margin-top-15px u-text-align-center"
          >
            <label>
              <b>Tracking Sheet Attached</b>
            </label>
            <br />
            <Radio.Group
              name="IsTrackingSheetAttached"
              value={BBKDispute.IsTrackingSheetAttached}
              onChange={BBKDisputeHandler}
            >
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
              label={lbl(BBKDispute.Remarks, "Remarks")}
              placeholder="Remarks"
              size="small"
              name="Remarks"
              value={BBKDispute.Remarks}
              change={BBKDisputeHandler}
              textLength={50}
              disable={true}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              fullWidth
              size="small"
              label={
                BBKDispute.Aging === null || BBKDispute.Aging === -1
                  ? ""
                  : "Aging"
              }
              placeholder="Aging"
              name="Aging"
              value={
                BBKDispute.Aging === null || BBKDispute.Aging === -1
                  ? null
                  : BBKDispute.Aging
              }
              change={BBKDisputeHandler}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              fullWidth
              size="small"
              label={
                BBKDispute.CaseClosedTAT === null ||
                BBKDispute.CaseClosedTAT === -1
                  ? ""
                  : "Case Closed TAT"
              }
              placeholder="Case Closed TAT"
              name="CaseClosedTAT"
              value={
                BBKDispute.CaseClosedTAT === null ||
                BBKDispute.CaseClosedTAT === -1
                  ? null
                  : BBKDispute.CaseClosedTAT
              }
              change={BBKDisputeHandler}
              disable
            />
          </Col>
        </Row>
      </Paper>
      <div className="u-margin-top-20px" />
      <Paper section padding="1">
        <Col lg={18} md={18} sm={18} xs={24}>
          <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-ec8d57">
            Files Upload
          </h1>
        </Col>
        <Row gutter={8}>
          <div className="u-margin-top-5pct" />
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <Table
              rows={ListOfBBKDisputeDocuments}
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
      <Row gutter={16} justify="center"></Row>
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
                  label={lbl(approvalReasonValue, "Select Approval Reason")}
                  placeholder="Select Approval Reason *"
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
                  label={lbl(approveDispute.Comments, "Description")}
                  placeholder="Description *"
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
                  label={lbl(rejectionReasonValue, "Select Rejection Reason")}
                  placeholder="Select Rejection Reason *"
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
                  label={lbl(rejectDispute.Comments, "Description")}
                  placeholder="Description *"
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

export default ViewCustomerDetailsBBK;
