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
  GetIRISTransactionDetailsByTransactionIdADC,
  UpdateADCDisputeDetails,
  UpdateAndApproveADCDisputeDetails,
  SearchTransactionDetailsByAccountNumberInIRISADC,
  SearchADCDisputesForEditByCnicAndReferenceNumber,
} from "../../../../store/actions/investigation-officer-actions";
import {
  GetAllCaseDecision,
  GetAllFraudType,
  GetAllSourceOfIBChannelCreation,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import { GetAllSource } from "../../../../store/actions/setup-forms-actions";
import {
  UploadFileADC,
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

const EditADCDispute = () => {
  var cnic = localStorage.getItem("CNICNumber");
  var cnic2 = localStorage.getItem("cnic2");

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
    TransactionID: "",
    BeneficiaryAccountNumber: "",
    BeneficiaryBankName: "",
    TransactionAmount: -99999999999999999999,
    DisputeAmount: -99999999999999999999,
    ApprovalCode: "",
    POSMode: "",
    MerchantID: "",
    MerchantCity: "",
    ON_OFF_US: false,
    MerchantCategoryCodeMCC: "",
    MobileNumber: "",
    IMEINumber: "",
    URL: "",
    IPAddress: "",
    FK_SID: 0,
    TransactionDate: "",
    TransactionTime: "",
    HBLAccountNumber: accountNumber,
    BranchCode: "",
    BranchName: "",
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
    ListOfADCTransactionDetailsObjects,
    setListOfADCTransactionDetailsObjects,
  ] = useState([]);

  // source type names selection for drop down
  const [sourceTypeName, setSourceTypeName] = useState([]);

  // for modal of delet
  const [isModalVisible, setIsModalVisible] = useState(false);

  //   set fruad type name state
  const [SourceType, setSourceType] = useState("");
  const [iosAndroid, setIosAndroid] = useState("");
  const [demographicChange, setDemographicChange] = useState("");
  const [flexiLoan, setFlexiLoan] = useState("");
  const [simBlocked, setSimBlocked] = useState("");

  // for search date
  const [searchData, setSearchData] = useState({
    TransactionDate: "",
    CaseRevisedDate: "",
    CaseResolvedDate: "",
    SafeReportingDate: "",
    ReportingDate: "",
  });
  const [sourceOfIB, setSourceOfIB] = useState("");

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  // List of Transaction Details already esist
  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);
  //   secarch date

  // uploadlist
  const [ListOfADCDisputeDocuments, setListOfADCDisputeDocuments] = useState(
    [],
  );

  //   for current date
  const date = moment().format("YYYY-MM-DD");

  //   for date
  const [ADCDisputes, setADCDisputes] = useState({
    CaseReceivedChannel: "",
    CaseReceivedDate: removeDashesFromDate(date),
    RegistrationDate: removeDashesFromDate(date),
    IsCaseResolved: false,
    RefrenceNumber: "",
    TotalTransactionAmount: -99999999999999999999,
    CaseClosedTAT: -1,
    ExpectedRecovery: -99999999999999999999,
    FK_CSID: 3,
    FK_CDEID: 0,
    IsFlexiLoan: true,
    IsDemographicChange: false,
    PII: "",
    CustomerClamiedInformation: "",
    EventIDSAS: "",
    ExpectedRecoveryFromHBLBeneficiary: -99999999999999999999,
    ExpectedRecoveryFromMemberBankBeneficiary: -99999999999999999999,
    CustomerSimBlocked: true,
    FundLayeredAC: "",
    Android_ISO: 1,
    FK_SIBCCID: 0,
    Remarks: "",
    FromDateForPreIdentifiedData: "",
    ToDateForPreIdentifiedData: "",
  });
  const [sourceOfIBName, setSourceOfIBName] = useState([]);

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
      setADCDisputes({
        ...ADCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "CaseResolvedDate" && value !== "") {
      setADCDisputes({
        ...ADCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "SafeReportingDate" && value !== "") {
      setADCDisputes({
        ...ADCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "TC40ReportingDate" && value !== "") {
      setADCDisputes({
        ...ADCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "RegistrationDate" && value !== "") {
      setADCDisputes({
        ...ADCDisputes,
        [name]: DateSendingFormat(value),
      });
    }
  };

  const ADCDisputeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "ExpectedRecovery" &&
      name !== "PII" &&
      name !== "ExpectedRecoveryFromHBLBeneficiary" &&
      name !== "ExpectedRecoveryFromMemberBankBeneficiary" &&
      name !== "IsDemographicChange" &&
      name !== "CustomerSimBlocked" &&
      name !== "IsFlexiLoan" &&
      name !== "Android_ISO" &&
      name !== "CaseReceivedChannel" &&
      name !== "EventIDSAS" &&
      name !== "Remarks" &&
      name !== "CustomerClamiedInformation" &&
      ((value !== "" && value !== -99999999999999999999) || value === false)
    ) {
      if (value % 1 !== 0) {
        if (value.length <= 18) {
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 18);
        }
      } else {
        if (value.length <= 15) {
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 15);
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        }
      }
      setADCDisputes({
        ...ADCDisputes,
        [name]: value.trimStart(),
      });
    } else if (
      name === "IsDemographicChange" ||
      name === "IsFlexiLoan" ||
      name === "CustomerSimBlocked" ||
      name === "Android_ISO"
    ) {
      setADCDisputes({
        ...ADCDisputes,
        [name]: value,
      });
    } else if (
      (name === "ExpectedRecovery" ||
        name === "ExpectedRecoveryFromHBLBeneficiary" ||
        name === "ExpectedRecoveryFromMemberBankBeneficiary") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
      let newvalue = parseFloat(value);
      if (isNegative(newvalue)) {
        newvalue = newvalue * -1;
      }
      value = newvalue.toString();
      if (value % 1 !== 0) {
        if (value.length <= 18) {
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 18);
        }
      } else {
        if (value.length <= 15) {
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 15);
          setADCDisputes({
            ...ADCDisputes,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      ((name === "ExpectedRecovery" ||
        name === "ExpectedRecoveryFromHBLBeneficiary" ||
        name === "ExpectedRecoveryFromMemberBankBeneficiary") &&
        value === "") ||
      value === -99999999999999999999
    ) {
      setADCDisputes({
        ...ADCDisputes,
        [name]: parseFloat(-99999999999999999999),
      });
    } else {
      setADCDisputes({
        ...ADCDisputes,
        [name]: "",
      });
    }

    if (name === "IsDemographicChange") {
      if (value) {
        setDemographicChange(true);
        setADCDisputes({
          ...ADCDisputes,
          [name]: true,
        });
      } else {
        setDemographicChange(false);
        setADCDisputes({
          ...ADCDisputes,
          [name]: false,
        });
      }
    }

    if (name === "IsFlexiLoan") {
      if (value) {
        setFlexiLoan(true);
        setADCDisputes({
          ...ADCDisputes,
          [name]: true,
        });
      } else {
        setFlexiLoan(false);
        setADCDisputes({
          ...ADCDisputes,
          [name]: false,
        });
      }
    }

    if (name === "CustomerSimBlocked") {
      if (value) {
        setSimBlocked(true);
        setADCDisputes({
          ...ADCDisputes,
          [name]: true,
        });
      } else {
        setSimBlocked(false);
        setADCDisputes({
          ...ADCDisputes,
          [name]: false,
        });
      }
    }

    if (name === "Android_ISO") {
      if (value === 1) {
        setIosAndroid(1);
        setADCDisputes({
          ...ADCDisputes,
          [name]: 1,
        });
      } else if (value === 2) {
        setIosAndroid(2);
        setADCDisputes({
          ...ADCDisputes,
          [name]: 2,
        });
      } else if (value === 3) {
        setIosAndroid(3);
        setADCDisputes({
          ...ADCDisputes,
          [name]: 3,
        });
      }
    }

    if (
      name === "CaseReceivedChannel" ||
      name === "EventIDSAS" ||
      name === "Remarks" ||
      name === "PII" ||
      name === "CustomerClamiedInformation"
    ) {
      let spREmove = value.replace(/[^a-zA-Z0-9 ]/g, "");
      if (spREmove !== "") {
        setADCDisputes({
          ...ADCDisputes,
          [name]: spREmove.trimStart(),
        });
      } else {
        setADCDisputes({
          ...ADCDisputes,
          [name]: "",
        });
      }
    }
  };

  const [caseDecisionValue, setCaseDecisionValue] = useState([]);
  const [caseDecision, setCaseDecision] = useState("");

  useEffect(() => {
    dispatch(GetAllSourceOfIBChannelCreation());
    dispatch(GetAllSource());
    dispatch(GetAllCaseDecision());
    dispatch(GetAllCity());
    var ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
    var CNICNumber = JSON.parse(localStorage.getItem("CNICNumber"));
    var cnic2 = localStorage.getItem("cnic2");
    let data = { CNICNumber: CNICNumber, RefrenceNumber: ReferenceNumber };
    let data2 = { CNICNumber: cnic2, RefrenceNumber: ReferenceNumber };

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(data));
      dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(data2));
    }
  }, []);

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

  // // sourceofib type names selection for drop down
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
      title: "Beneficiary Account Number",
      dataIndex: "beneficiaryAccountNumber",
      key: "beneficiaryAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Beneficiary Bank Name",
      dataIndex: "beneficiaryBankName",
      key: "beneficiaryBankName",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "branchCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
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
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "center",
      width: "220px",
      // render: (text) => CommaFormter(text),
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
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
      render: (text) => TimeDisplayFormat(text),
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
      title: "Merchant Category Code",
      dataIndex: "merchantCategoryCodeMCC",
      key: "merchantCategoryCodeMCC",
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
      title: "Mobile # Culprit",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "IMEI # / MAC Address",
      dataIndex: "imeiNumber",
      key: "imeiNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "URL / websit",
      dataIndex: "url",
      key: "url",
      align: "center",
      width: "220px",
    },

    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
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
    var objIndex = ListOfADCTransactionDetailsObjects.findIndex(
      (obj) => obj.TransactionID === record.TransactionID,
    );
    // trsDetails, setTrsDetails
    setRecordIndex(objIndex);
    setRecords(record);
    setTrsDetails({
      ...trsDetails,
      TransactionID: record.TransactionID,
      BeneficiaryAccountNumber: record.BeneficiaryAccountNumber,
      BeneficiaryBankName: record.BeneficiaryBankName,
      TransactionAmount: record.TransactionAmount,
      DisputeAmount: record.DisputeAmount,
      ApprovalCode: record.ApprovalCode,
      POSMode: record.POSMode,
      MerchantID: record.MerchantID,
      MerchantCity: record.MerchantCity,
      ON_OFF_US: record.ON_OFF_US,
      MerchantCategoryCodeMCC: record.MerchantCategoryCodeMCC,
      MobileNumber: record.MobileNumber,
      IMEINumber: record.IMEINumber,
      URL: record.URL,
      IPAddress: record.IPAddress,
      FK_SID: record.FK_SID,
      TransactionDate: record.TransactionDate,
      TransactionTime: record.TransactionTime,
      HBLAccountNumber: record.HBLAccountNumber,
      BranchCode: record.BranchCode,
      BranchName: record.BranchName,
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
      title: "HBL Account Number",
      dataIndex: "HBLAccountNumber",
      key: "HBLAccountNumber",
      align: "center",
      width: "200px",
    },
    {
      title: "Beneficiary Account Number",
      dataIndex: "BeneficiaryAccountNumber",
      key: "BeneficiaryAccountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Beneficiary Bank Name",
      dataIndex: "BeneficiaryBankName",
      key: "BeneficiaryBankName",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Code",
      dataIndex: "BranchCode",
      key: "BranchCode",
      align: "center",
      width: "220px",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
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
      title: "Transaction Amount",
      dataIndex: "TransactionAmount",
      key: "TransactionAmount",
      align: "center",
      width: "220px",
      // render: (text) => CommaFormter(text),
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
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
      render: (text) => TimeDisplayFormat(text),
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
      title: "Merchant Category Code",
      dataIndex: "MerchantCategoryCodeMCC",
      key: "MerchantCategoryCodeMCC",
      align: "center",
      width: "200px",
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
      title: "Mobile # Culprit",
      dataIndex: "MobileNumber",
      key: "MobileNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "IMEI # / MAC Address",
      dataIndex: "IMEINumber",
      key: "IMEINumber",
      align: "center",
      width: "200px",
    },
    {
      title: "URL / website",
      dataIndex: "URL",
      key: "URL",
      align: "center",
      width: "220px",
    },
    {
      title: "IP Address",
      dataIndex: "IPAddress",
      key: "IPAddress",
      align: "center",
      width: "220px",
    },
    {
      title: "Edit",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: "220px",
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
      width: "220px",
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
      let totalAmmount = ADCDisputes.TotalTransactionAmount;
      var temp2 = ListOfADCTransactionDetailsObjects;
      let flag1 = false;
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
                    data.disputeAmount + ADCDisputes.TotalTransactionAmount;
                }
              }
            } else if (data.preIdentifiedDataType === 1) {
              data.preIdentifiedDataType = 2;
              if (data.disputeAmount > 0) {
                if (totalAmmount === -99999999999999999999) {
                  totalAmmount = data.disputeAmount;
                } else {
                  totalAmmount =
                    data.disputeAmount + ADCDisputes.TotalTransactionAmount;
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
        setADCDisputes({
          ...ADCDisputes,
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
        let totalAmmount = ADCDisputes.TotalTransactionAmount;
        var temp2 = ListOfADCTransactionDetailsObjects;
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
        setADCDisputes({
          ...ADCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
      } else {
        setSelect({
          ...select,
          selectedRowKeys: [],
        });
        var temp = listOfTransactionDetailsAlreadyExsist;
        let totalAmmount = ADCDisputes.TotalTransactionAmount;
        temp.map((data, index) => {
          if (data.preIdentifiedDataType === 0) {
            data.preIdentifiedDataType = 1;
          } else if (data.preIdentifiedDataType === 1) {
          } else if (data.preIdentifiedDataType === 2) {
            data.preIdentifiedDataType = 1;
            if (data.disputeAmount > 0) {
              if (totalAmmount === -99999999999999999999) {
                totalAmmount = data.disputeAmount;
              } else {
                totalAmmount = totalAmmount - data.disputeAmount;
              }
            }
          }
        });
        setListOfTransactionDetailsAlreadyExsist(temp);
        let stotal = parseFloat(totalAmmount).toFixed(2);
        setADCDisputes({
          ...ADCDisputes,
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

  useEffect(() => {}, [select]);
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
          GetIRISTransactionDetailsByTransactionIdADC(
            transtionid,
            setTrsDetails,
            setTransactionIDError,
            setTIDErrMsg,
            setSourceType,
          ),
        );
      }
    } else {
      await dispatch(
        GetIRISTransactionDetailsByTransactionIdADC(
          transtionid,
          setTrsDetails,
          setTransactionIDError,
          setTIDErrMsg,
          setSourceType,
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
  // transecton detail handler
  const TransactionDeatilHandlerChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (
      // name !=="HBLAccountNumber" &&
      name !== "TransactionDate" &&
      name !== "BeneficiaryAccountNumber" &&
      name !== "BeneficiaryBankName" &&
      name !== "BranchCode" &&
      name !== "DisputeAmount" &&
      name !== "TransactionAmount" &&
      // name !=="ApprovalCode" &&
      name !== "MerchantID" &&
      name !== "MerchantCategoryCodeMCC" &&
      name !== "MobileNumber" &&
      name !== "IMEINumber" &&
      name !== "ON_OFF_US" &&
      name !== "IPAddress" &&
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
    } else if (name === "BeneficiaryBankName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "BeneficiaryBankName" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "BeneficiaryAccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "BeneficiaryAccountNumber" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "BranchCode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "BranchCode" && value === "") {
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
    } else if (name === "MerchantCategoryCodeMCC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "MerchantCategoryCodeMCC" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (name === "MobileNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d]/g, "");
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
    } else if (name === "IMEINumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setTrsDetails({
          ...trsDetails,
          [name]: valueCheck,
        });
      }
    } else if (name === "IMEINumber" && value === "") {
      setTrsDetails({
        ...trsDetails,
        [name]: "",
      });
    } else if (
      (name === "TransactionAmount" || name === "DisputeAmount") &&
      value !== "" &&
      value !== -99999999999999999999
    ) {
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
      (name === "TransactionAmount" || name === "DisputeAmount") &&
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
        name !== "TransactionAmount" &&
        name !== "DisputeAmount" &&
        name !== "IPAddress"
      ) {
        setTrsDetails({
          ...trsDetails,
          [name]: "",
        });
      }
    }
    if (name === "IPAddress" && value !== "") {
      setTrsDetails({
        ...trsDetails,
        [name]: value,
      });
      // }
    } else {
      if (name === "IPAddress") {
        setTrsDetails({
          ...trsDetails,
          [name]: "",
        });
      }
    }
  };

  const checkData = (flag, flag2) => {
    let total = ADCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    if (flag === false || flag2 === false) {
      setOpen({
        ...open,
        flag: true,
        message: "Transaction ID Already Exists",
      });
    } else {
      if (
        trsDetails.TransactionID !== "" &&
        trsDetails.BeneficiaryAccountNumber !== "" &&
        trsDetails.BeneficiaryBankName !== "" &&
        trsDetails.TransactionAmount !== null &&
        trsDetails.TransactionAmount !== -99999999999999999999 &&
        trsDetails.DisputeAmount !== null &&
        trsDetails.DisputeAmount !== -99999999999999999999 &&
        trsDetails.ApprovalCode !== "" &&
        trsDetails.POSMode !== "" &&
        trsDetails.MerchantID !== "" &&
        trsDetails.MerchantCity !== "" &&
        trsDetails.ON_OFF_US !== null &&
        trsDetails.ON_OFF_US !== undefined &&
        trsDetails.MobileNumber !== "" &&
        trsDetails.IMEINumber !== "" &&
        trsDetails.URL !== "" &&
        trsDetails.IPAddress !== "" &&
        trsDetails.FK_SID !== 0 &&
        trsDetails.TransactionDate !== "" &&
        trsDetails.TransactionTime !== "" &&
        trsDetails.HBLAccountNumber !== "" &&
        trsDetails.BranchCode !== "" &&
        trsDetails.BranchName !== ""
      ) {
        setListOfADCTransactionDetailsObjects([
          ...ListOfADCTransactionDetailsObjects,
          trsDetails,
        ]);
        let stotal = parseFloat(total).toFixed(2);
        setADCDisputes({
          ...ADCDisputes,
          ["TotalTransactionAmount"]: parseFloat(stotal),
        });
        setTrsDetails({
          TransactionID: "",
          BeneficiaryAccountNumber: "",
          BeneficiaryBankName: "",
          TransactionAmount: -99999999999999999999,
          DisputeAmount: -99999999999999999999,
          ApprovalCode: "",
          POSMode: "",
          MerchantID: "",
          MerchantCity: "",
          ON_OFF_US: false,
          MerchantCategoryCodeMCC: "",
          MobileNumber: "",
          IMEINumber: "",
          URL: "",
          IPAddress: "",
          FK_SID: 0,
          TransactionDate: "",
          TransactionTime: "",
          HBLAccountNumber: accountNumber,
          BranchCode: "",
          BranchName: "",
          PreIdentifiedDataType: 3,
        });
        setTranstionid("");
        setSourceType("");
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
        let total = ADCDisputes.TotalTransactionAmount;
        if (total === -99999999999999999999) {
          total = trsDetails.DisputeAmount;
        } else {
          total = total + trsDetails.DisputeAmount;
        }
        let flag = true;
        let flag2 = true;
        if (
          ListOfADCTransactionDetailsObjects.length > 0 &&
          listOfTransactionDetailsAlreadyExsist.length > 0
        ) {
          ListOfADCTransactionDetailsObjects.map((data, index) => {
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
        } else if (ListOfADCTransactionDetailsObjects.length > 0) {
          ListOfADCTransactionDetailsObjects.map((data, index) => {
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
            trsDetails.BeneficiaryAccountNumber !== "" &&
            trsDetails.BeneficiaryBankName !== "" &&
            trsDetails.BranchCode !== 0 &&
            trsDetails.BranchName !== "" &&
            trsDetails.TransactionDate !== "" &&
            trsDetails.TransactionTime !== "" &&
            trsDetails.TransactionAmount !== null &&
            trsDetails.TransactionAmount !== -99999999999999999999 &&
            trsDetails.DisputeAmount !== null &&
            trsDetails.DisputeAmount !== -99999999999999999999 &&
            trsDetails.ApprovalCode !== "" &&
            trsDetails.POSMode !== "" &&
            trsDetails.MerchantID !== "" &&
            trsDetails.MerchantCity !== "" &&
            trsDetails.MerchantCategoryCodeMCC !== "" &&
            trsDetails.MobileNumber !== "" &&
            trsDetails.IMEINumber !== "" &&
            trsDetails.URL !== "" &&
            trsDetails.IPAddress !== "" &&
            trsDetails.FK_SID !== 0 &&
            trsDetails.BranchCode !== "" &&
            trsDetails.BranchName !== ""
          ) {
            let stotal = parseFloat(total).toFixed(2);
            setADCDisputes({
              ...ADCDisputes,
              ["TotalTransactionAmount"]: parseFloat(stotal),
            });
            setListOfADCTransactionDetailsObjects([
              ...ListOfADCTransactionDetailsObjects,
              trsDetails,
            ]);
            setTrsDetails({
              TransactionID: "",
              BeneficiaryAccountNumber: "",
              BeneficiaryBankName: "",
              TransactionAmount: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              ApprovalCode: "",
              POSMode: "",
              MerchantID: "",
              MerchantCity: "",
              ON_OFF_US: false,
              MerchantCategoryCodeMCC: "",
              MobileNumber: "",
              IMEINumber: "",
              URL: "",
              IPAddress: "",
              FK_SID: 0,
              TransactionDate: "",
              TransactionTime: "",
              HBLAccountNumber: accountNumber,
              BranchCode: "",
              BranchName: "",
              PreIdentifiedDataType: 3,
            });
            setTranstionid("");
            setSourceType("");
          } else {
            setOpen({
              flag: true,
              message: "Enter Required Fields",
            });
          }
        }
      }
    } else {
      let total = ADCDisputes.TotalTransactionAmount;
      if (total === -99999999999999999999) {
        total = trsDetails.DisputeAmount;
      } else {
        total = total + trsDetails.DisputeAmount;
      }
      let flag = true;
      let flag2 = true;
      if (
        ListOfADCTransactionDetailsObjects.length > 0 &&
        listOfTransactionDetailsAlreadyExsist.length > 0
      ) {
        ListOfADCTransactionDetailsObjects.map((data, index) => {
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
      } else if (ListOfADCTransactionDetailsObjects.length > 0) {
        ListOfADCTransactionDetailsObjects.map((data, index) => {
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
          trsDetails.BeneficiaryAccountNumber !== "" &&
          trsDetails.BeneficiaryBankName !== "" &&
          trsDetails.BranchCode !== 0 &&
          trsDetails.BranchName !== "" &&
          trsDetails.TransactionDate !== "" &&
          trsDetails.TransactionTime !== "" &&
          trsDetails.TransactionAmount !== null &&
          trsDetails.TransactionAmount !== -99999999999999999999 &&
          trsDetails.DisputeAmount !== null &&
          trsDetails.DisputeAmount !== -99999999999999999999 &&
          trsDetails.ApprovalCode !== "" &&
          trsDetails.POSMode !== "" &&
          trsDetails.MerchantID !== "" &&
          trsDetails.MerchantCity !== "" &&
          trsDetails.MerchantCategoryCodeMCC !== "" &&
          trsDetails.MobileNumber !== "" &&
          trsDetails.IMEINumber !== "" &&
          trsDetails.URL !== "" &&
          trsDetails.IPAddress !== "" &&
          trsDetails.FK_SID !== 0 &&
          trsDetails.BranchCode !== "" &&
          trsDetails.BranchName !== ""
        ) {
          let stotal = parseFloat(total).toFixed(2);
          setADCDisputes({
            ...ADCDisputes,
            ["TotalTransactionAmount"]: parseFloat(stotal),
          });
          setListOfADCTransactionDetailsObjects([
            ...ListOfADCTransactionDetailsObjects,
            trsDetails,
          ]);
          setTrsDetails({
            TransactionID: "",
            BeneficiaryAccountNumber: "",
            BeneficiaryBankName: "",
            TransactionAmount: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            ApprovalCode: "",
            POSMode: "",
            MerchantID: "",
            MerchantCity: "",
            ON_OFF_US: false,
            MerchantCategoryCodeMCC: "",
            MobileNumber: "",
            IMEINumber: "",
            URL: "",
            IPAddress: "",
            FK_SID: 0,
            TransactionDate: "",
            TransactionTime: "",
            HBLAccountNumber: accountNumber,
            BranchCode: "",
            BranchName: "",
            PreIdentifiedDataType: 3,
          });
          setTranstionid("");
          setSourceType("");
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
        if (ListOfADCTransactionDetailsObjects) {
          let flag1 = true;
          let flag2 = true;
          await ListOfADCTransactionDetailsObjects.map((data, index) => {
            if (data.TransactionID === trsDetails.TransactionID) {
              if (recordIndex !== index) {
                if (
                  trsDetails.TransactionID !== "" &&
                  trsDetails.HBLAccountNumber !== "" &&
                  trsDetails.OtherBankAccountNumber !== "" &&
                  trsDetails.OtherBankBranchCode !== "" &&
                  trsDetails.TransactionAmount !== null &&
                  trsDetails.TransactionAmount !== -99999999999999999999 &&
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
              }
            });
          }
          checkDataForUpdate(flag1, flag2);
        }
      }
    } else {
      var flag1 = true;
      var flag2 = true;
      if (ListOfADCTransactionDetailsObjects) {
        await ListOfADCTransactionDetailsObjects.map((data, index) => {
          if (data.TransactionID === trsDetails.TransactionID) {
            if (recordIndex !== index) {
              if (
                trsDetails.TransactionID !== "" &&
                trsDetails.HBLAccountNumber !== "" &&
                trsDetails.OtherBankAccountNumber !== "" &&
                trsDetails.OtherBankBranchCode !== "" &&
                trsDetails.TransactionAmount !== null &&
                trsDetails.TransactionAmount !== -99999999999999999999 &&
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
    let total = ADCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
    } else {
      total = total - records.DisputeAmount;
    }
    let newTotal = total + trsDetails.DisputeAmount;
    let stotal = parseFloat(newTotal).toFixed(2);
    setADCDisputes({
      ...ADCDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    ListOfADCTransactionDetailsObjects[recordIndex] = trsDetails;
    await setListOfADCTransactionDetailsObjects([
      ...ListOfADCTransactionDetailsObjects,
    ]);
    setTrsDetails({
      TransactionID: "",
      BeneficiaryAccountNumber: "",
      BeneficiaryBankName: "",
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      ApprovalCode: "",
      POSMode: "",
      MerchantID: "",
      MerchantCity: "",
      ON_OFF_US: false,
      MerchantCategoryCodeMCC: "",
      MobileNumber: "",
      IMEINumber: "",
      URL: "",
      IPAddress: "",
      FK_SID: 0,
      TransactionDate: "",
      TransactionTime: "",
      HBLAccountNumber: accountNumber,
      BranchCode: "",
      BranchName: "",
      PreIdentifiedDataType: 3,
    });
    setTranstionid("");
    setSourceType("");
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
    let testVariable = ListOfADCTransactionDetailsObjects.indexOf(records);
    ListOfADCTransactionDetailsObjects.splice(testVariable, 1);
    let total = ADCDisputes.TotalTransactionAmount;
    if (total === -99999999999999999999) {
      total = trsDetails.DisputeAmount;
    } else {
      total = total + trsDetails.DisputeAmount;
    }
    let TotalTransactionAmount =
      ADCDisputes.TotalTransactionAmount - records.DisputeAmount;
    let stotal = parseFloat(TotalTransactionAmount).toFixed(2);
    setADCDisputes({
      ...ADCDisputes,
      ["TotalTransactionAmount"]: parseFloat(stotal),
    });
    setListOfADCTransactionDetailsObjects([
      ...ListOfADCTransactionDetailsObjects,
    ]);
    setIsModalVisible(false);
    setRecords([]);
  };

  const handleCancel = () => {
    setTrsDetails({
      ...ListOfADCTransactionDetailsObjects,
      TransactionID: "",
      BeneficiaryAccountNumber: "",
      BeneficiaryBankName: "",
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      ApprovalCode: "",
      POSMode: "",
      MerchantID: "",
      MerchantCity: "",
      ON_OFF_US: false,
      MerchantCategoryCodeMCC: "",
      MobileNumber: "",
      IMEINumber: "",
      URL: "",
      IPAddress: "",
      FK_SID: 0,
      TransactionDate: "",
      TransactionTime: "",
      HBLAccountNumber: accountNumber,
      BranchCode: "",
      BranchName: "",
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
      if (ListOfADCDisputeDocuments.length > 0) {
        ListOfADCDisputeDocuments.map((filename, index) => {
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
          dispatch(UploadFileADC(uploadedFile));
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
          dispatch(UploadFileADC(uploadedFile));
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
        PK_ADCDDID: 0,
        FK_GSSUserID: 0,
        FK_ADCID: 0,
        OriginalFileName: newData.originalFileName,
        DisplayFileName: newData.displayFileName,
      };
      setListOfADCDisputeDocuments([...ListOfADCDisputeDocuments, Data]);
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

  // Delete Upload Document
  const deleteUploadDocument = (record) => {
    var objIndex = ListOfADCDisputeDocuments.findIndex(
      (obj) =>
        obj.DisplayFileName === record.DisplayFileName &&
        obj.FK_ADCID === record.FK_ADCID &&
        obj.FK_GSSUserID === record.FK_GSSUserID &&
        obj.PK_ADCDDID === record.PK_ADCDDID &&
        obj.DisplayFileName === record.DisplayFileName,
    );
    var temp = [];
    ListOfADCDisputeDocuments.map((data, index) => {
      temp.push({
        ...ListOfADCDisputeDocuments[index],
        FK_ADCID: data.FK_ADCID,
        OriginalFileName: objIndex === index ? "" : data.OriginalFileName,
        DisplayFileName: objIndex === index ? "" : data.DisplayFileName,
        FK_GSSUserID: data.FK_GSSUserID,
        PK_ADCDDID: data.PK_ADCDDID,
      });
    });
    setListOfADCDisputeDocuments(temp);
  };

  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 3,
    };
    dispatch(DownloadUploadFile(data));
  };
  const getFilter = () => {
    let filteredItems = ListOfADCDisputeDocuments;
    filteredItems = ListOfADCDisputeDocuments.filter(
      (item) => item.DisplayFileName !== "",
    );
    return filteredItems;
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

  //  FOR SAVE
  const goToSaveHandler = async (e) => {
    var ReferenceNumbersave = JSON.parse(
      localStorage.getItem("ReferenceNumber"),
    );
    e.preventDefault();
    if (saveValue === 1) {
      if (ListOfADCTransactionDetailsObjects.length > 0) {
        if (listOfTransactionDetailsAlreadyExsist.length > 0) {
          let newdata = ListOfADCTransactionDetailsObjects;
          let Amount = 0;
          await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
            if (data.preIdentifiedDataType === 2) {
              Amount = Amount + data.disputeAmount;
              newdata.push({
                ApprovalCode: data.approvalCode,
                BeneficiaryAccountNumber: data.beneficiaryAccountNumber,
                BeneficiaryBankName: data.beneficiaryBankName,
                BranchCode: data.branchCode,
                BranchName: data.branchName,
                DisputeAmount: data.disputeAmount,
                FK_SID: data.fK_SID,
                HBLAccountNumber: data.hblAccountNumber,
                IMEINumber: data.imeiNumber,
                IPAddress: data.ipAddress,
                MerchantCategoryCodeMCC: data.merchantCategoryCodeMCC,
                MerchantCity: data.MerchantCity,
                MerchantID: data.merchantID,
                MobileNumber: data.mobileNumber,
                ON_OFF_US: data.oN_OFF_US,
                POSMode: data.posMode,
                PreIdentifiedDataType: data.preIdentifiedDataType,
                TransactionAmount: data.transactionAmount,
                TransactionDate: data.transactionDate,
                TransactionID: data.transactionID,
                TransactionTime: data.transactionTime,
                URL: data.url,
              });
            }
          });
          await setListOfADCTransactionDetailsObjects(newdata);
          let ADCDispute = {
            CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
            CaseReceivedDate: ADCDisputes.CaseReceivedDate,
            RegistrationDate: ADCDisputes.RegistrationDate,
            IsCaseResolved: ADCDisputes.IsCaseResolved,
            TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
            CaseClosedTAT: ADCDisputes.CaseClosedTAT,
            ExpectedRecovery: ADCDisputes.ExpectedRecovery,
            FK_CSID: 1,
            FK_CDEID: ADCDisputes.FK_CDEID,
            IsFlexiLoan: ADCDisputes.IsFlexiLoan,
            IsDemographicChange: ADCDisputes.IsDemographicChange,
            PII: ADCDisputes.PII,
            CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
            EventIDSAS: ADCDisputes.EventIDSAS,
            ExpectedRecoveryFromHBLBeneficiary:
              ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
            ExpectedRecoveryFromMemberBankBeneficiary:
              ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
            CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
            FundLayeredAC: ADCDisputes.FundLayeredAC,
            Android_ISO: ADCDisputes.Android_ISO,
            FK_SIBCCID: ADCDisputes.FK_SIBCCID,
            Remarks: ADCDisputes.Remarks,
            FromDateForPreIdentifiedData:
              ADCDisputes.FromDateForPreIdentifiedData,
            ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
            RefrenceNumber: ReferenceNumbersave,
          };
          await setADCDisputes(ADCDispute);
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
            FK_CTID: 0,
          };
          let DataForGlobalDate = {
            from: "",
            to: "",
          };
          dispatch(
            UpdateADCDisputeDetails(
              data,
              searchData,
              searchDataofdate,
              DataForGlobal,
              DataForGlobalDate,
            ),
          );
          setAddInedx([]);
        } else {
          let ADCDispute = {
            CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
            CaseReceivedDate: ADCDisputes.CaseReceivedDate,
            RegistrationDate: ADCDisputes.RegistrationDate,
            IsCaseResolved: ADCDisputes.IsCaseResolved,
            TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
            CaseClosedTAT: ADCDisputes.CaseClosedTAT,
            ExpectedRecovery: ADCDisputes.ExpectedRecovery,
            FK_CSID: 1,
            FK_CDEID: ADCDisputes.FK_CDEID,
            IsFlexiLoan: ADCDisputes.IsFlexiLoan,
            IsDemographicChange: ADCDisputes.IsDemographicChange,
            PII: ADCDisputes.PII,
            CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
            EventIDSAS: ADCDisputes.EventIDSAS,
            ExpectedRecoveryFromHBLBeneficiary:
              ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
            ExpectedRecoveryFromMemberBankBeneficiary:
              ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
            CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
            FundLayeredAC: ADCDisputes.FundLayeredAC,
            Android_ISO: ADCDisputes.Android_ISO,
            FK_SIBCCID: ADCDisputes.FK_SIBCCID,
            Remarks: ADCDisputes.Remarks,
            FromDateForPreIdentifiedData:
              ADCDisputes.FromDateForPreIdentifiedData,
            ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
            RefrenceNumber: ReferenceNumbersave,
          };
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
            FK_CTID: 0,
          };
          let DataForGlobalDate = {
            from: "",
            to: "",
          };
          dispatch(
            UpdateADCDisputeDetails(
              data,
              searchData,
              searchDataofdate,
              DataForGlobal,
              DataForGlobalDate,
            ),
          );
        }
      } else if (listOfTransactionDetailsAlreadyExsist.length > 0) {
        let newdata = ListOfADCTransactionDetailsObjects;
        let Amount = 0;
        await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
          if (data.preIdentifiedDataType === 2) {
            Amount = Amount + data.disputeAmount;
            newdata.push({
              ApprovalCode: data.approvalCode,
              BeneficiaryAccountNumber: data.beneficiaryAccountNumber,
              BeneficiaryBankName: data.beneficiaryBankName,
              BranchCode: data.branchCode,
              BranchName: data.branchName,
              DisputeAmount: data.disputeAmount,
              FK_SID: data.fK_SID,
              HBLAccountNumber: data.hblAccountNumber,
              IMEINumber: data.imeiNumber,
              IPAddress: data.ipAddress,
              MerchantCategoryCodeMCC: data.merchantCategoryCodeMCC,
              MerchantCity: data.MerchantCity,
              MerchantID: data.merchantID,
              MobileNumber: data.mobileNumber,
              ON_OFF_US: data.oN_OFF_US,
              POSMode: data.posMode,
              PreIdentifiedDataType: data.preIdentifiedDataType,
              TransactionAmount: data.transactionAmount,
              TransactionDate: data.transactionDate,
              TransactionID: data.transactionID,
              TransactionTime: data.transactionTime,
              URL: data.url,
            });
          }
        });
        let ADCDispute = {
          CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
          CaseReceivedDate: ADCDisputes.CaseReceivedDate,
          RegistrationDate: ADCDisputes.RegistrationDate,
          IsCaseResolved: ADCDisputes.IsCaseResolved,
          TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
          CaseClosedTAT: ADCDisputes.CaseClosedTAT,
          ExpectedRecovery: ADCDisputes.ExpectedRecovery,
          FK_CSID: 1,
          FK_CDEID: ADCDisputes.FK_CDEID,
          IsFlexiLoan: ADCDisputes.IsFlexiLoan,
          IsDemographicChange: ADCDisputes.IsDemographicChange,
          PII: ADCDisputes.PII,
          CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
          EventIDSAS: ADCDisputes.EventIDSAS,
          ExpectedRecoveryFromHBLBeneficiary:
            ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
          ExpectedRecoveryFromMemberBankBeneficiary:
            ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
          CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
          FundLayeredAC: ADCDisputes.FundLayeredAC,
          Android_ISO: ADCDisputes.Android_ISO,
          FK_SIBCCID: ADCDisputes.FK_SIBCCID,
          Remarks: ADCDisputes.Remarks,
          FromDateForPreIdentifiedData:
            ADCDisputes.FromDateForPreIdentifiedData,
          ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
          RefrenceNumber: ReferenceNumbersave,
        };
        if (newdata.length > 0) {
          await setADCDisputes(ADCDispute);
          await setListOfADCTransactionDetailsObjects(newdata);
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
            FK_CTID: 0,
          };
          let DataForGlobalDate = {
            from: "",
            to: "",
          };
          dispatch(
            UpdateADCDisputeDetails(
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
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    } else if (saveValue === 2) {
      if (ListOfADCTransactionDetailsObjects.length > 0) {
        if (listOfTransactionDetailsAlreadyExsist.length > 0) {
          let newdata = ListOfADCTransactionDetailsObjects;
          await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
            if (data.preIdentifiedDataType === 2) {
              newdata.push({
                ApprovalCode: data.approvalCode,
                BeneficiaryAccountNumber: data.beneficiaryAccountNumber,
                BeneficiaryBankName: data.beneficiaryBankName,
                BranchCode: data.branchCode,
                BranchName: data.branchName,
                DisputeAmount: data.disputeAmount,
                FK_SID: data.fK_SID,
                HBLAccountNumber: data.hblAccountNumber,
                IMEINumber: data.imeiNumber,
                IPAddress: data.ipAddress,
                MerchantCategoryCodeMCC: data.merchantCategoryCodeMCC,
                MerchantCity: data.MerchantCity,
                MerchantID: data.merchantID,
                MobileNumber: data.mobileNumber,
                ON_OFF_US: data.oN_OFF_US,
                POSMode: data.posMode,
                PreIdentifiedDataType: data.preIdentifiedDataType,
                TransactionAmount: data.transactionAmount,
                TransactionDate: data.transactionDate,
                TransactionID: data.transactionID,
                TransactionTime: data.transactionTime,
                URL: data.url,
              });
            }
          });
          await setListOfADCTransactionDetailsObjects(newdata);
          let ADCDispute = {
            CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
            CaseReceivedDate: ADCDisputes.CaseReceivedDate,
            RegistrationDate: ADCDisputes.RegistrationDate,
            IsCaseResolved: ADCDisputes.IsCaseResolved,
            TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
            CaseClosedTAT: ADCDisputes.CaseClosedTAT,
            ExpectedRecovery: ADCDisputes.ExpectedRecovery,
            FK_CSID: 1,
            FK_CDEID: ADCDisputes.FK_CDEID,
            IsFlexiLoan: ADCDisputes.IsFlexiLoan,
            IsDemographicChange: ADCDisputes.IsDemographicChange,
            PII: ADCDisputes.PII,
            CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
            EventIDSAS: ADCDisputes.EventIDSAS,
            ExpectedRecoveryFromHBLBeneficiary:
              ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
            ExpectedRecoveryFromMemberBankBeneficiary:
              ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
            CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
            FundLayeredAC: ADCDisputes.FundLayeredAC,
            Android_ISO: ADCDisputes.Android_ISO,
            FK_SIBCCID: ADCDisputes.FK_SIBCCID,
            Remarks: ADCDisputes.Remarks,
            FromDateForPreIdentifiedData:
              ADCDisputes.FromDateForPreIdentifiedData,
            ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
            RefrenceNumber: ReferenceNumbersave,
          };
          await setADCDisputes(ADCDispute);
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
          if (data.ADCDispute.FK_CDEID === 0) {
            setOpen({
              flag: true,
              message: "Select Case Decision ",
            });
          } else if (data.ADCDispute.FK_CDEID !== 0) {
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
              FK_CTID: 0,
            };
            let DataForGlobalDate = {
              from: "",
              to: "",
            };
            dispatch(
              UpdateAndApproveADCDisputeDetails(
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
          let ADCDispute = {
            CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
            CaseReceivedDate: ADCDisputes.CaseReceivedDate,
            RegistrationDate: ADCDisputes.RegistrationDate,
            IsCaseResolved: ADCDisputes.IsCaseResolved,
            TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
            CaseClosedTAT: ADCDisputes.CaseClosedTAT,
            ExpectedRecovery: ADCDisputes.ExpectedRecovery,
            FK_CSID: 1,
            FK_CDEID: ADCDisputes.FK_CDEID,
            IsFlexiLoan: ADCDisputes.IsFlexiLoan,
            IsDemographicChange: ADCDisputes.IsDemographicChange,
            PII: ADCDisputes.PII,
            CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
            EventIDSAS: ADCDisputes.EventIDSAS,
            ExpectedRecoveryFromHBLBeneficiary:
              ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
            ExpectedRecoveryFromMemberBankBeneficiary:
              ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
            CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
            FundLayeredAC: ADCDisputes.FundLayeredAC,
            Android_ISO: ADCDisputes.Android_ISO,
            FK_SIBCCID: ADCDisputes.FK_SIBCCID,
            Remarks: ADCDisputes.Remarks,
            FromDateForPreIdentifiedData:
              ADCDisputes.FromDateForPreIdentifiedData,
            ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
            RefrenceNumber: ReferenceNumbersave,
          };
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
          if (data.ADCDispute.FK_CDEID === 0) {
            setOpen({
              flag: true,
              message: "Enter Case Decision ",
            });
          } else if (data.ADCDispute.FK_CDEID !== 0) {
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
              FK_CTID: 0,
            };
            let DataForGlobalDate = {
              from: "",
              to: "",
            };
            dispatch(
              UpdateAndApproveADCDisputeDetails(
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
        let newdata = ListOfADCTransactionDetailsObjects;
        await listOfTransactionDetailsAlreadyExsist.map((data, ind) => {
          if (data.preIdentifiedDataType === 2) {
            newdata.push({
              ApprovalCode: data.approvalCode,
              BeneficiaryAccountNumber: data.beneficiaryAccountNumber,
              BeneficiaryBankName: data.beneficiaryBankName,
              BranchCode: data.branchCode,
              BranchName: data.branchName,
              DisputeAmount: data.disputeAmount,
              FK_SID: data.fK_SID,
              HBLAccountNumber: data.hblAccountNumber,
              IMEINumber: data.imeiNumber,
              IPAddress: data.ipAddress,
              MerchantCategoryCodeMCC: data.merchantCategoryCodeMCC,
              MerchantCity: data.MerchantCity,
              MerchantID: data.merchantID,
              MobileNumber: data.mobileNumber,
              ON_OFF_US: data.oN_OFF_US,
              POSMode: data.posMode,
              PreIdentifiedDataType: data.preIdentifiedDataType,
              TransactionAmount: data.transactionAmount,
              TransactionDate: data.transactionDate,
              TransactionID: data.transactionID,
              TransactionTime: data.transactionTime,
              URL: data.url,
            });
          }
        });
        let ADCDispute = {
          CaseReceivedChannel: ADCDisputes.CaseReceivedChannel,
          CaseReceivedDate: ADCDisputes.CaseReceivedDate,
          RegistrationDate: ADCDisputes.RegistrationDate,
          IsCaseResolved: ADCDisputes.IsCaseResolved,
          TotalTransactionAmount: ADCDisputes.TotalTransactionAmount,
          CaseClosedTAT: ADCDisputes.CaseClosedTAT,
          ExpectedRecovery: ADCDisputes.ExpectedRecovery,
          FK_CSID: 1,
          FK_CDEID: ADCDisputes.FK_CDEID,
          IsFlexiLoan: ADCDisputes.IsFlexiLoan,
          IsDemographicChange: ADCDisputes.IsDemographicChange,
          PII: ADCDisputes.PII,
          CustomerClamiedInformation: ADCDisputes.CustomerClamiedInformation,
          EventIDSAS: ADCDisputes.EventIDSAS,
          ExpectedRecoveryFromHBLBeneficiary:
            ADCDisputes.ExpectedRecoveryFromHBLBeneficiary,
          ExpectedRecoveryFromMemberBankBeneficiary:
            ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary,
          CustomerSimBlocked: ADCDisputes.CustomerSimBlocked,
          FundLayeredAC: ADCDisputes.FundLayeredAC,
          Android_ISO: ADCDisputes.Android_ISO,
          FK_SIBCCID: ADCDisputes.FK_SIBCCID,
          Remarks: ADCDisputes.Remarks,
          FromDateForPreIdentifiedData:
            ADCDisputes.FromDateForPreIdentifiedData,
          ToDateForPreIdentifiedData: ADCDisputes.ToDateForPreIdentifiedData,
          RefrenceNumber: ReferenceNumbersave,
        };
        if (newdata.length > 0) {
          await setADCDisputes(ADCDispute);
          await setListOfADCTransactionDetailsObjects(newdata);
          let data = {
            FDCustomer,
            CardDetails,
            ADCDispute,
            ListOfADCTransactionDetailsObjects,
            ListOfADCDisputeDocuments,
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
          if (data.ADCDispute.FK_CDEID === 0) {
            setOpen({
              flag: true,
              message: "Enter Case Decision ",
            });
          } else if (data.ADCDispute.FK_CDEID !== 0) {
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
              FK_CTID: 0,
            };
            let DataForGlobalDate = {
              from: "",
              to: "",
            };
            dispatch(
              UpdateAndApproveADCDisputeDetails(
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
        setOpen({
          flag: true,
          message: "Enter atleast One Transaction Detail",
        });
      }
    }
  };

  const proceedRefresh = (e, record) => {
    setADCDisputes({
      FK_FTID: 0,
      CaseReceivedChannel: "",
      CaseResolvedDate: "",
      CaseReceivedDate: removeDashesFromDate(date),
      IsCaseResolved: false,
      TotalTransactionAmount: -99999999999999999999,
      IsTC40Reporting: false,
      TC40ReportingDate: "",
      SafeReportingDate: "",
      IsSafeReportingDate: false,
      FK_CSID: 1,
      FK_CDEID: 0,
      IsPOC: false,
      POCIdentified: "",
      EventIDSAS: "",
      CaseClosedTAT: -1,
      InFavourOfCM: "",
      CustomerLiability: "",
      Remarks: "",
    });
    setListOfADCTransactionDetailsObjects([]);
    setTrsDetails({
      TransactionID: "",
      BeneficiaryAccountNumber: "",
      BeneficiaryBankName: "",
      TransactionAmount: -99999999999999999999,
      DisputeAmount: -99999999999999999999,
      ApprovalCode: "",
      POSMode: "",
      MerchantID: "",
      MerchantCity: "",
      ON_OFF_US: false,
      MerchantCategoryCodeMCC: "",
      MobileNumber: "",
      IMEINumber: "",
      URL: "",
      IPAddress: "",
      FK_SID: 0,
      TransactionDate: "",
      TransactionTime: "",
      HBLAccountNumber: accountNumber,
      BranchCode: "",
      BranchName: "",
      PreIdentifiedDataType: 3,
    });
    setListOfADCDisputeDocuments([]);
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
    setCaseDecisionValue("");
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

  // sourceofib type names selection for drop down
  useEffect(() => {
    let nameSourceOfIB = setupForms.SourceOfIBChannelCreationData;
    setSourceOfIB(
      nameSourceOfIB.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.SourceOfIBChannelCreationData]);

  // SourceofIB handler
  const SourceOfIBNameHandler = (e, value) => {
    setSourceOfIBName(value);
    let nameSourceOfIB = setupForms.SourceOfIBChannelCreationData;
    nameSourceOfIB.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_SIBCCID;
        setADCDisputes({
          ...ADCDisputes,
          ["FK_SIBCCID"]: parseInt(id),
        });
      }
    });
  };

  useEffect(() => {
    let nameSourceOfIB = setupForms.SourceOfIBChannelCreationData;
    nameSourceOfIB.map((data, index) => {
      if (ADCDisputes.FK_SIBCCID === data.pK_SIBCCID) {
        setSourceOfIBName(data.name);
        setADCDisputes({
          ...ADCDisputes,
          ["FK_SIBCCID"]: parseInt(data.pK_SIBCCID),
        });
      }
    });
  }, [setupForms.SourceOfIBChannelCreationData]);

  useEffect(() => {}, [sourceOfIB]);

  // Case Decision handler
  const CaseDecisionHandler = (e, value) => {
    setCaseDecisionValue(value);
    let valueCaseDecision = setupForms.CaseDecisionData;
    valueCaseDecision.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CDEID;
        setADCDisputes({
          ...ADCDisputes,
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
      if (ADCDisputes.FK_CDEID === data.pK_CDEID) {
        setCaseDecisionValue(data.name);
        setADCDisputes({
          ...ADCDisputes,
          ["FK_CDEID"]: parseInt(data.pK_CDEID),
        });
      }
    });
  }, [setupForms.CaseDecisionData]);
  //   used for already exsit data of customer details for add
  useEffect(() => {
    let cardDetail = investigationOfficer.GetADCDisputesForEditData.cardDetails;
    let customerDetail =
      investigationOfficer.GetADCDisputesForEditData.fdCustomer;
    let transactionDetail =
      investigationOfficer.GetADCDisputesForEditData.transactionDetails;
    let irisTransactionDetails =
      investigationOfficer.GetADCDisputesForEditData.irisTransactionDetails;
    let adcDisputesDetail =
      investigationOfficer.GetADCDisputesForEditData.adcDispute;
    let listOfADCDocuments =
      investigationOfficer.GetADCDisputesForEditData.listOfADCDisputeDocuments;
    if (cardDetail !== undefined && cardDetail !== null) {
      setCardDetails({
        ...CardDetails,
        CardNumber: "",
      });
      sefDCusotmerAccount({
        ...fDCusotmerAccount,
        ["AccountNumber"]: cardDetail.accountNumber,
      });
    }
    if (customerDetail !== undefined && customerDetail !== null) {
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
      setFDCustomer({
        CNICNumber: customerDetail.cnicNumber,
        CustomerName: customerDetail.customerName,
        FK_CTID: customerDetail.fK_CTID,
      });
      let nameCity = setupForms.CityData;
      nameCity.map((data, index) => {
        if (customerDetail.fK_CTID === data.pK_CTID) {
          setCityValue(data.name);
        }
      });
    }
    if (transactionDetail !== undefined && transactionDetail !== null) {
      let tem = [];
      transactionDetail.map((data, index) => {
        tem.push({
          ApprovalCode: data.approvalCode,
          BeneficiaryAccountNumber: data.beneficiaryAccountNumber,
          BeneficiaryBankName: data.beneficiaryBankName,
          BranchCode: data.branchCode,
          BranchName: data.branchName,
          DisputeAmount: data.disputeAmount,
          FK_SID: data.fK_SID,
          HBLAccountNumber: data.hblAccountNumber,
          IMEINumber: data.imeiNumber,
          IPAddress: data.ipAddress,
          MerchantCategoryCodeMCC: data.merchantCategoryCodeMCC,
          MerchantCity: data.merchantCity,
          MerchantID: data.merchantID,
          MobileNumber: data.mobileNumber,
          ON_OFF_US: data.oN_OFF_US,
          POSMode: data.posMode,
          PreIdentifiedDataType: 3,
          TransactionAmount: data.transactionAmount,
          TransactionDate: data.transactionDate,
          TransactionID: data.transactionID,
          TransactionTime: data.transactionTime,
          URL: data.url,
        });
        setListOfADCTransactionDetailsObjects(tem);
      });
    }
    if (
      irisTransactionDetails !== undefined &&
      irisTransactionDetails !== null
    ) {
      let GetTransactionDetailsByCNICArray = irisTransactionDetails.map(
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
    if (adcDisputesDetail !== undefined && adcDisputesDetail !== null) {
      setADCDisputes({
        CaseReceivedChannel: adcDisputesDetail.caseReceivedChannel,
        CaseReceivedDate: adcDisputesDetail.caseReceivedDate,
        RegistrationDate: adcDisputesDetail.registrationDate,
        RefrenceNumber: adcDisputesDetail.refrenceNumber,
        IsCaseResolved: adcDisputesDetail.isCaseResolved,
        TotalTransactionAmount: adcDisputesDetail.totalTransactionAmount,
        CaseClosedTAT: adcDisputesDetail.caseClosedTAT,
        Aging: adcDisputesDetail.caseAging,
        ExpectedRecovery: adcDisputesDetail.expectedRecovery,
        FK_CSID: adcDisputesDetail.fK_CSID,
        FK_CDEID: adcDisputesDetail.fK_CDEID,
        IsFlexiLoan: adcDisputesDetail.isFlexiLoan,
        IsDemographicChange: adcDisputesDetail.isDemographicChange,
        PII: adcDisputesDetail.pii,
        CustomerClamiedInformation:
          adcDisputesDetail.customerClamiedInformation,
        EventIDSAS: adcDisputesDetail.eventIDSAS,
        ExpectedRecoveryFromHBLBeneficiary:
          adcDisputesDetail.expectedRecoveryFromHBLBeneficiary,
        ExpectedRecoveryFromMemberBankBeneficiary:
          adcDisputesDetail.expectedRecoveryFromMemberBankBeneficiary,
        CustomerSimBlocked: adcDisputesDetail.customerSimBlocked,
        FundLayeredAC: adcDisputesDetail.fundLayeredAC,
        Android_ISO: adcDisputesDetail.android_ISO,
        FK_SIBCCID: adcDisputesDetail.fK_SIBCCID,
        Remarks: adcDisputesDetail.remarks,
        FromDateForPreIdentifiedData:
          adcDisputesDetail.fromDateForPreIdentifiedData,
        ToDateForPreIdentifiedData:
          adcDisputesDetail.toDateForPreIdentifiedData,
      });
      let nameSourceOfIB = setupForms.SourceOfIBChannelCreationData;
      nameSourceOfIB.map((data, index) => {
        if (adcDisputesDetail.fK_SIBCCID === data.pK_SIBCCID) {
          setSourceOfIBName(data.name);
        }
      });
      //CaseDecisions
      let caseDecisionValue = setupForms.CaseDecisionData;
      caseDecisionValue.map((data, index) => {
        if (adcDisputesDetail.fK_CDEID === data.pK_CDEID) {
          setCaseDecisionValue(data.name);
        }
      });
    }
    if (listOfADCDocuments !== undefined && listOfADCDocuments !== null) {
      let tem = [];
      listOfADCDocuments.map((data, index) => {
        tem.push({
          PK_ADCDDID: data.pK_ADCDDID,
          FK_ADCID: data.fK_ADCID,
          FK_GSSUserID: data.fK_GSSUserID,
          OriginalFileName: data.originalFileName,
          DisplayFileName: data.displayFileName,
        });
      });
      setListOfADCDisputeDocuments(tem);
    }
  }, [investigationOfficer.GetADCDisputesForEditData]);
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
                value={ADCDisputes.RefrenceNumber}
                disable
                label={"Reference #"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer Name"
                disable
                value={customerDetails.customerName}
                label={"Customer Name"}
                fullWidth
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select City"
                option={city}
                value={cityValue}
                change={CityNameHandler}
                name="FK_CTID"
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
                autoComplete="off"
                helperText={TIDErrMsg}
                textFieldSize="small"
                applyClass="search"
                textLength={20}
                minLength={20}
                icon={<i className="icon-search icon-size-one"></i>}
                //
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
                name="BeneficiaryAccountNumber"
                size="small"
                value={
                  trsDetails.BeneficiaryAccountNumber === 0
                    ? null
                    : trsDetails.BeneficiaryAccountNumber
                }
                label={"Beneficiary Account Number *"}
                change={TransactionDeatilHandlerChange}
                fullWidth
                autoComplete="off"
                textLength={14}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="BeneficiaryBankName"
                size="small"
                autoComplete="off"
                value={trsDetails.BeneficiaryBankName}
                label={"Beneficiary Bank Name *"}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={30}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="BranchCode"
                size="small"
                autoComplete="off"
                label={"Branch Code *"}
                value={
                  trsDetails.BranchCode === 0 ? null : trsDetails.BranchCode
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={4}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="BranchName"
                size="small"
                autoComplete="off"
                label={"Branch Name *"}
                value={trsDetails.BranchName}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={30}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
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
            <Col lg={6} md={6} sm={24} xs={24}>
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
                name="TransactionAmount"
                size="small"
                Label="Transaction Amount *"
                value={
                  trsDetails.TransactionAmount === null ||
                  trsDetails.TransactionAmount === -99999999999999999999
                    ? null
                    : CommaFormter(trsDetails.TransactionAmount)
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                autoComplete="off"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                name="DisputeAmount"
                size="small"
                Label={"Exposure / Dispute Amount *"}
                value={
                  trsDetails.DisputeAmount === null ||
                  trsDetails.DisputeAmount === -99999999999999999999
                    ? null
                    : CommaFormter(trsDetails.DisputeAmount)
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                autoComplete="off"
              />
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
                textLength={20}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                name="POSMode"
                size="small"
                autoComplete="off"
                label={"Point Of Sale Mode *"}
                value={trsDetails.POSMode}
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
                value={
                  trsDetails.MerchantID === 0 ? null : trsDetails.MerchantID
                }
                fullWidth
                change={TransactionDeatilHandlerChange}
                textLength={14}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="MerchantCity"
                size="small"
                autoComplete="off"
                label={"Merchant City *"}
                value={trsDetails.MerchantCity}
                fullWidth
                change={TransactionDeatilHandlerChange}
                textLength={50}
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
                name="MerchantCategoryCodeMCC"
                size="small"
                autoComplete="off"
                label={"Merchant Category Code *"}
                value={
                  trsDetails.MerchantCategoryCodeMCC === 0
                    ? null
                    : trsDetails.MerchantCategoryCodeMCC
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={4}
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
                name="MobileNumber"
                size="small"
                autoComplete="off"
                label={"Mobile # Culprit *"}
                value={
                  trsDetails.MobileNumber === 0 ? null : trsDetails.MobileNumber
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={11}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="IMEINumber"
                size="small"
                autoComplete="off"
                label={"IMEI # / MAC Address *"}
                value={
                  trsDetails.IMEINumber === 0 ? null : trsDetails.IMEINumber
                }
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={15}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="URL"
                size="small"
                autoComplete="off"
                label={"URL / Website *"}
                value={trsDetails.URL}
                change={TransactionDeatilHandlerChange}
                fullWidth
                textLength={30}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <InputMask
                type="text"
                className="CreditCardInputField"
                name="IPAddress"
                autoComplete="off"
                placeholder="IP Address *"
                disable
                value={trsDetails.IPAddress}
                mask={[
                  /[0-2]/,
                  /[0-9]/,
                  /[0-9]/,
                  ".",
                  /[0-2]/,
                  /[0-9]/,
                  /[0-9]/,
                  ".",
                  /[0-2]/,
                  /[0-9]/,
                  /[0-9]/,
                  ".",
                  /[0-2]/,
                  /[0-9]/,
                  /[0-9]/,
                ]}
                onChange={TransactionDeatilHandlerChange}
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
              rows={ListOfADCTransactionDetailsObjects}
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
                  ADCDisputes.CaseReceivedDate
                    ? DateDisplayFormat(ADCDisputes.CaseReceivedDate)
                    : null
                }
                change={DateHandler}
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Received Channel"
                autoComplete="off"
                value={ADCDisputes.CaseReceivedChannel}
                name="CaseReceivedChannel"
                change={ADCDisputeHandler}
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
                value={ADCDisputes.IsCaseResolved}
                onChange={ADCDisputeHandler}
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
                  ADCDisputes.CaseResolvedDate
                    ? DateDisplayFormat(ADCDisputes.CaseResolvedDate)
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
                    ADCDisputes.TotalTransactionAmount === null ||
                    ADCDisputes.TotalTransactionAmount === -99999999999999999999
                      ? null
                      : CommaFormter(ADCDisputes.TotalTransactionAmount)
                  }
                  size="small"
                  textLength={30}
                  name="TotalTransactionAmount"
                  disable={true}
                  autoComplete="off"
                />
              </Paper>
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
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Event ID (SAS REF #)"
                size="small"
                autoComplete="off"
                name="EventIDSAS"
                value={ADCDisputes.EventIDSAS}
                change={ADCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                autoComplete="off"
                name="Remarks"
                value={ADCDisputes.Remarks}
                change={ADCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                label={"Registration Date"}
                size="large"
                width="100%"
                DateRange
                placeholder={"Registration Date"}
                name="RegistrationDate"
                change={DateHandler}
                value={
                  ADCDisputes.RegistrationDate
                    ? DateDisplayFormat(ADCDisputes.RegistrationDate)
                    : null
                }
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Aging"
                size="small"
                name="Aging"
                value={
                  ADCDisputes.Aging === null || ADCDisputes.Aging === -1
                    ? null
                    : ADCDisputes.Aging
                }
                change={ADCDisputeHandler}
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
                  ADCDisputes.CaseClosedTAT === null ||
                  ADCDisputes.CaseClosedTAT === -1
                    ? null
                    : ADCDisputes.CaseClosedTAT
                }
                change={ADCDisputeHandler}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Expected Recovery"
                size="small"
                name="ExpectedRecovery"
                value={
                  ADCDisputes.ExpectedRecovery === -99999999999999999999 ||
                  ADCDisputes.ExpectedRecovery === null
                    ? null
                    : ADCDisputes.ExpectedRecovery
                }
                change={ADCDisputeHandler}
                max={7}
                min={7}
                required
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>Demographic Change</b>
              </label>
              <br />
              <Radio.Group
                name="IsDemographicChange"
                value={ADCDisputes.IsDemographicChange}
                onChange={ADCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>Flexi Loan</b>
              </label>
              <br />
              <Radio.Group
                name="IsFlexiLoan"
                value={ADCDisputes.IsFlexiLoan}
                onChange={ADCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="P-II information"
                size="small"
                name="PII"
                autoComplete="off"
                value={ADCDisputes.PII}
                change={ADCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Customer Clamied Information"
                size="small"
                autoComplete="off"
                name="CustomerClamiedInformation"
                value={ADCDisputes.CustomerClamiedInformation}
                change={ADCDisputeHandler}
                textLength={50}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Expected Recovery From HBL"
                size="small"
                name="ExpectedRecoveryFromHBLBeneficiary"
                value={
                  ADCDisputes.ExpectedRecoveryFromHBLBeneficiary === null ||
                  ADCDisputes.ExpectedRecoveryFromHBLBeneficiary ===
                    -99999999999999999999
                    ? null
                    : ADCDisputes.ExpectedRecoveryFromHBLBeneficiary
                }
                change={ADCDisputeHandler}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Expected Recovery From Member Bank"
                size="small"
                name="ExpectedRecoveryFromMemberBankBeneficiary"
                value={
                  ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary ===
                    null ||
                  ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary ===
                    -99999999999999999999
                    ? null
                    : ADCDisputes.ExpectedRecoveryFromMemberBankBeneficiary
                }
                change={ADCDisputeHandler}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-5px">
              <label>
                <b>Customer / Beneficiary SIM Blocked</b>
              </label>
              <br />
              <Radio.Group
                name="CustomerSimBlocked"
                value={ADCDisputes.CustomerSimBlocked}
                onChange={ADCDisputeHandler}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <TextField
                fullWidth
                label="Fund Layered A/c #"
                size="small"
                autoComplete="off"
                name="FundLayeredAC"
                value={ADCDisputes.FundLayeredAC}
                change={ADCDisputeHandler}
                textLength={14}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>iOS / Android</b>
              </label>
              <br />
              <Radio.Group
                name="Android_ISO"
                value={ADCDisputes.Android_ISO}
                onChange={ADCDisputeHandler}
              >
                <Radio value={1}>Android</Radio>
                <Radio value={2}>iOS</Radio>
                <Radio value={3}>Web</Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <SelectBox
                option={sourceOfIB}
                label="Select Source of IB Channel Creation"
                name="FK_SIBCCID"
                value={sourceOfIBName}
                change={SourceOfIBNameHandler}
                //
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
                // file={getFile.filePath}
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

export default EditADCDispute;
