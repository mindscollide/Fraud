import React, { useState, useEffect } from "react";
import { Typography, Space, Checkbox, Tooltip, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
  TimeAndDisplayFormat,
} from "../../../../Common/Functions/date-formatter";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Loader,
  Notification,
  DatePicker,
  FormattedInputs,
} from "../../../../Components/Elements";
import {
  HideNotification,
  SearchBBKDisputes,
  resetBBKSearchFilter,
  GetBBKDisputesForEditByCnicAndReferenceNumber,
  SearchBBKDisputesByCnicAndReferenceNumber,
  GetDisputeStatusBBK,
} from "../../../../store/actions/investigation-officer-actions";
import {
  GetAllCaseDecision,
  GetAllFraudType,
  GetAllStatus,
  GetAllCity,
  GetAllTransactionCurrencyCode,
} from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../store/actions/ui-actions";

const SearchBBKDispute = () => {
  // var cnic = localStorage.getItem("cnic");

  const navigate = useNavigate();

  const { Title, Text } = Typography;

  const state = useSelector((state) => state);

  const [row, setRow] = useState([]);

  const dispatch = useDispatch();

  const { setupForms, investigationOfficer } = state;

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  var cnic = localStorage.getItem("cnic");
  // GET INPROGRESS FROM SAVE
  // var inProgressOnly = localStorage.getItem("InProgressOnly");
  const [fraudType, setFraudType] = useState([]);

  const [fraudTypeName, setFraudTypeName] = useState([]);

  // Case Status Functionality
  const [caseStatus, setCaseStatus] = useState("");
  const [caseStatusOptions, setCaseStatusOptions] = useState("");

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  var caseStatusItem = parseInt(localStorage.getItem("CaseStatus"));

  //DataRangeHandler
  const [clearDateSelect, setDateClearSelect] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });

  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });

  const setDate = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        FromDate: DateSendingFormat(e.endDate),
        ToDate: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        FromDate: "",
        ToDate: "",
      });
    }
  };

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  const [searchData, setSearchData] = useState({
    ReferenceNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    // CMCity: "",
    CNICNumber: "",
    AccountNumber: "",
    Fraudtype: "",
    // ApprovalCode: "",
    TransactionID: "",
    TotalTransactionAmount: -99999999999999999999,
    // InProgressOnly: false,
    fk_csid: -1,
    MobileNumber: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Selected Dropdown value
  const fraudNameHandler = (e, value) => {
    setFraudTypeName(value);
    let nameFraud = setupForms.FraudTypeData;
    nameFraud.map((data, index) => {
      if (value === data.name) {
        setSearchData({
          ...searchData,
          ["Fraudtype"]: value,
        });
      }
    });
  };

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "TransactionID" &&
      name !== "TotalTransactionAmount" &&
      name !== "CNICNumber" &&
      name !== "MobileNumber" &&
      name !== "CustomerName" &&
      name !== "CMCity" &&
      name !== "AccountNumber"
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (
      name !== "TransactionID" &&
      name === "TotalTransactionAmount" &&
      value !== -99999999999999999999 &&
      value !== "" &&
      name !== "CustomerName" &&
      name !== "CNICNumber" &&
      name !== "MobileNumber" &&
      name !== "CMCity" &&
      name !== "AccountNumber"
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
    } else {
      if (name === "TotalTransactionAmount") {
        setSearchData({
          ...searchData,
          [name]: -99999999999999999999,
        });
      }
    }
    if (name === "CustomerName" && value !== "") {
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
    if (name === "CMCity" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CMCity" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "TransactionID" && value !== "") {
      // all special character blocked
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "TransactionID" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "CNICNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "CNICNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "MobileNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "MobileNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "AccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "AccountNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    }
  };

  const handleSearchData = () => {
    dispatch(SearchBBKDisputes(searchData, State));
  };
  const resetData = async () => {
    await setSearchData({
      ...searchData,
      ReferenceNumber: "",
      CustomerName: "",
      FK_CTID: 0,
      CNICNumber: "",
      MobileNumber: "",
      AccountNumber: "",
      Fraudtype: "",
      ApprovalCode: "",
      TransactionID: "",
      TotalTransactionAmount: -99999999999999999999,
      fk_csid: -1,
    });
    await setState({
      ...State,
      FromDate: "",
      ToDate: "",
    });
    setCityValue("");
    setCaseStatus("");
    await dispatch(resetBBKSearchFilter());
  };

  //UseEffects
  //APICall
  useEffect(() => {
    dispatch(GetAllFraudType());
    dispatch(GetAllCity());
    dispatch(GetAllTransactionCurrencyCode());
  }, []);

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

  // For FraudTypeOptions
  useEffect(() => {}, [fraudType]);

  useEffect(() => {
    if (investigationOfficer.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    } else {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ResponseMessage]);

  useEffect(() => {}, [investigationOfficer.SearchBBKDisputeData]);

  // GET INPROGRESS TO CHECK
  useEffect(() => {
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

  useEffect(() => {
    let ForCheck = investigationOfficer.GetApprovalStatusBBKData;
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
  }, [investigationOfficer.GetApprovalStatusBBKData]);

  const View = (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.referenceNumber),
    );
    localStorage.setItem("CNICNumber", JSON.stringify(value.cnicNumber));
    let Data = {
      CNICNumber: value.cnicNumber,
      ReferenceNumber: value.referenceNumber,
    };
    setCaseStatus("");
    localStorage.removeItem("CaseStatus");
    dispatch(enableGoBack());
    dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data));
  };

  const update = async (e, value) => {
    localStorage.setItem("CNICNumber", JSON.stringify(value.cnicNumber));
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.referenceNumber),
    );
    localStorage.setItem("accountNumber", value.accountNumber);
    let data = {
      CNICNumber: value.cnicNumber,
      ReferenceNumber: value.referenceNumber,
    };
    setCaseStatus("");
    localStorage.removeItem("CaseStatus");
    let flagForGlobalDispute = false;
    await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
    await dispatch(GetAllCaseDecision());
    await dispatch(GetBBKDisputesForEditByCnicAndReferenceNumber(data));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Reference #",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
      width: "220px",
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
    },
    {
      title: "Total Dispute Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "220px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Aging",
      dataIndex: "aging",
      key: "aging",
      align: "center",
      width: "220px",
    },
    {
      title: "Case Closed TAT",
      dataIndex: "caseClosedTAT",
      key: "caseClosedTAT",
      align: "center",
      width: "220px",
    },
    {
      title: "View Status History",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "220px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let disputeID = record.pK_BBKDID;
              dispatch(
                GetDisputeStatusBBK(disputeID, showModal, setAction, actions),
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
        return record.statusDescription === "In Process" ? (
          <div
            onClick={(e) => update(e, record)}
            className="icon-edit icon-size-one beachGreen u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];

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
      // width: "3%",
    },
    {
      title: "Time",
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      render: (text) => TimeAndDisplayFormat(text),
      // width: "3%",
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

  useEffect(() => {
    dispatch(disableGoBack());
    window.scrollTo(0, 0);
  }, []);

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
  }, []);

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
          // ["CMCity"]: data.name,
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

  return (
    <>
      <Title level={3}>Search BB Konnect Disputes</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
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
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"AccountNumber"}
            label="Account Number"
            autoComplete="off"
            size="small"
            value={searchData.AccountNumber}
            change={(e) => handleSearch(e)}
            textLength={8}
            minLength={8}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"TransactionID"}
            label="Transaction ID"
            autoComplete="off"
            size="small"
            value={searchData.TransactionID}
            change={(e) => handleSearch(e)}
            textLength={20}
            minLength={20}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"CustomerName"}
            label="Customer Name"
            autoComplete="off"
            size="small"
            value={searchData.CustomerName}
            change={(e) => handleSearch(e)}
            textLength={25}
            minLength={25}
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
          <TextField
            fullWidth
            name={"CNICNumber"}
            label="CNIC"
            autoComplete="off"
            size="small"
            value={searchData.CNICNumber}
            change={(e) => handleSearch(e)}
            textLength={13}
            minLength={13}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name={"MobileNumber"}
            label="Mobile Number"
            autoComplete="off"
            size="small"
            value={searchData.MobileNumber}
            change={(e) => handleSearch(e)}
            textLength={13}
            minLength={13}
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
          <SelectBox
            label="Select Fraud Type"
            option={fraudType}
            name="Fraudtype"
            value={searchData.Fraudtype}
            change={fraudNameHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <FormattedInputs
            fullWidth
            name="TotalTransactionAmount"
            Label="Total Dispute Amount"
            size="small"
            autoComplete="off"
            value={
              searchData.TotalTransactionAmount === null ||
              searchData.TotalTransactionAmount === -99999999999999999999
                ? null
                : CommaFormter(searchData.TotalTransactionAmount)
            }
            change={(e) => handleSearch(e)}
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
              State.FromDate !== null && State.FromDate !== ""
                ? DateDisplayFormat(State.FromDate)
                : null
            }
            endvalue={
              State.ToDate !== null && State.ToDate !== ""
                ? DateDisplayFormat(State.ToDate)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px"></Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col
          lg={4}
          md={4}
          sm={24}
          className="u-margin-top-10px u-text-align-right"
        >
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={handleSearchData}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-10px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={investigationOfficer.SearchBBKDisputeData}
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
        modalState={isModalVisible}
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

export default SearchBBKDispute;
