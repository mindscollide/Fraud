import React, { useEffect, useState } from "react";
import { Typography, Radio, Tooltip, Row, Col } from "antd";
import moment from "moment";
import {
  Paper,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Notification,
  Table,
  Loader,
  FormattedInputs,
  Modal,
  GroupedButtons,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import { SearchTransactionDetailsADCByCNICAndReferenceNumber } from "../../../../store/actions/investigation-officer-actions";
import {
  AddApprovalReason,
  RejectReason,
} from "../../../../store/actions/investigation-manager-actions";
import {
  GetAllSource,
  GetAllApprovalReasons,
  GetAllRejectionReasons,
  GetAllFraudType,
  GetAllSourceOfIBChannelCreation,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";

import {
  DownloadUploadFile,
  RESETALLSTATEFORREPORTS,
} from "../../../../store/actions/reports_actions";
import { enableGoBack } from "../../../../store/actions/ui-actions";
import {
  DateDisplayFormat,
  CommaFormter,
  TimeDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";

import { useNavigate } from "react-router-dom";

const ViewCustomerDetailsADC = () => {
  const navigate = useNavigate();

  const { Title } = Typography;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const {
    investigationOfficer,
    setupForms,
    reports,
    selectedRowKeys,
    investigationManager,
  } = state;
  var TTID = localStorage.getItem("FK_TTID");
  var TTIDQM = localStorage.getItem("ttid");
  localStorage.setItem("FK_TTID", TTID);
  var userID = localStorage.getItem("CurrentUserID");

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
    fK_CTID: 0,
  });

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
    ON_OFF_US: true,
    MerchantCategoryCodeMCC: "",
    MobileNumber: "",
    IMEINumber: "",
    URL: "",
    IPAddress: "",
    FK_SID: 0,
    TransactionDate: "",
    TransactionTime: "",
    HBLAccountNumber: "",
    BranchCode: "",
    BranchName: "",
    PreIdentifiedDataType: 0,
  });

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
    AccountNumber: "",
    BranchCode: "GS1241",
    BranchName: "Nazimabad",
    RegionCode: "R322",
    RegionName: "North",
  });

  // list for transection details table
  const [
    ListOfADCTransactionDetailsObjects,
    setListOfADCTransactionDetailsObjects,
  ] = useState([]);

  // source type names selection for drop down
  const [sourceTypeName, setSourceTypeName] = useState([]);

  //   set fruad type name state
  const [SourceType, setSourceType] = useState("");

  const [sourceOfIB, setSourceOfIB] = useState("");

  const [cityValue, setCityValue] = useState("");

  // List of Transaction Details already esist
  const [
    listOfTransactionDetailsAlreadyExsist,
    setListOfTransactionDetailsAlreadyExsist,
  ] = useState([]);
  //   secarch date

  // uploadlist
  const [ListOfADCDisputeDocuments, setListOfADCDisputeDocuments] = useState(
    []
  );

  //   for current date
  const date = moment().format("YYYY-MM-DD");

  //   for date
  const [ADCDisputes, setADCDisputes] = useState({
    CaseReceivedChannel: "",
    CaseReceivedDate: removeDashesFromDate(date),
    RegistrationDate: removeDashesFromDate(date),
    RefrenceNumber: "",
    IsCaseResolved: false,
    TotalTransactionAmount: -99999999999999999999,
    CaseClosedTAT: -1,
    ExpectedRecovery: -99999999999999999999,
    FK_CSID: 3,
    CaseDecision: "",
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
    FK_SIBCCID: 1,
    Remarks: "",
    FromDateForPreIdentifiedData: "",
    ToDateForPreIdentifiedData: "",
  });
  const [sourceOfIBName, setSourceOfIBName] = useState([]);

  //   useEffect for tempray api hit
  useEffect(() => {
    dispatch(GetAllApprovalReasons());
    dispatch(GetAllRejectionReasons());
    dispatch(GetAllCity());
  }, []);

  useEffect(() => {
    setListOfADCDisputeDocuments([]);
    const ReferenceNumber = JSON.parse(localStorage.getItem("ReferenceNumber"));
    const CNICNumber = localStorage.getItem("CNICNumber");
    let Data = { CNICNumber: CNICNumber, RefrenceNumber: ReferenceNumber };
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (TTIDQM === null) {
        if (TTID === "3") {
          dispatch(
            SearchTransactionDetailsADCByCNICAndReferenceNumber(Data, TTID)
          );
          dispatch(enableGoBack());
          navigate("/Fraud/DisputeCases/ViewCustomerDetailsADC");
        } else {
          dispatch(SearchTransactionDetailsADCByCNICAndReferenceNumber(Data));
          dispatch(enableGoBack());
        }
      } else {
        let TTIDvalue = true;
        dispatch(
          SearchTransactionDetailsADCByCNICAndReferenceNumber(Data, TTIDvalue)
        );
        dispatch(enableGoBack());
      }
    }
  }, []);

  //   used for already exsit data of customer details for add
  useEffect(() => {
    let chekFlg = investigationOfficer.GetADCDisputesForViewData;
    if (chekFlg !== undefined && chekFlg !== null) {
      let cardDetail =
        investigationOfficer.GetADCDisputesForViewData.cardDetails;
      let customerDetail =
        investigationOfficer.GetADCDisputesForViewData.fdCustomer;
      let transactionDetail =
        investigationOfficer.GetADCDisputesForViewData.transactionDetails;
      let irisTransactionDetails =
        investigationOfficer.GetADCDisputesForViewData.irisTransactionDetails;
      let adcDisputesDetail =
        investigationOfficer.GetADCDisputesForViewData.adcDispute;
      let listOfADCDocuments =
        investigationOfficer.GetADCDisputesForViewData
          .listOfADCDisputeDocuments;
      if (cardDetail !== undefined && cardDetail !== null) {
        setCardDetails({
          ...CardDetails,
          CardNumber: cardDetail.cardNumber,
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
          fK_CTID: customerDetail.fK_CTID,
        });
        let cityValue = setupForms.CityData;
        cityValue.map((data, index) => {
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
          }
        );
        setListOfTransactionDetailsAlreadyExsist(
          GetTransactionDetailsByCNICArray
        );
      }
      if (
        adcDisputesDetail !== undefined &&
        adcDisputesDetail !== null &&
        adcDisputesDetail !== null
      ) {
        setADCDisputes({
          CaseReceivedChannel: adcDisputesDetail.caseReceivedChannel,
          CaseReceivedDate: adcDisputesDetail.caseReceivedDate,
          RegistrationDate: adcDisputesDetail.registrationDate,
          RefrenceNumber: adcDisputesDetail.refrenceNumber,
          IsCaseResolved: adcDisputesDetail.isCaseResolved,
          CaseResolvedDate: adcDisputesDetail.caseResolvedDate,
          TotalTransactionAmount: adcDisputesDetail.totalTransactionAmount,
          CaseClosedTAT: adcDisputesDetail.caseClosedTAT,
          Aging: adcDisputesDetail.caseAging,
          ExpectedRecovery: adcDisputesDetail.expectedRecovery,
          FK_CSID: adcDisputesDetail.fK_CSID,
          CaseDecision: adcDisputesDetail.caseDecision,
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
      }
      if (listOfADCDocuments !== undefined && listOfADCDocuments !== null) {
        let tem = [];
        console.log("listOfADCDocuments", listOfADCDocuments);
        listOfADCDocuments.map((data, index) => {
          tem.push({
            PK_DCDDID: data.pK_DCDDID,
            FK_DCDID: data.fK_DCDID,
            FK_GSSUserID: data.fK_GSSUserID,
            OriginalFileName: data.originalFileName,
            DisplayFileName: data.displayFileName,
          });
        });
        setListOfADCDisputeDocuments(tem);
      }
    }
  }, [investigationOfficer.GetADCDisputesForViewData]);

  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (fDCusotmerAccount.fK_CTID === data.pK_CTID) {
        setCityValue(data.name);
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {}, [cityValue]);

  // source type names selection for drop down
  useEffect(() => {
    let nameSource = setupForms.SourceData;
    setSourceTypeName(
      nameSource.map((data, index) => {
        return data.name;
      })
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
      width: "200px",
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
      width: "200px",
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
      width: "200px",
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
      width: "200px",
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
      width: "200px",
    },
    {
      title: "URL / website",
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
      width: "180px",
    },
    {
      title: "Beneficiary Account Number",
      dataIndex: "BeneficiaryAccountNumber",
      key: "BeneficiaryAccountNumber",
      align: "center",
      width: "210px",
    },
    {
      title: "Beneficiary Bank Name",
      dataIndex: "BeneficiaryBankName",
      key: "BeneficiaryBankName",
      align: "center",
      width: "200px",
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
      width: "200px",
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
      width: "150px%",
    },
    {
      title: "Merchant Category Code",
      dataIndex: "MerchantCategoryCodeMCC",
      key: "MerchantCategoryCodeMCC",
      align: "center",
      width: "180px",
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
      width: "180px",
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
  ];

  // For Row slection
  const rowSelection = {
    selectedRowKeys,
    onSelect: (e) => {
      var temp = listOfTransactionDetailsAlreadyExsist;
      temp.map((data, index) => {
        if (data.key === e.key) {
          if (data.preIdentifiedDataType === 1) {
            data.preIdentifiedDataType = 2;
          } else {
            data.preIdentifiedDataType = 1;
          }
        }
      });
      setListOfTransactionDetailsAlreadyExsist(temp);
    },

    getCheckboxProps: (listOfTransactionDetailsAlreadyExsist) => ({
      disabled: listOfTransactionDetailsAlreadyExsist.preIdentifiedDataType,
      name: listOfTransactionDetailsAlreadyExsist.preIdentifiedDataType,
    }),
    selectedRowKeys: listOfTransactionDetailsAlreadyExsist
      .filter((item) => item.preIdentifiedDataType === 2)
      .map((item) => item.key),
  };

  // upload doc list
  useEffect(() => {
    let newData = reports.uploadDocumentsList;
    if (newData !== undefined && newData.length !== 0) {
      let Data = {
        OriginalFileName: newData.originalFileName,
        DisplayFileName: newData.displayFileName,
      };
      setListOfADCDisputeDocuments([...ListOfADCDisputeDocuments, Data]);
      //
    }
    if (newData.length > 0) {
      dispatch(RESETALLSTATEFORREPORTS());
    }
  }, [reports.uploadDocumentsList]);

  const downloadUploadDocument = (e, record) => {
    let data = {
      OriginalFileName: record.OriginalFileName,
      DisplayFileName: record.DisplayFileName,
      DisputeTypeID: 3,
    };
    dispatch(DownloadUploadFile(data));
  };

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
  ];

  useEffect(() => {
    let nameSourceOfIB = setupForms.SourceOfIBChannelCreationData;
    setSourceOfIB(
      nameSourceOfIB.map((data, index) => {
        return data.name;
      })
    );
  }, [setupForms.SourceOfIBChannelCreationData]);

  useEffect(() => {}, [sourceOfIB]);

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
    let fk_TTID = 3;
    let newData = investigationOfficer.GetADCDisputesForViewData.adcDispute;
    let pK_did = newData.pK_ADCDID;
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
    let fk_TTID = 3;
    let newData = investigationOfficer.GetADCDisputesForViewData.adcDispute;
    let pK_did = newData.pK_ADCDID;
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
    if (nameRejection !== undefined) {
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
      // dispatch(HideNotification());
    }
  }, [investigationManager.SaveRejectionData]);

  return (
    <>
      <Title level={3}>View Alternate Delivery Channel Disputes</Title>
      <form>
        <Paper padding="1">
          <Row gutter={16} className="u-margin-bottom-15px">
            <Col lg={18} md={18} sm={18} xs={24}>
              <h1
                className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
              >
                Customer Details
              </h1>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Reference#"
                disable
                value={ADCDisputes.RefrenceNumber}
                label={"Reference #"}
                fullWidth
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="Customer Name"
                disable
                value={customerDetails.cnicNumber}
                label={"CNIC"}
                fullWidth
              />
            </Col>
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
                label="City"
                value={cityValue}
                name="fK_CTID"
                disable={true}
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
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              Date
            </h1>
          </Col>
          <Row gutter={8}>
            <Col lg={4} md={4} sm={24}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                placeholder={"Case Received Date"}
                name="CaseReceivedDate"
                value={
                  ADCDisputes.CaseReceivedDate
                    ? DateDisplayFormat(ADCDisputes.CaseReceivedDate)
                    : null
                }
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <TextField
                fullWidth
                label="Case Received Channel"
                value={ADCDisputes.CaseReceivedChannel}
                name="CaseReceivedChannel"
                type="text"
                size="small"
                textLength={20}
                disable
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="u-text-align-center">
              <label>
                <b>Case Resolved</b>
              </label>
              <br />
              <Radio.Group
                name="IsCaseResolved"
                disable={true}
                value={ADCDisputes.IsCaseResolved}
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
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
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
                  disable
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
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Case Decision"
                size="small"
                name="CaseDecision"
                textLength={50}
                maxLength={50}
                value={ADCDisputes.CaseDecision}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Event ID (SAS REF #)"
                size="small"
                name="EventIDSAS"
                value={ADCDisputes.EventIDSAS}
                textLength={50}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                name="Remarks"
                value={ADCDisputes.Remarks}
                textLength={50}
                disable
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
                value={
                  ADCDisputes.RegistrationDate
                    ? DateDisplayFormat(ADCDisputes.RegistrationDate)
                    : null
                }
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
                  ADCDisputes.Aging === null || ADCDisputes.Aging === -1
                    ? null
                    : ADCDisputes.Aging
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
                  ADCDisputes.CaseClosedTAT === null ||
                  ADCDisputes.CaseClosedTAT === -1
                    ? null
                    : ADCDisputes.CaseClosedTAT
                }
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
                  ADCDisputes.ExpectedRecovery === null ||
                  ADCDisputes.ExpectedRecovery === -99999999999999999999
                    ? null
                    : ADCDisputes.ExpectedRecovery
                }
                max={7}
                min={7}
                disable
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>Demographic Change</b>
              </label>
              <br />
              <Radio.Group
                name="IsDemographicChange"
                disable={true}
                value={ADCDisputes.IsDemographicChange}
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>Flexi Loan</b>
              </label>
              <br />
              <Radio.Group
                name="IsFlexiLoan"
                disable={true}
                value={ADCDisputes.IsFlexiLoan}
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
                label="P-II information"
                size="small"
                name="PII"
                value={ADCDisputes.PII}
                max={7}
                min={7}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
              <TextField
                fullWidth
                label="Customer Clamied Information"
                size="small"
                name="CustomerClamiedInformation"
                value={ADCDisputes.CustomerClamiedInformation}
                textLength={50}
                disable
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
                max={7}
                min={7}
                disable
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
                max={7}
                min={7}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-5px">
              <label>
                <b>Customer / Beneficiary SIM Blocked</b>
              </label>
              <br />
              <Radio.Group
                name="CustomerSimBlocked"
                disable={true}
                value={ADCDisputes.CustomerSimBlocked}
              >
                <Radio disabled value={true}>
                  Yes
                </Radio>
                <Radio disabled value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <TextField
                fullWidth
                label="Fund Layered A/c #"
                size="small"
                name="FundLayeredAC"
                value={ADCDisputes.FundLayeredAC}
                textLength={50}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <label>
                <b>iOS / Android</b>
              </label>
              <br />
              <Radio.Group
                name="Android_ISO"
                disable={true}
                value={ADCDisputes.Android_ISO}
              >
                <Radio disabled value={1}>
                  Android
                </Radio>
                <Radio disabled value={2}>
                  iOS
                </Radio>
                <Radio disabled value={3}>
                  Web
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-10px">
              <SelectBox
                option={sourceOfIB}
                label="Select Source of IB Channel Creation"
                name="FK_SIBCCID"
                value={sourceOfIBName}
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
            <div className="u-margin-top-5pct" />
            <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
              <Table
                rows={ListOfADCDisputeDocuments}
                columns={col}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "30"],
                }}
                scroll={{ x: "max-content" }}
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

export default ViewCustomerDetailsADC;
