import React, { useState, useEffect } from "react";
import { Typography, Space, Checkbox, Tooltip, Row, Col } from "antd";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
  TimeAndDisplayFormat,
} from "../../../../Common/Functions/date-formatter";
import { SearchOutlined as Search } from "@ant-design/icons";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
  DatePicker,
  Loader,
  MultipleSelectCheckmarks,
  FormattedInputs,
} from "../../../../Components/Elements";
import {
  HideNotification,
  GetCreditCardDisputesByCnic,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumber,
  SearchADCDisputesForEditByCnicAndReferenceNumber,
  GetDebitCardDisputesForEditByCnicAndRefrenceNumber,
  GetNonApiDisputesForEditByCnicAndReferenceNumber,
  resetGlobalDisputeTable,
  SearchGlobalDisputes,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  SearchBBKDisputesByCnicAndReferenceNumber,
  GetNegativeDBViewByCnic,
  GetBBKDisputesForEditByCnicAndReferenceNumber,
  GetDisputeStatusGlobal,
} from "../../../../store/actions/investigation-officer-actions";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../store/actions/ui-actions";
import {
  GetAllTransactionTypes,
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllCity,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
  GetAllFraudType,
  GetAllSourceOfIBChannelCreation,
  GetAllStatus,
  GetAllCaseDecision,
} from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchDisputeIO = () => {
  var cnic = localStorage.getItem("cnic");
  // let Inprocess = localStorage.getItem("InProgressOnly");
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const { setupForms, investigationOfficer } = state;
  const [clearDateSelect, setDateClearSelect] = useState("");
  const [State, setState] = useState({
    from: "",
    to: "",
  });
  const [searchData, setSearchData] = useState({
    TransactionTypeIDs: [],
    ReferenceNumber: "",
    CNIC: "",
    AccountNumber: "",
    // Inprocess: false,
    CustomerName: "",
    FK_CTID: 0,
    TransactionId: "",
    TotalTransactionAmount: -99999999999999999999,
    fk_csid: -1,
  });

  //For Transaction Types
  const [selected, setSelected] = React.useState([]);

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  const transactionTypeHandler = (e, value) => {};

  const resetData = () => {
    setSearchData({
      ...searchData,
      TransactionTypeIDs: [],
      ReferenceNumber: "",
      CNIC: "",
      AccountNumber: "",
      CustomerName: "",
      TransactionId: "",
      TotalTransactionAmount: -99999999999999999999,
      fk_csid: -1,
      FK_CTID: 0,
    });
    setCaseStatus("");
    setSelectedTransactionTypeName([]);
    setSelected([]);
    setCityValue("");
    setState({
      ...State,
      from: "",
      to: "",
    });
    dispatch(resetGlobalDisputeTable());
  };

  const setDate = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        from: DateSendingFormat(e.endDate),
        to: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        from: "",
        to: "",
      });
    }
  };

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "CNIC" &&
      name !== "AccountNumber" &&
      name !== "CustomerName" &&
      name !== "TransactionId" &&
      name !== "TotalTransactionAmount"
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (
      name === "TotalTransactionAmount" &&
      value !== -99999999999999999999 &&
      value !== "" &&
      name !== "CNIC" &&
      name !== "AccountNumber" &&
      name !== "CustomerName" &&
      name !== "TransactionId"
    ) {
      if (value > 0) {
        if (value % 1 !== 0) {
          if (value.length <= 18) {
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 18);
          }
        } else {
          if (value.length <= 15) {
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 15);
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          }
        }
      }
      if (value < 0) {
        if (value % 1 !== 0) {
          if (value.length <= 19) {
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 19);
          }
        } else {
          if (value.length <= 16) {
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          } else {
            value = value.slice(0, 16);
            setSearchData({
              ...searchData,
              [name]: parseFloat(value),
            });
          }
        }
      }
    }
    if (name === "CNIC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CNIC" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    }
    if (name === "AccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "AccountNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "CustomerName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CustomerName" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    }
    if (name === "TransactionId" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "TransactionId" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (
      name === "TotalTransactionAmount" &&
      (value === "" || value === -99999999999999999999)
    ) {
      setSearchData({
        ...searchData,
        [name]: -99999999999999999999,
      });
    }
  };

  //Edit Click
  const update = async (e, value) => {
    if (value.fK_TTID === 1) {
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      await localStorage.setItem("cnic", value.cnicNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        ReferenceNumber: value.referenceNumber,
      };
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      await dispatch(GetCreditCardDisputesForEditByCnicAndRefrenceNumber(data));
    }
    if (value.fK_TTID === 2) {
      localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      localStorage.setItem("cnic2", value.cnicNumber);
      localStorage.setItem("accountNumber", value.accountNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        ReferenceNumber: value.referenceNumber,
      };
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      await dispatch(GetDebitCardDisputesForEditByCnicAndRefrenceNumber(data));
    }
    if (value.fK_TTID === 3) {
      localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      localStorage.setItem("cnic", value.cnicNumber);
      localStorage.setItem("cnic2", value.cnicNumber);
      localStorage.setItem("accountNumber", value.accountNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        RefrenceNumber: value.referenceNumber,
      };
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(data));
    }
    if (value.fK_TTID === 4) {
      localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      localStorage.setItem("cnic", value.cnicNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        ReferenceNumber: value.referenceNumber,
      };
      localStorage.setItem("accountNumber", value.accountNumber);
      await localStorage.setItem("cnic2", value.cnicNumber);
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      dispatch(GetNonApiDisputesForEditByCnicAndReferenceNumber(data));
    }
    if (value.fK_TTID === 5) {
      localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      localStorage.setItem("cnic", value.cnicNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        ReferenceNumber: value.referenceNumber,
      };
      localStorage.setItem("accountNumber", value.accountNumber);
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      dispatch(GetBBKDisputesForEditByCnicAndReferenceNumber(data));
    }
    if (value.fK_TTID === 6) {
      localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(value.referenceNumber),
      );
      localStorage.setItem("cnic", value.cnicNumber);
      let data = {
        CNICNumber: value.cnicNumber,
        ReferenceNumber: value.referenceNumber,
      };
      let flagForGlobalDispute = true;
      await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
      await dispatch(GetNegativeDBViewByCnic(data));
      await dispatch(GetAllChannel());
      await dispatch(GetAllIndividualInvolved());
      await dispatch(GetAllForgedDocuments());
      await dispatch(GetAllFraudNotAFraud());
      await dispatch(GetAllCompanySegment());
      await dispatch(GetAllCity());
      navigate("/Fraud/NegativeDatabase/EditNegativeDatabase");
    }
  };

  const View = async (e, record) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(record.referenceNumber),
    );
    localStorage.setItem("CNICNumber", JSON.stringify(record.cnicNumber));
    let Data = {
      CNICNumber: record.cnicNumber,
      ReferenceNumber: record.referenceNumber,
    };
    if (record.fK_TTID === 1) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      dispatch(enableGoBack());
      await dispatch(GetCreditCardDisputesByCnic(Data));
      navigate("/Fraud/CreditCardDispute/ViewCustomerDetails");
    }
    if (record.fK_TTID === 2) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      dispatch(enableGoBack());
      await dispatch(SearchDebitCardDisputesByCnicAndReferenceNumber(Data));
      navigate("/Fraud/DebitCardDisputes/ViewCustomerDetails");
    }
    if (record.fK_TTID === 3) {
      let ADCData = {
        CNICNumber: record.cnicNumber,
        RefrenceNumber: record.referenceNumber,
      };
      dispatch(enableGoBack());
      await dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(ADCData),
      );
      navigate("/Fraud/ADCD/ViewCustomerDetailsADC");
    }
    if (record.fK_TTID === 4) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      dispatch(enableGoBack());
      await dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data));
      navigate("/Fraud/NONAPIDisputes/ViewCustomerDetailsNonApi");
    }
    if (record.fK_TTID === 5) {
      let BBKData = {
        CNICNumber: record.cnicNumber,
        ReferenceNumber: record.referenceNumber,
      };
      dispatch(enableGoBack());
      await dispatch(SearchBBKDisputesByCnicAndReferenceNumber(BBKData));
      navigate("/Fraud/BBKonnect/ViewCustomerDetailsBBK");
    }
    if (record.fK_TTID === 6) {
      localStorage.setItem("cnic", record.cnicNumber);
      let NDData = {
        CNICNumber: record.cnicNumber,
      };
      await dispatch(GetNegativeDBViewByCnic(NDData));
      await dispatch(GetAllChannel());
      await dispatch(GetAllIndividualInvolved());
      await dispatch(GetAllForgedDocuments());
      await dispatch(GetAllFraudNotAFraud());
      await dispatch(GetAllCompanySegment());
      await dispatch(GetAllCity());
      dispatch(enableGoBack());
      navigate("/Fraud/NegativeDatabase/ViewNegativeDataBase");
    }
  };

  const handleSearchData = () => {
    dispatch(SearchGlobalDisputes(searchData, State));
  };

  // // City handler
  const CityNameHandler = (e, value) => {
    setCityValue(value);
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CTID;
        setSearchData({
          ...searchData,
          ["FK_CTID"]: parseInt(id),
        });
      }
    });
  };

  // For User Roles DropDown SetState
  useEffect(() => {
    let transactionName = setupForms.TransactionTypesData;
    setTransactionTypes(
      transactionName.map((data, index) => {
        return data.ttName;
      }),
    );
  }, [setupForms.TransactionTypesData]);

  // Selected Dropdown value
  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem = [...tem, pkID];
        }
      });
    });
  }, [selectedTransactionTypeName]);

  useEffect(() => {}, [transactionTypes]);

  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem = [...tem, pkID];
        }
      });
    });
    setSearchData({
      ...searchData,
      ["TransactionTypeIDs"]: tem,
    });
  }, [selectedTransactionTypeName]);

  useEffect(() => {}, [transactionTypes]);

  var caseStatusItem = parseInt(localStorage.getItem("CaseStatus"));

  useEffect(() => {
    let UserID = JSON.parse(localStorage.getItem("UserDetails"));
    let userid;
    try {
      userid = UserID.userID;
    } catch (err) {
      userid = 0;
    }
    localStorage.removeItem("fk_TTIDDelete");
    dispatch(resetGlobalDisputeTable());
    dispatch(GetAllTransactionTypes(userid));
    if (
      caseStatusItem !== undefined &&
      caseStatusItem !== -1 &&
      caseStatusItem !== null
    ) {
      let caseStatusData = setupForms.StatusData;
      caseStatusData.map((data, index) => {
        if (caseStatusItem === data.pK_CSID) {
          setCaseStatus(data.statusDescription);
          setSearchData({
            ...searchData,
            ["fk_csid"]: parseInt(caseStatusItem),
          });
        }
        localStorage.removeItem("CaseStatus");
      });
    } else {
      setCaseStatus("");
      localStorage.removeItem("CaseStatus");
    }
  }, []);

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

  useEffect(() => {
    if (investigationOfficer.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ResponseMessage]);

  useEffect(() => {}, [investigationOfficer.GlobalDisputeData]);

  useEffect(() => {
    dispatch(disableGoBack());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ForCheck = investigationOfficer.GetApprovalStatusGlobalData;
    if (
      ForCheck !== undefined &&
      ForCheck !== null &&
      Object.keys(ForCheck).length > 0
    ) {
      const data =
        ForCheck &&
        ForCheck.map((item) => {
          return item;
        });
      setRow(data);
    }
  }, [investigationOfficer.GetApprovalStatusGlobalData]);

  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const handleCancel = () => {
    setIsModalVisible2(false);
  };

  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });

  const [row, setRow] = useState([]);

  const okayButtonProp = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel(),
    },
    secondaryButton: {
      text: "",
    },
  };

  const viewApprovalColumn = [
    {
      title: "Date",
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Time",
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      render: (text) => TimeAndDisplayFormat(text),
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "comments",
      key: "comments",
      align: "center",
    },
    {
      title: "Action By",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
  ];

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
      width: "160px",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            className="u-cursor-pointer u-color-blue"
            onClick={(e) => View(e, record)}
          >
            {text}
          </i>
        </Tooltip>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
      width: "220px",
    },
    {
      title: "CNIC",
      dataIndex: "cnicNumber",
      key: "cnicNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "") {
          return text;
        } else {
          return "";
        }
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "fK_TTID",
      key: "fK_TTID",
      align: "center",
      width: "220px",
      render: (text) => {
        return setupForms.TransactionTypesData.map((data, index) => {
          if (text === data.pK_TTID) {
            if (data.ttName === "NegativeDatabase") {
              return "Negative Database";
            } else {
              return data.ttName;
            }
          }
        });
      },
    },
    {
      title: "Total Transaction Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
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
      title: "View Status History",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "200px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let disputeID = { DID: record.pK_DID, TTID: record.fK_TTID };
              dispatch(
                GetDisputeStatusGlobal(
                  disputeID,
                  setIsModalVisible2,
                  setAction,
                  actions,
                ),
              );
            }}
            className="icon-edit-list icon-size-one beachGreen u-cursor-pointer"
          ></div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
      width: "220px",
    },
    {
      title: "Edit",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: "100px",
      render: (text, record) => {
        return record.statusDescription === "In Process" ||
          record.statusDescription === "Created" ? (
          <div
            onClick={(e) => update(e, record)}
            className="icon-edit icon-size-one beachGreen u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];

  // Case Status Functionality
  const [caseStatus, setCaseStatus] = useState([]);
  const [caseStatusOptions, setCaseStatusOptions] = useState("");

  // Selected Dropdown value
  const caseStatusHandler = (e, value) => {
    setCaseStatus(value);
    let caseStatus = setupForms.StatusData;
    caseStatus.map((data, index) => {
      if (value === data.statusDescription) {
        let id = data.pK_CSID;
        setSearchData({
          ...searchData,
          ["fk_csid"]: parseInt(id),
        });
      }
    });
  };

  // Case Status type names selection for drop down
  useEffect(() => {
    let caseStatus = setupForms.StatusData;
    setCaseStatusOptions(
      caseStatus.map((data, index) => {
        return data.statusDescription;
      }),
    );
  }, [setupForms.StatusData]);

  useEffect(() => {
    let data = {
      IsNegativeDatabase: false,
    };
    dispatch(GetAllStatus(data));
    dispatch(GetAllCity());
    dispatch(GetAllFraudType());
  }, []);

  // // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    setCity(
      valueCity.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.CityData]);

  return (
    <>
      <Title level={3}>Search Dispute Cases</Title>
      <Row gutter={8}>
        <Col
          lg={8}
          md={8}
          sm={24}
          className="MultipleSelectClass u-position-relative"
        >
          <MultipleSelectCheckmarks
            selected={selected}
            setSelected={setSelected}
            selectedUserRoleName={selectedTransactionTypeName}
            setSelectedUserRoleName={setSelectedTransactionTypeName}
            lable="Transaction Type *"
            change={transactionTypeHandler}
            option={transactionTypes}
            name="TransactionTypeIDs"
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            name={"ReferenceNumber"}
            fullWidth
            autoComplete="off"
            label="Reference Number"
            size="small"
            value={searchData.ReferenceNumber}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            name={"CNIC"}
            label="CNIC"
            autoComplete="off"
            size="small"
            value={searchData.CNIC}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name={"AccountNumber"}
            label="Account Number"
            size="small"
            autoComplete="off"
            value={searchData.AccountNumber}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            name={"CustomerName"}
            fullWidth
            autoComplete="off"
            label="Customer Name"
            size="small"
            value={searchData.CustomerName}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <SelectBox
            label="Select City"
            option={city}
            value={cityValue}
            change={CityNameHandler}
            name="FK_CTID"
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <SelectBox
            label="Select Case Status"
            option={caseStatusOptions}
            name="fk_csid"
            value={caseStatus}
            change={caseStatusHandler}
          />
        </Col>

        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            name={"TransactionId"}
            fullWidth
            autoComplete="off"
            label="Transaction ID"
            size="small"
            value={searchData.TransactionId}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <FormattedInputs
            name={"TotalTransactionAmount"}
            value={
              searchData.TotalTransactionAmount === null ||
              searchData.TotalTransactionAmount === -99999999999999999999
                ? null
                : searchData.TotalTransactionAmount
            }
            textLength={(999, 999, 999, 999, 999, 999, 999)}
            size="small"
            Label={"Total Transaction Amount"}
            fullWidth
            change={(e) => handleSearch(e)}
            autoComplete="off"
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <StartToEndDate
            label={"Case Received Date"}
            width="100%!important"
            size="large"
            change={setDate}
            key={clearDateSelect}
            startvalue={
              State.from !== null && State.from !== ""
                ? DateDisplayFormat(State.from)
                : null
            }
            endvalue={
              State.to !== null && State.from !== ""
                ? DateDisplayFormat(State.to)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px"></Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-15px"></Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-15px">
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={handleSearchData}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-15px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-15px"></Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={investigationOfficer.GlobalDisputeData}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"],
            }}
          />
        </Col>
      </Row>

      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible2}
        width={700}
        modalTitle={<Title level={3}>View Status History</Title>}
      >
        {/* this data will be pass to modal when View Approval Icon will be clicked */}
        {actions.viewApprovalHistory && (
          <>
            <Table rows={row} columns={viewApprovalColumn} />
            <GroupedButtons data={okayButtonProp} />
          </>
        )}
      </Modal>
    </>
  );
};

export default SearchDisputeIO;
