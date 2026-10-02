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
  Notification,
  Table,
  Loader,
  FormattedInputs,
  Modal,
  GroupedButtons,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchTransactionDetailsByAccountNumber,
  GetIRISTransactionDetailsByTransactionIdBBK,
  SaveBBKDisputes,
  SaveAndApprovedBBKDisputes,
  SearchTransactionDetailsByAccountNumberInIRISBBK,
} from "../../../../store/actions/investigation-officer-actions";
import {
  GetAllFraudType,
  GetAllTransactionCurrencyCode,
  GetAllSource,
  GetAllCaseDecision,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import {
  UploadFileBBK,
  RESETALLSTATEFORREPORTS,
  DownloadUploadFile,
} from "../../../../store/actions/reports_actions";

import {
  DateDisplayFormat,
  DateSendingFormat,
  RemoveTimeDashes,
  NumberFormater,
  CommaFormter,
  TimeDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";

const AddNewCustomerDetailsBBK = () => {
  var cnic = localStorage.getItem("CNICNumber");
  var accountNumber = localStorage.getItem("accountNumber");
  var mobileNumber = localStorage.getItem("mobileNumber");
  if (mobileNumber === null || mobileNumber === undefined) {
    mobileNumber = "";
  }
  let roleForheader = localStorage.getItem("route");
  let DAtesSearch = JSON.parse(localStorage.getItem("State"));

  const { Title } = Typography;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const {
    investigationOfficer,
    setupForms,
    loading,
    reports,
    selectedRowKeys,
  } = state;

  //   for current date
  const date = moment().format("YYYY-MM-DD");

  const [BBKDispute, setBBKDispute] = useState({
    FK_FTID: 0,
    InitialBlockingDate: "",
    IsInitialBlock: false,
    CaseInitiatedDate: removeDashesFromDate(date),
    CustomerDisputeDate: removeDashesFromDate(date),
    CaseDetectionDate: removeDashesFromDate(date),
    CaseReceivedDate: removeDashesFromDate(date),
    CaseReceivedChannel: "",
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    FK_CDEID: 0,
    InFavorOfCustomer: -99999999999999999999,
    CustomerLiability: -99999999999999999999,
    Other: -99999999999999999999,
    Insurance: -99999999999999999999,
    Internally: -99999999999999999999,
    AnalystName: "",
    IsTrackingSheetAttached: false,
    Remarks: "",
    FromDateForPreIdentifiedData: DAtesSearch.FromDate,
    ToDateForPreIdentifiedData: DAtesSearch.ToDate,
  });

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
  const [Customer, setCustomer] = useState({
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

  const [saveValue, setsaveValue] = useState([]);

  const [caseDecisionValue, setCaseDecisionValue] = useState("");
  const [caseDecision, setCaseDecision] = useState("");

  // select index from table
  const [addInedx, setAddInedx] = useState([]);

  // set transtion id
  const [transtionid, setTranstionid] = useState("");
  var date2 = new Date();
  var month = date2.getMonth() + 1;
  var year = date2.getFullYear();
  // for transection data responce from api
  const [trsDetails, setTrsDetails] = useState({
    TransactionID: "",
    OtherBankAccountNumber: "",
    HBLAccountNumber: accountNumber,
    MobileNumber: "",
    TransactionDate: "",
    TransactionTime: "",
    TransactionPostingDate: "",
    Month: month.toString(),
    Year: year.toString(),
    PotentialSave: -99999999999999999999,
    TransactionAmount: -99999999999999999999,
    DisputeAmount: -99999999999999999999,
    TransactionCurrencyCode: "",
    Response: "",
    TransactionMode: "",
    TransactionCity: "",
    // ApprovalCode: "",
    FK_SID: 0,
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

  const [isInitialDate, setIsInitialDate] = useState(true);

  const [pOC, setPOC] = useState(true);

  // for notification
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [CardDetails, setCardDetails] = useState({
    CardNumber: "",
    FK_DisputeTableID: 0,
  });

  const [CustomerMobile, setCustomerMobile] = useState({
    MobileNumber: "",
  });

  const [Account, setAccount] = useState({
    AccountNumber: "",
    BranchCode: "GS1241",
    BranchName: "Nazimabad",
    RegionCode: "R322",
    RegionName: "North",
  });

  // for transection error
  const [TransactionIDError, setTransactionIDError] = useState(false);
  const [TIDErrMsg, setTIDErrMsg] = useState("");

  // list for transection details table
  const [TransactionDetails, setTransactionDetails] = useState([]);

  // source type names selection for drop down
  const [sourceTypeName, setSourceTypeName] = useState([]);
  const [fraudTypeName, setFraudTypeName] = useState([]);

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  //   for Enable dates through radio button

  // for modal of delet
  const [isModalVisible, setIsModalVisible] = useState(false);

  //   set fruad type name state
  const [fraudType, setFraudType] = useState("");
  const [SourceType, setSourceType] = useState("");

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  // for search date
  const [searchData, setSearchData] = useState({
    TransactionDate: "",
    CaseRevisedDate: "",
    CaseResolvedDate: "",
    SafeReportingDate: "",
    ReportingDate: "",
  });

  // List of Transaction Details already esist
  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);

  //   secarch date

  // uploadlist
  const [ListOfDocuments, setListOfDocuments] = useState([]);

  const BBKDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "InitialBlockingDate" &&
      name !== "CaseInitiatedDate" &&
      name !== "CustomerDisputeDate" &&
      name !== "CaseDetectionDate" &&
      name !== "CaseReceivedDate" &&
      name !== "CustomerLiability" &&
      name !== "Other" &&
      name !== "Insurance" &&
      name !== "Internally" &&
      name !== "AnalystName" &&
      name !== "IsInitialBlock" &&
      name !== "InFavorOfCustomer" &&
      name !== "IsTrackingSheetAttached" &&
      (value !== "" || value === false)
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: value.trimStart(),
      });
    } else if (
      name === "IsInitialBlock" ||
      // name === "InFavorOfCustomer" ||
      name === "IsTrackingSheetAttached"
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: value,
      });
    } else if (
      name === "AnalystName" &&
      (name !== "InitialBlockingDate" ||
        name !== "CaseInitiatedDate" ||
        name !== "CustomerDisputeDate" ||
        name !== "CaseDetectionDate" ||
        name !== "CaseReceivedDate") &&
      (value !== "" || value === false)
    ) {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setBBKDispute({
          ...BBKDispute,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (
      (name === "CustomerLiability" ||
        name === "Other" ||
        name === "Internally" ||
        name === "Insurance" ||
        name === "InFavorOfCustomer") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
      let newvalue = parseFloat(value);
      if (isNegative(newvalue)) {
        newvalue = newvalue * -1;
      }
      value = newvalue.toString();
      if (name === "CustomerLiability") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value).toFixed(2),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      if (name === "Other") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value).toFixed(2),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      if (name === "Internally") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      if (name === "Insurance") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      if (name === "InFavorOfCustomer") {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setBBKDispute({
              ...BBKDispute,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
          }
        }
      }
      setBBKDispute({
        ...BBKDispute,
        [name]: parseFloat(value),
      });
    } else if (
      (name === "CustomerLiability" ||
        name === "Other" ||
        name === "Internally" ||
        name === "Insurance" ||
        name === "InFavorOfCustomer") &&
      (value === "" || value === -99999999999999999999)
    ) {
      setBBKDispute({
        ...BBKDispute,
        [name]: parseFloat(-99999999999999999999),
      });
    } else if (name === "InitialBlockingDate" && value !== "") {
      setBBKDispute({
        ...BBKDispute,
        [name]: DateSendingFormat(value),
      });
    } else if (name === "CaseInitiatedDate" && value !== "") {
      setBBKDispute({
        ...BBKDispute,
        [name]: DateSendingFormat(value),
      });
    } else if (name === "CustomerDisputeDate" && value !== "") {
      setBBKDispute({
        ...BBKDispute,
        [name]: DateSendingFormat(value),
      });
    } else if (name === "CaseDetectionDate" && value !== "") {
      setBBKDispute({
        ...BBKDispute,
        [name]: DateSendingFormat(value),
      });
    } else if (name === "CaseReceivedDate" && value !== "") {
      setBBKDispute({
        ...BBKDispute,
        [name]: DateSendingFormat(value),
      });
    } else {
      if (
        name !== "CustomerLiability" ||
        name !== "Other" ||
        name !== "Internally" ||
        name !== "Insurance" ||
        name !== "InFavorOfCustomer"
      ) {
        setBBKDispute({
          ...BBKDispute,
          [name]: "",
        });
      }
    }
    if (name === "IsInitialBlock") {
      if (value) {
        setIsInitialDate(false);
      } else {
        setIsInitialDate(true);
      }
    }
  };

  useEffect(() => {
    let Data = { CNIC: cnic, AccountNumber: accountNumber };

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (accountNumber !== null) {
        let UserDetails = JSON.parse(localStorage.getItem("State"));
        let Data1 = {
          AccountNumber: accountNumber,
          From: UserDetails.FromDate,
          To: UserDetails.ToDate,
        };
        dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(Data1));
      } else {
        dispatch(SearchTransactionDetailsByAccountNumber(Data));
      }
    }
    dispatch(GetAllFraudType());
    dispatch(GetAllSource());
    dispatch(GetAllTransactionCurrencyCode());
    dispatch(GetAllCaseDecision());
    dispatch(GetAllCity());
  }, []);

  //   used for already exsit data of customer details for add

  useEffect(() => {
    let customerDetail =
      investigationOfficer.GetTransactionDetailsByAccountNumberBBKexsitData
        .customerDetails;
    let transactionDetail =
      investigationOfficer.GetTransactionDetailsByAccountNumberBBKexsitData
        .bbKonnectTransactionDetails;
    if (customerDetail !== undefined && customerDetail !== null) {
      setCardDetails({
        ...CardDetails,
        ["CardNumber"]: "",
      });

      setCustomerDetails({
        accountNumber: customerDetail.accountNumber,
        cardNumber: customerDetail.cardNumber,
        cmCity: customerDetail.cmCity,
        cnicNumber: customerDetail.cnicNumber,
        customerName: customerDetail.customerName,
        iparty_ID: customerDetail.iparty_ID,
        pK_CDID: customerDetail.pK_CDID,
        fK_FTID: customerDetail.fK_FTID,
      });
      setCustomerMobile({
        MobileNumber: customerDetail.mobileNumber,
      });
      if (
        customerDetail.fK_FTID !== undefined &&
        customerDetail.fK_FTID !== null &&
        customerDetail.fK_FTID !== ""
      ) {
        let nameFraud = setupForms.FraudTypeData;
        if (nameFraud !== undefined && nameFraud !== null && nameFraud !== "") {
          nameFraud.map((data, index) => {
            if (customerDetail.fK_FTID === data.pK_FTID) {
              let value = data.name;
              setFraudTypeName(value);
            }
          });
        }
      }
      setAccount({
        ...Account,
        ["AccountNumber"]: customerDetail.accountNumber,
      });
      setCustomer({
        CNICNumber: customerDetail.cnicNumber,
        CustomerName: customerDetail.customerName,
        FK_CTID: customerDetail.fK_CTID,
        // CMCity: customerDetail.cmCity,
      });
      let nameCity = setupForms.CityData;
      nameCity.map((data, index) => {
        if (customerDetail.fK_CTID === data.pK_CTID) {
          let value = data.name;
          setCityValue(value);
        }
      });
    }
    if (transactionDetail !== undefined && transactionDetail !== null) {
      let GetTransactionDetailsByCNICArray = transactionDetail.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        },
      );
      setListOfTransactionDetailsAlreadyExsist(
        GetTransactionDetailsByCNICArray,
      );
    }
  }, [investigationOfficer.GetTransactionDetailsByAccountNumberBBKexsitData]);

  //   For fruad type set
  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (customerDetails.fK_FTID === data.pK_FTID) {
        setFraudTypeName(data.name);
        setBBKDispute({
          ...BBKDispute,
          ["FK_FTID"]: parseInt(data.pK_FTID),
        });
      }
    });
  }, [setupForms.FraudTypeData]);

  // // source type names selection for drop down
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    setSourceTypeName(
      nameSource.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.SourceData]);

  // Selected Dropdown value
  const fraudNameHandler = (e, value) => {
    setFraudTypeName(value);
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FTID;
        setBBKDispute({
          ...BBKDispute,
          ["FK_FTID"]: parseInt(id),
        });
      }
    });
  };

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

  //   For sour name select
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    nameSource.map((data, index) => {
      if (trsDetails.FK_SID === data.pK_SID) {
        setSourceType(data.name);
      }
    });
  }, [trsDetails]);

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
      title: "HBL Account Number",
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
    // {
    //   title: "Month",
    //   dataIndex: "month",
    //   key: "month",
    //   align: "center",
    //   width: "220px",
    // },
    // {
    //   title: "Year",
    //   dataIndex: "year",
    //   key: "year",
    //   align: "center",
    //   width: "220px",
    // },
    {
      title: "Potential Save",
      dataIndex: "potentialSave",
      key: "potentialSave",
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
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
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
    // {
    //   title: "Approval Code",
    //   dataIndex: "approvalCode",
    //   key: "approvalCode",
    //   align: "center",
    //   width: "220px",
    // },
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

  // for delet transection details
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
      refresh: false,
    });
  };

  // update transection data
  const update = (e, record) => {
    var objIndex = TransactionDetails.findIndex(
      (obj) => obj.TransactionID === record.TransactionID,
    );
    // trsDetails, setTrsDetails
    setRecordIndex(objIndex);
    setRecords(record);
    setTrsDetails({
      ...trsDetails,
      TransactionID: record.TransactionID,
      OtherBankAccountNumber: record.OtherBankAccountNumber,
      HBLAccountNumber: record.HBLAccountNumber,
      MobileNumber: record.MobileNumber,
      TransactionDate: record.TransactionDate,
      TransactionTime: record.TransactionTime,
      TransactionPostingDate: record.TransactionPostingDate,
      Month: record.Month,
      Year: record.Year,
      PotentialSave: record.PotentialSave,
      TransactionAmount: record.TransactionAmount,
      DisputeAmount: record.DisputeAmount,
      TransactionCurrencyCode: record.TransactionCurrencyCode,
      Response: record.Response,
      TransactionMode: record.TransactionMode,
      // ApprovalCode: record.ApprovalCode,
      TransactionCity: record.TransactionCity,
      FK_SID: record.FK_SID,
      PreIdentifiedDataType: record.PreIdentifiedDataType,
    });
    setAction({
      ...actions,
      update: true,
      delete: false,
      add: false,
      refresh: false,
    });
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
      title: "Other Bank Account Number",
      dataIndex: "OtherBankAccountNumber",
      key: "OtherBankAccountNumber",
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
      title: "Mobile Number",
      dataIndex: "MobileNumber",
      key: "MobileNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      key: "TransactionDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Transaction Time",
      dataIndex: "TransactionTime",
      key: "TransactionTime",
      align: "center",
      width: "220px",
      render: (text) => TimeDisplayFormat(text),
    },
    {
      title: "Transaction Posting Date",
      dataIndex: "TransactionPostingDate",
      key: "TransactionPostingDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    // {
    //   title: "Month",
    //   dataIndex: "Month",
    //   key: "Month",
    //   align: "center",
    //   width: "220px",
    // },
    // {
    //   title: "Year",
    //   dataIndex: "Year",
    //   key: "Year",
    //   align: "center",
    //   width: "220px",
    // },
    {
      title: "Potential Save",
      dataIndex: "PotentialSave",
      key: "PotentialSave",
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
      title: "Exposure / Dispute Amount",
      dataIndex: "DisputeAmount",
      key: "DisputeAmount",
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
      title: "Transaction Currency Code",
      dataIndex: "TransactionCurrencyCode",
      key: "TransactionCurrencyCode",
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
      title: "Transaction Mode",
      dataIndex: "TransactionMode",
      key: "TransactionMode",
      align: "center",
      width: "220px",
    },
    // {
    //   title: "Approval Code",
    //   dataIndex: "ApprovalCode",
    //   key: "ApprovalCode",
    //   align: "center",
    //   width: "220px",
    // },
    {
      title: "Transaction City",
      dataIndex: "TransactionCity",
      key: "TransactionCity",
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

  // For Row slection
  const rowSelection = {
    selectedRowKeys,
    onSelect: (e) => {
      var temp = listOfTransactionDetailsAlreadyExsist;
      var temp2 = TransactionDetails;
      let flag1 = false;
      let row = [...select.selectedRowKeys];
      let totalAmmount = BBKDispute.TotalTransactionAmount;
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
                    data.disputeAmount + BBKDispute.TotalTransactionAmount;
                }
              }
            } else if (data.preIdentifiedDataType === 1) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount =
                    data.disputeAmount + BBKDispute.TotalTransactionAmount;
                }
              }
            } else {
              data.preIdentifiedDataType = 1;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount = totalAmmount - data.disputeAmount;
                  // data.disputeAmount + BBKDispute.TotalTransactionAmount;
                }
              }
            }
          }
        });

        setListOfTransactionDetailsAlreadyExsist(temp);
        let stotal = parseFloat(totalAmmount).toFixed(2);
        setBBKDispute({
          ...BBKDispute,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      }
    },
    onSelectAll: (selectedRows, e) => {
      if (selectedRows) {
        var temp = listOfTransactionDetailsAlreadyExsist;
        setSelect({
          ...select,
          selectedRowKeys: temp.map((row) => row.key),
        });
        let totalAmmount = BBKDispute.TotalTransactionAmount;
        var temp2 = TransactionDetails;
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
        setBBKDispute({
          ...BBKDispute,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      } else {
        setSelect({
          ...select,
          selectedRowKeys: [],
        });
        var temp = listOfTransactionDetailsAlreadyExsist;
        let totalAmmount = BBKDispute.TotalTransactionAmount;
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
        setBBKDispute({
          ...BBKDispute,
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

  //CMCity Handler
  const customerDetailHandler = (e, val) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "customercity" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setCustomer({
          ...Customer,
          ["CMCity"]: valueCheck.trimStart(),
        });
      }
    } else {
      setCustomer({
        ...Customer,
        ["CMCity"]: "",
      });
    }
  };

  const [transactionCurrencyCodeValue, setTransactionCurrencyCodeValue] =
    useState("");
  const [transactionCurrencyCode, setTransactionCurrencyCode] = useState("");

  // Transaction Currency Code2 handler
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
          GetIRISTransactionDetailsByTransactionIdBBK(
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
        GetIRISTransactionDetailsByTransactionIdBBK(
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

  const TransactionDeatilHandlerChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (
      name !== "OtherBankAccountNumber" &&
      // name !=="HBLAccountNumber" &&
      name !== "MobileNumber" &&
      name !== "TransactionDate" &&
      name !== "TransactionPostingDate" &&
      name !== "Month" &&
      name !== "Year" &&
      name !== "PotentialSave" &&
      name !== "TransactionAmount" &&
      name !== "DisputeAmount" &&
      name !== "TransactionCurrencyCode" &&
      name !== "TransactionCity" &&
      // name !=="ApprovalCode" &&
      (value !== "" || value === false)
    ) {
      setTrsDetails({
        ...trsDetails,
        [name]: value.trimStart(),
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
    } else if (name === "MobileNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "MobileNumber" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "Month" && value !== "") {
      var valueCheck = value.replace(/^(?!(1[012]|[1-9])$).*$/, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "Month" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "Year" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "Year" && value === "") {
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
    } else if (
      (name === "PotentialSave" ||
        name === "TransactionAmount" ||
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
      setTrsDetails({
        ...trsDetails,
        [name]: parseFloat(value),
      });
    } else if (
      (name === "PotentialSave" ||
        name === "TransactionAmount" ||
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
    } else if (name === "TransactionPostingDate" && value !== "") {
      setTrsDetails({
        ...trsDetails,
        [name]: DateSendingFormat(value),
      });
    } else {
      if (
        name !== "PotentialSave" ||
        name !== "TransactionAmount" ||
        name !== "DisputeAmount"
      ) {
        setTrsDetails({
          ...trsDetails,
          [name]: "",
        });
      }
    }
    if (name === "TransactionCity" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck.trimStart(),
        });
      }
    } else {
      if (name === "TransactionCity") {
        setTrsDetails({
          ...trsDetails,
          [name]: "",
        });
      }
    }
  };

  const checkData = (flag, flag2) => {
    let total = BBKDispute.TotalTransactionAmount;
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
        trsDetails.OtherBankAccountNumber !== "" &&
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.MobileNumber !== "" &&
        trsDetails.TransactionDate !== "" &&
        trsDetails.TransactionTime !== "" &&
        trsDetails.TransactionPostingDate !== "" &&
        trsDetails.PotentialSave !== -99999999999999999999 &&
        trsDetails.PotentialSave !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.TransactionCurrencyCode !== "" &&
        trsDetails.Response !== "" &&
        trsDetails.TransactionMode !== "" &&
        trsDetails.TransactionCity !== "" &&
        trsDetails.FK_SID !== 0
      ) {
        setTransactionDetails([...TransactionDetails, trsDetails]);
        let stotal = parseFloat(total).toFixed(2);
        setBBKDispute({
          ...BBKDispute,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setTrsDetails({
          TransactionID: "",
          OtherBankAccountNumber: "",
          HBLAccountNumber: accountNumber,
          MobileNumber: "",
          TransactionDate: "",
          TransactionTIme: "",
          TransactionPostingDate: "",
          Month: month.toString(),
          Year: year.toString(),
          PotentialSave: -99999999999999999999,
          TransactionAmount: -99999999999999999999,
          DisputeAmount: -99999999999999999999,
          TransactionCurrencyCode: "",
          Response: "",
          TransactionMode: "",
          // ApprovalCode: "",
          TransactionCity: "",
          FK_SID: 0,
          PreIdentifiedDataType: 3,
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
        let total = BBKDispute.TotalTransactionAmount;
        if (total === -99999999999999999999) {
          total = trsDetails.DisputeAmount;
        } else {
          total = total + trsDetails.DisputeAmount;
        }
        let flag = true;
        let flag2 = true;
        if (
          TransactionDetails.length > 0 &&
          listOfTransactionDetailsAlreadyExsist.length > 0
        ) {
          TransactionDetails.map((data, index) => {
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
        } else if (TransactionDetails.length > 0) {
          TransactionDetails.map((data, index) => {
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
            trsDetails.OtherBankAccountNumber !== "" &&
            trsDetails.HBLAccountNumber !== "" &&
            trsDetails.MobileNumber !== "" &&
            trsDetails.TransactionDate !== "" &&
            trsDetails.TransactionTime !== "" &&
            trsDetails.TransactionPostingDate !== "" &&
            trsDetails.PotentialSave !== -99999999999999999999 &&
            trsDetails.PotentialSave !== null &&
            trsDetails.TransactionAmount !== -99999999999999999999 &&
            trsDetails.TransactionAmount !== null &&
            trsDetails.DisputeAmount !== -99999999999999999999 &&
            trsDetails.DisputeAmount !== null &&
            trsDetails.TransactionCurrencyCode !== "" &&
            trsDetails.Response !== "" &&
            trsDetails.TransactionMode !== "" &&
            trsDetails.TransactionCity !== "" &&
            trsDetails.FK_SID !== 0
          ) {
            let stotal = parseFloat(total).toFixed(2);
            setBBKDispute({
              ...BBKDispute,
              ["TotalTransactionAmount"]: parseFloat(stotal),
            });
            setTransactionDetails([...TransactionDetails, trsDetails]);
            setTrsDetails({
              TransactionID: "",
              OtherBankAccountNumber: "",
              HBLAccountNumber: accountNumber,
              MobileNumber: "",
              TransactionDate: "",
              TransactionTime: "",
              TransactionPostingDate: "",
              Month: month.toString(),
              Year: year.toString(),
              PotentialSave: -99999999999999999999,
              TransactionAmount: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              TransactionCurrencyCode: "",
              Response: "",
              TransactionMode: "",
              TransactionCity: "",
              FK_SID: 0,
              PreIdentifiedDataType: 3,
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
      let total = BBKDispute.TotalTransactionAmount;
      if (total === -99999999999999999999) {
        total = trsDetails.DisputeAmount;
      } else {
        total = total + trsDetails.DisputeAmount;
      }
      let flag = true;
      let flag2 = true;
      if (
        TransactionDetails.length > 0 &&
        listOfTransactionDetailsAlreadyExsist.length > 0
      ) {
        TransactionDetails.map((data, index) => {
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
      } else if (TransactionDetails.length > 0) {
        TransactionDetails.map((data, index) => {
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
          trsDetails.OtherBankAccountNumber !== "" &&
          trsDetails.HBLAccountNumber !== "" &&
          trsDetails.MobileNumber !== "" &&
          trsDetails.TransactionDate !== "" &&
          trsDetails.TransactionTime !== "" &&
          trsDetails.TransactionPostingDate !== "" &&
          trsDetails.PotentialSave !== -99999999999999999999 &&
          trsDetails.PotentialSave !== null &&
          trsDetails.TransactionAmount !== -99999999999999999999 &&
          trsDetails.TransactionAmount !== null &&
          trsDetails.DisputeAmount !== -99999999999999999999 &&
          trsDetails.DisputeAmount !== null &&
          trsDetails.TransactionCurrencyCode !== "" &&
          trsDetails.Response !== "" &&
          trsDetails.TransactionMode !== "" &&
          trsDetails.TransactionCity !== "" &&
          trsDetails.FK_SID !== 0
        ) {
          let stotal = parseFloat(total).toFixed(2);
          setBBKDispute({
            ...BBKDispute,
            ["TotalTransactionAmount"]: parseFloat(stotal),
          });
          setTransactionDetails([...TransactionDetails, trsDetails]);
          setTrsDetails({
            TransactionID: "",
            OtherBankAccountNumber: "",
            HBLAccountNumber: accountNumber,
            MobileNumber: "",
            TransactionDate: "",
            TransactionTime: "",
            TransactionPostingDate: "",
            Month: month.toString(),
            Year: year.toString(),
            PotentialSave: -99999999999999999999,
            TransactionAmount: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            TransactionCurrencyCode: "",
            Response: "",
            TransactionMode: "",
            TransactionCity: "",
            FK_SID: 0,
            PreIdentifiedDataType: 3,
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

  //Update Data in Grid
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
        if (TransactionDetails) {
          await TransactionDetails.map((data, index) => {
            // recordIndex
            if (data.TransactionID === trsDetails.TransactionID) {
              if (recordIndex !== index) {
                if (
                  trsDetails.TransactionID !== "" &&
                  trsDetails.OtherBankAccountNumber !== "" &&
                  trsDetails.HBLAccountNumber !== "" &&
                  trsDetails.MobileNumber !== "" &&
                  trsDetails.TransactionDate !== "" &&
                  trsDetails.TransactionTime !== "" &&
                  trsDetails.TransactionPostingDate !== "" &&
                  trsDetails.PotentialSave !== -99999999999999999999 &&
                  trsDetails.PotentialSave !== null &&
                  trsDetails.TransactionAmount !== -99999999999999999999 &&
                  trsDetails.TransactionAmount !== null &&
                  trsDetails.DisputeAmount !== -99999999999999999999 &&
                  trsDetails.DisputeAmount !== null &&
                  trsDetails.TransactionCurrencyCode !== "" &&
                  trsDetails.Response !== "" &&
                  trsDetails.TransactionMode !== "" &&
                  trsDetails.TransactionCity !== "" &&
                  trsDetails.FK_SID !== 0
                ) {
                  flag1 = false;
                }
              }
            } else {
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
      if (TransactionDetails) {
        await TransactionDetails.map((data, index) => {
          // recordIndex
          if (data.TransactionID === trsDetails.TransactionID) {
            if (recordIndex !== index) {
              if (
                trsDetails.TransactionID !== "" &&
                trsDetails.OtherBankAccountNumber !== "" &&
                trsDetails.HBLAccountNumber !== "" &&
                trsDetails.MobileNumber !== "" &&
                trsDetails.TransactionDate !== "" &&
                trsDetails.TransactionTime !== "" &&
                trsDetails.TransactionPostingDate !== "" &&
                trsDetails.PotentialSave !== -99999999999999999999 &&
                trsDetails.PotentialSave !== null &&
                trsDetails.TransactionAmount !== -99999999999999999999 &&
                trsDetails.TransactionAmount !== null &&
                trsDetails.DisputeAmount !== -99999999999999999999 &&
                trsDetails.DisputeAmount !== null &&
                trsDetails.TransactionCurrencyCode !== "" &&
                trsDetails.Response !== "" &&
                trsDetails.TransactionMode !== "" &&
                trsDetails.TransactionCity !== "" &&
                trsDetails.FK_SID !== 0
              ) {
                flag1 = false;
              }
            }
          } else {
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
        trsDetails.OtherBankAccountNumber !== "" &&
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.MobileNumber !== "" &&
        trsDetails.TransactionDate !== "" &&
        trsDetails.TransactionTime !== "" &&
        trsDetails.TransactionPostingDate !== "" &&
        trsDetails.PotentialSave !== -99999999999999999999 &&
        trsDetails.PotentialSave !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.TransactionCurrencyCode !== "" &&
        trsDetails.Response !== "" &&
        trsDetails.TransactionMode !== "" &&
        trsDetails.TransactionCity !== "" &&
        trsDetails.FK_SID !== 0
      ) {
        showModal();
        setAction({
          ...actions,
          update: true,
          add: false,
          delete: false,
          refresh: false,
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

  const updateRecord = async (e, record) => {
    let total = BBKDispute.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = records.DisputeAmount;
    } else {
      total = total - records.DisputeAmount;
    }
    let newTotal = total + trsDetails.DisputeAmount;
    let stotal = parseFloat(newTotal).toFixed(2);
    setBBKDispute({
      ...BBKDispute,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    TransactionDetails[recordIndex] = trsDetails;
    await setTransactionDetails([...TransactionDetails]);
    setTrsDetails({
      TransactionID: "",
      OtherBankAccountNumber: "",
      HBLAccountNumber: accountNumber,
      MobileNumber: "",
      TransactionDate: "",
      TransactionTime: "",
      TransactionPostingDate: "",
      Month: month.toString(),
      Year: year.toString(),
      PotentialSave: -99999999999999999999,
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      TransactionCurrencyCode: "",
      Response: "",
      TransactionMode: "",
      TransactionCity: "",
      FK_SID: 0,
      PreIdentifiedDataType: 3,
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

  //Delete Transaction From Grid
  const handleDelete = (e, record) => {
    let testVariable = TransactionDetails.indexOf(records);
    TransactionDetails.splice(testVariable, 1);
    let total = BBKDispute.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    let TotalTransactionAmount =
      BBKDispute.TotalTransactionAmount - records.DisputeAmount;
    let stotal = parseFloat(TotalTransactionAmount).toFixed(2);
    setBBKDispute({
      ...BBKDispute,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    setTransactionDetails([...TransactionDetails]);
    setIsModalVisible(false);
    setRecords([]);
  };

  const handleCancel = () => {
    setTrsDetails({
      ...TransactionDetails,
      TransactionID: "",
      OtherBankAccountNumber: "",
      HBLAccountNumber: accountNumber,
      MobileNumber: "",
      TransactionDate: "",
      TransactionTime: "",
      TransactionPostingDate: "",
      Month: month.toString(),
      Year: year.toString(),
      PotentialSave: -99999999999999999999,
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      TransactionCurrencyCode: "",
      Response: "",
      TransactionMode: "",
      TransactionCity: "",
      FK_SID: 0,
      PreIdentifiedDataType: 3,
    });
    setIsModalVisible(false);
    setAction({ delete: false, update: false, add: false });
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
      if (ListOfDocuments.length > 0) {
        ListOfDocuments.map((filename, index) => {
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
          dispatch(UploadFileBBK(uploadedFile));
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
          dispatch(UploadFileBBK(uploadedFile));
        }
      }
    } else {
      setOpen({
        flag: true,
        message: "This File Format Cannot be Uploaded",
      });
    }
  };

  // upload doc list
  useEffect(() => {
    let newData = reports.uploadDocumentsList;
    if (newData !== undefined && newData !== null && newData.length !== 0) {
      let Data = {
        OriginalFileName: newData.originalFileName,
        DisplayFileName: newData.displayFileName,
      };
      setListOfDocuments([...ListOfDocuments, Data]);
      dispatch(RESETALLSTATEFORREPORTS());
    }
  }, [reports.uploadDocumentsList]);

  useEffect(() => {
    let currentDate = BBKDispute.InitialBlockingDate;
    if (BBKDispute.IsInitialBlock === true && currentDate === "") {
      setBBKDispute({
        ...BBKDispute,
        ["InitialBlockingDate"]: removeDashesFromDate(date),
      });
    }
    if (BBKDispute.IsInitialBlock === false) {
      setBBKDispute({
        ...BBKDispute,
        ["InitialBlockingDate"]: "",
      });
    }
  }, [BBKDispute.IsInitialBlock]);

  // colums of doc list table
  const col = [
    {
      title: "File Name",
      name: "DisplayFileName",
      dataIndex: "DisplayFileName",
      key: "DisplayFileName",
      align: "center",
      width: "2%",
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

  // Delete Upload Document
  const deleteUploadDocument = (record) => {
    const filteredItems = ListOfDocuments.filter((item) => item !== record);
    setListOfDocuments(filteredItems);
  };
  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 5,
    };
    dispatch(DownloadUploadFile(data));
  };

  // Case Decision handler
  const CaseDecisionHandler = (e, value) => {
    setCaseDecisionValue(value);
    let valueCaseDecision = setupForms.CaseDecisionData;
    valueCaseDecision.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CDEID;
        setBBKDispute({
          ...BBKDispute,
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

  //  FOR SAVE
  const goToSaveHandler = async (e) => {
    e.preventDefault();
    if (saveValue === 1) {
      if (TransactionDetails.length > 0 || addInedx.length > 0) {
        if (BBKDispute.CaseInitiatedDate === "") {
          setOpen({
            flag: true,
            message: "Enter Case Initiated Date",
          });
        } else if (BBKDispute.CustomerDisputeDate === "") {
          setOpen({
            flag: true,
            message: "Enter Customer Dispute Date",
          });
        } else if (BBKDispute.CaseDetectionDate === "") {
          setOpen({
            flag: true,
            message: "Enter Case Detection Date",
          });
        } else if (
          BBKDispute.InitialBlockingDate === "" &&
          BBKDispute.IsInitialBlock === true
        ) {
          setOpen({
            flag: true,
            message: "Enter Initial Blocking Date",
          });
        } else {
          if (addInedx.length > 0) {
            let newdata = TransactionDetails;
            await addInedx.map((data, ind) => {
              let ar = listOfTransactionDetailsAlreadyExsist[data];
              newdata.push({
                TransactionID: ar.transactionID,
                OtherBankAccountNumber: ar.otherBankAccountNumber,
                HBLAccountNumber: ar.hblAccountNumber,
                MobileNumber: ar.mobileNumber,
                TransactionDate: ar.transactionDate,
                TransactionTime: ar.transactionTime,
                TransactionPostingDate: ar.transactionPostingDate,
                Month: ar.month,
                Year: ar.year,
                PotentialSave: ar.potentialSave,
                TransactionAmount: ar.transactionAmount,
                DisputeAmount: ar.disputeAmount,
                TransactionCurrencyCode: ar.transactionCurrencyCode,
                Response: ar.response,
                TransactionMode: ar.transactionMode,
                TransactionCity: ar.transactionCity,
                FK_SID: ar.fK_SID,
                PreIdentifiedDataType: ar.preIdentifiedDataType,
              });
            });
            let DisputeDetails = {
              FK_FTID: BBKDispute.FK_FTID,
              InitialBlockingDate: BBKDispute.InitialBlockingDate,
              IsInitialBlock: BBKDispute.IsInitialBlock,
              CaseInitiatedDate: BBKDispute.CaseInitiatedDate,
              CustomerDisputeDate: BBKDispute.CustomerDisputeDate,
              CaseDetectionDate: BBKDispute.CaseDetectionDate,
              CaseReceivedDate: BBKDispute.CaseReceivedDate,
              CaseReceivedChannel: BBKDispute.CaseReceivedChannel,
              IsCaseResolved: BBKDispute.IsCaseResolved,
              TotalTransactionAmount: BBKDispute.TotalTransactionAmount,
              FK_CDEID: BBKDispute.FK_CDEID,
              InFavorOfCustomer: BBKDispute.InFavorOfCustomer,
              CustomerLiability: BBKDispute.CustomerLiability,
              Other: BBKDispute.Other,
              Insurance: BBKDispute.Insurance,
              Internally: BBKDispute.Internally,
              AnalystName: BBKDispute.AnalystName,
              IsTrackingSheetAttached: BBKDispute.IsTrackingSheetAttached,
              Remarks: BBKDispute.Remarks,
              FromDateForPreIdentifiedData: DAtesSearch.FromDate,
              ToDateForPreIdentifiedData: DAtesSearch.ToDate,
            };
            await setBBKDispute(DisputeDetails);
            await setTransactionDetails(newdata);
            let data = {
              Customer,
              CustomerMobile,
              Account,
              CardDetails,
              DisputeDetails,
              TransactionDetails,
              ListOfDocuments,
            };
            let searchData = {
              ReferenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNICNumber: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionID: "",
              TotalTransactionAmount: -99999999999999999999,
              fk_csid: 1,
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            await dispatch(SaveBBKDisputes(data, searchData, searchDataofdate));
            let newdata2 = [...TransactionDetails];
            let newIdex = [];
            newdata2.map((s, i) => {
              listOfTransactionDetailsAlreadyExsist.map((ss, ii) => {
                if (s.TransactionID === ss.transactionID) {
                  newIdex.push(i);
                }
              });
            });
            let arr = newdata2.filter(function (value, index) {
              return newIdex.indexOf(index) == -1;
            });
            await setTransactionDetails(arr);
            // setAddInedx([]);
          } else {
            let ar = [...listOfTransactionDetailsAlreadyExsist];
            let ar2 = [...TransactionDetails];
            TransactionDetails.map((newV, index) => {
              ar.map((newV2, index2) => {
                if (newV.transactionID === newV2.TransactionID) {
                  TransactionDetails.splice(index, 1);
                }
              });
            });
            if (ar2.length > 0) {
              let DisputeDetails = BBKDispute;
              let data = {
                Customer,
                CustomerMobile,
                Account,
                CardDetails,
                DisputeDetails,
                TransactionDetails,
                ListOfDocuments,
              };
              let searchData = {
                ReferenceNumber: "",
                CustomerName: "",
                FK_CTID: 0,
                CNICNumber: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionID: "",
                TotalTransactionAmount: -99999999999999999999,
                fk_csid: 1,
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              dispatch(SaveBBKDisputes(data, searchData, searchDataofdate));
              setAddInedx([]);
            } else {
              setOpen({
                flag: true,
                message: "Enter atleast One Transaction Detail",
              });
            }
          }
        }
      } else {
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    } else if (saveValue === 2) {
      if (TransactionDetails.length > 0 || addInedx.length > 0) {
        if (BBKDispute.CaseInitiatedDate === "") {
          setOpen({
            flag: true,
            message: "Enter Case Initiated Date",
          });
        } else if (BBKDispute.CustomerDisputeDate === "") {
          setOpen({
            flag: true,
            message: "Enter Customer Dispute Date",
          });
        } else if (BBKDispute.CaseDetectionDate === "") {
          setOpen({
            flag: true,
            message: "Enter Case Detection Date",
          });
        } else if (
          BBKDispute.InitialBlockingDate === "" &&
          BBKDispute.IsInitialBlock === true
        ) {
          setOpen({
            flag: true,
            message: "Enter Initial Blocking Date",
          });
        } else {
          if (addInedx.length > 0) {
            let newdata = TransactionDetails;
            await addInedx.map((data, ind) => {
              let ar = listOfTransactionDetailsAlreadyExsist[data];
              newdata.push({
                TransactionID: ar.transactionID,
                OtherBankAccountNumber: ar.otherBankAccountNumber,
                HBLAccountNumber: ar.hblAccountNumber,
                MobileNumber: ar.mobileNumber,
                TransactionDate: ar.transactionDate,
                TransactionTime: ar.transactionTime,
                TransactionPostingDate: ar.transactionPostingDate,
                Month: ar.month,
                Year: ar.year,
                PotentialSave: ar.potentialSave,
                TransactionAmount: ar.transactionAmount,
                DisputeAmount: ar.disputeAmount,
                TransactionCurrencyCode: ar.transactionCurrencyCode,
                Response: ar.response,
                TransactionMode: ar.transactionMode,
                TransactionCity: ar.transactionCity,
                FK_SID: ar.fK_SID,
                PreIdentifiedDataType: ar.preIdentifiedDataType,
              });
            });
            let DisputeDetails = {
              FK_FTID: BBKDispute.FK_FTID,
              InitialBlockingDate: BBKDispute.InitialBlockingDate,
              IsInitialBlock: BBKDispute.IsInitialBlock,
              CaseInitiatedDate: BBKDispute.CaseInitiatedDate,
              CustomerDisputeDate: BBKDispute.CustomerDisputeDate,
              CaseDetectionDate: BBKDispute.CaseDetectionDate,
              CaseReceivedDate: BBKDispute.CaseReceivedDate,
              CaseReceivedChannel: BBKDispute.CaseReceivedChannel,
              IsCaseResolved: BBKDispute.IsCaseResolved,
              TotalTransactionAmount: BBKDispute.TotalTransactionAmount,
              FK_CDEID: BBKDispute.FK_CDEID,
              InFavorOfCustomer: BBKDispute.InFavorOfCustomer,
              CustomerLiability: BBKDispute.CustomerLiability,
              Other: BBKDispute.Other,
              Insurance: BBKDispute.Insurance,
              Internally: BBKDispute.Internally,
              AnalystName: BBKDispute.AnalystName,
              IsTrackingSheetAttached: BBKDispute.IsTrackingSheetAttached,
              Remarks: BBKDispute.Remarks,
              FromDateForPreIdentifiedData: DAtesSearch.FromDate,
              ToDateForPreIdentifiedData: DAtesSearch.ToDate,
            };
            await setTransactionDetails(newdata);
            let data = {
              Customer,
              CustomerMobile,
              Account,
              CardDetails,
              DisputeDetails,
              TransactionDetails,
              ListOfDocuments,
            };
            let searchData = {
              ReferenceNumber: "",
              CustomerName: "",
              FK_CTID: 0,
              CNICNumber: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionID: "",
              TotalTransactionAmount: -99999999999999999999,
              fk_csid: 2,
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            if (data.DisputeDetails.FK_CDEID === 0) {
              setOpen({
                flag: true,
                message: "Select Case Decision ",
              });
            } else if (data.DisputeDetails.FK_CDEID !== 0) {
              await dispatch(
                SaveAndApprovedBBKDisputes(data, searchData, searchDataofdate),
              );
              let newdata2 = [...TransactionDetails];
              let newIdex = [];
              newdata2.map((s, i) => {
                listOfTransactionDetailsAlreadyExsist.map((ss, ii) => {
                  if (s.TransactionID === ss.transactionID) {
                    newIdex.push(i);
                  }
                });
              });
              let arr = newdata2.filter(function (value, index) {
                return newIdex.indexOf(index) == -1;
              });
              await setTransactionDetails(arr);
            }
          } else {
            let ar = [...listOfTransactionDetailsAlreadyExsist];
            let ar2 = [...TransactionDetails];
            TransactionDetails.map((newV, index) => {
              ar.map((newV2, index2) => {
                if (newV.transactionID === newV2.TransactionID) {
                  TransactionDetails.splice(index, 1);
                }
              });
            });
            if (ar2.length > 0) {
              let DisputeDetails = BBKDispute;
              let data = {
                Customer,
                CustomerMobile,
                Account,
                CardDetails,
                DisputeDetails,
                TransactionDetails,
                ListOfDocuments,
              };
              let searchData = {
                ReferenceNumber: "",
                CustomerName: "",
                FK_CTID: 0,
                CNICNumber: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionID: "",
                TotalTransactionAmount: -99999999999999999999,
                fk_csid: 2,
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              if (data.DisputeDetails.FK_CDEID === 0) {
                setOpen({
                  flag: true,
                  message: "Select Case Decision ",
                });
              } else if (data.DisputeDetails.FK_CDEID !== 0) {
                dispatch(
                  SaveAndApprovedBBKDisputes(
                    data,
                    searchData,
                    searchDataofdate,
                  ),
                );
              }
            } else {
              setOpen({
                flag: true,
                message: "Enter atleast One Transaction Detail",
              });
            }
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

  //Refresh Functionality
  const refresh = () => {
    showModal();
    setAction({
      ...actions,
      refresh: true,
      delete: false,
      add: false,
      update: false,
    });
  };

  const proceedRefresh = (e, record) => {
    setBBKDispute({
      FK_FTID: 0,
      InitialBlockingDate: removeDashesFromDate(date),
      IsInitialBlock: true,
      CaseInitiatedDate: removeDashesFromDate(date),
      CustomerDisputeDate: removeDashesFromDate(date),
      CaseDetectionDate: removeDashesFromDate(date),
      CaseReceivedDate: removeDashesFromDate(date),
      CaseReceivedChannel: "",
      IsCaseResolved: false,
      TotalTransactionAmount: -99999999999999999999,
      FK_CDEID: 0,
      InFavorOfCustomer: -99999999999999999999,
      CustomerLiability: -99999999999999999999,
      Other: -99999999999999999999,
      Insurance: -99999999999999999999,
      Internally: -99999999999999999999,
      AnalystName: "",
      IsTrackingSheetAttached: false,
      Remarks: "",
    });
    setTransactionDetails([]);
    setTrsDetails({
      TransactionID: "",
      OtherBankAccountNumber: "",
      HBLAccountNumber: accountNumber,
      MobileNumber: "",
      TransactionDate: "",
      TransactionTime: "",
      TransactionPostingDate: "",
      Month: month.toString(),
      Year: year.toString(),
      PotentialSave: -99999999999999999999,
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      TransactionCurrencyCode: "",
      Response: "",
      TransactionMode: "",
      TransactionCity: "",
      FK_SID: 0,
      PreIdentifiedDataType: 3,
    });
    setListOfDocuments([]);
    setSelect({
      selectedRowKeys: [],
    });
    setAction({
      ...actions,
      refresh: false,
      update: false,
      delete: false,
      add: true,
    });
    setIsModalVisible(false);
  };

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

  // City handler
  const CityNameHandler = (e, value) => {
    setCityValue(value);
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CTID;
        setCustomer({
          ...Customer,
          ["FK_CTID"]: parseInt(id),
        });
      }
    });
  };

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
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (Customer.FK_CTID === data.pK_CTID) {
        setCityValue(data.name);
        setCustomer({
          ...Customer,
          ["FK_CTID"]: parseInt(data.pK_CTID),
        });
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {
    if (investigationOfficer.ResponseMessage === "Case could not be saved") {
      setOpen({
        flag: true,
        message: "Case could not be saved",
      });
    } else if (
      investigationOfficer.ResponseMessage ===
      "Case could not be saved because IParty ID is not available against this CNIC"
    ) {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
    }
  }, [investigationOfficer]);

  return (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Paper padding="1">
          <Row gutter={16} className="u-margin-bottom-15px">
            <Col lg={18} md={18} sm={18} xs={24}>
              <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
                Customer Details
              </h1>
            </Col>
            {roleForheader === 1 ? (
              <Col
                lg={6}
                md={6}
                className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
              >
                <div className="Level-Section">
                  <div>
                    <i className="icon-card icon-size-one"></i>
                    <div className="LevelSectionDetails AccountBBK">
                      <span className="LevelHeading">CNIC Number</span>
                      <br />
                      <span className="SubHeading">{Customer.CNICNumber}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ) : roleForheader === 2 ? (
              <Col
                lg={6}
                md={6}
                className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
              >
                <div className="Level-Section">
                  <div>
                    <i className="icon-card icon-size-one"></i>
                    <div className="LevelSectionDetails AccountBBK">
                      <span className="LevelHeading">Account Number</span>
                      <br />
                      <span className="SubHeading">{accountNumber}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ) : roleForheader === 3 ? (
              <Col
                lg={6}
                md={6}
                className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
              >
                <div className="Level-Section">
                  <div>
                    <i className="icon-card icon-size-one"></i>
                    <div className="LevelSectionDetails AccountBBK">
                      <span className="LevelHeading">Mobile Number</span>
                      <br />
                      <span className="SubHeading">{mobileNumber}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ) : null}
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
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="CustomerName"
                size="small"
                placeholder="Customer Name"
                value={customerDetails.customerName}
                label={"Customer Name"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select City"
                option={city}
                value={cityValue}
                change={CityNameHandler}
                name="CMCity"
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select Fraud Type"
                option={fraudType}
                name="Fraudtype"
                value={fraudTypeName}
                change={fraudNameHandler}
                required
              />
            </Col>
            <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
              <div className="TransactionHeading">
                System Fetched Transactions
              </div>
              <Table
                rowSelection={rowSelection}
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
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Manual Transactions
            </h1>
          </Col>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <InputWithBtn
                onchange={TransactionIDchangehandler}
                isUpperCase={true}
                label="Transaction ID*"
                fullWidth
                autoComplete="off"
                helperText={TIDErrMsg}
                textFieldSize="small"
                applyClass="search"
                textLength={20}
                minLength={20}
                icon={<i className="icon-search icon-size-one"></i>}
                error={TransactionIDError}
                value={trsDetails.TransactionID}
                name="TransactionID"
                click={tranSearchHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="OtherBankAccountNumber"
                size="small"
                autoComplete="off"
                value={trsDetails.OtherBankAccountNumber}
                label={"Other Bank Account Number*"}
                // textLength={4}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={14}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="HBLAccountNumber"
                size="small"
                autoComplete="off"
                value={trsDetails.HBLAccountNumber}
                label={"HBL Account Number*"}
                // textLength={4}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={14}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="MobileNumber"
                size="small"
                autoComplete="off"
                value={trsDetails.MobileNumber}
                label={"Mobile Number*"}
                // textLength={4}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={11}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                label={"Transaction Date"}
                name="TransactionDate"
                size="large"
                width="100%"
                DateRange
                placeholder={"Transaction Date*"}
                value={
                  trsDetails.TransactionDate
                    ? DateDisplayFormat(trsDetails.TransactionDate)
                    : null
                }
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TimePicker
                label={"Transaction Time"}
                name="TransactionTime"
                size="large"
                width="100%"
                placeholder={"Transaction Time*"}
                value={trsDetails.TransactionTime}
                change={TimeHandler}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                label={"Transaction Posting Date"}
                name="TransactionPostingDate"
                size="large"
                width="100%"
                DateRange
                placeholder={"Transaction Posting Date*"}
                value={
                  trsDetails.TransactionPostingDate
                    ? DateDisplayFormat(trsDetails.TransactionPostingDate)
                    : null
                }
                change={TransactionDeatilHandlerChange}
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
                autoComplete="off"
                Label={"Potential Save*"}
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
                autoComplete="off"
                Label={"Transaction Amount*"}
                fullWidth
                change={TransactionDeatilHandlerChange}
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
                autoComplete="off"
                Label={"Exposure / Dispute Amount*"}
                fullWidth
                change={TransactionDeatilHandlerChange}
                // disable={true}
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
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="Response"
                size="small"
                label={"Response*"}
                autoComplete="off"
                value={trsDetails.Response}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="TransactionMode"
                size="small"
                label={"Transaction Mode*"}
                autoComplete="off"
                value={trsDetails.TransactionMode}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={20}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="TransactionCity"
                size="small"
                autoComplete="off"
                label={"Transaction City *"}
                value={trsDetails.TransactionCity}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Source*"
                option={sourceTypeName}
                value={SourceType}
                change={SourceNameHandler}
                name="SourceType"
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
              rows={TransactionDetails}
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
                label="Case Received Channel"
                autoComplete="off"
                value={BBKDispute.CaseReceivedChannel}
                name="CaseReceivedChannel"
                change={BBKDisputeHandler}
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
            <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
              <DatePicker
                size="large"
                width="100%"
                DateRange
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
              <Paper ml="1.5">
                <TextField
                  fullWidth
                  label="Total Dispute Amount"
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
              lg={4}
              md={4}
              sm={24}
              xs={24}
              className="u-margin-top-17px u-text-align-center"
            >
              <label>
                <b className="u-font-size-0_7rem">Initial Block</b>
              </label>
              <br />
              <Radio.Group
                name="IsInitialBlock"
                value={BBKDispute.IsInitialBlock}
                onChange={BBKDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                label={"Initial Blocking Date"}
                disable={isInitialDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"Initial Blocking Date"}
                name="InitialBlockingDate"
                value={
                  BBKDispute.InitialBlockingDate
                    ? DateDisplayFormat(BBKDispute.InitialBlockingDate)
                    : null
                }
                change={BBKDisputeHandler}
                required={BBKDispute.IsInitialBlock}
              />
            </Col>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                label={"Case Initiated Date"}
                size="large"
                width="100%"
                DateRange
                placeholder={"Case Initiated Date"}
                name="CaseInitiatedDate"
                value={
                  BBKDispute.CaseInitiatedDate
                    ? DateDisplayFormat(BBKDispute.CaseInitiatedDate)
                    : null
                }
                change={BBKDisputeHandler}
                required={true}
              />
            </Col>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                label={"Customer Dispute Date"}
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
                required={true}
              />
            </Col>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                label={"Case Detection Date"}
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
                required={true}
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
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <SelectBox
                option={caseDecision}
                label="Select Case Decision"
                name="FK_CDEID"
                value={caseDecisionValue}
                change={CaseDecisionHandler}
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
                Label={"In Favor Of Customer"}
                fullWidth
                change={BBKDisputeHandler}
                required
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
                autoComplete="off"
                Label={"Customer Liability"}
                fullWidth
                change={BBKDisputeHandler}
                required
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
                autoComplete="off"
                Label={"Other"}
                fullWidth
                change={BBKDisputeHandler}
                required
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
                autoComplete="off"
                Label={"Insurance"}
                fullWidth
                change={BBKDisputeHandler}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="Internally"
                value={
                  BBKDispute.Internally === null ||
                  BBKDispute.Internally === -99999999999999999999
                    ? null
                    : NumberFormater(BBKDispute.Internally)
                }
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                size="small"
                autoComplete="off"
                Label={"Internally"}
                fullWidth
                change={BBKDisputeHandler}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Analyst Name"
                size="small"
                name="AnalystName"
                autoComplete="off"
                value={BBKDispute.AnalystName}
                change={BBKDisputeHandler}
                textLength={50}
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
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                autoComplete="off"
                name="Remarks"
                value={BBKDispute.Remarks}
                change={BBKDisputeHandler}
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
                  BBKDispute.Aging === null || BBKDispute.Aging === -1
                    ? null
                    : BBKDispute.Aging
                }
                change={BBKDisputeHandler}
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
                rows={ListOfDocuments}
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
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Refresh"
              icon={<i className="icon-update icon-size-one"></i>}
              applyClass="btnBorderStyledRed"
              size="large"
              click={() => refresh()}
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

export default AddNewCustomerDetailsBBK;
