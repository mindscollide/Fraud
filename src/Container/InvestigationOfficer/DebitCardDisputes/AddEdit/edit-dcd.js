import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Typography, Radio, Space, Empty, Tooltip, Row, Col } from "antd";
import InputMask from "react-input-mask";
import CustomUpload from "../../../../Components/Elements/Upload/Upload";
import { EditOutlined as Edit } from "@ant-design/icons";

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
  // Upload,
  uploadButton,
  Modal,
  GroupedButtons,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import {
  GetIRISTransactionDetailsByTransactionId,
  GetDebitCardDisputesForEditByCnicAndRefrenceNumber,
  UpdateDebitCardDisputeDetails,
  UpdateAndApproveDebitCardDisputeDetails,
} from "../../../../store/actions/investigation-officer-actions";
import {
  GetAllCaseDecision,
  GetAllFraudType,
  GetAllTransactionCurrencyCode,
  GetAllSource,
} from "../../../../store/actions/setup-forms-actions";
// import { GetAllSource } from "../../../../store/actions/setup-forms-actions";
import {
  UploadFileDC,
  setStateOfUploadDocumentCreditCard,
} from "../../../../store/actions/reports_actions";
import { DownloadUploadFile } from "../../../../store/actions/reports_actions";
import {
  DateDisplayFormat,
  DateSendingFormat,
  RemoveTimeDashes,
  NumberFormater,
  CommaFormter,
  TimeDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";

const EditDebitCardDispute = () => {
  var cnic = localStorage.getItem("CNICNumber");
  var cnic2 = localStorage.getItem("cnic2");
  var accountNumber = localStorage.getItem("accountNumber");
  const { Title } = Typography;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const [fraudTypeName, setFraudTypeName] = useState("");
  const [pOC, setPOC] = useState(true);

  const {
    investigationOfficer,
    setupForms,
    loading,
    reports,
    selectedRowKeys,
  } = state;

  //   for  Customer Details section state handler
  const [customerDetails, setCustomerDetails] = useState({
    accountNumber: "",
    cardNumber: "",
    cmCity: "",
    cnicNumber: "",
    customerName: "",
    iparty_ID: 0,
    pK_CDID: 0,
    fK_FTID: 0,
  });

  // save
  const [FDCustomer, setFDCustomer] = useState({
    CNICNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    // CMCity: "",
  });

  // for select rows from table
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const [caseDecisionValue, setCaseDecisionValue] = useState("");
  const [caseDecision, setCaseDecision] = useState("");

  const [transactionCurrencyCodeValue, setTransactionCurrencyCodeValue] =
    useState("");
  const [transactionCurrencyCode, setTransactionCurrencyCode] = useState("");

  const [saveValue, setsaveValue] = useState([]);

  // select index from table
  const [addInedx, setAddInedx] = useState([]);

  // set transtion id
  const [transtionid, setTranstionid] = useState("");

  // for transection data responce from api
  const [trsDetails, setTrsDetails] = useState({
    HBLAccountNumber: accountNumber,
    TransactionID: "",
    OtherBankAccountNumber: "",
    OtherBankBranchCode: "",
    OtherBankBranchName: "",
    TransactionAmount: -99999999999999999999,
    TransactionAmountOtherCurrency: -99999999999999999999,
    PotentialSave: -99999999999999999999,
    DisputeAmount: -99999999999999999999,
    TransactionCurrencyCode: "",
    ApprovalCode: "",
    Response: "",
    POSMode: "",
    MerchantName: "",
    MerchantID: "",
    MerchantCity: "",
    ON_OFF_US: false,
    CategoryCodeMCC: "",
    AcquirerInstitution: "",
    AcquirerTerminalID: "",
    AcquirerID: "",
    ARN: "",
    FK_SID: 0,
    TransactionDate: "",
    TransactionTime: "",
    PreIdentifiedDataType: 3,
  });

  const [actions, setAction] = useState({
    add: false,
    delete: false,
    update: false,
    refresh: false,
  });

  const [records, setRecords] = useState([]);

  const [recordIndex, setRecordIndex] = useState();

  // for notification
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  // for transection error
  const [TransactionIDError, setTransactionIDError] = useState(false);
  const [TIDErrMsg, setTIDErrMsg] = useState("");

  // list for transection details table
  const [
    ListOfDebitCardTransactionDetailsObjects,
    setListOfDebitCardTransactionDetailsObjects,
  ] = useState([]);

  // source type names selection for drop down
  const [sourceTypeName, setSourceTypeName] = useState([]);

  //   for Enable dates through radio button
  const [isTC40ReportingDate, setTC40ReportingDate] = useState(true);
  const [safeReportingDate, setSafeReportingDate] = useState(true);

  // for modal of delet
  const [isModalVisible, setIsModalVisible] = useState(false);

  //   set fruad type name state
  const [fraudType, setFraudType] = useState("");
  const [SourceType, setSourceType] = useState("");
  const [getFile, setGetFile] = useState([]);

  // for search date
  const [searchData, setSearchData] = useState({
    TransactionDate: "",
    CaseRevisedDate: "",
    CaseResolvedDate: "",
  });

  // List of Transaction Details already esist

  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);

  //   secarch date

  // uploadlist
  const [
    ListOfDebitCardDisputeDocuments,
    setListOfDebitCreditCardDisputeDocuments,
  ] = useState([]);

  //   for current date
  const date = moment().format("YYYY-MM-DD");
  const current = new Date();
  const date2 = `${current.getFullYear()}${
    "0" + (current.getMonth() + 1)
  }${current.getDate()}`;

  //   for date
  const [DCDisputes, setDCDisputes] = useState({
    // CreditCardLimit: 0,
    RefrenceNumber: "",
    FK_FTID: 0,
    CaseReceivedChannel: "",
    CaseResolvedDate: "",
    // CaseReceivedDate: removeDashesFromDate(date),
    CaseReceivedDate: removeDashesFromDate(date),
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    IsTC40Reporting: false,
    TC40ReportingDate: "",
    SafeReportingDate: "",
    IsSafeReportingDate: false,
    FK_CSID: 2,
    FK_CDEID: 0,
    IsPOC: false,
    POCIdentified: "",
    EventIDSAS: "",
    Aging: -1,
    CaseClosedTAT: -1,
    InFavourOfCM: "-99999999999999999999",
    CustomerLiability: "-99999999999999999999",
    Remarks: "",
    FromDateForPreIdentifiedData: "",
    ToDateForPreIdentifiedData: "",
  });
  const [CardDetails, setCardDetails] = useState({
    CardNumber: "",
    FK_DisputeTableID: 0,
  });
  // DAte handler
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
      setTrsDetails({
        ...trsDetails,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseReceivedDate" && value !== "") {
      setDCDisputes({
        ...DCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseResolvedDate" && value !== "") {
      setDCDisputes({
        ...DCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "SafeReportingDate" && value !== "") {
      setDCDisputes({
        ...DCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "TC40ReportingDate" && value !== "") {
      setDCDisputes({
        ...DCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
  };

  // Selected Dropdown value
  const fraudNameHandler = (e, value) => {
    setFraudTypeName(value);
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FTID;
        setDCDisputes({
          ...DCDisputes,
          ["FK_FTID"]: parseInt(id),
        });
      }
    });
  };

  // for enable current date
  //Set Tc40 reporting date in object
  useEffect(() => {
    let currentDate = DCDisputes.TC40ReportingDate;
    if (DCDisputes.IsTC40Reporting === true && currentDate === "") {
      setDCDisputes({
        ...DCDisputes,
        ["TC40ReportingDate"]: removeDashesFromDate(date),
      });
    } else if (DCDisputes.IsTC40Reporting === false) {
      setDCDisputes({
        ...DCDisputes,
        ["TC40ReportingDate"]: "",
      });
    }
  }, [DCDisputes.IsTC40Reporting]);

  // //Set safe reporting date in object
  useEffect(() => {
    let currentDate = DCDisputes.SafeReportingDate;
    if (DCDisputes.IsSafeReportingDate === true) {
      setDCDisputes({
        ...DCDisputes,
        ["SafeReportingDate"]: removeDashesFromDate(date),
      });
    }
    if (DCDisputes.IsSafeReportingDate === false) {
      setDCDisputes({
        ...DCDisputes,
        ["SafeReportingDate"]: "",
      });
    }
  }, [DCDisputes.IsSafeReportingDate]);

  //Empty POC
  useEffect(() => {
    if (DCDisputes.IsPOC === true) {
      setDCDisputes({
        ...DCDisputes,
        ["POCIdentified"]: DCDisputes.POCIdentified,
      });
    }
    if (DCDisputes.IsPOC === false) {
      setDCDisputes({
        ...DCDisputes,
        ["POCIdentified"]: "",
      });
    }
  }, [DCDisputes.IsPOC]);

  const DCDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "IsTC40Reporting" &&
      name !== "IsSafeReportingDate" &&
      name !== "IsPOC" &&
      name !== "CustomerLiability" &&
      name !== "InFavourOfCM"
      // (value !=="" || value === false)
    ) {
      setDCDisputes({
        ...DCDisputes,
        [name]: value.trimStart(),
      });
    } else if (
      name === "IsTC40Reporting" ||
      name === "IsSafeReportingDate" ||
      name === "IsPOC"
    ) {
      setDCDisputes({
        ...DCDisputes,
        [name]: value,
      });
    }

    if (name === "IsPOC") {
      if (value) {
        setPOC(false);
      } else {
        setPOC(true);
      }
    }
    if (name === "IsTC40Reporting") {
      if (value) {
        setTC40ReportingDate(false);
      } else {
        setTC40ReportingDate(true);
      }
    }
    if (name === "IsSafeReportingDate") {
      if (value) {
        setSafeReportingDate(false);
      } else {
        setSafeReportingDate(true);
      }
    }
    if (
      name === "CustomerLiability" &&
      value !== "" &&
      value !== "-99999999999999999999"
    ) {
      var valueCheck = value.replace(/[^\d.]/g, "");
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (valueCheck != "") {
        if (specialChars.test(valueCheck)) {
          if (valueCheck.length <= 18) {
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          } else {
            valueCheck = valueCheck.slice(0, 18);
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          }
        } else {
          if (valueCheck.length <= 15) {
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          } else {
            valueCheck = valueCheck.slice(0, 15);
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          }
        }
      }
    } else {
      if (
        name === "CustomerLiability" &&
        (value === "" || value === "-99999999999999999999")
      ) {
        setDCDisputes({
          ...DCDisputes,
          [name]: "-99999999999999999999",
        });
      }
    }
    if (
      name === "InFavourOfCM" &&
      value !== "" &&
      value !== "-99999999999999999999"
    ) {
      var valueCheck = value.replace(/[^\d.]/g, "");
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (valueCheck != "") {
        if (specialChars.test(valueCheck)) {
          if (valueCheck.length <= 18) {
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          } else {
            valueCheck = valueCheck.slice(0, 18);
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          }
        } else {
          if (valueCheck.length <= 15) {
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          } else {
            valueCheck = valueCheck.slice(0, 15);
            setDCDisputes({
              ...DCDisputes,
              [name]: parseFloat(valueCheck).toFixed(2),
            });
          }
        }
      }
    } else {
      if (
        name === "InFavourOfCM" &&
        (value === "" || value === "-99999999999999999999")
      ) {
        setDCDisputes({
          ...DCDisputes,
          [name]: "-99999999999999999999",
        });
      }
    }
  };

  // source type names selection for drop down
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    setSourceTypeName(
      nameSource.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.SourceData]);

  //   For sour name select
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    nameSource.map((data, index) => {
      if (trsDetails.FK_SID === data.pK_SID) {
        setSourceType(data.name);
      }
    });
  }, [trsDetails]);

  const columnsss = [
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
      title: "Transaction Amount ()",
      dataIndex: "transactionAmountOtherCurrency",
      key: "transactionAmountOtherCurrency",
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

  // for delet transection details
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

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
          // ["CMCity"]: data.name,
        });
      }
    });
  };

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

  // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    setCity(
      valueCity.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.CityData]);

  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (customerDetails.fK_FTID === data.pK_FTID) {
        setDCDisputes({
          ...DCDisputes,
          ["FK_FTID"]: parseInt(data.pK_FTID),
        });
        setFraudTypeName(data.name);
      }
    });
  }, [setupForms.FraudTypeData]);

  // For FraudType DropDown SetState
  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    if (nameFraud.length > 0 && nameFraud !== undefined && nameFraud !== null) {
      setFraudType(
        nameFraud.map((data, index) => {
          return data.name;
        }),
      );
    }
  }, [setupForms.FraudTypeData]);

  const deleteit = (e, record) => {
    setRecords(record);
    showModal();
    setAction({
      ...actions,
      delete: true,
      add: false,
      update: false,
      refresh: false,
    });
  };

  //Delete Transaction From Grid
  const handleDelete = (e, record) => {
    let testVariable =
      ListOfDebitCardTransactionDetailsObjects.indexOf(records);
    ListOfDebitCardTransactionDetailsObjects.splice(testVariable, 1);
    let total = DCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    let TotalTransactionAmount =
      DCDisputes.TotalTransactionAmount - records.DisputeAmount;
    let stotal = parseFloat(TotalTransactionAmount).toFixed(2);
    setDCDisputes({
      ...DCDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    setListOfDebitCardTransactionDetailsObjects([
      ...ListOfDebitCardTransactionDetailsObjects,
    ]);
    setIsModalVisible(false);
    setRecords([]);
  };

  const handleCancel = () => {
    setTrsDetails({
      ...ListOfDebitCardTransactionDetailsObjects,
      HBLAccountNumber: accountNumber,
      TransactionID: "",
      OtherBankAccountNumber: "",
      OtherBankBranchCode: "",
      OtherBankBranchName: "",
      TransactionAmount: -99999999999999999999,
      TransactionAmountOtherCurrency: -99999999999999999999,
      PotentialSave: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      TransactionCurrencyCode: "",
      ApprovalCode: "",
      Response: "",
      POSMode: "",
      MerchantName: "",
      MerchantID: "",
      MerchantCity: "",
      ON_OFF_US: false,
      CategoryCodeMCC: "",
      AcquirerInstitution: "",
      AcquirerTerminalID: "",
      AcquirerID: "",
      ARN: "",
      FK_SID: 0,
      TransactionDate: "",
      TransactionTime: "",
    });
    setIsModalVisible(false);
    setAction({ delete: false, update: false, add: false });
  };

  // update transection data
  const update = (e, record) => {
    var objIndex = ListOfDebitCardTransactionDetailsObjects.findIndex(
      (obj) => obj.TransactionID === record.TransactionID,
    );
    // trsDetails, setTrsDetails
    setRecordIndex(objIndex);
    setRecords(record);
    setTrsDetails({
      ...trsDetails,
      TransactionID: record.TransactionID,
      OtherBankAccountNumber: record.OtherBankAccountNumber,
      OtherBankBranchCode: record.OtherBankBranchCode,
      OtherBankBranchName: record.OtherBankBranchName,
      TransactionAmount: record.TransactionAmount,
      TransactionAmountOtherCurrency: record.TransactionAmountOtherCurrency,
      PotentialSave: record.PotentialSave,
      DisputeAmount: record.DisputeAmount,
      TransactionCurrencyCode: record.TransactionCurrencyCode,
      ApprovalCode: record.ApprovalCode,
      Response: record.Response,
      POSMode: record.POSMode,
      MerchantName: record.MerchantName,
      MerchantID: record.MerchantID,
      MerchantCity: record.MerchantCity,
      ON_OFF_US: record.ON_OFF_US,
      CategoryCodeMCC: record.CategoryCodeMCC,
      AcquirerInstitution: record.AcquirerInstitution,
      AcquirerTerminalID: record.AcquirerTerminalID,
      AcquirerID: record.AcquirerID,
      ARN: record.ARN,
      FK_SID: record.FK_SID,
      TransactionDate: record.TransactionDate,
      TransactionTime: record.TransactionTime,
    });
    setAction({
      ...actions,
      update: true,
      delete: false,
      add: false,
      refresh: false,
    });
  };

  //Update Transaction Grid
  const updateData = async () => {
    if (listOfTransactionDetailsAlreadyExsist.length > 0) {
      let flag = false;
      listOfTransactionDetailsAlreadyExsist.map((data, index) => {
        if (data.transactionID === trsDetails.TransactionID) {
          flag = true;
        }
      });
      if (flag === true) {
        setOpen({
          flag: true,
          message:
            "Transaction ID Already Exist In System Fetched Transactions",
        });
      } else {
        let flag1 = true;
        let flag2 = true;
        if (ListOfDebitCardTransactionDetailsObjects) {
          await ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
            if (data.TransactionID === trsDetails.TransactionID) {
              if (recordIndex !== index) {
                if (
                  trsDetails.TransactionID !== "" &&
                  trsDetails.HBLAccountNumber !== "" &&
                  trsDetails.OtherBankAccountNumber !== "" &&
                  trsDetails.OtherBankBranchCode !== "" &&
                  trsDetails.TransactionAmount !== null &&
                  trsDetails.TransactionAmount !== -99999999999999999999 &&
                  trsDetails.TransactionAmountOtherCurrency !== null &&
                  trsDetails.TransactionAmountOtherCurrency !=
                    -99999999999999999999 &&
                  trsDetails.PotentialSave !== null &&
                  trsDetails.PotentialSave !== -99999999999999999999 &&
                  trsDetails.DisputeAmount !== null &&
                  trsDetails.DisputeAmount !== -99999999999999999999 &&
                  trsDetails.TransactionCurrencyCode !== "" &&
                  trsDetails.ApprovalCode !== "" &&
                  trsDetails.Response !== "" &&
                  trsDetails.POSMode !== "" &&
                  trsDetails.MerchantName !== "" &&
                  trsDetails.MerchantID !== "" &&
                  trsDetails.MerchantCity !== "" &&
                  trsDetails.ON_OFF_US !== null &&
                  trsDetails.ON_OFF_US !== undefined &&
                  trsDetails.CategoryCodeMCC !== "" &&
                  trsDetails.AcquirerInstitution !== "" &&
                  trsDetails.AcquirerTerminalID !== "" &&
                  trsDetails.AcquirerID !== "" &&
                  trsDetails.ARN !== "" &&
                  trsDetails.FK_SID !== 0 &&
                  trsDetails.TransactionDate !== "" &&
                  trsDetails.TransactionTime !== ""
                ) {
                  flag1 = false;
                } else {
                }
              }
            }
          });
          if (listOfTransactionDetailsAlreadyExsist.length > 0) {
            listOfTransactionDetailsAlreadyExsist.map((data, index) => {
              if (
                data.transactionID === trsDetails.TransactionID &&
                data.preIdentifiedDataType === 2
              ) {
                flag2 = false;
              } else {
              }
            });
          }
          checkDataForUpdate(flag1, flag2);
        }
      }
    } else {
      let flag1 = true;
      let flag2 = true;
      if (ListOfDebitCardTransactionDetailsObjects) {
        await ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
          if (data.TransactionID === trsDetails.TransactionID) {
            if (recordIndex !== index) {
              if (
                trsDetails.TransactionID !== "" &&
                trsDetails.HBLAccountNumber !== "" &&
                trsDetails.OtherBankAccountNumber !== "" &&
                trsDetails.OtherBankBranchCode !== "" &&
                trsDetails.TransactionAmount !== null &&
                trsDetails.TransactionAmount !== -99999999999999999999 &&
                trsDetails.TransactionAmountOtherCurrency !== null &&
                trsDetails.TransactionAmountOtherCurrency !=
                  -99999999999999999999 &&
                trsDetails.PotentialSave !== null &&
                trsDetails.PotentialSave !== -99999999999999999999 &&
                trsDetails.DisputeAmount !== null &&
                trsDetails.DisputeAmount !== -99999999999999999999 &&
                trsDetails.TransactionCurrencyCode !== "" &&
                trsDetails.ApprovalCode !== "" &&
                trsDetails.Response !== "" &&
                trsDetails.POSMode !== "" &&
                trsDetails.MerchantName !== "" &&
                trsDetails.MerchantID !== "" &&
                trsDetails.MerchantCity !== "" &&
                trsDetails.ON_OFF_US !== null &&
                trsDetails.ON_OFF_US !== undefined &&
                trsDetails.CategoryCodeMCC !== "" &&
                trsDetails.AcquirerInstitution !== "" &&
                trsDetails.AcquirerTerminalID !== "" &&
                trsDetails.AcquirerID !== "" &&
                trsDetails.ARN !== "" &&
                trsDetails.FK_SID !== 0 &&
                trsDetails.TransactionDate !== "" &&
                trsDetails.TransactionTime !== ""
              ) {
                flag1 = false;
              } else {
              }
            }
          }
        });
        if (listOfTransactionDetailsAlreadyExsist.length > 0) {
          listOfTransactionDetailsAlreadyExsist.map((data, index) => {
            if (
              data.transactionID === trsDetails.TransactionID &&
              data.preIdentifiedDataType === 2
            ) {
              flag2 = false;
            } else {
            }
          });
        }
        checkDataForUpdate(flag1, flag2);
      }
    }
  };

  const checkDataForUpdate = (flag1, flag2) => {
    if (flag1 !== false && flag2 !== false) {
      if (
        trsDetails.TransactionID !== "" &&
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.OtherBankAccountNumber !== "" &&
        trsDetails.OtherBankBranchCode !== "" &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.TransactionAmountOtherCurrency !== null &&
        trsDetails.TransactionAmountOtherCurrency !== -99999999999999999999 &&
        trsDetails.PotentialSave !== null &&
        trsDetails.PotentialSave !== -99999999999999999999 &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.TransactionCurrencyCode !== "" &&
        trsDetails.ApprovalCode !== "" &&
        trsDetails.Response !== "" &&
        trsDetails.POSMode !== "" &&
        trsDetails.MerchantName !== "" &&
        trsDetails.MerchantID !== "" &&
        trsDetails.MerchantCity !== "" &&
        trsDetails.ON_OFF_US !== null &&
        trsDetails.ON_OFF_US !== undefined &&
        trsDetails.CategoryCodeMCC !== "" &&
        trsDetails.AcquirerInstitution !== "" &&
        trsDetails.AcquirerTerminalID !== "" &&
        trsDetails.AcquirerID !== "" &&
        trsDetails.ARN !== "" &&
        trsDetails.FK_SID !== 0 &&
        trsDetails.TransactionDate !== "" &&
        trsDetails.TransactionTime !== ""
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
    let total = DCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = records.DisputeAmount;
    } else {
      total = total - records.DisputeAmount;
    }
    let newTotal = total + trsDetails.DisputeAmount;
    let stotal = parseFloat(newTotal).toFixed(2);
    setDCDisputes({
      ...DCDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });

    ListOfDebitCardTransactionDetailsObjects[recordIndex] = trsDetails;
    setListOfDebitCardTransactionDetailsObjects([
      ...ListOfDebitCardTransactionDetailsObjects,
    ]);
    setTrsDetails({
      HBLAccountNumber: accountNumber,
      TransactionID: "",
      OtherBankAccountNumber: "",
      OtherBankBranchCode: "",
      OtherBankBranchName: "",
      TransactionAmount: -99999999999999999999,
      TransactionAmountOtherCurrency: -99999999999999999999,
      PotentialSave: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      TransactionCurrencyCode: "",
      ApprovalCode: "",
      Response: "",
      POSMode: "",
      MerchantName: "",
      MerchantID: "",
      MerchantCity: "",
      ON_OFF_US: false,
      CategoryCodeMCC: "",
      AcquirerInstitution: "",
      AcquirerTerminalID: "",
      AcquirerID: "",
      ARN: "",
      FK_SID: 0,
      TransactionDate: "",
      TransactionTime: "",
    });
    setTranstionid("");
    setSourceType("");
    setTransactionCurrencyCodeValue("");
    setAction({
      ...actions,
      update: false,
      delete: false,
      add: true,
      refresh: false,
    });
    setIsModalVisible(false);
    setRecords([]);
  };

  const proceedRefresh = (e, record) => {
    setAction({
      ...actions,
      refresh: true,
      update: false,
      delete: false,
      add: false,
    });
    setIsModalVisible(false);
  };

  // manual transection list table column
  const colu = [
    {
      title: "Transaction ID",
      dataIndex: "TransactionID",
      key: "TransactionID",
      align: "center",
      width: "220px",
    },
    {
      title: "HBL Account Number",
      dataIndex: "HBLAccountNumber",
      key: "HBLAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Other Bank Account Number",
      dataIndex: "OtherBankAccountNumber",
      key: "OtherBankAccountNumber",
      align: "center",
      width: "220px",
    },

    {
      title: "Branch Code",
      dataIndex: "OtherBankBranchCode",
      key: "OtherBankBranchCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Name",
      dataIndex: "OtherBankBranchName",
      key: "OtherBankBranchName",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Amount",
      dataIndex: "TransactionAmount",
      key: "TransactionAmount",
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
      title: "Transaction Amount ()",
      dataIndex: "TransactionAmountOtherCurrency",
      key: "TransactionAmountOtherCurrency",
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
      dataIndex: "DisputeAmount",
      key: "DisputeAmount",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Currency Code",
      dataIndex: "TransactionCurrencyCode",
      key: "TransactionCurrencyCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Approval Code",
      dataIndex: "ApprovalCode",
      key: "ApprovalCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Response",
      dataIndex: "Response",
      key: "Response",
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
      title: "Potential Save",
      dataIndex: "PotentialSave",
      key: "PotentialSave",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
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
      dataIndex: "MerchantID",
      key: "MerchantID",
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
      width: "220px",
    },
    {
      title: "Approval Reference Number",
      dataIndex: "ARN",
      key: "ARN",
      align: "center",
      width: "220px",
    },
    {
      title: "Source",
      dataIndex: "FK_SID",
      key: "FK_SID",
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
      dataIndex: "AcquirerID",
      key: "AcquirerID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Terminal ID",
      dataIndex: "AcquirerTerminalID",
      key: "AcquirerTerminalID",
      align: "center",
      width: "220px",
    },
    {
      title: "Acquirer Institution",
      dataIndex: "AcquirerInstitution",
      key: "AcquirerInstitution",
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

  const CardDetailsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
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

  // for transection id input data
  const TransactionIDchangehandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "TransactionID" && val !== "") {
      // all special character blocked
      var valueCheck = val.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "TransactionID" && val === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    }
    // all special character blocked
    var valueCheck = val.replace(/[^\d]/g, "");
    setTranstionid(valueCheck);
  };

  // for transection api handler
  const tranSearchHandler = async () => {
    if (listOfTransactionDetailsAlreadyExsist.length > 0) {
      let flag = false;
      listOfTransactionDetailsAlreadyExsist.map((data, index) => {
        if (data.transactionID === trsDetails.TransactionID) {
          flag = true;
        }
      });
      if (flag === true) {
        setOpen({
          flag: true,
          message:
            "Transaction ID Already Exist In System Fetched Transactions",
        });
      } else {
        await dispatch(
          GetIRISTransactionDetailsByTransactionId(
            transtionid,
            setTrsDetails,
            setTransactionIDError,
            setTIDErrMsg,
            setSourceType,
            setTransactionCurrencyCodeValue,
          ),
        );
      }
    } else {
      await dispatch(
        GetIRISTransactionDetailsByTransactionId(
          transtionid,
          setTrsDetails,
          setTransactionIDError,
          setTIDErrMsg,
          setSourceType,
          setTransactionCurrencyCodeValue,
        ),
      );
    }
  };

  // for time handler
  const TimeHandler = (e, val) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;

    if (name === "TransactionTime" && value !== "") {
      setTrsDetails({
        ...trsDetails,
        [name]: RemoveTimeDashes(value),
      });
    }
  };
  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  const TransactionDeatilHandlerChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "TransactionDate" &&
      name !== "OtherBankAccountNumber" &&
      name !== "OtherBankBranchCode" &&
      name !== "PotentialSave" &&
      name !== "TransactionAmount" &&
      name !== "TransactionAmountOtherCurrency" &&
      name !== "DisputeAmount" &&
      name !== "TransactionCurrencyCode" &&
      name !== "MerchantName" &&
      name !== "MerchantID" &&
      name !== "MerchantCity" &&
      name !== "CategoryCodeMCC" &&
      name !== "AcquirerID" &&
      name !== "AcquirerTerminalID" &&
      name !== "POSMode" &&
      name !== "ON_OFF_US" &&
      (value !== "" || value === false)
    ) {
      setTrsDetails({
        ...trsDetails,
        [name]: value.trimStart(),
      });
    } else if (name === "ON_OFF_US") {
      setTrsDetails({
        ...trsDetails,
        [name]: value,
      });
    } else if (
      (name === "MerchantName" || name === "MerchantCity") &&
      name !== "TransactionDate" &&
      (value !== "" || value === false)
    ) {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "POSMode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "POSMode" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "OtherBankAccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "OtherBankAccountNumber" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "OtherBankBranchCode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "OtherBankBranchCode" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "TransactionCurrencyCode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "TransactionCurrencyCode" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "MerchantID" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "MerchantID" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "CategoryCodeMCC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "CategoryCodeMCC" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "AcquirerID" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "AcquirerID" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "AcquirerTerminalID" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "AcquirerTerminalID" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (
      (name === "PotentialSave" ||
        name === "TransactionAmount" ||
        name === "TransactionAmountOtherCurrency" ||
        name === "DisputeAmount") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
      if (name === "PotentialSave") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 18);
            }
          } else {
            if (value.length <= 15) {
              setTrsDetails({
                ...trsDetails,
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
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }
      if (name === "DisputeAmount") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 18);
            }
          } else {
            if (value.length <= 15) {
              setTrsDetails({
                ...trsDetails,
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
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }
      if (name === "TransactionAmount") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 18);
            }
          } else {
            if (value.length <= 15) {
              setTrsDetails({
                ...trsDetails,
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
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }
      if (name === "TransactionAmountOtherCurrency") {
        if (value > 0) {
          if (value % 1 !== 0) {
            if (value.length <= 18) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 18);
            }
          } else {
            if (value.length <= 15) {
              setTrsDetails({
                ...trsDetails,
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
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value).toFixed(2),
              });
            } else {
              value = value.slice(0, 19);
            }
          } else {
            if (value.length <= 16) {
              setTrsDetails({
                ...trsDetails,
                [name]: parseFloat(value),
              });
            } else {
              value = value.slice(0, 16);
            }
          }
        }
      }

      setTrsDetails({
        ...trsDetails,
        [name]: parseFloat(value),
      });
    } else if (
      (name === "PotentialSave" ||
        name === "TransactionAmount" ||
        name === "TransactionAmountOtherCurrency" ||
        name === "DisputeAmount") &&
      (value === "" || value === -99999999999999999999)
    ) {
      setTrsDetails({
        ...trsDetails,
        [name]: parseFloat(-99999999999999999999),
      });
    } else if (name === "TransactionDate" && value !== "") {
      setTrsDetails({
        ...trsDetails,
        [name]: DateSendingFormat(value),
      });
    } else {
      if (
        name !== "PotentialSave" ||
        name !== "TransactionAmount" ||
        name !== "TransactionAmountOtherCurrency" ||
        name !== "DisputeAmount"
      ) {
        setTrsDetails({
          ...trsDetails,
          [name]: "",
        });
      }
    }
  };

  const checkData = (flag, flag2) => {
    let total = DCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    if (flag === false) {
      setOpen({
        flag: true,
        message: "Transaction ID Already Exists",
      });
    } else if (flag2 === false) {
      setOpen({
        flag: true,
        message: "Transaction ID Already Exists",
      });
    } else {
      if (
        trsDetails.TransactionID !== "" &&
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.OtherBankAccountNumber !== "" &&
        trsDetails.OtherBankBranchCode !== "" &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.TransactionAmountOtherCurrency !== null &&
        trsDetails.TransactionAmountOtherCurrency !== -99999999999999999999 &&
        trsDetails.PotentialSave !== null &&
        trsDetails.PotentialSave !== -99999999999999999999 &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.TransactionCurrencyCode !== "" &&
        trsDetails.ApprovalCode !== "" &&
        trsDetails.Response !== "" &&
        trsDetails.POSMode !== "" &&
        trsDetails.MerchantName !== "" &&
        trsDetails.MerchantID !== "" &&
        trsDetails.MerchantCity !== "" &&
        trsDetails.ON_OFF_US !== null &&
        trsDetails.ON_OFF_US !== undefined &&
        trsDetails.CategoryCodeMCC !== "" &&
        trsDetails.AcquirerInstitution !== "" &&
        trsDetails.AcquirerTerminalID !== "" &&
        trsDetails.AcquirerID !== 0 &&
        trsDetails.ARN !== "" &&
        trsDetails.FK_SID !== 0 &&
        trsDetails.TransactionDate !== "" &&
        trsDetails.TransactionTime !== ""
      ) {
        setListOfDebitCardTransactionDetailsObjects([
          ...ListOfDebitCardTransactionDetailsObjects,
          trsDetails,
        ]);
        let stotal = parseFloat(total).toFixed(2);
        setDCDisputes({
          ...DCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setTrsDetails({
          HBLAccountNumber: accountNumber,
          TransactionID: "",
          OtherBankAccountNumber: "",
          OtherBankBranchCode: "",
          OtherBankBranchName: "",
          TransactionAmount: -99999999999999999999,
          TransactionAmountOtherCurrency: -99999999999999999999,
          PotentialSave: -99999999999999999999,
          DisputeAmount: -99999999999999999999,
          TransactionCurrencyCode: "",
          ApprovalCode: "",
          Response: "",
          POSMode: "",
          MerchantName: "",
          MerchantID: "",
          MerchantCity: "",
          ON_OFF_US: false,
          CategoryCodeMCC: "",
          AcquirerInstitution: "",
          AcquirerTerminalID: "",
          AcquirerID: "",
          ARN: "",
          FK_SID: 0,
          TransactionDate: "",
          TransactionTime: "",
        });
        setTranstionid("");
        setSourceType("");
        setTransactionCurrencyCodeValue("");
      } else {
        setOpen({
          flag: true,
          message: "Enter Required Fields",
        });
      }
    }
  };

  // add transectyion data in grid
  const AddTransactionDetails = () => {
    if (listOfTransactionDetailsAlreadyExsist.length > 0) {
      let flag = false;
      listOfTransactionDetailsAlreadyExsist.map((data, index) => {
        if (data.transactionID === trsDetails.TransactionID) {
          flag = true;
        }
      });
      if (flag === true) {
        setOpen({
          flag: true,
          message:
            "Transaction ID Already Exist In System Fetched Transactions",
        });
      } else {
        let total = DCDisputes.TotalTransactionAmount;
        if (total === -99999999999999999999) {
          total = trsDetails.DisputeAmount;
        } else {
          total = total + trsDetails.DisputeAmount;
        }
        let flag = true;
        let flag2 = true;
        if (
          ListOfDebitCardTransactionDetailsObjects.length > 0 &&
          listOfTransactionDetailsAlreadyExsist.length > 0
        ) {
          ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
            if (data.TransactionID === trsDetails.TransactionID) {
              flag = false;
            } else {
            }
          });
          listOfTransactionDetailsAlreadyExsist.map((data, index) => {
            if (
              data.transactionID === trsDetails.TransactionID &&
              data.preIdentifiedDataType === 2
            ) {
              flag2 = false;
            } else {
            }
          });
          checkData(flag, flag2);
        } else if (ListOfDebitCardTransactionDetailsObjects.length > 0) {
          ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
            if (data.TransactionID === trsDetails.TransactionID) {
              flag = false;
            } else {
            }
          });
          checkData(flag, flag2);
        } else if (listOfTransactionDetailsAlreadyExsist.length > 0) {
          listOfTransactionDetailsAlreadyExsist.map((data, index) => {
            if (
              data.transactionID === trsDetails.TransactionID &&
              data.preIdentifiedDataType === 2
            ) {
              flag2 = false;
            } else {
            }
          });
          checkData(flag, flag2);
        } else {
          if (
            trsDetails.TransactionID !== "" &&
            trsDetails.HBLAccountNumber !== "" &&
            trsDetails.OtherBankAccountNumber !== "" &&
            trsDetails.OtherBankBranchCode !== "" &&
            trsDetails.TransactionAmount !== null &&
            trsDetails.TransactionAmount !== -99999999999999999999 &&
            trsDetails.TransactionAmountOtherCurrency !== null &&
            trsDetails.TransactionAmountOtherCurrency !=
              -99999999999999999999 &&
            trsDetails.PotentialSave !== null &&
            trsDetails.PotentialSave !== -99999999999999999999 &&
            trsDetails.DisputeAmount !== null &&
            trsDetails.DisputeAmount !== -99999999999999999999 &&
            trsDetails.TransactionCurrencyCode !== "" &&
            trsDetails.ApprovalCode !== "" &&
            trsDetails.Response !== "" &&
            trsDetails.POSMode !== "" &&
            trsDetails.MerchantName !== "" &&
            trsDetails.MerchantID !== "" &&
            trsDetails.MerchantCity !== "" &&
            trsDetails.ON_OFF_US !== null &&
            trsDetails.ON_OFF_US !== undefined &&
            trsDetails.CategoryCodeMCC !== "" &&
            trsDetails.AcquirerInstitution !== "" &&
            trsDetails.AcquirerTerminalID !== "" &&
            trsDetails.AcquirerID !== "" &&
            trsDetails.ARN !== "" &&
            trsDetails.FK_SID !== 0 &&
            trsDetails.TransactionDate !== "" &&
            trsDetails.TransactionTime !== ""
          ) {
            let stotal = parseFloat(total).toFixed(2);
            setDCDisputes({
              ...DCDisputes,
              ["TotalTransactionAmount"]: parseFloat(stotal),
            });
            setListOfDebitCardTransactionDetailsObjects([
              ...ListOfDebitCardTransactionDetailsObjects,
              trsDetails,
            ]);
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: "",
              OtherBankAccountNumber: "",
              OtherBankBranchCode: "",
              OtherBankBranchName: "",
              TransactionAmount: -99999999999999999999,
              TransactionAmountOtherCurrency: -99999999999999999999,
              PotentialSave: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              TransactionCurrencyCode: "",
              ApprovalCode: "",
              Response: "",
              POSMode: "",
              MerchantName: "",
              MerchantID: "",
              MerchantCity: "",
              ON_OFF_US: false,
              CategoryCodeMCC: "",
              AcquirerInstitution: "",
              AcquirerTerminalID: "",
              AcquirerID: "",
              ARN: "",
              FK_SID: 0,
              TransactionDate: "",
              TransactionTime: "",
            });
            setTranstionid("");
            setSourceType("");
            setTransactionCurrencyCodeValue("");
          } else {
            setOpen({
              flag: true,
              message: "Enter Required Fields",
            });
          }
        }
      }
    } else {
      let total = DCDisputes.TotalTransactionAmount;
      if (total === -99999999999999999999) {
        total = trsDetails.DisputeAmount;
      } else {
        total = total + trsDetails.DisputeAmount;
      }
      let flag = true;
      let flag2 = true;
      if (
        ListOfDebitCardTransactionDetailsObjects.length > 0 &&
        listOfTransactionDetailsAlreadyExsist.length > 0
      ) {
        ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
          if (data.TransactionID === trsDetails.TransactionID) {
            flag = false;
          } else {
          }
        });
        listOfTransactionDetailsAlreadyExsist.map((data, index) => {
          if (
            data.transactionID === trsDetails.TransactionID &&
            data.preIdentifiedDataType === 2
          ) {
            flag2 = false;
          } else {
          }
        });
        checkData(flag, flag2);
      } else if (ListOfDebitCardTransactionDetailsObjects.length > 0) {
        ListOfDebitCardTransactionDetailsObjects.map((data, index) => {
          if (data.TransactionID === trsDetails.TransactionID) {
            flag = false;
          } else {
          }
        });
        checkData(flag, flag2);
      } else if (listOfTransactionDetailsAlreadyExsist.length > 0) {
        listOfTransactionDetailsAlreadyExsist.map((data, index) => {
          if (
            data.transactionID === trsDetails.TransactionID &&
            data.preIdentifiedDataType === 2
          ) {
            flag2 = false;
          } else {
          }
        });
        checkData(flag, flag2);
      } else {
        if (
          trsDetails.TransactionID !== "" &&
          trsDetails.HBLAccountNumber !== "" &&
          trsDetails.OtherBankAccountNumber !== "" &&
          trsDetails.OtherBankBranchCode !== "" &&
          trsDetails.TransactionAmount !== null &&
          trsDetails.TransactionAmount !== -99999999999999999999 &&
          trsDetails.TransactionAmountOtherCurrency !== null &&
          trsDetails.TransactionAmountOtherCurrency !== -99999999999999999999 &&
          trsDetails.PotentialSave !== null &&
          trsDetails.PotentialSave !== -99999999999999999999 &&
          trsDetails.DisputeAmount !== null &&
          trsDetails.DisputeAmount !== -99999999999999999999 &&
          trsDetails.TransactionCurrencyCode !== "" &&
          trsDetails.ApprovalCode !== "" &&
          trsDetails.Response !== "" &&
          trsDetails.POSMode !== "" &&
          trsDetails.MerchantName !== "" &&
          trsDetails.MerchantID !== "" &&
          trsDetails.MerchantCity !== "" &&
          trsDetails.ON_OFF_US !== null &&
          trsDetails.ON_OFF_US !== undefined &&
          trsDetails.CategoryCodeMCC !== "" &&
          trsDetails.AcquirerInstitution !== "" &&
          trsDetails.AcquirerTerminalID !== "" &&
          trsDetails.AcquirerID !== "" &&
          trsDetails.ARN !== "" &&
          trsDetails.FK_SID !== 0 &&
          trsDetails.TransactionDate !== "" &&
          trsDetails.TransactionTime !== ""
        ) {
          let stotal = parseFloat(total).toFixed(2);
          setDCDisputes({
            ...DCDisputes,
            ["TotalTransactionAmount"]: parseFloat(stotal),
          });
          setListOfDebitCardTransactionDetailsObjects([
            ...ListOfDebitCardTransactionDetailsObjects,
            trsDetails,
          ]);
          setTrsDetails({
            HBLAccountNumber: accountNumber,
            TransactionID: "",
            OtherBankAccountNumber: "",
            OtherBankBranchCode: "",
            OtherBankBranchName: "",
            TransactionAmount: -99999999999999999999,
            TransactionAmountOtherCurrency: -99999999999999999999,
            PotentialSave: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            TransactionCurrencyCode: "",
            ApprovalCode: "",
            Response: "",
            POSMode: "",
            MerchantName: "",
            MerchantID: "",
            MerchantCity: "",
            ON_OFF_US: false,
            CategoryCodeMCC: "",
            AcquirerInstitution: "",
            AcquirerTerminalID: "",
            AcquirerID: "",
            ARN: "",
            FK_SID: 0,
            TransactionDate: "",
            TransactionTime: "",
          });
          setTranstionid("");
          setSourceType("");
          setTransactionCurrencyCodeValue("");
        } else {
          setOpen({
            flag: true,
            message: "Enter Required Fields",
          });
        }
      }
    }
  };

  // Source handler
  const SourceNameHandler = (e, value) => {
    setSourceType(value);
    let nameSource = setupForms.SourceData;
    nameSource.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_SID;
        setSourceType(data.name);
        setTrsDetails({
          ...trsDetails,
          ["FK_SID"]: parseInt(id),
        });
      }
    });
  };

  // upload file handler
  const getFileHandler = (data) => {
    const uploadFilePath = data.target.value;
    const uploadedFile = data.target.files[0];
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
      if (ListOfDebitCardDisputeDocuments.length > 0) {
        ListOfDebitCardDisputeDocuments.map((filename, index) => {
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
          dispatch(UploadFileDC(uploadedFile));
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
          dispatch(UploadFileDC(uploadedFile));
        }
      }
    } else {
      setOpen({
        flag: true,
        message: "This File Format Cannot be Uploaded",
      });
    }
  };

  useEffect(() => {
    let newData = reports.uploadDocumentsList;
    if (newData !== undefined && newData !== null && newData.length !== 0) {
      let Data = {
        PK_DCDDID: 0,
        FK_DCDID: 0,
        FK_GSSUserID: 0,
        OriginalFileName: newData.originalFileName,
        DisplayFileName: newData.displayFileName,
      };
      setListOfDebitCreditCardDisputeDocuments([
        ...ListOfDebitCardDisputeDocuments,
        Data,
      ]);
      dispatch(setStateOfUploadDocumentCreditCard());
    }
  }, [reports.uploadDocumentsList]);

  // colums of doc list table
  const col = [
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

  // Refresh props
  const refreshButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => proceedRefresh(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  // Button props for update
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

  const deleteUploadDocument = (record) => {
    var objIndex = ListOfDebitCardDisputeDocuments.findIndex(
      (obj) =>
        obj.DisplayFileName === record.DisplayFileName &&
        obj.PK_CCDDID === record.PK_CCDDID &&
        obj.FK_CCDID === record.FK_CCDID &&
        obj.FK_GSSUserID === record.FK_GSSUserID,
    );
    var temp = [];
    ListOfDebitCardDisputeDocuments.map((data, index) => {
      temp.push({
        ...ListOfDebitCardDisputeDocuments[index],
        FK_DCDID: data.FK_DCDID,
        DisplayFileName: objIndex === index ? "" : data.DisplayFileName,
        OriginalFileName: objIndex === index ? "" : data.OriginalFileName,
        FK_GSSUserID: data.FK_GSSUserID,
        PK_DCDDID: data.PK_DCDDID,
      });
    });
    setListOfDebitCreditCardDisputeDocuments(temp);
  };

  // Delete Upload Document
  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 2,
    };
    dispatch(DownloadUploadFile(data));
  };

  const getFilter = () => {
    let filteredItems = ListOfDebitCardDisputeDocuments;
    filteredItems = ListOfDebitCardDisputeDocuments.filter(
      (item) => item.DisplayFileName !== "",
    );
    return filteredItems;
  };

  //Entire Edit Response
  useEffect(() => {
    if (
      investigationOfficer.GetDebitCardDisputesForEditByCnicAndRefrenceNumberData
    ) {
      let cardDetails =
        investigationOfficer
          .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData.cardDetails;
      if (cardDetails !== undefined && cardDetails !== null) {
        setCardDetails({
          ...CardDetails,
          ["CardNumber"]: cardDetails.cardNumber,
        });
      }

      let fDCustomer =
        investigationOfficer
          .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData.fdCustomer;
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

      let dCDispute =
        investigationOfficer
          .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData.dcDispute;
      if (dCDispute !== undefined && dCDispute !== null) {
        setTimeout(() => {
          setDCDisputes({
            ...DCDisputes,
            ["RefrenceNumber"]: dCDispute.refrenceNumber,
            ["FK_CSID"]: dCDispute.fK_CSID,
            ["FK_FTID"]: dCDispute.fK_FTID,
            ["TotalTransactionAmount"]: dCDispute.totalTransactionAmount,
            ["CaseReceivedChannel"]: dCDispute.caseReceivedChannel,
            ["CaseResolvedDate"]: dCDispute.caseResolvedDate,
            ["IsCaseResolved"]: dCDispute.isCaseResolved,
            ["CaseReceivedDate"]: dCDispute.caseReceivedDate,
            ["IsTC40Reporting"]: dCDispute.isTC40Reporting,
            ["TC40ReportingDate"]: dCDispute.tC40ReportingDate,
            ["IsSafeReportingDate"]: dCDispute.isSafeReportingDate,
            ["SafeReportingDate"]: dCDispute.safeReportingDate,
            ["FK_CDEID"]: dCDispute.fK_CDEID,
            ["InFavourOfCM"]: dCDispute.inFavourOfCM,
            ["CustomerLiability"]: dCDispute.customerLiability,
            ["Remarks"]: dCDispute.remarks,
            ["IsPOC"]: dCDispute.isPOC,
            ["POCIdentified"]: dCDispute.pocIdentified,
            ["EventIDSAS"]: dCDispute.eventIDSAS,
            ["Aging"]: dCDispute.caseAging,
            ["CaseClosedTAT"]: dCDispute.caseClosedTAT,
            ["FromDateForPreIdentifiedData"]:
              dCDispute.fromDateForPreIdentifiedData,
            ["ToDateForPreIdentifiedData"]:
              dCDispute.toDateForPreIdentifiedData,
          });
        }, 1000);
        let nameFraud = setupForms.FraudTypeData;
        nameFraud.map((data, index) => {
          if (dCDispute.fK_FTID === data.pK_FTID) {
            setFraudTypeName(data.name);
          }
        });
        let TcName = dCDispute.isTC40Reporting;
        let SafeName = dCDispute.isSafeReportingDate;
        let PocName = dCDispute.isPOC;
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
        //CaseDecisions
        let caseDecisionValue = setupForms.CaseDecisionData;
        caseDecisionValue.map((data, index) => {
          if (dCDispute.fK_CDEID === data.pK_CDEID) {
            setCaseDecisionValue(data.name);
          }
        });
      }
      let listOfDCDDocuments =
        investigationOfficer
          .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData
          .listOfDebitCardDisputeDocuments;
      if (listOfDCDDocuments !== undefined && listOfDCDDocuments !== null) {
        let tem = [];
        listOfDCDDocuments.map((data, index) => {
          tem.push({
            PK_DCDDID: data.pK_DCDDID,
            FK_DCDID: data.fK_DCDID,
            FK_GSSUserID: data.fK_GSSUserID,
            OriginalFileName: data.originalFileName,
            DisplayFileName: data.displayFileName,
          });
        });
        setListOfDebitCreditCardDisputeDocuments(tem);
      }
      let listOfDTDO =
        investigationOfficer
          .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData
          .listOfDebitCardTransactionDetailsObjects;
      if (listOfDTDO !== undefined && listOfDTDO !== null) {
        let tem = [];
        listOfDTDO.map((item, index) => {
          tem.push({
            HBLAccountNumber: item.hblAccountNumber,
            TransactionID: item.transactionID,
            OtherBankAccountNumber: item.otherBankAccountNumber,
            OtherBankBranchCode: item.otherBankBranchCode,
            OtherBankBranchName: item.otherBankBranchName,
            TransactionAmount: item.transactionAmount,
            TransactionAmountOtherCurrency: item.transactionAmountOtherCurrency,
            PotentialSave: item.potentialSave,
            DisputeAmount: item.disputeAmount,
            TransactionCurrencyCode: item.transactionCurrencyCode,
            ApprovalCode: item.approvalCode,
            Response: item.response,
            POSMode: item.posMode,
            MerchantName: item.merchantName,
            MerchantID: item.merchantID,
            MerchantCity: item.merchantCity,
            ON_OFF_US: item.oN_OFF_US,
            CategoryCodeMCC: item.categoryCodeMCC,
            AcquirerInstitution: item.acquirerInstitution,
            AcquirerTerminalID: item.acquirerTerminalID,
            AcquirerID: item.acquirerID,
            ARN: item.arn,
            FK_SID: item.fK_SID,
            TransactionDate: item.transactionDate,
            TransactionTime: item.transactionTime,
            PreIdentifiedDataType: item.preIdentifiedDataType,
          });
        });
        setListOfDebitCardTransactionDetailsObjects(tem);
      }
    }
    let alreadyexist =
      investigationOfficer
        .GetDebitCardDisputesForEditByCnicAndRefrenceNumberData
        .irisListOfDebitCardTransactionDetailsObjects;
    if (alreadyexist !== undefined && alreadyexist !== null) {
      let GetTransactionDetailsByCNICArray = alreadyexist.map((item, index) => {
        var i = index;
        i = index + 1;
        return { ...item, key: i + "" };
      });
      setListOfTransactionDetailsAlreadyExsist(
        GetTransactionDetailsByCNICArray,
      );
    }
  }, [
    investigationOfficer.GetDebitCardDisputesForEditByCnicAndRefrenceNumberData,
  ]);

  //UseEffectForEditAPI
  useEffect(() => {
    const loadOnReload = async () => {
      var ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
      let data2 = {
        CNICNumber: cnic2,
        ReferenceNumber: ReferenceNumber,
      };
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        dispatch(GetDebitCardDisputesForEditByCnicAndRefrenceNumber(data2));
        await dispatch(GetAllFraudType());
      }
    };
    loadOnReload();
  }, []);

  //  FOR SAVE
  const goToSaveHandler = async (e) => {
    e.preventDefault();
    if (saveValue === 1) {
      if (ListOfDebitCardTransactionDetailsObjects.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          if (listOfTransactionDetailsAlreadyExsist.length > 0) {
            let newdata = ListOfDebitCardTransactionDetailsObjects;
            // let Amount = 0;
            await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
              if (data.preIdentifiedDataType === 2) {
                newdata.push({
                  HBLAccountNumber: data.hblAccountNumber,
                  TransactionID: data.transactionID,
                  OtherBankAccountNumber: data.otherBankAccountNumber,
                  OtherBankBranchCode: data.otherBankBranchCode,
                  OtherBankBranchName: data.otherBankBranchName,
                  TransactionAmount: data.transactionAmount,
                  TransactionAmountOtherCurrency:
                    data.transactionAmountOtherCurrency,
                  PotentialSave: data.potentialSave,
                  DisputeAmount: data.disputeAmount,
                  TransactionCurrencyCode: data.transactionCurrencyCode,
                  ApprovalCode: data.approvalCode,
                  Response: data.response,
                  POSMode: data.posMode,
                  MerchantName: data.merchantName,
                  MerchantID: data.merchantID,
                  MerchantCity: data.merchantCity,
                  ON_OFF_US: data.oN_OFF_US,
                  CategoryCodeMCC: data.categoryCodeMCC,
                  AcquirerInstitution: data.acquirerInstitution,
                  AcquirerTerminalID: data.acquirerTerminalID,
                  AcquirerID: data.acquirerID,
                  dataN: data.arn,
                  PreIdentifiedDataType: data.preIdentifiedDataType,
                  FK_SID: data.fK_SID,
                  TransactionDate: data.transactionDate,
                  TransactionTime: data.transactionTime,
                });
              }
            });
            if (newdata.length > 0) {
              await setListOfDebitCardTransactionDetailsObjects(newdata);
              let DCDispute = {
                FK_FTID: DCDisputes.FK_FTID,
                RefrenceNumber: DCDisputes.RefrenceNumber,
                CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
                CaseResolvedDate: DCDisputes.CaseResolvedDate,
                CaseReceivedDate: DCDisputes.CaseReceivedDate,
                IsCaseResolved: DCDisputes.IsCaseResolved,
                TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
                IsTC40Reporting: DCDisputes.IsTC40Reporting,
                TC40ReportingDate: DCDisputes.TC40ReportingDate,
                SafeReportingDate: DCDisputes.SafeReportingDate,
                IsSafeReporting: DCDisputes.IsSafeReporting,
                IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
                FK_CSID: DCDisputes.FK_CSID,
                FK_CDEID: DCDisputes.FK_CDEID,
                IsPOC: DCDisputes.IsPOC,
                POCIdentified: DCDisputes.POCIdentified,
                EventIDSAS: DCDisputes.EventIDSAS,
                CaseClosedTAT: DCDisputes.CaseClosedTAT,
                InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
                CustomerLiability: DCDisputes.CustomerLiability.toString(),
                Remarks: DCDisputes.Remarks,
                FromDateForPreIdentifiedData:
                  DCDisputes.FromDateForPreIdentifiedData,
                ToDateForPreIdentifiedData:
                  DCDisputes.ToDateForPreIdentifiedData,
              };
              await setDCDisputes(DCDispute);

              let data = {
                FDCustomer,
                CardDetails,
                DCDispute,
                ListOfDebitCardTransactionDetailsObjects,
                ListOfDebitCardDisputeDocuments,
              };
              let searchData = {
                RefrenceNumber: "",
                CustomerName: "",
                FK_CTID: 0,
                CNIC: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionId: "",
                TransactionAmount: -99999999999999999999,
                fk_csid: 1,
                ApprovalCode: "",
                FromDate: "",
                ToDate: "",
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              let UserID = JSON.parse(localStorage.getItem("UserDetails"));
              let userid = UserID.userID;
              let DataForGlobal = {
                FK_GSSUserID: userid,
                TransactionTypeIDs: [],
                ReferenceNumber: "",
                CNIC: "",
                AccountNumber: "",
                CustomerName: "",
                TransactionId: "",
                TotalTransactionAmount: -100000000000000000000,
                fk_csid: 1,
              };
              let DataForGlobalDate = {
                from: "",
                to: "",
              };
              dispatch(
                UpdateDebitCardDisputeDetails(
                  data,
                  searchData,
                  searchDataofdate,
                  DataForGlobal,
                  DataForGlobalDate,
                ),
              );
              setAddInedx([]);
            } else {
              setOpen({
                flag: true,
                message: "Enter atleast One Transaction Detail",
              });
            }
          } else {
            let DCDispute = {
              FK_FTID: DCDisputes.FK_FTID,
              RefrenceNumber: DCDisputes.RefrenceNumber,
              CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
              CaseResolvedDate: DCDisputes.CaseResolvedDate,
              CaseReceivedDate: DCDisputes.CaseReceivedDate,
              IsCaseResolved: DCDisputes.IsCaseResolved,
              TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
              IsTC40Reporting: DCDisputes.IsTC40Reporting,
              TC40ReportingDate: DCDisputes.TC40ReportingDate,
              SafeReportingDate: DCDisputes.SafeReportingDate,
              IsSafeReporting: DCDisputes.IsSafeReporting,
              IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
              FK_CSID: DCDisputes.FK_CSID,
              FK_CDEID: DCDisputes.FK_CDEID,
              IsPOC: DCDisputes.IsPOC,
              POCIdentified: DCDisputes.POCIdentified,
              EventIDSAS: DCDisputes.EventIDSAS,
              CaseClosedTAT: DCDisputes.CaseClosedTAT,
              InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
              CustomerLiability: DCDisputes.CustomerLiability.toString(),
              Remarks: DCDisputes.Remarks,
              FromDateForPreIdentifiedData:
                DCDisputes.FromDateForPreIdentifiedData,
              ToDateForPreIdentifiedData: DCDisputes.ToDateForPreIdentifiedData,
            };
            let data = {
              FDCustomer,
              CardDetails,
              DCDispute,
              ListOfDebitCardTransactionDetailsObjects,
              ListOfDebitCardDisputeDocuments,
            };

            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 1,
              ApprovalCode: "",
              FromDate: "",
              ToDate: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            let UserID = JSON.parse(localStorage.getItem("UserDetails"));
            let userid = UserID.userID;
            let DataForGlobal = {
              FK_GSSUserID: userid,
              TransactionTypeIDs: [],
              ReferenceNumber: "",
              CNIC: "",
              AccountNumber: "",
              CustomerName: "",
              TransactionId: "",
              TotalTransactionAmount: -100000000000000000000,
              fk_csid: 1,
            };
            let DataForGlobalDate = {
              from: "",
              to: "",
            };
            dispatch(
              UpdateDebitCardDisputeDetails(
                data,
                searchData,
                searchDataofdate,
                DataForGlobal,
                DataForGlobalDate,
              ),
            );
          }
        }
      } else if (listOfTransactionDetailsAlreadyExsist.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          let newdata = ListOfDebitCardTransactionDetailsObjects;
          await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
            if (data.preIdentifiedDataType === 2) {
              newdata.push({
                HBLAccountNumber: data.hblAccountNumber,
                TransactionID: data.transactionID,
                OtherBankAccountNumber: data.otherBankAccountNumber,
                OtherBankBranchCode: data.otherBankBranchCode,
                OtherBankBranchName: data.otherBankBranchName,
                TransactionAmount: data.transactionAmount,
                TransactionAmountOtherCurrency:
                  data.transactionAmountOtherCurrency,
                PotentialSave: data.potentialSave,
                DisputeAmount: data.disputeAmount,
                TransactionCurrencyCode: data.transactionCurrencyCode,
                ApprovalCode: data.approvalCode,
                Response: data.response,
                POSMode: data.posMode,
                MerchantName: data.merchantName,
                MerchantID: data.merchantID,
                MerchantCity: data.merchantCity,
                ON_OFF_US: data.oN_OFF_US,
                CategoryCodeMCC: data.categoryCodeMCC,
                AcquirerInstitution: data.acquirerInstitution,
                AcquirerTerminalID: data.acquirerTerminalID,
                AcquirerID: data.acquirerID,
                dataN: data.arn,
                PreIdentifiedDataType: data.preIdentifiedDataType,
                FK_SID: data.fK_SID,
                TransactionDate: data.transactionDate,
                TransactionTime: data.transactionTime,
              });
            }
          });
          let DCDispute = {
            FK_FTID: DCDisputes.FK_FTID,
            RefrenceNumber: DCDisputes.RefrenceNumber,
            CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
            CaseResolvedDate: DCDisputes.CaseResolvedDate,
            CaseReceivedDate: DCDisputes.CaseReceivedDate,
            IsCaseResolved: DCDisputes.IsCaseResolved,
            TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
            IsTC40Reporting: DCDisputes.IsTC40Reporting,
            TC40ReportingDate: DCDisputes.TC40ReportingDate,
            SafeReportingDate: DCDisputes.SafeReportingDate,
            IsSafeReporting: DCDisputes.IsSafeReporting,
            IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
            FK_CSID: DCDisputes.FK_CSID,
            FK_CDEID: DCDisputes.FK_CDEID,
            IsPOC: DCDisputes.IsPOC,
            POCIdentified: DCDisputes.POCIdentified,
            EventIDSAS: DCDisputes.EventIDSAS,
            CaseClosedTAT: DCDisputes.CaseClosedTAT,
            InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
            CustomerLiability: DCDisputes.CustomerLiability.toString(),
            Remarks: DCDisputes.Remarks,
            FromDateForPreIdentifiedData:
              DCDisputes.FromDateForPreIdentifiedData,
            ToDateForPreIdentifiedData: DCDisputes.ToDateForPreIdentifiedData,
          };
          if (newdata.length > 0) {
            await setDCDisputes(DCDispute);
            await setListOfDebitCardTransactionDetailsObjects(newdata);
            let data = {
              FDCustomer,
              CardDetails,
              DCDispute,
              ListOfDebitCardTransactionDetailsObjects,
              ListOfDebitCardDisputeDocuments,
            };
            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 1,
              ApprovalCode: "",
              FromDate: "",
              ToDate: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            let UserID = JSON.parse(localStorage.getItem("UserDetails"));
            let userid = UserID.userID;
            let DataForGlobal = {
              FK_GSSUserID: userid,
              TransactionTypeIDs: [],
              ReferenceNumber: "",
              CNIC: "",
              AccountNumber: "",
              CustomerName: "",
              TransactionId: "",
              TotalTransactionAmount: -100000000000000000000,
              fk_csid: 1,
            };
            let DataForGlobalDate = {
              from: "",
              to: "",
            };
            dispatch(
              UpdateDebitCardDisputeDetails(
                data,
                searchData,
                searchDataofdate,
                DataForGlobal,
                DataForGlobalDate,
              ),
            );
            setAddInedx([]);
          } else {
            setOpen({
              flag: true,
              message: "Enter atleast One Transaction Detail",
            });
          }
        }
      } else {
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    } else if (saveValue === 2) {
      if (ListOfDebitCardTransactionDetailsObjects.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          if (listOfTransactionDetailsAlreadyExsist.length > 0) {
            let newdata = ListOfDebitCardTransactionDetailsObjects;
            await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
              if (data.preIdentifiedDataType === 2) {
                newdata.push({
                  HBLAccountNumber: data.hblAccountNumber,
                  TransactionID: data.transactionID,
                  OtherBankAccountNumber: data.otherBankAccountNumber,
                  OtherBankBranchCode: data.otherBankBranchCode,
                  OtherBankBranchName: data.otherBankBranchName,
                  TransactionAmount: data.transactionAmount,
                  TransactionAmountOtherCurrency:
                    data.transactionAmountOtherCurrency,
                  PotentialSave: data.potentialSave,
                  DisputeAmount: data.disputeAmount,
                  TransactionCurrencyCode: data.transactionCurrencyCode,
                  ApprovalCode: data.approvalCode,
                  Response: data.response,
                  POSMode: data.posMode,
                  MerchantName: data.merchantName,
                  MerchantID: data.merchantID,
                  MerchantCity: data.merchantCity,
                  ON_OFF_US: data.oN_OFF_US,
                  CategoryCodeMCC: data.categoryCodeMCC,
                  AcquirerInstitution: data.acquirerInstitution,
                  AcquirerTerminalID: data.acquirerTerminalID,
                  AcquirerID: data.acquirerID,
                  dataN: data.arn,
                  PreIdentifiedDataType: data.preIdentifiedDataType,
                  FK_SID: data.fK_SID,
                  TransactionDate: data.transactionDate,
                  TransactionTime: data.transactionTime,
                });
              }
            });
            if (newdata.length > 0) {
              await setListOfDebitCardTransactionDetailsObjects(newdata);
              let DCDispute = {
                FK_FTID: DCDisputes.FK_FTID,
                RefrenceNumber: DCDisputes.RefrenceNumber,
                CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
                CaseResolvedDate: DCDisputes.CaseResolvedDate,
                CaseReceivedDate: DCDisputes.CaseReceivedDate,
                IsCaseResolved: DCDisputes.IsCaseResolved,
                TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
                IsTC40Reporting: DCDisputes.IsTC40Reporting,
                TC40ReportingDate: DCDisputes.TC40ReportingDate,
                SafeReportingDate: DCDisputes.SafeReportingDate,
                IsSafeReporting: DCDisputes.IsSafeReporting,
                IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
                FK_CSID: DCDisputes.FK_CSID,
                FK_CDEID: DCDisputes.FK_CDEID,
                IsPOC: DCDisputes.IsPOC,
                POCIdentified: DCDisputes.POCIdentified,
                EventIDSAS: DCDisputes.EventIDSAS,
                CaseClosedTAT: DCDisputes.CaseClosedTAT,
                InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
                CustomerLiability: DCDisputes.CustomerLiability.toString(),
                Remarks: DCDisputes.Remarks,
                FromDateForPreIdentifiedData:
                  DCDisputes.FromDateForPreIdentifiedData,
                ToDateForPreIdentifiedData:
                  DCDisputes.ToDateForPreIdentifiedData,
              };
              await setDCDisputes(DCDispute);

              let data = {
                FDCustomer,
                CardDetails,
                DCDispute,
                ListOfDebitCardTransactionDetailsObjects,
                ListOfDebitCardDisputeDocuments,
              };
              let searchData = {
                RefrenceNumber: "",
                CustomerName: "",
                FK_CTID: 0,
                CNIC: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionId: "",
                TransactionAmount: -99999999999999999999,
                fk_csid: 2,
                ApprovalCode: "",
                FromDate: "",
                ToDate: "",
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              if (data.DCDispute.FK_CDEID === 0) {
                setOpen({
                  flag: true,
                  message: "Select Case Decision ",
                });
              } else if (data.DCDispute.FK_CDEID !== 0) {
                let UserID = JSON.parse(localStorage.getItem("UserDetails"));
                let userid = UserID.userID;
                let DataForGlobal = {
                  FK_GSSUserID: userid,
                  TransactionTypeIDs: [],
                  ReferenceNumber: "",
                  CNIC: "",
                  AccountNumber: "",
                  CustomerName: "",
                  TransactionId: "",
                  TotalTransactionAmount: -100000000000000000000,
                  fk_csid: 2,
                };
                let DataForGlobalDate = {
                  from: "",
                  to: "",
                };
                dispatch(
                  UpdateAndApproveDebitCardDisputeDetails(
                    data,
                    searchData,
                    searchDataofdate,
                    DataForGlobal,
                    DataForGlobalDate,
                  ),
                );
              }
              setAddInedx([]);
            } else {
              setOpen({
                flag: true,
                message: "Enter atleast One Transaction Detail",
              });
            }
          } else {
            let DCDispute = {
              FK_FTID: DCDisputes.FK_FTID,
              RefrenceNumber: DCDisputes.RefrenceNumber,
              CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
              CaseResolvedDate: DCDisputes.CaseResolvedDate,
              CaseReceivedDate: DCDisputes.CaseReceivedDate,
              IsCaseResolved: DCDisputes.IsCaseResolved,
              TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
              IsTC40Reporting: DCDisputes.IsTC40Reporting,
              TC40ReportingDate: DCDisputes.TC40ReportingDate,
              SafeReportingDate: DCDisputes.SafeReportingDate,
              IsSafeReporting: DCDisputes.IsSafeReporting,
              IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
              FK_CSID: DCDisputes.FK_CSID,
              FK_CDEID: DCDisputes.FK_CDEID,
              IsPOC: DCDisputes.IsPOC,
              POCIdentified: DCDisputes.POCIdentified,
              EventIDSAS: DCDisputes.EventIDSAS,
              CaseClosedTAT: DCDisputes.CaseClosedTAT,
              InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
              CustomerLiability: DCDisputes.CustomerLiability.toString(),
              Remarks: DCDisputes.Remarks,
              FromDateForPreIdentifiedData:
                DCDisputes.FromDateForPreIdentifiedData,
              ToDateForPreIdentifiedData: DCDisputes.ToDateForPreIdentifiedData,
            };
            let data = {
              FDCustomer,
              CardDetails,
              DCDispute,
              ListOfDebitCardTransactionDetailsObjects,
              ListOfDebitCardDisputeDocuments,
            };
            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 2,
              ApprovalCode: "",
              FromDate: "",
              ToDate: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            if (data.DCDispute.FK_CDEID === 0) {
              setOpen({
                flag: true,
                message: "Enter Case Decision ",
              });
            } else if (data.DCDispute.FK_CDEID !== 0) {
              let UserID = JSON.parse(localStorage.getItem("UserDetails"));
              let userid = UserID.userID;
              let DataForGlobal = {
                FK_GSSUserID: userid,
                TransactionTypeIDs: [],
                ReferenceNumber: "",
                CNIC: "",
                AccountNumber: "",
                CustomerName: "",
                TransactionId: "",
                TotalTransactionAmount: -100000000000000000000,
                fk_csid: 2,
              };
              let DataForGlobalDate = {
                from: "",
                to: "",
              };
              dispatch(
                UpdateAndApproveDebitCardDisputeDetails(
                  data,
                  searchData,
                  searchDataofdate,
                  DataForGlobal,
                  DataForGlobalDate,
                ),
              );
            }
            // }
          }
        }
      } else if (listOfTransactionDetailsAlreadyExsist.length > 0) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard)) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          let newdata = ListOfDebitCardTransactionDetailsObjects;
          let Amount = 0;
          await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
            if (data.preIdentifiedDataType === 2) {
              newdata.push({
                HBLAccountNumber: data.hblAccountNumber,
                TransactionID: data.transactionID,
                OtherBankAccountNumber: data.otherBankAccountNumber,
                OtherBankBranchCode: data.otherBankBranchCode,
                OtherBankBranchName: data.otherBankBranchName,
                TransactionAmount: data.transactionAmount,
                TransactionAmountOtherCurrency:
                  data.transactionAmountOtherCurrency,
                PotentialSave: data.potentialSave,
                DisputeAmount: data.disputeAmount,
                TransactionCurrencyCode: data.transactionCurrencyCode,
                ApprovalCode: data.approvalCode,
                Response: data.response,
                POSMode: data.posMode,
                MerchantName: data.merchantName,
                MerchantID: data.merchantID,
                MerchantCity: data.merchantCity,
                ON_OFF_US: data.oN_OFF_US,
                CategoryCodeMCC: data.categoryCodeMCC,
                AcquirerInstitution: data.acquirerInstitution,
                AcquirerTerminalID: data.acquirerTerminalID,
                AcquirerID: data.acquirerID,
                dataN: data.arn,
                PreIdentifiedDataType: data.preIdentifiedDataType,
                FK_SID: data.fK_SID,
                TransactionDate: data.transactionDate,
                TransactionTime: data.transactionTime,
              });
            }
          });
          let total = Amount + DCDisputes.TotalTransactionAmount;
          if (newdata.length > 0) {
            let DCDispute = {
              FK_FTID: DCDisputes.FK_FTID,
              RefrenceNumber: DCDisputes.RefrenceNumber,
              CaseReceivedChannel: DCDisputes.CaseReceivedChannel,
              CaseResolvedDate: DCDisputes.CaseResolvedDate,
              CaseReceivedDate: DCDisputes.CaseReceivedDate,
              IsCaseResolved: DCDisputes.IsCaseResolved,
              TotalTransactionAmount: DCDisputes.TotalTransactionAmount,
              IsTC40Reporting: DCDisputes.IsTC40Reporting,
              TC40ReportingDate: DCDisputes.TC40ReportingDate,
              SafeReportingDate: DCDisputes.SafeReportingDate,
              IsSafeReporting: DCDisputes.IsSafeReporting,
              IsSafeReportingDate: DCDisputes.IsSafeReportingDate,
              FK_CSID: DCDisputes.FK_CSID,
              FK_CDEID: DCDisputes.FK_CDEID,
              IsPOC: DCDisputes.IsPOC,
              POCIdentified: DCDisputes.POCIdentified,
              EventIDSAS: DCDisputes.EventIDSAS,
              CaseClosedTAT: DCDisputes.CaseClosedTAT,
              InFavourOfCM: DCDisputes.InFavourOfCM.toString(),
              CustomerLiability: DCDisputes.CustomerLiability.toString(),
              Remarks: DCDisputes.Remarks,
              FromDateForPreIdentifiedData:
                DCDisputes.FromDateForPreIdentifiedData,
              ToDateForPreIdentifiedData: DCDisputes.ToDateForPreIdentifiedData,
            };
            await setDCDisputes(DCDispute);
            await setListOfDebitCardTransactionDetailsObjects(newdata);
            let data = {
              FDCustomer,
              CardDetails,
              DCDispute,
              ListOfDebitCardTransactionDetailsObjects,
              ListOfDebitCardDisputeDocuments,
            };
            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 2,
              ApprovalCode: "",
              FromDate: "",
              ToDate: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            if (data.DCDispute.FK_CDEID === 0) {
              setOpen({
                flag: true,
                message: "Enter Case Decision ",
              });
            } else if (data.DCDispute.FK_CDEID !== 0) {
              let UserID = JSON.parse(localStorage.getItem("UserDetails"));
              let userid = UserID.userID;
              let DataForGlobal = {
                FK_GSSUserID: userid,
                TransactionTypeIDs: [],
                ReferenceNumber: "",
                CNIC: "",
                AccountNumber: "",
                CustomerName: "",
                TransactionId: "",
                TotalTransactionAmount: -100000000000000000000,
                fk_csid: 2,
              };
              let DataForGlobalDate = {
                from: "",
                to: "",
              };
              dispatch(
                UpdateAndApproveDebitCardDisputeDetails(
                  data,
                  searchData,
                  searchDataofdate,
                  DataForGlobal,
                  DataForGlobalDate,
                ),
              );
            }
            setAddInedx([]);
          } else {
            setOpen({
              flag: true,
              message: "Enter atleast One Transaction Detail",
            });
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

  const rowSelection = {
    selectedRowKeys,
    onSelect: (e) => {
      var temp = listOfTransactionDetailsAlreadyExsist;
      var temp2 = ListOfDebitCardTransactionDetailsObjects;
      let flag1 = false;
      let totalAmmount = DCDisputes.TotalTransactionAmount;
      let row = [...select.selectedRowKeys];
      temp2.find(function (o2) {
        if (e.transactionID === o2.TransactionID) {
          flag1 = true;
        }
      });
      if (flag1) {
        setOpen({
          flag: true,
          message: "Transaction ID already exists",
        });
      } else {
        temp.map((data, index) => {
          if (data.key === e.key) {
            let flagForSingleSelect = false;
            let indexOfAlreadyExsist;
            select.selectedRowKeys.map((k, i) => {
              let n = JSON.stringify(index + 1);
              if (k === n) {
                indexOfAlreadyExsist = i;
                flagForSingleSelect = true;
              }
            });
            if (flagForSingleSelect) {
              row.splice(indexOfAlreadyExsist, 1);
            } else {
              let n = JSON.stringify(index + 1);
              row.push(n);
            }
            setSelect({
              ...select,
              selectedRowKeys: row,
            });
            if (data.preIdentifiedDataType === 0) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount =
                    data.disputeAmount + DCDisputes.TotalTransactionAmount;
                }
              }
            } else if (data.preIdentifiedDataType === 1) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount =
                    data.disputeAmount + DCDisputes.TotalTransactionAmount;
                }
              }
            } else {
              data.preIdentifiedDataType = 1;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount = totalAmmount - data.disputeAmount;
                }
              }
            }
          }
        });

        setListOfTransactionDetailsAlreadyExsist(temp);
        let stotal = parseFloat(totalAmmount).toFixed(2);
        setDCDisputes({
          ...DCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      }
    },
    onSelectAll: (selectedRows) => {
      if (selectedRows) {
        var temp = listOfTransactionDetailsAlreadyExsist;
        setSelect({
          ...select,
          selectedRowKeys: temp.map((row) => row.key),
        });
        let totalAmmount = DCDisputes.TotalTransactionAmount;
        var temp2 = ListOfDebitCardTransactionDetailsObjects;
        temp.map((data, index) => {
          var flagcheck = false;
          temp2.find(function (o2) {
            if (data.transactionID === o2.TransactionID) {
              flagcheck = true;
            }
          });
          if (flagcheck) {
            setOpen({
              flag: true,
              message: data.transactionID + " " + "ID already exists",
            });
          } else {
            if (data.preIdentifiedDataType === 0) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount = data.disputeAmount + totalAmmount;
                }
              }
            } else if (data.preIdentifiedDataType === 1) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount = data.disputeAmount + totalAmmount;
                }
              }
            } else if (data.preIdentifiedDataType === 2) {
            }
          }
        });
        setListOfTransactionDetailsAlreadyExsist(temp);
        let stotal = parseFloat(totalAmmount).toFixed(2);
        setDCDisputes({
          ...DCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      } else {
        setSelect({
          ...select,
          selectedRowKeys: [],
        });
        var temp = listOfTransactionDetailsAlreadyExsist;
        let totalAmmount = DCDisputes.TotalTransactionAmount;
        temp.map((data, index) => {
          if (data.preIdentifiedDataType === 0) {
            data.preIdentifiedDataType = 1;
          } else if (data.preIdentifiedDataType === 1) {
          } else if (data.preIdentifiedDataType === 2) {
            data.preIdentifiedDataType = 1;
            if (data.disputeAmount > 0) {
              if (totalAmmount === -99999999999999999999) {
                totalAmmount = totalAmmount;
              } else {
                totalAmmount = totalAmmount - data.disputeAmount;
              }
            }
          }
        });
        setListOfTransactionDetailsAlreadyExsist(temp);
        let stotal = parseFloat(totalAmmount).toFixed(2);
        setDCDisputes({
          ...DCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      }
    },
    // onChange: (val) => {
    //   setSelect({
    //     ...select,
    //     selectedRowKeys: val,
    //   });
    // },
    selectedRowKeys: listOfTransactionDetailsAlreadyExsist
      .filter((item) => item.preIdentifiedDataType === 2)
      .map((item) => item.key),
  };

  useEffect(() => {
    let row = select.selectedRowKeys;
    if (row) {
      let index = [];
      row.map((i, data) => {
        let ar = parseInt(i - 1);
        index.push(ar);
      });
      setAddInedx(index);
    }
  }, [select]);

  // Case Decision handler
  const CaseDecisionHandler = (e, value) => {
    setCaseDecisionValue(value);
    let valueCaseDecision = setupForms.CaseDecisionData;
    valueCaseDecision.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CDEID;
        setDCDisputes({
          ...DCDisputes,
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
      if (DCDisputes.FK_CDEID === data.pK_CDEID) {
        setCaseDecisionValue(data.name);
        setDCDisputes({
          ...DCDisputes,
          ["FK_CDEID"]: parseInt(data.pK_CDEID),
        });
      }
    });
  }, [setupForms.CaseDecisionData]);

  // Case Decision handler
  const transactionCurrencyCodeHandler = (e, value) => {
    setTransactionCurrencyCodeValue(value);
    let valuetransactionCurrencyCode = setupForms.TransactionCurrencyCodeData;
    valuetransactionCurrencyCode.map((data, index) => {
      if (value === data.description) {
        setTransactionCurrencyCodeValue(data.description);
        let name = data.description;
        setTrsDetails({
          ...trsDetails,
          ["TransactionCurrencyCode"]: name,
        });
      }
    });
  };

  //   For sour name select
  useEffect(() => {
    let valuetransactionCurrencyCode = setupForms.TransactionCurrencyCodeData;
    valuetransactionCurrencyCode.map((data, index) => {
      if (trsDetails.TransactionCurrencyCode === data.description) {
        setTransactionCurrencyCodeValue(data.description);
      }
    });
  }, [trsDetails]);

  // sourceofib type names selection for drop down
  useEffect(() => {
    let valuetransactionCurrencyCode = setupForms.TransactionCurrencyCodeData;
    setTransactionCurrencyCode(
      valuetransactionCurrencyCode.map((data, index) => {
        return data.description;
      }),
    );
  }, [setupForms.TransactionCurrencyCodeData]);

  return (
    <>
      {/* {findCustomerAccountDetailsFromMisys.isLoading && <Loader />} */}
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Paper padding="1">
          <Row gutter={16} className="u-margin-bottom-15px">
            <Col lg={18} md={18} sm={18} xs={24}>
              <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
                Customer Details
              </h1>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={6}
              xs={24}
              className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
            >
              <div className="Level-Section">
                <div>
                  <i className="icon-card icon-size-one"></i>
                  <div className="LevelSectionDetails">
                    <span className="LevelHeading">CNIC Number</span>
                    <br />
                    <span className="SubHeading">{cnic2}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Reference#"
                disable
                label={"Reference #"}
                fullWidth
                value={DCDisputes.RefrenceNumber}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer Name"
                disable
                value={FDCustomer.CustomerName}
                label={"Customer Name"}
                fullWidth
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <SelectBox
                label="Select City"
                option={city}
                value={cityValue}
                change={CityNameHandler}
                name="FK_CTID"
                required
              />
              {/* <TextField
                name="customercity"
                size="small"
                placeholder="Customer City"
                autoComplete="off"
                value={FDCustomer.CMCity}
                // disable
                label={"Customer City"}
                textLength={50}
                fullWidth
                change={customerDetailHandler}
                required
              /> */}
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <p className="PlaceholderCard">
                Card Number<span className="important">*</span>
              </p>
              <InputMask
                type="text"
                className="CreditCardInputField"
                name="CardNumber"
                placeholder="Card Number"
                value={
                  CardDetails.CardNumber === 0 ? null : CardDetails.CardNumber
                }
                mask="9999 XXXX XXXX 9999"
                onChange={CardDetailsHandler}
                textLength={16}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select Fraud Type"
                option={fraudType}
                name="FK_FTID"
                value={fraudTypeName}
                change={fraudNameHandler}
                required
              />
            </Col>
          </Row>
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <div className="TransactionHeading">
              System Fetched Transactions
            </div>
            <Table
              rowSelection={rowSelection}
              rows={listOfTransactionDetailsAlreadyExsist}
              columns={columnsss}
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
              Manual Transactions
            </h1>
          </Col>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <InputWithBtn
                onchange={TransactionIDchangehandler}
                isUpperCase={true}
                label="Transaction ID *"
                fullWidth
                helperText={TIDErrMsg}
                textFieldSize="small"
                autoComplete="off"
                applyClass="search"
                textLength={20}
                minLength={20}
                icon={<i className="icon-search icon-size-one"></i>}
                // required
                error={TransactionIDError}
                value={trsDetails.TransactionID}
                name="TransactionID"
                click={tranSearchHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="HBLAccountNumber"
                size="small"
                label={"HBL Account Number *"}
                autoComplete="off"
                value={trsDetails.HBLAccountNumber}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={14}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="OtherBankAccountNumber"
                size="small"
                autoComplete="off"
                value={trsDetails.OtherBankAccountNumber}
                label={"Other Bank Account Number *"}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={14}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="OtherBankBranchCode"
                size="small"
                label={"Branch Code *"}
                autoComplete="off"
                value={trsDetails.OtherBankBranchCode}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={4}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="OtherBankBranchName"
                size="small"
                label={"Branch Name *"}
                autoComplete="off"
                value={trsDetails.OtherBankBranchName}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={30}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <DatePicker
                name="TransactionDate"
                size="large"
                width="100%"
                DateRange
                placeholder={"Transaction Date *"}
                value={
                  trsDetails.TransactionDate
                    ? DateDisplayFormat(trsDetails.TransactionDate)
                    : null
                }
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TimePicker
                name="TransactionTime"
                size="large"
                width="100%"
                placeholder={"Transaction Time *"}
                value={trsDetails.TransactionTime}
                change={TimeHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="PotentialSave"
                value={
                  trsDetails.PotentialSave === null ||
                  trsDetails.PotentialSave === -99999999999999999999
                    ? null
                    : NumberFormater(trsDetails.PotentialSave)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Potential Save *"}
                fullWidth
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="TransactionAmount"
                value={
                  trsDetails.TransactionAmount === null ||
                  trsDetails.TransactionAmount === -99999999999999999999
                    ? null
                    : NumberFormater(trsDetails.TransactionAmount)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Transaction Amount *"}
                fullWidth
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="TransactionAmountOtherCurrency"
                value={
                  trsDetails.TransactionAmountOtherCurrency === null ||
                  trsDetails.TransactionAmountOtherCurrency ===
                    -99999999999999999999
                    ? null
                    : NumberFormater(trsDetails.TransactionAmountOtherCurrency)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Transaction Amount() *"}
                fullWidth
                change={TransactionDeatilHandlerChange}
                // disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="DisputeAmount"
                value={
                  trsDetails.DisputeAmount === null ||
                  trsDetails.DisputeAmount === -99999999999999999999
                    ? null
                    : NumberFormater(trsDetails.DisputeAmount)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                Label={"Exposure / Dispute Amount *"}
                fullWidth
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <SelectBox
                label="Select Transaction Currency Code"
                option={transactionCurrencyCode}
                value={transactionCurrencyCodeValue}
                change={transactionCurrencyCodeHandler}
                name="TransactionCurrencyCode"
              />
              {/* <TextField
                name="TransactionCurrencyCode"
                size="small"
                autoComplete="off"
                value={trsDetails.TransactionCurrencyCode}
                label={"Transaction Currency Code *"}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              /> */}
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="ApprovalCode"
                size="small"
                autoComplete="off"
                label={"Approval Code *"}
                value={trsDetails.ApprovalCode}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="Response"
                size="small"
                label={"Response *"}
                autoComplete="off"
                value={trsDetails.Response}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="POSMode"
                size="small"
                autoComplete="off"
                label={"Point Of Sale Mode *"}
                value={trsDetails.POSMode}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantName"
                size="small"
                autoComplete="off"
                label={"Merchant Name *"}
                value={trsDetails.MerchantName}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name="MerchantID"
                size="small"
                label={"Merchant ID *"}
                autoComplete="off"
                value={trsDetails.MerchantID}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantCity"
                size="small"
                label={"Merchant City *"}
                autoComplete="off"
                value={trsDetails.MerchantCity}
                fullWidth
                change={TransactionDeatilHandlerChange}
                textLength={30}
              />
            </Col>

            <Col lg={4} md={4} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>On Us / Off Us *</b>
              </label>
              <br />
              <Radio.Group
                name="ON_OFF_US"
                value={trsDetails.ON_OFF_US}
                onChange={TransactionDeatilHandlerChange}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name="CategoryCodeMCC"
                size="small"
                autoComplete="off"
                label={"Merchant Category Code *"}
                value={trsDetails.CategoryCodeMCC}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="ARN"
                size="small"
                autoComplete="off"
                label={"Approval Reference Number *"}
                change={TransactionDeatilHandlerChange}
                value={trsDetails.ARN}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <SelectBox
                label="Source *"
                option={sourceTypeName}
                value={SourceType}
                change={SourceNameHandler}
                name="SourceType"
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name="AcquirerID"
                size="small"
                label={"Acquirer ID *"}
                value={trsDetails.AcquirerID}
                autoComplete="off"
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name="AcquirerTerminalID"
                size="small"
                autoComplete="off"
                label={"Acquirer Terminal ID *"}
                textLength={6}
                value={
                  trsDetails.AcquirerTerminalID === ""
                    ? null
                    : trsDetails.AcquirerTerminalID
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="AcquirerInstitution"
                size="small"
                autoComplete="off"
                label={"Acquirer Institution *"}
                value={trsDetails.AcquirerInstitution}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={50}
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
            <div className="TransactionHeading">
              Manually Entered Transaction
            </div>
            <Table
              rows={ListOfDebitCardTransactionDetailsObjects}
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
                  DCDisputes.CaseReceivedDate
                    ? DateDisplayFormat(DCDisputes.CaseReceivedDate)
                    : null
                }
                change={DateHandler}
                // defaultValue="{moment()}"
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Received Channel"
                value={DCDisputes.CaseReceivedChannel}
                name="CaseReceivedChannel"
                autoComplete="off"
                change={DCDisputeHandler}
                type="text"
                size="small"
                textLength={20}
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
                value={DCDisputes.IsCaseResolved}
                onChange={DCDisputeHandler}
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
            <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
              <DatePicker
                size="large"
                width="100%"
                DateRange
                placeholder={"Case Resolved Date"}
                name="CaseResolvedDate"
                value={
                  DCDisputes.CaseResolvedDate
                    ? DateDisplayFormat(DCDisputes.CaseResolvedDate)
                    : null
                }
                change={DateHandler}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <Paper ml="1.5">
                <TextField
                  fullWidth
                  label="Total Dispute Amount"
                  value={
                    DCDisputes.TotalTransactionAmount === null ||
                    DCDisputes.TotalTransactionAmount === -99999999999999999999
                      ? null
                      : CommaFormter(DCDisputes.TotalTransactionAmount)
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
            <Col lg={4} md={4} sm={24} xs={24}>
              <label>
                <b>TC 40 Reporting</b>
              </label>
              <br />
              <Radio.Group
                name="IsTC40Reporting"
                value={DCDisputes.IsTC40Reporting}
                onChange={DCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                disable={isTC40ReportingDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"Select TC 40 Reporting Date"}
                name="TC40ReportingDate"
                value={
                  DCDisputes.TC40ReportingDate
                    ? DateDisplayFormat(DCDisputes.TC40ReportingDate)
                    : null
                }
                change={DateHandler}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>Safe Reporting</b>
              </label>
              <br />
              <Radio.Group
                name="IsSafeReportingDate"
                value={DCDisputes.IsSafeReportingDate}
                onChange={DCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <DatePicker
                disable={safeReportingDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"Select Safe Reporting Date"}
                name="SafeReportingDate"
                value={
                  DCDisputes.SafeReportingDate
                    ? DateDisplayFormat(DCDisputes.SafeReportingDate)
                    : null
                }
                change={DateHandler}
              />
            </Col>
          </Row>
        </Paper>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Col lg={18} md={18} sm={18} xs={24} className="u-margin-bottom-20px">
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Closure Details
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-bottom-20px">
              <label>
                <b>Point Of Compromise Identified</b>
              </label>
              <br />
              <Radio.Group
                name="IsPOC"
                value={DCDisputes.IsPOC}
                onChange={DCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                disable={pOC}
                fullWidth
                label="Point Of Compromise Identified"
                size="small"
                name="POCIdentified"
                value={DCDisputes.POCIdentified}
                change={DCDisputeHandler}
                required={DCDisputes.IsPOC}
                textLength={100}
              />
            </Col>
            <Col lg={10} md={10} sm={24} xs={24}>
              <SelectBox
                option={caseDecision}
                label="Select Case Decision"
                name="FK_CDEID"
                value={caseDecisionValue}
                change={CaseDecisionHandler}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="u-margin-bottom-20px">
              <FormattedInputs
                name="InFavourOfCM"
                value={
                  DCDisputes.InFavourOfCM === null ||
                  DCDisputes.InFavourOfCM === "" ||
                  DCDisputes.InFavourOfCM === -99999999999999999999 ||
                  DCDisputes.InFavourOfCM === "-99999999999999999999"
                    ? null
                    : NumberFormater(DCDisputes.InFavourOfCM)
                }
                size="small"
                autoComplete="off"
                Label={"In Favor of Customer"}
                fullWidth
                change={DCDisputeHandler}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <FormattedInputs
                name="CustomerLiability"
                value={
                  DCDisputes.CustomerLiability === null ||
                  DCDisputes.CustomerLiability === "" ||
                  DCDisputes.CustomerLiability === -99999999999999999999 ||
                  DCDisputes.CustomerLiability === "-99999999999999999999"
                    ? null
                    : NumberFormater(DCDisputes.CustomerLiability)
                }
                size="small"
                autoComplete="off"
                Label={"Customer Liability"}
                fullWidth
                change={DCDisputeHandler}
              />
            </Col>
            <Col lg={16} md={16} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                name="Remarks"
                autoComplete="off"
                value={DCDisputes.Remarks}
                change={DCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Event ID (SAS REF #)"
                size="small"
                name="EventIDSAS"
                autoComplete="off"
                value={DCDisputes.EventIDSAS}
                change={DCDisputeHandler}
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
                  DCDisputes.Aging === null || DCDisputes.Aging === -1
                    ? null
                    : DCDisputes.Aging
                }
                change={DCDisputeHandler}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Closed TAT"
                size="small"
                name="CaseClosedTAT"
                value={
                  DCDisputes.CaseClosedTAT === null ||
                  DCDisputes.CaseClosedTAT === -1
                    ? null
                    : DCDisputes.CaseClosedTAT
                }
                change={DCDisputeHandler}
                disable
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
                columns={col}
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
        {actions.refresh && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to refresh?
              </Title>
            </div>
            <GroupedButtons data={refreshButtonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default EditDebitCardDispute;
