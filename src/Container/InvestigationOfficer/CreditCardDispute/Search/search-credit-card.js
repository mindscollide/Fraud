import React, { useState, useEffect } from "react";
import { Typography, Tooltip, Row, Col } from "antd";
import {
  DateDisplayFormat,
  TimeAndDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import { SearchOutlined as Search } from "@ant-design/icons";
import {
  SelectBox,
  Button,
  Table,
  FormattedInputs,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
  DatePicker,
  Loader,
  GroupedButtons,
} from "../../../../Components/Elements";
import {
  HideNotification,
  GetTransactionDetailsByCnic,
  SearchCreditCardDisputes,
  ResetCreditCardDisputeSuccess,
  resetCustomerDetailsCreditCard,
  GetCreditCardDisputesByCnic,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumber,
  GetDisputeStatusCC,
} from "../../../../store/actions/investigation-officer-actions";
import { ensureLookup } from "../../../../store/actions/lookup-actions";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../store/actions/ui-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchCreditCardDispute = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const { setupForms, investigationOfficer } = state;

  const [clearDateSelect, setDateClearSelect] = useState("");

  const [fraudType, setFraudType] = useState([]);

  const [fraudTypeName, setFraudTypeName] = useState([]);

  const [row, setRow] = useState([]);

  const [dataForSave, setDataForSave] = useState([]);

  // Case Status Functionality
  const [caseStatus, setCaseStatus] = useState("");
  const [caseStatusOptions, setCaseStatusOptions] = useState("");
  var caseStatusItem = parseInt(localStorage.getItem("CaseStatus"));

  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });

  const [searchData, setSearchData] = useState({
    RefrenceNumber: "",
    CNICNumber: "",
    CardNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    Fraudtype: "",
    TransactionId: "",
    ApprovalCode: "",
    TransactionAmount: -99999999999999999999,
    fk_csid: -1,
  });

  //Approve Dispute
  const [approvalStatus, setApprovalStatus] = useState({
    FK_DID: 0,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      let data = {
        IsNegativeDatabase: false,
      };
      await dispatch(ensureLookup("status", data));
      await dispatch(ensureLookup("city"));
      await dispatch(ensureLookup("fraudType"));
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        await dispatch(ensureLookup("status", data));
        await dispatch(ensureLookup("city"));
        await dispatch(ensureLookup("fraudType"));
        localStorage.removeItem("CaseStatus");
      }
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
      dispatch(disableGoBack());
      window.scrollTo(0, 0);
    };
    loadInitialData();
  }, []);

  const resetData = () => {
    setSearchData({
      ...searchData,
      RefrenceNumber: "",
      CNICNumber: "",
      CustomerName: "",
      FK_CTID: 0,
      Fraudtype: "",
      TransactionId: "",
      ApprovalCode: "",
      TransactionAmount: -99999999999999999999,
      fk_csid: -1,
    });
    setState({
      ...State,
      FromDate: "",
      ToDate: "",
    });
    setCaseStatus("");
    setCityValue("");
    dispatch(resetCustomerDetailsCreditCard());
    dispatch(ResetCreditCardDisputeSuccess());
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
      name !== "TransactionAmount" &&
      name !== "CNICNumber" &&
      name !== "TransactionId" &&
      name !== "CMCity" &&
      name !== "RefrenceNumber" &&
      name !== "CustomerName"
    ) {
      setSearchData({
        ...searchData,
        [name]: value,
      });
    } else if (
      name === "TransactionAmount" &&
      value !== -99999999999999999999 &&
      value !== "" &&
      name !== "CustomerName" &&
      name !== "TransactionId" &&
      name !== "CMCity" &&
      name !== "CNICNumber"
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
    } else if (name === "CMCity" && value !== "") {
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
    } else if (name === "CNICNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CNICNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "TransactionId" && value !== "") {
      // all special character blocked
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "TransactionId" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (
      name === "TransactionAmount" &&
      (value === "" || value === -99999999999999999999)
    ) {
      setSearchData({
        ...searchData,
        [name]: -99999999999999999999,
      });
    } else if (name === "RefrenceNumber") {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    }
  };

  const View = (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.setItem("CNICNumber", JSON.stringify(value.cnicNumber));
    localStorage.removeItem("CaseStatus");
    let Data = {
      CNICNumber: value.cnicNumber,
      ReferenceNumber: value.refrenceNumber,
    };
    dispatch(enableGoBack());
    dispatch(GetCreditCardDisputesByCnic(Data));
  };

  const handleSearchData = () => {
    dispatch(SearchCreditCardDisputes(searchData, State));
  };

  useEffect(() => {
    let nameFraud = setupForms.FraudTypeData;
    if (nameFraud.length > 0 && nameFraud !== undefined && nameFraud !== null) {
      setFraudType(
        nameFraud.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.FraudTypeData]);

  useEffect(() => {}, [fraudType]);

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
    } else {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ResponseMessage]);

  useEffect(() => {}, [investigationOfficer.SearchCreditCardDisputeData]);

  useEffect(() => {
    let ForCheck = investigationOfficer.GetApprovalStatusCCData;
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
  }, [investigationOfficer.GetApprovalStatusCCData]);

  var cnic = localStorage.getItem("cnic");

  //Edit Click
  const update = async (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.setItem("cnic", value.cnicNumber);
    localStorage.removeItem("CaseStatus");
    let data = {
      CNICNumber: value.cnicNumber,
      ReferenceNumber: value.refrenceNumber,
    };
    let flagForGlobalDispute = false;
    await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
    await dispatch(GetCreditCardDisputesForEditByCnicAndRefrenceNumber(data));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "refrenceNumber",
      key: "refrenceNumber",
      align: "center",
      width: "200px",
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
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
      align: "center",
      width: "200px",
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
      title: "Customer City",
      dataIndex: "fK_CTID",
      key: "fK_CTID",
      align: "center",
      width: "220px",
      render: (text) => {
        return setupForms.CityData.map((data, index) => {
          if (text === data.pK_CTID) {
            return data.name;
          }
        });
      },
    },
    {
      title: "Total Billed Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "200px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Credit Limit",
      dataIndex: "creditCardLimit",
      key: "creditCardLimit",
      align: "center",
      width: "140px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Fraud Type",
      dataIndex: "fraudtype",
      key: "fraudtype",
      align: "center",
      width: "220px",
    },
    {
      title: "Case Received Date",
      dataIndex: "caseReceivedDate",
      key: "caseReceivedDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Case Resolved Date",
      dataIndex: "caseResolvedDate",
      key: "caseResolvedDate",
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
      title: "Aging",
      dataIndex: "aging",
      key: "aging",
      align: "center",
      width: "100px",
      render: (text) => {
        if (String(text) !== "" && text !== -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Case Closed TAT",
      dataIndex: "caseClosedTAT",
      key: "caseClosedTAT",
      align: "center",
      width: "220px",
      render: (text) => {
        if (String(text) !== "" && text !== -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Case Decision",
      dataIndex: "caseDecision",
      key: "caseDecision",
      align: "center",
      width: "220px",
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
              let disputeID = record.pK_CCDID;
              dispatch(
                GetDisputeStatusCC(disputeID, showModal, setAction, actions)
              );
            }}
            className="icon-edit-list icon-size-one u-color-2f2f2f u-cursor-pointer"
          ></div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
      width: "100px",
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
            className="icon-edit icon-size-one u-color-2f2f2f u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];

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

  // const okayButtonProp = {
  //   primaryButton: {
  //     text: "Ok",
  //     class: "btnBorderStyledBeach",
  //     click: () => handleCancel(),
  //   },
  //   secondaryButton: {
  //     text: "",
  //   },
  // };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

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
      })
    );
  }, [setupForms.StatusData]);

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

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

  // // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    setCity(
      valueCity.map((data, index) => {
        return data.name;
      })
    );
  }, [setupForms.CityData]);

  // Conditions used to show labels only once a field has a value
  const hasDateValue =
    (State.FromDate !== null && State.FromDate !== "") ||
    (State.ToDate !== null && State.ToDate !== "");

  const hasAmountValue =
    searchData.TransactionAmount !== null &&
    searchData.TransactionAmount !== "" &&
    searchData.TransactionAmount !== -99999999999999999999;

  const hasCaseStatus =
    caseStatus !== null &&
    caseStatus !== undefined &&
    caseStatus !== "" &&
    !(Array.isArray(caseStatus) && caseStatus.length === 0);

  return (
    <>
      <Title level={3}>Search Credit Card Disputes</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name={"RefrenceNumber"}
            fullWidth
            label={searchData?.RefrenceNumber !== "" ? "Reference Number" : ""}
            placeholder={"Reference Number"}
            size="small"
            value={searchData.RefrenceNumber}
            change={(e) => handleSearch(e)}
            textLength={17}
            autoComplete="off"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"CustomerName"}
            label={searchData?.CustomerName !== "" ? "Customer Name" : ""}
            placeholder={"Customer Name"}
            size="small"
            value={searchData.CustomerName}
            change={(e) => handleSearch(e)}
            autoComplete="off"
            textLength={100}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"CNICNumber"}
            label={searchData?.CNICNumber !== "" ? "CNIC" : ""}
            placeholder={"CNIC"}
            size="small"
            value={searchData.CNICNumber}
            change={(e) => handleSearch(e)}
            textLength={13}
            minLength={13}
            autoComplete="off"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"TransactionId"}
            label={searchData?.TransactionId !== "" ? "Transaction ID" : ""}
            placeholder={"Transaction ID"}
            size="small"
            value={searchData.TransactionId}
            change={(e) => handleSearch(e)}
            textLength={20}
            minLength={20}
            autoComplete="off"
          />
        </Col>
      </Row>
      <Row gutter={8} className="u-margin-top-22px">
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={cityValue !== "" && cityValue !== null ? "Select City" : ""}
            placeholder={"Select City"}
            option={city}
            value={cityValue}
            change={CityNameHandler}
            name="FK_CTID"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={hasCaseStatus ? "Select Case Status" : ""}
            placeholder={"Select Case Status"}
            option={caseStatusOptions}
            name="fk_csid"
            value={caseStatus}
            change={caseStatusHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={searchData.Fraudtype !== "" ? "Select Fraud Type" : ""}
            placeholder={"Select Fraud Type"}
            option={fraudType}
            name="Fraudtype"
            value={searchData.Fraudtype}
            change={fraudNameHandler}
          />
        </Col>

        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"ApprovalCode"}
            label={searchData?.ApprovalCode !== "" ? "Approval Code" : ""}
            placeholder={"Approval Code"}
            size="small"
            autoComplete="off"
            value={searchData.ApprovalCode}
            change={(e) => handleSearch(e)}
            textLength={7}
          />
        </Col>
      </Row>
      <Row gutter={8} className="u-margin-top-22px">
        <Col lg={6} md={6} sm={24}>
          <FormattedInputs
            name={"TransactionAmount"}
            value={
              searchData.TransactionAmount === null ||
              searchData.TransactionAmount === -99999999999999999999
                ? null
                : searchData.TransactionAmount
            }
            textLength={(999, 999, 999, 999, 999, 999, 999)}
            size="small"
            Label={hasAmountValue ? "Total Billed Amount" : ""}
            placeholder={"Total Billed Amount"}
            fullWidth
            change={(e) => handleSearch(e)}
            autoComplete="off"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <StartToEndDate
            label={hasDateValue ? "Case Received Date" : ""}
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
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={
              <i className="icon-size-zero">
                <Search />
              </i>
            }
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={handleSearchData}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Reset"
            icon={<i className="icon-reset icon-size-zero"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
      </Row>
      <Row className="u-margin-top-10px">
        <Col lg={24} md={24} sm={24}>
          <Table
            rows={investigationOfficer.SearchCreditCardDisputeData}
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
            {/* <GroupedButtons data={okayButtonProp} /> */}

            <div className="u-display-flex u-justify-content-center">
              {/* <GroupedButtons data={okayButtonProp} /> */}
              <Button
                text="Cancel"
                type={"primary"}
                size="large"
                applyClass="btnBorderStyledBeach"
                click={handleCancel}
                // click= () => handleCancel(),
              />
            </div>
          </>
        )}
      </Modal>

      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default SearchCreditCardDispute;
