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
  SearchTransactionDetailsByAccountNumber,
  GetIRISTransactionDetailsByTransactionIdNonApi,
  SaveDebitCardDisputes,
  SaveAndApprovedDebitCardDisputes,
  GetTransactionDetailsByAccountNumberNonApi,
  SearchTransactionDetailsByAccountNumberInIRISNONAPI,
  SaveNonApiDisputes,
  SaveAndApproveNonApiDisputes,
} from "../../../../store/actions/investigation-officer-actions";
import {
  GetAllFraudType,
  GetAllSource,
  GetAllTransactionCurrencyCode,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import {
  UploadFileNPI,
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
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";
import { Header } from "antd/lib/layout/layout";

const AddNewCustomerDetailsNONAPI = () => {
  var cnic = localStorage.getItem("CNICNumber");
  var accountNumber = localStorage.getItem("accountNumber");
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
    CMCity: "",
  });

  // for select rows from table
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

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

  const [fDCusotmerAccount, sefDCusotmerAccount] = useState({
    AccountNumber: accountNumber,
    BranchCode: "GS1241",
    BranchName: "Nazimabad",
    RegionCode: "R322",
    RegionName: "North",
  });

  // for transection error
  const [TransactionIDError, setTransactionIDError] = useState(false);
  const [TIDErrMsg, setTIDErrMsg] = useState("");

  // list for transection details table
  const [
    ListOfNPITransactionDetailsObjects,
    setListOfNPITransactionDetailsObjects,
  ] = useState([]);

  const [transactionCurrencyCodeValue, setTransactionCurrencyCodeValue] =
    useState("");
  const [transactionCurrencyCode, setTransactionCurrencyCode] = useState("");

  // source type names selection for drop down
  const [sourceTypeName, setSourceTypeName] = useState([]);
  const [fraudTypeName, setFraudTypeName] = useState([]);

  //   for Enable dates through radio button
  const [isTC40ReportingDate, setTC40ReportingDate] = useState(true);
  // for modal of delet

  const [isModalVisible, setIsModalVisible] = useState(false);

  //   set fruad type name state
  const [fraudType, setFraudType] = useState("");
  const [SourceType, setSourceType] = useState("");

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

  // uploadlist
  const [ListOfNPIDisputeDocuments, setListOfNPIDisputeDocuments] = useState(
    [],
  );

  //   for current date
  const date = moment().format("YYYY-MM-DD");

  const current = new Date();
  const date2 = `${current.getFullYear()}${
    "0" + (current.getMonth() + 1)
  }${current.getDate()}`;

  //   for date
  const [NPIDisputes, setNPIDisputes] = useState({
    FK_FTID: 0,
    CaseReceivedChannel: "",
    CaseResolvedDate: "",
    CaseReceivedDate: removeDashesFromDate(date),
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    IsTC40Reporting: false,
    TC40ReportingDate: "",
    // SafeReportingDate: "",
    // IsSafeReportingDate: false,
    FK_CSID: 1,
    // CaseDecision: "",
    IsPOC: false,
    POCIdentified: "",
    EventIDSAS: "",
    // CaseClosedTAT: -1,
    // InFavourOfCM: "",
    // CustomerLiability: "",
    Remarks: "",
    FromDateForPreIdentifiedData: DAtesSearch.FromDate,
    ToDateForPreIdentifiedData: DAtesSearch.ToDate,
  });

  const NPIDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "IsTC40Reporting" &&
      name !== "IsSafeReportingDate" &&
      name !== "IsPOC" &&
      (value !== "" || value === false)
    ) {
      setNPIDisputes({
        ...NPIDisputes,
        [name]: value.trimStart(),
      });
    } else if (
      name === "IsTC40Reporting" ||
      name === "IsSafeReportingDate" ||
      name === "IsPOC"
    ) {
      setNPIDisputes({
        ...NPIDisputes,
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
    if (
      (name === "CaseReceivedChannel" ||
        name === "POCIdentified" ||
        name === "EventIDSAS" ||
        name === "Remarks") &&
      value === ""
    ) {
      setNPIDisputes({
        ...NPIDisputes,
        [name]: "",
      });
    }
  };

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
      setNPIDisputes({
        ...NPIDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseResolvedDate" && value !== "") {
      setNPIDisputes({
        ...NPIDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "SafeReportingDate" && value !== "") {
      setNPIDisputes({
        ...NPIDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "TC40ReportingDate" && value !== "") {
      setNPIDisputes({
        ...NPIDisputes,
        [name]: DateSendingFormat(value),
      });
    }
  };

  //Set Tc40 reporting date in object
  useEffect(() => {
    let currentDate = NPIDisputes.TC40ReportingDate;
    if (NPIDisputes.IsTC40Reporting === true && currentDate === "") {
      setNPIDisputes({
        ...NPIDisputes,
        ["TC40ReportingDate"]: removeDashesFromDate(date),
      });
    } else if (NPIDisputes.IsTC40Reporting === false) {
      setNPIDisputes({
        ...NPIDisputes,
        ["TC40ReportingDate"]: "",
      });
    }
  }, [NPIDisputes.IsTC40Reporting]);

  //Empty POC
  useEffect(() => {
    if (NPIDisputes.IsPOC === true) {
      setNPIDisputes({
        ...NPIDisputes,
        ["POCIdentified"]: NPIDisputes.POCIdentified,
      });
    }
    if (NPIDisputes.IsPOC === false) {
      setNPIDisputes({
        ...NPIDisputes,
        ["POCIdentified"]: "",
      });
    }
  }, [NPIDisputes.IsPOC]);

  //   useEffect for tempray api hit
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
        dispatch(SearchTransactionDetailsByAccountNumberInIRISNONAPI(Data1));
      } else {
        dispatch(GetTransactionDetailsByAccountNumberNonApi(Data));
      }
    }
    dispatch(GetAllFraudType());
    dispatch(GetAllSource());
    dispatch(GetAllTransactionCurrencyCode());
    dispatch(GetAllCity());
  }, []);

  //   used for already exsit data of customer details for add

  useEffect(() => {
    let customerDetail =
      investigationOfficer.GetTransactionDetailsByCnicNONAPIexistData
        .customerDetails;
    let transactionDetail =
      investigationOfficer.GetTransactionDetailsByCnicNONAPIexistData
        .transactionDetails;
    if (customerDetail !== undefined && customerDetail !== null) {
      setCardDetails({
        ...CardDetails,
        ["CardNumber"]: customerDetail.cardNumber,
      });

      setCustomerDetails({
        accountNumber: accountNumber,
        cardNumber: customerDetail.cardNumber,
        cmCity: customerDetail.cmCity,
        cnicNumber: customerDetail.cnicNumber,
        customerName: customerDetail.customerName,
        iparty_ID: customerDetail.iparty_ID,
        pK_CDID: customerDetail.pK_CDID,
        fK_FTID: customerDetail.fK_FTID,
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

      sefDCusotmerAccount({
        ...fDCusotmerAccount,
        ["AccountNumber"]: accountNumber,
      });
      setFDCustomer({
        CNICNumber: customerDetail.cnicNumber,
        CustomerName: customerDetail.customerName,
        FK_CTID: customerDetail.fK_CTID,
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
  }, [investigationOfficer.GetTransactionDetailsByCnicNONAPIexistData]);

  //   For fruad type set
  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (customerDetails.fK_FTID === data.pK_FTID) {
        setFraudTypeName(data.name);
        setNPIDisputes({
          ...NPIDisputes,
          ["FK_FTID"]: parseInt(data.pK_FTID),
        });
      }
    });
  }, [setupForms.FraudTypeData]);

  // Selected Dropdown value
  const fraudNameHandler = (e, value) => {
    setFraudTypeName(value);
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FTID;
        setNPIDisputes({
          ...NPIDisputes,
          ["FK_FTID"]: parseInt(id),
        });
      }
    });
  };

  // // source type names selection for drop down
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    setSourceTypeName(
      nameSource.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.SourceData]);

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
    // {
    //   title: "Transaction Amount ()",
    //   dataIndex: "TransactionAmountOtherCurrency",
    //   key: "TransactionAmountOtherCurrency",
    //   align: "center",
    //   width: "220px",
    //   render: (text) => {
    //     if (String(text) !=="" && text !==-99999999999999999999) {
    //       return CommaFormter(text);
    //     } else {
    //       return "";
    //     }
    //   },
    // },
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
      title: "Merchant ID",
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

  // for iris table
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
    // {
    //   title: "Transaction Amount ()",
    //   dataIndex: "transactionAmountOtherCurrency",
    //   key: "transactionAmountOtherCurrency",
    //   align: "center",
    //   width: "220px",
    //   render: (text) => {
    //     if (String(text) !=="" && text !==-1) {
    //       return CommaFormter(text);
    //     } else {
    //       return "";
    //     }
    //   },
    // },
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
    var objIndex = ListOfNPITransactionDetailsObjects.findIndex(
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

  // For Row slection

  const rowSelection = {
    selectedRowKeys,
    onSelect: (e) => {
      var temp = listOfTransactionDetailsAlreadyExsist;
      var temp2 = ListOfNPITransactionDetailsObjects;
      let flag1 = false;
      let row = [...select.selectedRowKeys];
      let totalAmmount = NPIDisputes.TotalTransactionAmount;
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
                    data.disputeAmount + NPIDisputes.TotalTransactionAmount;
                }
              }
            } else if (data.preIdentifiedDataType === 1) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount =
                    data.disputeAmount + NPIDisputes.TotalTransactionAmount;
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
        setNPIDisputes({
          ...NPIDisputes,
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
        let totalAmmount = NPIDisputes.TotalTransactionAmount;
        var temp2 = ListOfNPITransactionDetailsObjects;
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
        setNPIDisputes({
          ...NPIDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      } else {
        setSelect({
          ...select,
          selectedRowKeys: [],
        });
        var temp = listOfTransactionDetailsAlreadyExsist;
        let totalAmmount = NPIDisputes.TotalTransactionAmount;
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
        setNPIDisputes({
          ...NPIDisputes,
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

  // for transection id input data
  const TransactionIDchangehandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "TransactionID" && val !== "") {
      var valueCheck = val.replace(/[^\d-]/g, "");
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
    setTranstionid(val);
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
          GetIRISTransactionDetailsByTransactionIdNonApi(
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
        GetIRISTransactionDetailsByTransactionIdNonApi(
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
      name !== "DisputeAmount" &&
      name !== "TransactionCurrencyCode" &&
      name !== "MerchantName" &&
      name !== "MerchantID" &&
      name !== "MerchantCity" &&
      name !== "CategoryCodeMCC" &&
      name !== "AcquirerID" &&
      name !== "AcquirerTerminalID" &&
      name !== "POSMode" &&
      name !== "ApprovalCode" &&
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
    } else if (name === "ApprovalCode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "ApprovalCode" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
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
  };

  const checkData = (flag, flag2) => {
    let total = NPIDisputes.TotalTransactionAmount;
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
        setListOfNPITransactionDetailsObjects([
          ...ListOfNPITransactionDetailsObjects,
          trsDetails,
        ]);
        let stotal = parseFloat(total).toFixed(2);
        setNPIDisputes({
          ...NPIDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setTrsDetails({
          HBLAccountNumber: accountNumber,
          TransactionID: "",
          OtherBankAccountNumber: "",
          OtherBankBranchCode: "",
          OtherBankBranchName: "",
          TransactionAmount: -99999999999999999999,
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
        let total = NPIDisputes.TotalTransactionAmount;
        if (total === -99999999999999999999) {
          total = trsDetails.DisputeAmount;
        } else {
          total = total + trsDetails.DisputeAmount;
        }
        let flag = true;
        let flag2 = true;
        if (
          ListOfNPITransactionDetailsObjects.length > 0 &&
          listOfTransactionDetailsAlreadyExsist.length > 0
        ) {
          ListOfNPITransactionDetailsObjects.map((data, index) => {
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
        } else if (ListOfNPITransactionDetailsObjects.length > 0) {
          ListOfNPITransactionDetailsObjects.map((data, index) => {
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
            setNPIDisputes({
              ...NPIDisputes,
              ["TotalTransactionAmount"]: parseFloat(stotal),
            });
            setListOfNPITransactionDetailsObjects([
              ...ListOfNPITransactionDetailsObjects,
              trsDetails,
            ]);
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: "",
              OtherBankAccountNumber: "",
              OtherBankBranchCode: "",
              OtherBankBranchName: "",
              TransactionAmount: -99999999999999999999,
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
      let total = NPIDisputes.TotalTransactionAmount;
      if (total === -99999999999999999999) {
        total = trsDetails.DisputeAmount;
      } else {
        total = total + trsDetails.DisputeAmount;
      }
      let flag = true;
      let flag2 = true;
      if (
        ListOfNPITransactionDetailsObjects.length > 0 &&
        listOfTransactionDetailsAlreadyExsist.length > 0
      ) {
        ListOfNPITransactionDetailsObjects.map((data, index) => {
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
      } else if (ListOfNPITransactionDetailsObjects.length > 0) {
        ListOfNPITransactionDetailsObjects.map((data, index) => {
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
          setNPIDisputes({
            ...NPIDisputes,
            ["TotalTransactionAmount"]: parseFloat(stotal),
          });
          setListOfNPITransactionDetailsObjects([
            ...ListOfNPITransactionDetailsObjects,
            trsDetails,
          ]);
          setTrsDetails({
            HBLAccountNumber: accountNumber,
            TransactionID: "",
            OtherBankAccountNumber: "",
            OtherBankBranchCode: "",
            OtherBankBranchName: "",
            TransactionAmount: -99999999999999999999,
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
        if (ListOfNPITransactionDetailsObjects) {
          await ListOfNPITransactionDetailsObjects.map((data, index) => {
            // recordIndex
            if (data.TransactionID === trsDetails.TransactionID) {
              if (recordIndex !== index) {
                if (
                  trsDetails.TransactionID !== "" &&
                  trsDetails.HBLAccountNumber !== "" &&
                  trsDetails.OtherBankAccountNumber !== "" &&
                  trsDetails.OtherBankBranchCode !== "" &&
                  trsDetails.TransactionAmount !== null &&
                  trsDetails.TransactionAmount !== -99999999999999999999 &&
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
      if (ListOfNPITransactionDetailsObjects) {
        await ListOfNPITransactionDetailsObjects.map((data, index) => {
          // recordIndex
          if (data.TransactionID === trsDetails.TransactionID) {
            if (recordIndex !== index) {
              if (
                trsDetails.TransactionID !== "" &&
                trsDetails.HBLAccountNumber !== "" &&
                trsDetails.OtherBankAccountNumber !== "" &&
                trsDetails.OtherBankBranchCode !== "" &&
                trsDetails.TransactionAmount !== null &&
                trsDetails.TransactionAmount !== -99999999999999999999 &&
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
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.OtherBankAccountNumber !== "" &&
        trsDetails.OtherBankBranchCode !== "" &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.PotentialSave !== -99999999999999999999 &&
        trsDetails.PotentialSave !== null &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.TransactionCurrencyCode !== "" &&
        trsDetails.ApprovalCode !== "" &&
        trsDetails.Response !== "" &&
        trsDetails.POSMode !== "" &&
        trsDetails.MerchantName !== "" &&
        trsDetails.MerchantID !== "" &&
        trsDetails.MerchantCity !== "" &&
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

  //Update Grid
  const updateRecord = async (e, record) => {
    let total = NPIDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = records.DisputeAmount;
    } else {
      total = total - records.DisputeAmount;
    }
    let newTotal = total + trsDetails.DisputeAmount;
    let stotal = parseFloat(newTotal).toFixed(2);
    setNPIDisputes({
      ...NPIDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    ListOfNPITransactionDetailsObjects[recordIndex] = trsDetails;
    await setListOfNPITransactionDetailsObjects([
      ...ListOfNPITransactionDetailsObjects,
    ]);
    setTrsDetails({
      HBLAccountNumber: accountNumber,
      TransactionID: "",
      OtherBankAccountNumber: "",
      OtherBankBranchCode: "",
      OtherBankBranchName: "",
      TransactionAmount: -99999999999999999999,
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
    let testVariable = ListOfNPITransactionDetailsObjects.indexOf(records);
    ListOfNPITransactionDetailsObjects.splice(testVariable, 1);
    let total = NPIDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    let TotalTransactionAmount =
      NPIDisputes.TotalTransactionAmount - records.DisputeAmount;
    let stotal = parseFloat(TotalTransactionAmount).toFixed(2);
    setNPIDisputes({
      ...NPIDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    setListOfNPITransactionDetailsObjects([
      ...ListOfNPITransactionDetailsObjects,
    ]);
    setIsModalVisible(false);
    setRecords([]);
  };

  const handleCancel = () => {
    setTrsDetails({
      ...ListOfNPITransactionDetailsObjects,
      HBLAccountNumber: accountNumber,
      TransactionID: "",
      OtherBankAccountNumber: "",
      OtherBankBranchCode: "",
      OtherBankBranchName: "",
      TransactionAmount: -99999999999999999999,
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
      if (ListOfNPIDisputeDocuments.length > 0) {
        ListOfNPIDisputeDocuments.map((filename, index) => {
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
          dispatch(UploadFileNPI(uploadedFile));
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
          dispatch(UploadFileNPI(uploadedFile));
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
      setListOfNPIDisputeDocuments([...ListOfNPIDisputeDocuments, Data]);
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
    const filteredItems = ListOfNPIDisputeDocuments.filter(
      (item) => item !== record,
    );
    setListOfNPIDisputeDocuments(filteredItems);
  };
  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 4,
    };
    dispatch(DownloadUploadFile(data));
  };
  //CMCity Handler
  const customerDetailHandler = (e, val) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "customercity" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setFDCustomer({
          ...FDCustomer,
          ["CMCity"]: valueCheck.trimStart(),
        });
      }
    } else {
      setFDCustomer({
        ...FDCustomer,
        ["CMCity"]: "",
      });
    }
  };

  //  FOR SAVE
  const goToSaveHandler = async (e) => {
    e.preventDefault();
    if (saveValue === 1) {
      if (
        ListOfNPITransactionDetailsObjects.length > 0 ||
        addInedx.length > 0
      ) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard) || checkCard.length < 19) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number",
          });
        } else {
          if (addInedx.length > 0) {
            let newdata = ListOfNPITransactionDetailsObjects;
            await addInedx.map((data, ind) => {
              let ar = listOfTransactionDetailsAlreadyExsist[data];
              newdata.push({
                HBLAccountNumber: ar.hblAccountNumber,
                TransactionID: ar.transactionID,
                OtherBankAccountNumber: ar.otherBankAccountNumber,
                OtherBankBranchCode: ar.otherBankBranchCode,
                OtherBankBranchName: ar.otherBankBranchName,
                TransactionAmount: ar.transactionAmount,
                PotentialSave: ar.potentialSave,
                DisputeAmount: ar.disputeAmount,
                TransactionCurrencyCode: ar.transactionCurrencyCode,
                ApprovalCode: ar.approvalCode,
                Response: ar.response,
                POSMode: ar.posMode,
                MerchantName: ar.merchantName,
                MerchantID: ar.merchantID,
                MerchantCity: ar.merchantCity,
                ON_OFF_US: ar.oN_OFF_US,
                CategoryCodeMCC: ar.categoryCodeMCC,
                AcquirerInstitution: ar.acquirerInstitution,
                AcquirerTerminalID: ar.acquirerTerminalID,
                AcquirerID: ar.acquirerID,
                ARN: ar.arn,
                PreIdentifiedDataType: ar.preIdentifiedDataType,
                FK_SID: ar.fK_SID,
                TransactionDate: ar.transactionDate,
                TransactionTime: ar.transactionTime,
              });
            });
            let NPIDispute = {
              FK_FTID: NPIDisputes.FK_FTID,
              CaseReceivedChannel: NPIDisputes.CaseReceivedChannel,
              CaseResolvedDate: NPIDisputes.CaseResolvedDate,
              CaseReceivedDate: NPIDisputes.CaseReceivedDate,
              IsCaseResolved: NPIDisputes.IsCaseResolved,
              TotalTransactionAmount: NPIDisputes.TotalTransactionAmount,
              IsTC40Reporting: NPIDisputes.IsTC40Reporting,
              TC40ReportingDate: NPIDisputes.TC40ReportingDate,
              FK_CSID: NPIDisputes.FK_CSID,
              IsPOC: NPIDisputes.IsPOC,
              POCIdentified: NPIDisputes.POCIdentified,
              EventIDSAS: NPIDisputes.EventIDSAS,
              Remarks: NPIDisputes.Remarks,
              FromDateForPreIdentifiedData: DAtesSearch.FromDate,
              ToDateForPreIdentifiedData: DAtesSearch.ToDate,
            };
            await setNPIDisputes(NPIDispute);
            await setListOfNPITransactionDetailsObjects(newdata);
            let data = {
              FDCustomer,
              fDCusotmerAccount,
              CardDetails,
              NPIDispute,
              ListOfNPITransactionDetailsObjects,
              ListOfNPIDisputeDocuments,
            };
            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              CMCity: "",
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 1,
              FK_CTID: 0,
              ApprovalCode: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            await dispatch(
              SaveNonApiDisputes(data, searchData, searchDataofdate),
            );
            let newdata2 = [...ListOfNPITransactionDetailsObjects];
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
            await setListOfNPITransactionDetailsObjects(arr);
            // setAddInedx([]);
          } else {
            let ar = [...listOfTransactionDetailsAlreadyExsist];
            let ar2 = [...ListOfNPITransactionDetailsObjects];
            ListOfNPITransactionDetailsObjects.map((newV, index) => {
              ar.map((newV2, index2) => {
                if (newV.transactionID === newV2.TransactionID) {
                  ListOfNPITransactionDetailsObjects.splice(index, 1);
                }
              });
            });
            if (ar2.length > 0) {
              let NPIDispute = NPIDisputes;
              let data = {
                FDCustomer,
                fDCusotmerAccount,
                CardDetails,
                NPIDispute,
                ListOfNPITransactionDetailsObjects,
                ListOfNPIDisputeDocuments,
              };
              let searchData = {
                RefrenceNumber: "",
                CustomerName: "",
                CMCity: "",
                CNIC: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionId: "",
                TransactionAmount: -99999999999999999999,
                fk_csid: 1,
                FK_CTID: 0,
                ApprovalCode: "",
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              dispatch(SaveNonApiDisputes(data, searchData, searchDataofdate));
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
      if (
        ListOfNPITransactionDetailsObjects.length > 0 ||
        addInedx.length > 0
      ) {
        let checkCard = CardDetails.CardNumber;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(checkCard) || checkCard.length < 19) {
          setOpen({
            flag: true,
            message: "Enter Correct Card Number ",
          });
        } else {
          if (addInedx.length > 0) {
            let newdata = ListOfNPITransactionDetailsObjects;
            await addInedx.map((data, ind) => {
              let ar = listOfTransactionDetailsAlreadyExsist[data];
              newdata.push({
                HBLAccountNumber: ar.hblAccountNumber,
                TransactionID: ar.transactionID,
                OtherBankAccountNumber: ar.otherBankAccountNumber,
                OtherBankBranchCode: ar.otherBankBranchCode,
                OtherBankBranchName: ar.otherBankBranchName,
                TransactionAmount: ar.transactionAmount,
                PotentialSave: ar.potentialSave,
                DisputeAmount: ar.disputeAmount,
                TransactionCurrencyCode: ar.transactionCurrencyCode,
                ApprovalCode: ar.approvalCode,
                Response: ar.response,
                POSMode: ar.posMode,
                MerchantName: ar.merchantName,
                MerchantID: ar.merchantID,
                MerchantCity: ar.merchantCity,
                ON_OFF_US: ar.oN_OFF_US,
                CategoryCodeMCC: ar.categoryCodeMCC,
                AcquirerInstitution: ar.acquirerInstitution,
                AcquirerTerminalID: ar.acquirerTerminalID,
                AcquirerID: ar.acquirerID,
                ARN: ar.arn,
                FK_SID: ar.fK_SID,
                TransactionDate: ar.transactionDate,
                TransactionTime: ar.transactionTime,
                PreIdentifiedDataType: ar.preIdentifiedDataType,
              });
            });
            let NPIDispute = {
              FK_FTID: NPIDisputes.FK_FTID,
              CaseReceivedChannel: NPIDisputes.CaseReceivedChannel,
              CaseResolvedDate: NPIDisputes.CaseResolvedDate,
              CaseReceivedDate: NPIDisputes.CaseReceivedDate,
              IsCaseResolved: NPIDisputes.IsCaseResolved,
              TotalTransactionAmount: NPIDisputes.TotalTransactionAmount,
              IsTC40Reporting: NPIDisputes.IsTC40Reporting,
              TC40ReportingDate: NPIDisputes.TC40ReportingDate,
              FK_CSID: NPIDisputes.FK_CSID,
              IsPOC: NPIDisputes.IsPOC,
              POCIdentified: NPIDisputes.POCIdentified,
              EventIDSAS: NPIDisputes.EventIDSAS,
              Remarks: NPIDisputes.Remarks,
              FromDateForPreIdentifiedData: DAtesSearch.FromDate,
              ToDateForPreIdentifiedData: DAtesSearch.ToDate,
            };
            await setListOfNPITransactionDetailsObjects(newdata);
            let data = {
              FDCustomer,
              fDCusotmerAccount,
              CardDetails,
              NPIDispute,
              ListOfNPITransactionDetailsObjects,
              ListOfNPIDisputeDocuments,
            };
            let searchData = {
              RefrenceNumber: "",
              CustomerName: "",
              CMCity: "",
              CNIC: "",
              AccountNumber: "",
              Fraudtype: "",
              TransactionId: "",
              TransactionAmount: -99999999999999999999,
              fk_csid: 2,
              FK_CTID: 0,
              ApprovalCode: "",
            };
            let searchDataofdate = {
              FromDate: "",
              ToDate: "",
            };
            await dispatch(
              SaveAndApproveNonApiDisputes(data, searchData, searchDataofdate),
            );
            let newdata2 = [...ListOfNPITransactionDetailsObjects];
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
            await setListOfNPITransactionDetailsObjects(arr);
            // setAddInedx([]);
          } else {
            let ar = [...listOfTransactionDetailsAlreadyExsist];
            let ar2 = [...ListOfNPITransactionDetailsObjects];
            ListOfNPITransactionDetailsObjects.map((newV, index) => {
              ar.map((newV2, index2) => {
                if (newV.transactionID === newV2.TransactionID) {
                  ListOfNPITransactionDetailsObjects.splice(index, 1);
                }
              });
            });
            if (ar2.length > 0) {
              let NPIDispute = NPIDisputes;
              let data = {
                FDCustomer,
                fDCusotmerAccount,
                CardDetails,
                NPIDispute,
                ListOfNPITransactionDetailsObjects,
                ListOfNPIDisputeDocuments,
              };
              let searchData = {
                RefrenceNumber: "",
                CustomerName: "",
                CMCity: "",
                CNIC: "",
                AccountNumber: "",
                Fraudtype: "",
                TransactionId: "",
                TransactionAmount: -99999999999999999999,
                fk_csid: 2,
                FK_CTID: 0,
                ApprovalCode: "",
              };
              let searchDataofdate = {
                FromDate: "",
                ToDate: "",
              };
              dispatch(
                SaveAndApproveNonApiDisputes(
                  data,
                  searchData,
                  searchDataofdate,
                ),
              );
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

  const proceedRefresh = async (e, record) => {
    await setNPIDisputes({
      FK_FTID: 0,
      CaseReceivedChannel: "",
      CaseResolvedDate: "",
      CaseReceivedDate: removeDashesFromDate(date),
      IsCaseResolved: false,
      TotalTransactionAmount: -99999999999999999999,
      IsTC40Reporting: false,
      TC40ReportingDate: "",
      FK_CSID: 1,
      IsPOC: false,
      POCIdentified: "",
      EventIDSAS: "",
      Remarks: "",
    });
    await setListOfNPITransactionDetailsObjects([]);
    await setTrsDetails({
      HBLAccountNumber: accountNumber,
      TransactionID: "",
      OtherBankAccountNumber: "",
      OtherBankBranchCode: "",
      OtherBankBranchName: "",
      TransactionAmount: -99999999999999999999,
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
    var temp = listOfTransactionDetailsAlreadyExsist;
    await temp.map((data, index) => {
      if (data.preIdentifiedDataType === 0) {
        data.preIdentifiedDataType = 1;
      } else if (data.preIdentifiedDataType === 2) {
        data.preIdentifiedDataType = 1;
      } else {
        data.preIdentifiedDataType = 1;
      }
    });
    await setSelect({
      loading: false,
      selectedRowKeys: [],
    });
    await setListOfTransactionDetailsAlreadyExsist(temp);
    setListOfNPIDisputeDocuments([]);
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

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  // City handler
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
                    <div className="LevelSectionDetails">
                      <span className="LevelHeading">CNIC Number</span>
                      <br />
                      <span className="SubHeading">
                        {FDCustomer.CNICNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              <Col
                lg={6}
                md={6}
                className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
              >
                <div className="Level-Section">
                  <div>
                    <i className="icon-card icon-size-one"></i>
                    <div className="LevelSectionDetails">
                      <span className="LevelHeading">Account Number</span>
                      <br />
                      <span className="SubHeading">{accountNumber}</span>
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Reference#"
                disable
                label={"Reference #"}
                fullWidth
              />
            </Col>
            {roleForheader !== 1 ? (
              <Col lg={4} md={4} sm={24} xs={24}>
                <TextField
                  name=""
                  size="small"
                  placeholder="Customer Name"
                  disable
                  value={FDCustomer.CNICNumber}
                  label={"CNIC"}
                  fullWidth
                />
              </Col>
            ) : null}
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer Name"
                disable
                value={customerDetails.customerName}
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
                name="CMCity"
                required
              />
              {/* <TextField
                name="customercity"
                size="small"
                autoComplete="off"
                placeholder="Customer City"
                value={FDCustomer.CMCity}
                // disable
                textLength={50}
                label={"Customer City"}
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
            <Col lg={6} md={6} sm={24} xs={24}>
              <InputWithBtn
                onchange={TransactionIDchangehandler}
                isUpperCase={true}
                label="Transaction ID *"
                fullWidth
                helperText={TIDErrMsg}
                textFieldSize="small"
                applyClass="search"
                autoComplete="off"
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
                autoComplete="off"
                label={"HBL Account Number *"}
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
                autoComplete="off"
                label={"Branch Code *"}
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
                autoComplete="off"
                label={"Branch Name *"}
                value={trsDetails.OtherBankBranchName}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={30}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                label={"Transaction Date *"}
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
            <Col lg={6} md={6} sm={24} xs={24}>
              <TimePicker
                label={"Transaction Time *"}
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
                autoComplete="off"
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
                autoComplete="off"
                Label={"Transaction Amount *"}
                fullWidth
                change={TransactionDeatilHandlerChange}
              />
            </Col>
            {/* <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="TransactionAmountOtherCurrency"
                value={
                  trsDetails.TransactionAmountOtherCurrency === null ||
                  trsDetails.TransactionAmountOtherCurrency === -1
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
            </Col> */}
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
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
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
                autoComplete="off"
                label={"Response *"}
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
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantID"
                size="small"
                autoComplete="off"
                label={"Merchant ID *"}
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
            <Col lg={6} md={6} sm={24} xs={24} className="u-text-align-center">
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
            <Col lg={6} md={6} sm={24} xs={24}>
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
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Source *"
                option={sourceTypeName}
                value={SourceType}
                change={SourceNameHandler}
                name="SourceType"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="AcquirerID"
                size="small"
                autoComplete="off"
                label={"Acquirer ID *"}
                value={trsDetails.AcquirerID}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={6}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
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
                label={"Acquirer Institution *"}
                autoComplete="off"
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
              rows={ListOfNPITransactionDetailsObjects}
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
                  NPIDisputes.CaseReceivedDate
                    ? DateDisplayFormat(NPIDisputes.CaseReceivedDate)
                    : null
                }
                change={DateHandler}
                disable={true}
                // defaultValue="{moment()}"
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Received Channel"
                autoComplete="off"
                value={NPIDisputes.CaseReceivedChannel}
                name="CaseReceivedChannel"
                change={NPIDisputeHandler}
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
                value={NPIDisputes.IsCaseResolved}
                onChange={NPIDisputeHandler}
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
                  NPIDisputes.CaseResolvedDate
                    ? DateDisplayFormat(NPIDisputes.CaseResolvedDate)
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
                    NPIDisputes.TotalTransactionAmount === null ||
                    NPIDisputes.TotalTransactionAmount === -99999999999999999999
                      ? null
                      : CommaFormter(NPIDisputes.TotalTransactionAmount)
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
          <Col lg={18} md={18} sm={18} xs={24} className="u-margin-bottom-13px">
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Closure Details
            </h1>
          </Col>
          <Row gutter={8}>
            <Col
              lg={6}
              md={6}
              sm={24}
              xs={24}
              className="u-text-align-center u-margin-top-15px"
            >
              <label>
                <b>TC 40 Reporting</b>
              </label>
              <br />
              <Radio.Group
                name="IsTC40Reporting"
                value={NPIDisputes.IsTC40Reporting}
                onChange={NPIDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24}>
              <DatePicker
                label={"TC40 Reporting Date"}
                disable={isTC40ReportingDate}
                size="large"
                width="100%"
                DateRange
                placeholder={"Select TC 40 Reporting Date"}
                name="TC40ReportingDate"
                value={
                  NPIDisputes.TC40ReportingDate
                    ? DateDisplayFormat(NPIDisputes.TC40ReportingDate)
                    : null
                }
                change={DateHandler}
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
                <b>Point Of Compromise Identified</b>
              </label>
              <br />
              <Radio.Group
                name="IsPOC"
                value={NPIDisputes.IsPOC}
                onChange={NPIDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                disable={pOC}
                fullWidth
                label="Point Of Compromise Identified"
                size="small"
                name="POCIdentified"
                value={NPIDisputes.POCIdentified}
                required={NPIDisputes.IsPOC}
                change={NPIDisputeHandler}
                textLength={100}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-15px">
              <TextField
                fullWidth
                label="Remarks"
                autoComplete="off"
                size="small"
                name="Remarks"
                value={NPIDisputes.Remarks}
                change={NPIDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-15px">
              <TextField
                fullWidth
                label="Event ID (SAS REF #)"
                size="small"
                name="EventIDSAS"
                autoComplete="off"
                value={NPIDisputes.EventIDSAS}
                change={NPIDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-15px">
              <TextField
                fullWidth
                label="Aging"
                size="small"
                name="Aging"
                value={
                  NPIDisputes.Aging === null || NPIDisputes.Aging === -1
                    ? null
                    : NPIDisputes.Aging
                }
                change={NPIDisputeHandler}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-15px">
              <TextField
                fullWidth
                label="Case Closed TAT"
                size="small"
                name="CaseClosedTAT"
                value={
                  NPIDisputes.CaseClosedTAT === null ||
                  NPIDisputes.CaseClosedTAT === -1
                    ? null
                    : NPIDisputes.CaseClosedTAT
                }
                change={NPIDisputeHandler}
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
                rows={ListOfNPIDisputeDocuments}
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

export default AddNewCustomerDetailsNONAPI;
