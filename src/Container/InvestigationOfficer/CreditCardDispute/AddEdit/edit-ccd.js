import React, { useEffect, useState, useRef } from "react";

import { PlusOutlined as AddIcon } from "@ant-design/icons";

import { EditOutlined as Edit } from "@ant-design/icons";

import { Typography, Radio, Space, Empty, Tooltip, Row, Col } from "antd";

import InputMask from "react-input-mask";

import {
  Paper,
  // InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  TimePicker,
  Button,
  Modal,
  // FancyBox,
  // ConsolidateBox,
  Notification,
  Table,
  // Message,
  Loader,
  FormattedInputs,
  // Upload,
  // uploadButton,
  GroupedButtons,
} from "../../../../Components/Elements";

import {
  DateDisplayFormat,
  DateSendingFormat,
  RemoveTimeDashes,
  NumberFormater,
  CommaFormter,
  TimeDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";
import moment from "moment";
import {
  GetAllFraudType,
  GetAllCaseDecision,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import {
  HideNotification,
  // SaveCreditCardDisputes,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumber,
  // SaveAndApprovedCreditCardDisputes,
  UpdateCreditCardDisputeDetails,
  UpdateAndApproveCreditCardDisputeDetails,
} from "../../../../store/actions/investigation-officer-actions";

import {
  UploadFileCC,
  setStateOfUploadDocumentCreditCard,
} from "../../../../store/actions/reports_actions";

import CustomUpload from "../../../../Components/Elements/Upload/Upload";
import { DownloadUploadFile } from "../../../../store/actions/reports_actions";
import { useDispatch, useSelector } from "react-redux";
// import Uploads from "../../../../Components/Elements/Upload/Uploads";

const EditCreditCardDispute = () => {
  var cnic = localStorage.getItem("cnic");

  const { Title } = Typography;

  const [saveValue, setsaveValue] = useState([]);

  const [getFile, setGetFile] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isTC40ReportingDate, setTC40ReportingDate] = useState(true);

  const [safeReportingDate, setSafeReportingDate] = useState(true);

  const [pOC, setPOC] = useState(true);

  const [actions, setAction] = useState({
    add: false,
    delete: false,
    update: false,
  });

  const [records, setRecords] = useState([]);

  const [recordIndex, setRecordIndex] = useState();

  const [ButtonText, setButtonText] = useState("Add Record");

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [fraudType, setFraudType] = useState([]);

  const [fraudTypeName, setFraudTypeName] = useState([]);

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const { setupForms, investigationOfficer, reports } = state;

  const [searchData, setSearchData] = useState({
    TransactionDate: "",
    CaseRevisedDate: "",
    CaseResolvedDate: "",
    SafeReportingDate: "",
    ReportingDate: "",
  });

  const [FDCustomer, setFDCustomer] = useState({
    CNICNumber: "",
    CustomerName: "",
    CMCity: "",
    FK_CTID: 0,
  });

  const [CardDetails, setCardDetails] = useState({
    CardNumber: "",
    FK_DisputeTableID: 0,
  });

  const [caseDecisionValue, setCaseDecisionValue] = useState([]);
  const [caseDecision, setCaseDecision] = useState("");

  const [CCDispute, setCCDispute] = useState({
    CreditCardLimit: -99999999999999999999,
    FK_FTID: 0,
    CaseReceivedChannel: "",
    CaseResolvedDate: "",
    CaseReceivedDate: "",
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    IsTC40Reporting: false,
    TC40ReportingDate: "",
    SafeReportingDate: "",
    isSafeReporting: false,
    FK_CSID: 2,
    FK_CDEID: 0,
    IsPOC: false,
    POCIdentified: "",
    Recovery: -99999999999999999999,
    EventIdSAS: "",
    Aging: 0,
    CaseClosedTAT: 0,
    RefrenceNumber: "",
  });

  const [
    ListOfCreditCardTransactionDetailsObjects,
    setListOfCreditCardTransactionDetailsObjects,
  ] = useState([]);

  const [
    CreditCardTransactionDetailsObjects,
    setCreditCardTransactionDetailsObjects,
  ] = useState({
    TransactionID: "",
    TransactionDate: "",
    TransactionAmountPKR: -99999999999999999999,
    TransactionBilledAmount: -99999999999999999999,
    ApprovalCode: "",
    POSMode: "",
    MerchantName: "",
    MerchantNumber: "",
    MerchantCity: "",
    ON_OFF_US: false,
    CategoryCodeMCC: "",
    POS_ATM: "",
    AcquirerName: "",
    AcquirerID: "",
    ARN: "",
    TransactionTime: "",
  });

  const [
    ListOfCreditCardDisputeDocuments,
    setListOfCreditCardDisputeDocuments,
  ] = useState([]);

  const current = new Date();
  const date = moment().format("YYYY-MM-DD");

  //Date Handler
  const DateHandler = (e, val) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (value !== "") {
      setSearchData({
        ...searchData,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "TransactionDate" && value !== "") {
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseReceivedDate" && value !== "") {
      setCCDispute({
        ...CCDispute,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseResolvedDate" && value !== "") {
      setCCDispute({
        ...CCDispute,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "SafeReportingDate" && value !== "") {
      setCCDispute({
        ...CCDispute,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "TC40ReportingDate" && value !== "") {
      setCCDispute({
        ...CCDispute,
        [name]: DateSendingFormat(value),
      });
    }
  };

  //Time Handler
  const TimeHandler = (e, val) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;

    if (name === "TransactionTime" && value !== "") {
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: RemoveTimeDashes(value),
      });
    }
  };

  //Customer Handler
  const FDCustomerHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name !== "CustomerName" && value !== "") {
      setFDCustomer({
        ...FDCustomer,
        [name]: value,
      });
    } else {
      setFDCustomer({
        ...FDCustomer,
        [name]: "",
      });
    }
    if (name === "CustomerName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setFDCustomer({
          ...FDCustomer,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CustomerName" && value === "") {
      setFDCustomer({
        ...FDCustomer,
        [name]: "",
      });
    }
  };
  //Card Details Handler
  const CardDetailsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (value !== "") {
      setCardDetails({
        ...CardDetails,
        [name]: value,
      });
    } else {
      setCardDetails({
        ...CardDetails,
        [name]: "",
      });
    }
  };

  useEffect(() => {
    const loadOnReload = async () => {
      var ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
      var CNICNumber = localStorage.getItem("cnic");
      let data = { CNICNumber: CNICNumber, ReferenceNumber: ReferenceNumber };
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        await dispatch(
          GetCreditCardDisputesForEditByCnicAndRefrenceNumber(data),
        );
      }
      await dispatch(GetCreditCardDisputesForEditByCnicAndRefrenceNumber(data));
    };
    loadOnReload();
  }, []);

  useEffect(() => {
    if (
      investigationOfficer.GetCreditCardDisputesForEditByCnicAndRefrenceNumberData
    ) {
      let listOfCCDDocuments =
        investigationOfficer
          .GetCreditCardDisputesForEditByCnicAndRefrenceNumberData
          .listOfCreditCardDisputeDocuments;
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
      let cardDetails =
        investigationOfficer
          .GetCreditCardDisputesForEditByCnicAndRefrenceNumberData.cardDetails;
      if (cardDetails !== undefined && cardDetails !== null) {
        setCardDetails({
          ...CardDetails,
          ["CardNumber"]: cardDetails.cardNumber,
        });
      }
      let fDCustomer =
        investigationOfficer
          .GetCreditCardDisputesForEditByCnicAndRefrenceNumberData.fdCustomer;
      if (fDCustomer !== undefined && fDCustomer !== null) {
        setFDCustomer({
          ...FDCustomer,
          ["CNICNumber"]: fDCustomer.cnicNumber,
          ["CustomerName"]: fDCustomer.customerName,
          ["FK_CTID"]: fDCustomer.fK_CTID,
        });
        let nameCity = setupForms.CityData;
        nameCity.map((data, index) => {
          if (fDCustomer.fK_CTID === data.pK_CTID) {
            setCityValue(data.name);
          }
        });
      }
      let cCDispute =
        investigationOfficer
          .GetCreditCardDisputesForEditByCnicAndRefrenceNumberData.ccDispute;
      if (cCDispute !== undefined && cCDispute !== null) {
        setCCDispute({
          ...CCDispute,
          ["RefrenceNumber"]: cCDispute.refrenceNumber,
          ["CreditCardLimit"]: cCDispute.creditCardLimit,
          ["FK_FTID"]: cCDispute.fK_FTID,
          ["CaseReceivedDate"]: cCDispute.caseReceivedDate,
          ["TotalTransactionAmount"]: cCDispute.totalTransactionAmount,
          ["CaseReceivedChannel"]: cCDispute.caseReceivedChannel,
          ["CaseResolvedDate"]: cCDispute.caseResolvedDate,
          ["IsCaseResolved"]: cCDispute.isCaseResolved,
          ["CaseReceivedDate"]: cCDispute.caseReceivedDate,
          ["IsTC40Reporting"]: cCDispute.isTC40Reporting,
          ["TC40ReportingDate"]: cCDispute.tC40ReportingDate,
          ["isSafeReporting"]: cCDispute.isSafeReporting,
          ["SafeReportingDate"]: cCDispute.safeReportingDate,
          ["FK_CDEID"]: cCDispute.fK_CDEID,
          ["IsPOC"]: cCDispute.isPOC,
          ["POCIdentified"]: cCDispute.pocIdentified,
          ["Recovery"]: cCDispute.recovery,
          ["EventIdSAS"]: cCDispute.eventIdSAS,
          ["Aging"]: cCDispute.aging,
          ["CaseClosedTAT"]: cCDispute.caseClosedTAT,
        });
        let nameFraud = setupForms.FraudTypeData;
        nameFraud.map((data, index) => {
          if (cCDispute.fK_FTID === data.pK_FTID) {
            setFraudTypeName(data.name);
          }
        });
        //CaseDecisions
        let caseDecisionValue = setupForms.CaseDecisionData;
        caseDecisionValue.map((data, index) => {
          if (cCDispute.fK_CDEID === data.pK_CDEID) {
            setCaseDecisionValue(data.name);
          }
        });
        let TcName = cCDispute.isTC40Reporting;
        let SafeName = cCDispute.isSafeReporting;
        let PocName = cCDispute.isPOC;
        if (TcName === true) {
          setTC40ReportingDate(false);
        } else {
          setTC40ReportingDate(true);
        }
        if (SafeName === true) {
          setSafeReportingDate(false);
        } else {
          setSafeReportingDate(true);
        }
        if (PocName === true) {
          setPOC(false);
        } else {
          setPOC(true);
        }
      }
      let listOfCTDO =
        investigationOfficer
          .GetCreditCardDisputesForEditByCnicAndRefrenceNumberData
          .listOfCreditCardTransactionDetailsObjects;
      if (listOfCTDO !== undefined && listOfCTDO !== null) {
        let tem = [];
        listOfCTDO.map((item, index) => {
          tem.push({
            TransactionID: item.transactionID,
            TransactionAmountPKR: item.transactionAmountPKR,
            TransactionBilledAmount: item.transactionBilledAmount,
            ApprovalCode: item.approvalCode,
            POSMode: item.posMode,
            MerchantName: item.merchantName,
            MerchantNumber: item.merchantNumber,
            MerchantCity: item.merchantCity,
            ON_OFF_US: item.oN_OFF_US,
            CategoryCodeMCC: item.categoryCodeMCC,
            POS_ATM: item.poS_ATM,
            AcquirerName: item.acquirerName,
            AcquirerID: item.acquirerID,
            ARN: item.arn,
            TransactionDate: item.transactionDate,
            TransactionTime: item.transactionTime,
          });
        });
        setListOfCreditCardTransactionDetailsObjects(tem);
      }
    }
  }, [
    investigationOfficer.GetCreditCardDisputesForEditByCnicAndRefrenceNumberData,
  ]);

  // for enable current date
  //Set Tc40 reporting date in object
  useEffect(() => {
    let currentDate = CCDispute.TC40ReportingDate;
    if (CCDispute.IsTC40Reporting === true && currentDate === "") {
      setCCDispute({
        ...CCDispute,
        ["TC40ReportingDate"]: removeDashesFromDate(date),
      });
    } else if (CCDispute.IsTC40Reporting === false) {
      setCCDispute({
        ...CCDispute,
        ["TC40ReportingDate"]: "",
      });
    }
  }, [CCDispute.IsTC40Reporting]);

  // //Set safe reporting date in object
  useEffect(() => {
    let currentDate = CCDispute.SafeReportingDate;
    if (CCDispute.isSafeReporting === true && currentDate === "") {
      setCCDispute({
        ...CCDispute,
        ["SafeReportingDate"]: removeDashesFromDate(date),
      });
    }
    if (CCDispute.isSafeReporting === false) {
      setCCDispute({
        ...CCDispute,
        ["SafeReportingDate"]: "",
      });
    }
  }, [CCDispute.isSafeReporting]);

  //Empty POC
  useEffect(() => {
    if (CCDispute.IsPOC === true) {
      setCCDispute({
        ...CCDispute,
        ["POCIdentified"]: CCDispute.POCIdentified,
      });
    }
    if (CCDispute.IsPOC === false) {
      setCCDispute({
        ...CCDispute,
        ["POCIdentified"]: "",
      });
    }
  }, [CCDispute.IsPOC]);

  //CCDispute Handler
  const CCDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name === "CaseReceivedChannel" ||
      name === "EventIdSAS" ||
      name === "Remarks" ||
      name === "CustomerClamiedInformation" ||
      name === "POCIdentified"
    ) {
      let spREmove = value.replace(/[^a-zA-Z0-9 ]/g, "");
      if (spREmove !== "") {
        setCCDispute({
          ...CCDispute,
          [name]: spREmove.trimStart(),
        });
      } else {
        setCCDispute({
          ...CCDispute,
          [name]: "",
        });
      }
    }
    if (name === "IsTC40Reporting") {
      if (value) {
        setTC40ReportingDate(false);
      } else {
        setTC40ReportingDate(true);
      }
    }
    if (name === "isSafeReporting") {
      if (value) {
        setSafeReportingDate(false);
      } else {
        setSafeReportingDate(true);
      }
    }

    if (name === "IsPOC") {
      if (value) {
        setPOC(false);
      } else {
        setPOC(true);
      }
    }

    if (
      name !== "Recovery" &&
      name !== "CreditCardLimit" &&
      name !== "CaseReceivedChannel" &&
      name !== "EventIdSAS" &&
      name !== "POCIdentified" &&
      name !== "CustomerClamiedInformation" &&
      (value !== "" || value === false)
    ) {
      setCCDispute({
        ...CCDispute,
        [name]: value,
      });
    } else if (
      (name === "CreditCardLimit" || name === "Recovery") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
      let newvalue = parseFloat(value);
      if (isNegative(newvalue)) {
        newvalue = newvalue * -1;
      }
      value = newvalue.toString();
      if (name === "CreditCardLimit") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setCCDispute({
              ...CCDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setCCDispute({
              ...CCDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      if (name === "Recovery" && value !== -99999999999999999999) {
        if (value % 1 !== 0) {
          if (value.length <= 13) {
            setCCDispute({
              ...CCDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 13);
          }
        } else {
          if (value.length <= 10) {
            setCCDispute({
              ...CCDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 10);
          }
        }
      } else {
        setCCDispute({
          ...CCDispute,
          [name]: parseInt(-99999999999999999999),
        });
      }
      setCCDispute({
        ...CCDispute,
        [name]: parseFloat(value),
      });
    } else if (
      ((name === "CreditCardLimit" || name === "Recovery") && value === "") ||
      value === -99999999999999999999
    ) {
      setCCDispute({
        ...CCDispute,
        [name]: parseInt(-99999999999999999999),
      });
    } else {
      if (
        (name === "CaseClosedTAT" ||
          name === "Aging" ||
          name === "CreditCardLimit" ||
          name === "Recovery") &&
        name !== "CaseReceivedChannel" &&
        name !== "EventIdSAS" &&
        name !== "POCIdentified" &&
        name !== "CustomerClamiedInformation"
      ) {
        setCCDispute({
          ...CCDispute,
          [name]: "",
        });
      }
    }
  };

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  //Credit Card Transaction Detail Object Handler
  const CCTDOHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "TransactionBilledAmount" &&
      name !== "TransactionID" &&
      name !== "TransactionAmountPKR" &&
      name !== "MerchantName" &&
      name !== "AcquirerName" &&
      name !== "MerchantCity" &&
      name !== "POSMode" &&
      (value !== "" || value === false)
    ) {
      if (name !== "ON_OFF_US") {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: value.trimStart(),
        });
      } else {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: value,
        });
      }
    } else if (
      (name === "MerchantName" ||
        name === "MerchantCity" ||
        name === "AcquirerName") &&
      (value !== "" || value === false)
    ) {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "TransactionID" && value !== "") {
      // all special character blocked
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "TransactionID" && value === "") {
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: "",
      });
    } else if (name === "POSMode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: valueCheck,
        });
      }
    } else if (name === "POSMode" && value === "") {
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: "",
      });
    } else if (
      (name === "TransactionBilledAmount" || name === "TransactionAmountPKR") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
      if (name === "TransactionAmountPKR") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
            }
          } else {
            if (value.length <= 15) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 15);
            }
          }
        }
        if (value < 0) {
          if (value % 1 !== 0) {
            if (value.length <= 19) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }
      if (name === "TransactionBilledAmount") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
            }
          } else {
            if (value.length <= 15) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 15);
            }
          }
        }
        if (value < 0) {
          if (value % 1 !== 0) {
            if (value.length <= 19) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setCreditCardTransactionDetailsObjects({
                ...CreditCardTransactionDetailsObjects,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: parseFloat(value),
      });
    } else if (
      (name === "TransactionBilledAmount" || name === "TransactionAmountPKR") &&
      (value === "" || value === -99999999999999999999)
    ) {
      setCreditCardTransactionDetailsObjects({
        ...CreditCardTransactionDetailsObjects,
        [name]: parseFloat(-99999999999999999999),
      });
    } else {
      if (
        name !== "TransactionBilledAmount" ||
        name !== "TransactionAmountPKR"
      ) {
        setCreditCardTransactionDetailsObjects({
          ...CreditCardTransactionDetailsObjects,
          [name]: "",
        });
      }
    }
  };

  //Add Manual Transaction Record
  const AddTransactionDetails = () => {
    let total = CCDispute.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = CreditCardTransactionDetailsObjects.TransactionBilledAmount;
    } else {
      total =
        total + CreditCardTransactionDetailsObjects.TransactionBilledAmount;
    }
    let flag = true;
    if (ListOfCreditCardTransactionDetailsObjects.length > 0) {
      ListOfCreditCardTransactionDetailsObjects.map((data, index) => {
        if (
          data.TransactionID ===
          CreditCardTransactionDetailsObjects.TransactionID
        ) {
          flag = false;
        } else {
        }
        checkData(flag);
      });
    } else {
      if (
        CreditCardTransactionDetailsObjects.TransactionID !== "" &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !== null &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !== null &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.ApprovalCode !== "" &&
        CreditCardTransactionDetailsObjects.POSMode !== "" &&
        CreditCardTransactionDetailsObjects.MerchantName !== "" &&
        CreditCardTransactionDetailsObjects.MerchantNumber !== "" &&
        CreditCardTransactionDetailsObjects.MerchantCity !== "" &&
        CreditCardTransactionDetailsObjects.POS_ATM !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerName !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerID !== "" &&
        CreditCardTransactionDetailsObjects.ARN !== "" &&
        CreditCardTransactionDetailsObjects.TransactionDate !== "" &&
        CreditCardTransactionDetailsObjects.TransactionTime !== ""
      ) {
        let stotal = parseFloat(total).toFixed(2);
        setCCDispute({
          ...CCDispute,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setListOfCreditCardTransactionDetailsObjects([
          ...ListOfCreditCardTransactionDetailsObjects,
          CreditCardTransactionDetailsObjects,
        ]);
        setCreditCardTransactionDetailsObjects({
          TransactionID: "",
          TransactionAmountPKR: -99999999999999999999,
          TransactionBilledAmount: -99999999999999999999,
          ApprovalCode: "",
          POSMode: "",
          MerchantName: "",
          MerchantNumber: "",
          MerchantCity: "",
          ON_OFF_US: false,
          CategoryCodeMCC: "",
          POS_ATM: "",
          AcquirerName: "",
          AcquirerID: "",
          ARN: "",
          TransactionDate: "",
          TransactionTime: "",
        });
      } else {
        setOpen({
          flag: true,
          message: "Enter Required Fields",
        });
      }
    }
  };

  //Check if transaction id is same during add
  const checkData = (flag) => {
    if (flag === false) {
      setOpen({
        flag: true,
        message: "Transaction ID Already Exists",
      });
    } else {
      if (
        CreditCardTransactionDetailsObjects.TransactionID !== "" &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !== null &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !== null &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.ApprovalCode !== "" &&
        CreditCardTransactionDetailsObjects.POSMode !== "" &&
        CreditCardTransactionDetailsObjects.MerchantName !== "" &&
        CreditCardTransactionDetailsObjects.MerchantNumber !== "" &&
        CreditCardTransactionDetailsObjects.MerchantCity !== "" &&
        CreditCardTransactionDetailsObjects.POS_ATM !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerName !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerID !== "" &&
        CreditCardTransactionDetailsObjects.ARN !== "" &&
        CreditCardTransactionDetailsObjects.TransactionDate !== "" &&
        CreditCardTransactionDetailsObjects.TransactionTime !== ""
      ) {
        let total = CCDispute.TotalTransactionAmount;
        total =
          total + CreditCardTransactionDetailsObjects.TransactionBilledAmount;
        let stotal = parseFloat(total).toFixed(2);
        setCCDispute({
          ...CCDispute,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setListOfCreditCardTransactionDetailsObjects([
          ...ListOfCreditCardTransactionDetailsObjects,
          CreditCardTransactionDetailsObjects,
        ]);
        setCreditCardTransactionDetailsObjects({
          TransactionID: "",
          TransactionAmountPKR: -99999999999999999999,
          TransactionBilledAmount: -99999999999999999999,
          ApprovalCode: "",
          POSMode: "",
          MerchantName: "",
          MerchantNumber: "",
          MerchantCity: "",
          ON_OFF_US: false,
          CategoryCodeMCC: "",
          POS_ATM: "",
          AcquirerName: "",
          AcquirerID: "",
          ARN: "",
          TransactionDate: "",
          TransactionTime: "",
        });
      } else {
        setOpen({
          flag: true,
          message: "Enter Required Fields",
        });
      }
    }
  };

  //Show Modal Function
  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteit = (e, record) => {
    setRecords(record);
    showModal();
    setAction({
      ...actions,
      delete: true,
      add: false,
      update: false,
    });
  };

  const handleDelete = () => {
    let testVariable =
      ListOfCreditCardTransactionDetailsObjects.indexOf(records);
    ListOfCreditCardTransactionDetailsObjects.splice(testVariable, 1);
    let total = CCDispute.TotalTransactionAmount;
    total = total + CreditCardTransactionDetailsObjects.TransactionBilledAmount;
    let TotalTransactionAmount =
      CCDispute.TotalTransactionAmount - records.TransactionBilledAmount;
    let stotal = parseFloat(TotalTransactionAmount).toFixed(2);
    setCCDispute({
      ...CCDispute,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    setListOfCreditCardTransactionDetailsObjects([
      ...ListOfCreditCardTransactionDetailsObjects,
    ]);
    setIsModalVisible(false);
    setRecords([]);
  };

  // Delete Upload Document
  const deleteUploadDocument = (record) => {
    var objIndex = ListOfCreditCardDisputeDocuments.findIndex(
      (obj) =>
        obj.DisplayFileName === record.DisplayFileName &&
        obj.PK_CCDDID === record.PK_CCDDID &&
        obj.FK_CCDID === record.FK_CCDID &&
        obj.FK_GSSUserID === record.FK_GSSUserID,
    );
    var temp = [];
    ListOfCreditCardDisputeDocuments.map((data, index) => {
      temp.push({
        ...ListOfCreditCardDisputeDocuments[index],
        FK_CCDID: data.FK_CCDID,
        OriginalFileName: objIndex === index ? "" : data.OriginalFileName,
        DisplayFileName: objIndex === index ? "" : data.DisplayFileName,
        FK_GSSUserID: data.FK_GSSUserID,
        PK_CCDDID: data.PK_CCDDID,
      });
    });
    setListOfCreditCardDisputeDocuments(temp);
  };

  // Delete Upload Document
  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 1,
    };
    dispatch(DownloadUploadFile(data));
  };

  const getFilter = () => {
    let filteredItems = ListOfCreditCardDisputeDocuments;
    filteredItems = ListOfCreditCardDisputeDocuments.filter(
      (item) => item.DisplayFileName !== "",
    );
    return filteredItems;
  };

  const handleCancel = () => {
    setCreditCardTransactionDetailsObjects({
      ...ListOfCreditCardTransactionDetailsObjects,
      TransactionID: "",
      TransactionDate: "",
      TransactionTime: "",
      TransactionAmountPKR: -99999999999999999999,
      TransactionBilledAmount: -99999999999999999999,
      ApprovalCode: "",
      POSMode: "",
      MerchantName: "",
      MerchantNumber: "",
      MerchantCity: "",
      ON_OFF_US: false,
      CategoryCodeMCC: "",
      POS_ATM: "",
      AcquirerName: "",
      AcquirerID: "",
      ARN: "",
    });
    setIsModalVisible(false);
    setAction({ delete: false, update: false, add: false });
  };

  const update = (e, record) => {
    var objIndex = ListOfCreditCardTransactionDetailsObjects.findIndex(
      (obj) => obj.TransactionID === record.TransactionID,
    );
    setRecordIndex(objIndex);
    setRecords(record);
    setCreditCardTransactionDetailsObjects({
      ...CreditCardTransactionDetailsObjects,
      TransactionID: record.TransactionID,
      TransactionDate: record.TransactionDate,
      TransactionTime: record.TransactionTime,
      TransactionAmountPKR: record.TransactionAmountPKR,
      TransactionBilledAmount: record.TransactionBilledAmount,
      ApprovalCode: record.ApprovalCode,
      POSMode: record.POSMode,
      MerchantName: record.MerchantName,
      MerchantNumber: record.MerchantNumber,
      MerchantCity: record.MerchantCity,
      ON_OFF_US: record.ON_OFF_US,
      CategoryCodeMCC: record.CategoryCodeMCC,
      POS_ATM: record.POS_ATM,
      AcquirerName: record.AcquirerName,
      AcquirerID: record.AcquirerID,
      ARN: record.ARN,
    });
    setAction({ ...actions, update: true, delete: false, add: false });
  };

  const updateData = async () => {
    var flag1 = true;
    if (ListOfCreditCardTransactionDetailsObjects) {
      await ListOfCreditCardTransactionDetailsObjects.map((data, index) => {
        if (
          data.TransactionID ===
          CreditCardTransactionDetailsObjects.TransactionID
        ) {
          if (recordIndex !== index) {
            if (
              CreditCardTransactionDetailsObjects.TransactionID !== "" &&
              CreditCardTransactionDetailsObjects.TransactionAmountPKR !==
                null &&
              CreditCardTransactionDetailsObjects.TransactionAmountPKR !==
                -99999999999999999999 &&
              CreditCardTransactionDetailsObjects.TransactionBilledAmount !==
                null &&
              CreditCardTransactionDetailsObjects.TransactionBilledAmount !==
                -99999999999999999999 &&
              CreditCardTransactionDetailsObjects.ApprovalCode !== "" &&
              CreditCardTransactionDetailsObjects.POSMode !== "" &&
              CreditCardTransactionDetailsObjects.MerchantName !== "" &&
              CreditCardTransactionDetailsObjects.MerchantNumber !== "" &&
              CreditCardTransactionDetailsObjects.MerchantCity !== "" &&
              CreditCardTransactionDetailsObjects.POS_ATM !== "" &&
              CreditCardTransactionDetailsObjects.AcquirerName !== "" &&
              CreditCardTransactionDetailsObjects.AcquirerID !== "" &&
              CreditCardTransactionDetailsObjects.ARN !== "" &&
              CreditCardTransactionDetailsObjects.TransactionDate !== "" &&
              CreditCardTransactionDetailsObjects.TransactionTime !== ""
            ) {
              flag1 = false;
            } else {
            }
          }
        }
      });
      checkDataForUpdate(flag1);
    }
  };

  const checkDataForUpdate = (flag1) => {
    if (flag1 !== false) {
      if (
        CreditCardTransactionDetailsObjects.TransactionID !== "" &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.TransactionAmountPKR !== null &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !=
          -99999999999999999999 &&
        CreditCardTransactionDetailsObjects.TransactionBilledAmount !== null &&
        CreditCardTransactionDetailsObjects.ApprovalCode !== "" &&
        CreditCardTransactionDetailsObjects.POSMode !== "" &&
        CreditCardTransactionDetailsObjects.MerchantName !== "" &&
        CreditCardTransactionDetailsObjects.MerchantNumber !== "" &&
        CreditCardTransactionDetailsObjects.MerchantCity !== "" &&
        CreditCardTransactionDetailsObjects.POS_ATM !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerName !== "" &&
        CreditCardTransactionDetailsObjects.AcquirerID !== "" &&
        CreditCardTransactionDetailsObjects.ARN !== "" &&
        CreditCardTransactionDetailsObjects.TransactionDate !== "" &&
        CreditCardTransactionDetailsObjects.TransactionTime !== ""
      ) {
        showModal();
        setAction({
          ...actions,
          update: true,
          add: false,
          delete: false,
        });
      } else {
        setOpen({
          flag: true,
          message: "Enter Required Fields",
        });
      }
    } else {
      setOpen({
        flag: true,
        message: "Transaction ID already exists",
      });
    }
  };

  const updateRecord = (e, record) => {
    let total = CCDispute.TotalTransactionAmount;
    total = total - records.TransactionBilledAmount;
    let newTotal =
      total + CreditCardTransactionDetailsObjects.TransactionBilledAmount;
    let stotal = parseFloat(newTotal).toFixed(2);
    setCCDispute({
      ...CCDispute,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });

    // CreditCardTransactionDetailsObjects
    ListOfCreditCardTransactionDetailsObjects[recordIndex] =
      CreditCardTransactionDetailsObjects;
    setListOfCreditCardTransactionDetailsObjects([
      ...ListOfCreditCardTransactionDetailsObjects,
    ]);
    setCreditCardTransactionDetailsObjects({
      TransactionID: "",
      TransactionDate: "",
      TransactionTime: "",
      TransactionAmountPKR: -99999999999999999999,
      TransactionBilledAmount: -99999999999999999999,
      ApprovalCode: "",
      POSMode: "",
      MerchantName: "",
      MerchantNumber: "",
      MerchantCity: "",
      ON_OFF_US: false,
      CategoryCodeMCC: "",
      POS_ATM: "",
      AcquirerName: "",
      AcquirerID: "",
      ARN: "",
    });
    setAction({ ...actions, update: false, delete: false, add: true });
    setIsModalVisible(false);
    setRecords([]);
  };

  const goToSaveHandler = (e) => {
    e.preventDefault();
    if (saveValue === 1) {
      if (ListOfCreditCardTransactionDetailsObjects.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          let data = {
            FDCustomer,
            CardDetails,
            CCDispute,
            ListOfCreditCardTransactionDetailsObjects,
            ListOfCreditCardDisputeDocuments,
          };
          let flagForGlobalDispute = localStorage.getItem(
            "FlagForGlobalDispute",
          );
          localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
          dispatch(UpdateCreditCardDisputeDetails(data));
        }
      } else {
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    } else if (saveValue === 2) {
      if (ListOfCreditCardTransactionDetailsObjects.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          let data = {
            FDCustomer,
            CardDetails,
            CCDispute,
            ListOfCreditCardTransactionDetailsObjects,
            ListOfCreditCardDisputeDocuments,
          };
          if (data.CCDispute.FK_CDEID === 0) {
            setOpen({
              flag: true,
              message: "Select Case Decision ",
            });
          } else if (data.CCDispute.FK_CDEID !== 0) {
            let flagForGlobalDispute = localStorage.getItem(
              "FlagForGlobalDispute",
            );
            localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
            dispatch(UpdateAndApproveCreditCardDisputeDetails(data));
          }
        }
      } else {
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    }
  };

  // Selected Dropdown value
  const fraudNameHandler = (e, value) => {
    setFraudTypeName(value);
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FTID;
        setCCDispute({
          ...CCDispute,
          ["FK_FTID"]: parseInt(id),
        });
      }
    });
  };

  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const updateButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => updateRecord(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "TransactionID",
      key: "TransactionID",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      key: "TransactionDate",
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
      dataIndex: "TransactionTime",
      key: "TransactionTime",
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
      title: "Transaction Amount PKR",
      dataIndex: "TransactionAmountPKR",
      key: "TransactionAmountPKR",
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
      dataIndex: "TransactionBilledAmount",
      key: "TransactionBilledAmount",
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
      title: "Approval Code",
      dataIndex: "ApprovalCode",
      key: "ApprovalCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Point Of Sale Mode",
      dataIndex: "POSMode",
      key: "POSMode",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant Name",
      dataIndex: "MerchantName",
      key: "MerchantName",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant Number",
      dataIndex: "MerchantNumber",
      key: "MerchantNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Merchant City",
      dataIndex: "MerchantCity",
      key: "MerchantCity",
      align: "center",
      width: "220px",
    },
    {
      title: "On Us / Off Us",
      dataIndex: "ON_OFF_US",
      key: "ON_OFF_US",
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
      dataIndex: "CategoryCodeMCC",
      key: "CategoryCodeMCC",
      align: "center",
      width: "180px",
    },
    {
      title: "POS/ATM",
      dataIndex: "POS_ATM",
      key: "POS_ATM",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Name",
      dataIndex: "AcquirerName",
      key: "AcquirerName",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer ID",
      dataIndex: "AcquirerID",
      key: "AcquirerID",
      align: "center",
      width: "220px",
    },
    {
      title: "ARN",
      dataIndex: "ARN",
      key: "ARN",
      align: "center",
      width: "220px",
    },
    {
      title: "Edit",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: "100px",
      render: (text, record) => (
        <div
          onClick={(e) => update(e, record)}
          className="icon-edit icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
      align: "center",
      width: "100px",
      render: (text, record) => (
        <div
          onClick={(e) => deleteit(e, record)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];

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
    {
      title: "Delete",
      dataIndex: "uid",
      key: "uid",
      align: "center",
      width: "2%",
      render: (text, record) => (
        <div
          onClick={(e) => deleteUploadDocument(record)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];

  const getFileHandler = (data) => {
    const uploadFilePath = data.target.value;
    const uploadedFile = data.target.files[0];
    setGetFile({ filePath: uploadFilePath, file: uploadedFile });
    var ext = uploadedFile.name.split(".").pop();
    if (
      ext === "doc" ||
      ext === "docx" ||
      ext === "xls" ||
      ext === "xlsx" ||
      ext === "pdf" ||
      ext === "png" ||
      ext === "txt" ||
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "gif"
    ) {
      let data;
      let size;
      let sizezero;

      if (ListOfCreditCardDisputeDocuments.length > 0) {
        ListOfCreditCardDisputeDocuments.map((filename, index) => {
          if (filename.DisplayFileName === uploadedFile.name) {
            data = false;
          }
        });
        if (uploadedFile.size > 10000000) {
          size = false;
        } else if (uploadedFile.size === 0) {
          sizezero = false;
        }
        if (data === false) {
          setOpen({
            flag: true,
            message: "File Already Uploaded",
          });
        } else if (size === false) {
          setOpen({
            flag: true,
            message: "File Size Should be Less than 10MB",
          });
        } else if (sizezero === false) {
          setOpen({
            flag: true,
            message: "Selected File is Empty",
          });
        } else {
          dispatch(UploadFileCC(uploadedFile));
        }
      } else {
        let size;
        let sizezero;
        if (uploadedFile.size > 10000000) {
          size = false;
        } else if (uploadedFile.size === 0) {
          sizezero = false;
        }
        if (size === false) {
          setOpen({
            flag: true,
            message: "File Size Should be Less than 10MB",
          });
        } else if (sizezero === false) {
          setOpen({
            flag: true,
            message: "Selected File is Empty",
          });
        } else {
          dispatch(UploadFileCC(uploadedFile));
        }
      }
    } else {
      setOpen({
        flag: true,
        message: "This File Format Cannot be Uploaded",
      });
    }
  };

  // // City handler
  const CityNameHandler = (e, value) => {
    setCityValue(value);
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CTID;
        setFDCustomer({
          ...FDCustomer,
          ["FK_CTID"]: parseInt(id),
        });
      }
    });
  };

  useEffect(() => {
    setFDCustomer({
      ...FDCustomer,
      ["CNICNumber"]: cnic,
    });
  }, []);

  useEffect(() => {}, [fraudType]);

  // // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    setCity(
      valueCity.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.CityData]);

  // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (FDCustomer.FK_CTID === data.pK_CTID) {
        setCityValue(data.name);
        setFDCustomer({
          ...FDCustomer,
          ["FK_CTID"]: parseInt(data.pK_CTID),
        });
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {
    let newData = reports.uploadDocumentsList;
    if (newData !== undefined && newData.length !== 0) {
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
      dispatch(setStateOfUploadDocumentCreditCard());
    }
  }, [reports.uploadDocumentsList]);

  // For FraudType DropDown SetState
  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    setFraudType(
      nameFraud.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.FraudTypeData]);

  useEffect(() => {}, [CCDispute]);

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

  // Case Decision handler
  const CaseDecisionHandler = (e, value) => {
    setCaseDecisionValue(value);
    let valueCaseDecision = setupForms.CaseDecisionData;
    valueCaseDecision.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CDEID;
        setCCDispute({
          ...CCDispute,
          ["FK_CDEID"]: parseInt(id),
        });
      }
    });
  };

  // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCaseDecision = setupForms.CaseDecisionData;
    setCaseDecision(
      valueCaseDecision.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.CaseDecisionData]);

  useEffect(() => {
    let valueCaseDecision = setupForms.CaseDecisionData;
    valueCaseDecision.map((data, index) => {
      if (CCDispute.FK_CDEID === data.pK_CDEID) {
        setCaseDecisionValue(data.name);
        setCCDispute({
          ...CCDispute,
          ["FK_CDEID"]: parseInt(data.pK_CDEID),
        });
      }
    });
  }, [setupForms.CaseDecisionData]);

  return (
    <>
      <Title level={3}>Edit Credit Card Disputes</Title>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Paper padding="1">
          <Row gutter={16}>
            <Col lg={18} md={18}>
              <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
                Customer Details
              </h1>
            </Col>
            <Col
              lg={6}
              md={6}
              className="u-padding-0 u-position-relative u-text-align-left"
            >
              <div className="Level-Section">
                <div>
                  <i className="icon-card icon-size-one"></i>
                  <div className="LevelSectionDetails">
                    <span className="LevelHeading">CNIC Number</span>
                    <br />
                    <span className="SubHeading">{cnic}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <p className="PlaceholderCard">
                Card Number<span className="important">*</span>
              </p>
              <InputMask
                type="text"
                className="CreditCardInputField"
                name="CardNumber"
                autoFocus
                value={
                  CardDetails.CardNumber === 0 ? null : CardDetails.CardNumber
                }
                mask="9999 XXXX XXXX 9999"
                maskPlaceholder="____ XXXX XXXX ____"
                onChange={CardDetailsHandler}
                textLength={16}
                min={16}
                required
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="RefrenceNumber"
                size="small"
                value={CCDispute.RefrenceNumber}
                disable
                label={"Reference #"}
                fullWidth
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                size="small"
                value={FDCustomer.CustomerName}
                label="Customer Name"
                autoComplete="off"
                fullWidth
                textLength={100}
                name="CustomerName"
                change={FDCustomerHandler}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <SelectBox
                label="Select City"
                option={city}
                value={cityValue}
                change={CityNameHandler}
                name="FK_CTID"
                required
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label="Credit Limit"
                value={
                  CCDispute.CreditCardLimit === null ||
                  CCDispute.CreditCardLimit === -99999999999999999999
                    ? null
                    : CCDispute.CreditCardLimit
                }
                fullWidth
                change={CCDisputeHandler}
                required
                name="CreditCardLimit"
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-21px">
              <SelectBox
                option={fraudType}
                label="Fraud Type"
                name="FK_FTID"
                value={fraudTypeName}
                change={fraudNameHandler}
                required
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Transaction Details
            </h1>
          </Col>
          <Row gutter={16}>
            <Col
              lg={6}
              md={6}
              sm={24}
              xs={24}
              className="u-position-relative u-margin-top-20px"
            >
              <div className="u-margin-top-20px" />
              <TextField
                name="TransactionID"
                value={CreditCardTransactionDetailsObjects.TransactionID}
                size="small"
                autoComplete="off"
                label={"Transaction ID *"}
                fullWidth
                change={CCTDOHandler}
                textLength={20}
              ></TextField>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div className="u-margin-top-20px" />
              <DatePicker
                label={"Select Transaction Date *"}
                name="TransactionDate"
                size="large"
                width="100%"
                placeholder={"Select Transaction Date *"}
                DateRange
                value={
                  CreditCardTransactionDetailsObjects.TransactionDate
                    ? DateDisplayFormat(
                        CreditCardTransactionDetailsObjects.TransactionDate,
                      )
                    : null
                }
                change={DateHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div className="u-margin-top-20px" />
              <TimePicker
                label={"Select Transaction Time *"}
                name="TransactionTime"
                size="large"
                width="100%"
                TimeRange
                value={CreditCardTransactionDetailsObjects.TransactionTime}
                placeholder={"Select Transaction Time *"}
                change={TimeHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-20px">
              <FormattedInputs
                name="TransactionAmountPKR"
                value={
                  CreditCardTransactionDetailsObjects.TransactionAmountPKR ===
                    null ||
                  CreditCardTransactionDetailsObjects.TransactionAmountPKR ===
                    -99999999999999999999
                    ? null
                    : NumberFormater(
                        CreditCardTransactionDetailsObjects.TransactionAmountPKR,
                      )
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Transaction Amount PKR *"}
                fullWidth
                change={CCTDOHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="TransactionBilledAmount"
                value={
                  CreditCardTransactionDetailsObjects.TransactionBilledAmount ===
                    null ||
                  CreditCardTransactionDetailsObjects.TransactionBilledAmount ===
                    -99999999999999999999
                    ? null
                    : CreditCardTransactionDetailsObjects.TransactionBilledAmount
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Transaction Billed Amount *"}
                fullWidth
                change={CCTDOHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div className="u-margin-top-22px" />
              <TextField
                name="ApprovalCode"
                value={CreditCardTransactionDetailsObjects.ApprovalCode}
                size="small"
                autoComplete="off"
                label={"Approval Code *"}
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={7}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div className="u-margin-top-22px" />
              <TextField
                name="POSMode"
                value={CreditCardTransactionDetailsObjects.POSMode}
                size="small"
                autoComplete="off"
                label={"Point Of Sale Mode *"}
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div className="u-margin-top-22px" />
              <TextField
                name="MerchantName"
                value={CreditCardTransactionDetailsObjects.MerchantName}
                size="small"
                label={"Merchant Name *"}
                fullWidth
                autoComplete="off"
                change={CCTDOHandler}
                type="text"
                textLength={100}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantNumber"
                value={CreditCardTransactionDetailsObjects.MerchantNumber}
                size="small"
                autoComplete="off"
                label={"Merchant Number *"}
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={20}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantCity"
                value={CreditCardTransactionDetailsObjects.MerchantCity}
                size="small"
                label={"Merchant City *"}
                autoComplete="off"
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={100}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>On Us / Off Us *</b>
              </label>
              <br />
              <Radio.Group
                name="ON_OFF_US"
                value={CreditCardTransactionDetailsObjects.ON_OFF_US}
                onChange={CCTDOHandler}
                required
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="CategoryCodeMCC"
                value={CreditCardTransactionDetailsObjects.CategoryCodeMCC}
                size="small"
                autoComplete="off"
                label={"Merchant Category Code *"}
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={7}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="POS_ATM"
                value={CreditCardTransactionDetailsObjects.POS_ATM}
                size="small"
                label={"POS/ATM *"}
                autoComplete="off"
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={7}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="AcquirerName"
                value={CreditCardTransactionDetailsObjects.AcquirerName}
                size="small"
                label={"Acquirer Name *"}
                autoComplete="off"
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={100}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="AcquirerID"
                value={CreditCardTransactionDetailsObjects.AcquirerID}
                size="small"
                label={"Acquirer ID *"}
                autoComplete="off"
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={12}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="ARN"
                value={CreditCardTransactionDetailsObjects.ARN}
                size="small"
                label={"Approval Reference Number *"}
                autoComplete="off"
                fullWidth
                change={CCTDOHandler}
                type="text"
                textLength={12}
              />
            </Col>
            <Col
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="u-text-align-center"
            >
              {actions.update ? (
                <Button
                  text="Update Record"
                  icon={<Edit />}
                  applyClass="btnSecondarySolid"
                  size="large"
                  click={updateData}
                />
              ) : (
                <Button
                  text="Add Record"
                  icon={<AddIcon />}
                  applyClass="btnSecondarySolid"
                  size="large"
                  click={AddTransactionDetails}
                />
              )}
            </Col>
          </Row>
          <div className="u-margin-top-20px" />
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <div className="TransactionHeading">Transaction Details</div>
            <Table
              rows={ListOfCreditCardTransactionDetailsObjects}
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
                disable={true}
                size="large"
                width="100%"
                DateRange
                name="CaseReceivedDate"
                value={
                  CCDispute.CaseReceivedDate
                    ? DateDisplayFormat(CCDispute.CaseReceivedDate)
                    : null
                }
                change={DateHandler}
              />
            </Col>

            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Received Channel"
                value={CCDispute.CaseReceivedChannel}
                size="small"
                autoComplete="off"
                textLength={20}
                name="CaseReceivedChannel"
                change={CCDisputeHandler}
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
                value={CCDispute.IsCaseResolved}
                onChange={CCDisputeHandler}
                disabled={true}
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
                  CCDispute.CaseResolvedDate
                    ? DateDisplayFormat(CCDispute.CaseResolvedDate)
                    : null
                }
                change={DateHandler}
                disable={true}
              />
            </Col>

            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <Paper ml="1.5">
                <TextField
                  fullWidth
                  label="Total Billed Amount"
                  value={
                    CCDispute.TotalTransactionAmount === null ||
                    CCDispute.TotalTransactionAmount === -99999999999999999999
                      ? null
                      : CommaFormter(CCDispute.TotalTransactionAmount)
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
                value={CCDispute.IsTC40Reporting}
                onChange={CCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                label={"Select TC 40 Reporting Date"}
                disable={isTC40ReportingDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"TC 40 Reporting Date"}
                name="TC40ReportingDate"
                value={
                  CCDispute.TC40ReportingDate
                    ? DateDisplayFormat(CCDispute.TC40ReportingDate)
                    : null
                }
                change={DateHandler}
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
                value={CCDispute.isSafeReporting}
                onChange={CCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                label={"Select Safe Reporting Date"}
                disable={safeReportingDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"Safe Reporting Date"}
                name="SafeReportingDate"
                value={
                  CCDispute.SafeReportingDate
                    ? DateDisplayFormat(CCDispute.SafeReportingDate)
                    : null
                }
                change={DateHandler}
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
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                option={caseDecision}
                label="Select Case Decision"
                name="FK_CDEID"
                value={caseDecisionValue}
                change={CaseDecisionHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>Point Of Compromise Identified</b>
              </label>
              <br />
              <Radio.Group
                name="IsPOC"
                value={CCDispute.IsPOC}
                onChange={CCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Point Of Compromise Identified"
                size="small"
                name="POCIdentified"
                value={CCDispute.POCIdentified}
                change={CCDisputeHandler}
                textLength={100}
                disable={pOC}
                required={CCDispute.IsPOC}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Recovery"
                size="small"
                name="Recovery"
                value={
                  CCDispute.Recovery === null ||
                  CCDispute.Recovery === -99999999999999999999
                    ? null
                    : CCDispute.Recovery
                }
                change={CCDisputeHandler}
                required
                textLength={(999, 999, 999, 999, 999, 999, 999)}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Event ID SAS"
                size="small"
                autoComplete="off"
                name="EventIdSAS"
                value={CCDispute.EventIdSAS}
                change={CCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Aging"
                size="small"
                name="Aging"
                value={
                  CCDispute.Aging === 0 || CCDispute.Aging === null
                    ? null
                    : CCDispute.Aging
                }
                change={CCDisputeHandler}
                textLength={4}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Closed TAT"
                size="small"
                name="CaseClosedTAT"
                value={
                  CCDispute.CaseClosedTAT === 0 ||
                  CCDispute.CaseClosedTAT === null
                    ? null
                    : CCDispute.CaseClosedTAT
                }
                change={CCDisputeHandler}
                textLength={4}
                disable={true}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              File Upload{" "}
              <span className="FileUploadNote">
                Allowed File Formats (Images, Word Documents, Excel, PDF and
                Text)
              </span>
            </h1>
          </Col>
          <Row gutter={8}>
            <Col md={24} lg={24} sm={24} className="u-text-align-left">
              <CustomUpload
                change={getFileHandler}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
            </Col>
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
        <Row gutter={16} justify="center">
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Save"
              type="submit"
              icon={<i className="icon-save icon-size-one"></i>}
              applyClass="buttonPrimaryLarge"
              size="large"
              click={() => setsaveValue(1)}
            />
          </Col>

          <Col lg={8} md={8} sm={24}>
            <Button
              text="Save & Send For Approval"
              type="submit"
              icon={<i className="icon-sent icon-size-one"></i>}
              applyClass="buttonPrimary2"
              size="large"
              click={() => setsaveValue(2)}
            />
          </Col>
        </Row>
      </form>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
        {actions.update && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to update this transaction?
              </Title>
            </div>
            <GroupedButtons data={updateButtonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default EditCreditCardDispute;
