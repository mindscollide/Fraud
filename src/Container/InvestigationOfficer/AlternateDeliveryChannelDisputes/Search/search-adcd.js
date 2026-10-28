import React, { useState, useEffect } from "react";
import { Typography, Space, Checkbox, Tooltip, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  TimeAndDisplayFormat,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import {
  SelectBox,
  Button,
  Table,
  // GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
  DatePicker,
  Loader,
  FormattedInputs,
} from "../../../../Components/Elements";
import {
  HideNotification,
  SearchADCDisputes,
  resetCustomerDetailsADC,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchADCDisputesForEditByCnicAndReferenceNumber,
  GetDisputeStatusADC,
} from "../../../../store/actions/investigation-officer-actions";
import {
  disableGoBack,
  enableGoBack,
} from "../../../../store/actions/ui-actions";
import {
  GetAllSourceOfIBChannelCreation,
  GetAllStatus,
  GetAllCaseDecision,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchADCD = () => {
  const navigate = useNavigate();
  // GET INPROGRESS FROM SAVE
  const { Title, Text } = Typography;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const { setupForms, investigationOfficer } = state;

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  var cnic = localStorage.getItem("cnic");

  const [fraudType, setFraudType] = useState([]);

  const [fraudTypeName, setFraudTypeName] = useState([]);

  const [row, setRow] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  //DataRangeHandler
  const [clearDateSelect, setDateClearSelect] = useState("");

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

  var caseStatusItem = parseInt(localStorage.getItem("CaseStatus"));
  const [caseStatus, setCaseStatus] = useState("");
  const [caseStatusOptions, setCaseStatusOptions] = useState("");

  const [searchData, setSearchData] = useState({
    RefrenceNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    CNIC: "",
    AccountNumber: "",
    TransactionID: "",
    TransactionAmount: -99999999999999999999,
    fk_csid: -1,
  });

  // GET INPROGRESS TO CHECK

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "TransactionID" &&
      name !== "TransactionAmount" &&
      name !== "CNIC" &&
      name !== "CustomerName" &&
      name !== "AccountNumber" &&
      name !== "CMCity"
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (
      name !== "TransactionID" &&
      name === "TransactionAmount" &&
      value !== -99999999999999999999 &&
      value !== "" &&
      name !== "CustomerName" &&
      name !== "CNIC" &&
      name !== "AccountNumber" &&
      name !== "CMCity"
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
    } else if (name === "CNIC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck,
        });
      }
    } else if (name === "CNIC" && value === "") {
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
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "TransactionID" && value === "") {
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
    } else if (
      name === "TransactionAmount" &&
      (value === "" || value === -99999999999999999999)
    ) {
      setSearchData({
        ...searchData,
        [name]: parseInt(-99999999999999999999),
      });
    }
  };

  const handleSearchData = () => {
    dispatch(SearchADCDisputes(searchData, State));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const resetData = () => {
    setSearchData({
      ...searchData,
      RefrenceNumber: "",
      CustomerName: "",
      FK_CTID: 0,
      CNIC: "",
      AccountNumber: "",
      TransactionID: "",
      TransactionAmount: -99999999999999999999,
      ApprovalCode: "",
      fk_csid: -1,
    });
    setState({
      ...State,
      FromDate: "",
      ToDate: "",
    });
    setCaseStatus("");
    setCityValue("");
    dispatch(resetCustomerDetailsADC());
  };

  //UseEffects
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

  useEffect(() => {}, [investigationOfficer.SearchADCDisputesData]);

  const View = (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.setItem("CNICNumber", JSON.stringify(value.cnicNumber));
    localStorage.removeItem("CaseStatus");
    setCaseStatus("");
    let Data = {
      CNICNumber: value.cnicNumber,
      RefrenceNumber: value.refrenceNumber,
    };
    dispatch(enableGoBack());
    dispatch(SearchTransactionDetailsADCByCNICAndReferenceNumber(Data));
  };

  const update = async (e, value) => {
    localStorage.setItem("CNICNumber", JSON.stringify(value.cnicNumber));
    localStorage.setItem("cnic2", value.cnicNumber);
    localStorage.setItem("accountNumber", value.accountNumber);

    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.removeItem("CaseStatus");
    setCaseStatus("");
    let data = {
      CNICNumber: value.cnicNumber,
      RefrenceNumber: value.refrenceNumber,
    };
    let flagForGlobalDispute = false;
    await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
    await dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(data));
  };

  useEffect(() => {
    let ForCheck = investigationOfficer.GetApprovalStatusADCData;
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
  }, [investigationOfficer.GetApprovalStatusADCData]);

  const columns = [
    {
      title: "Reference #",
      dataIndex: "refrenceNumber",
      key: "refrenceNumber",
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
      title: "CNIC Number",
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
      width: "190px",
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
      title: "Aging",
      dataIndex: "aging",
      key: "aging",
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
      title: "Case Closed TAT",
      dataIndex: "caseClosedTAT",
      key: "caseClosedTAT",
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
      title: "View Status History",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "180px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let disputeID = record.pK_ADCDID;
              dispatch(
                GetDisputeStatusADC(disputeID, showModal, setAction, actions)
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
      width: "220px",
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

  // const okayButtonProp = {
  //   primaryButton: {
  //     text: "Close",
  //     class: "btnBorderStyledBeach",
  //     click: () => handleCancel(),
  //   },
  //   secondaryButton: {
  //     text: "",
  //   },
  // };

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
      })
    );
  }, [setupForms.StatusData]);

  useEffect(() => {
    let data = {
      IsNegativeDatabase: false,
    };
    dispatch(GetAllStatus(data));
    dispatch(GetAllCity());
  }, []);

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
      <Title level={3}>Search Alternate Delivery Channel Disputes</Title>

      <>
        <Row gutter={8} className="u-margin-top-22px">
          {/* Reference Number */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              name={"RefrenceNumber"}
              fullWidth
              autoComplete="off"
              label={
                searchData?.RefrenceNumber !== "" ? "Reference Number" : ""
              }
              placeholder={"Reference Number"}
              size="small"
              value={searchData.RefrenceNumber}
              change={(e) => handleSearch(e)}
              textLength={13}
            />
          </Col>

          {/* Customer Name */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              fullWidth
              name={"CustomerName"}
              label={searchData?.CustomerName !== "" ? "Customer Name" : ""}
              placeholder={"Customer Name"}
              size="small"
              autoComplete="off"
              value={searchData.CustomerName}
              change={(e) => handleSearch(e)}
              textLength={100}
            />
          </Col>

          {/* CNIC */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              fullWidth
              name={"CNIC"}
              label={searchData?.CNIC !== "" ? "CNIC" : ""}
              placeholder={"CNIC"}
              size="small"
              autoComplete="off"
              value={searchData.CNIC}
              change={(e) => handleSearch(e)}
              textLength={13}
            />
          </Col>

          {/* Account Number */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              fullWidth
              name={"AccountNumber"}
              label={searchData?.AccountNumber !== "" ? "Account Number" : ""}
              placeholder={"Account Number"}
              autoComplete="off"
              size="small"
              value={searchData.AccountNumber}
              change={(e) => handleSearch(e)}
              textLength={14}
            />
          </Col>
        </Row>

        <Row gutter={16} className="u-margin-top-22px">
          {/* Transaction ID */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              fullWidth
              name={"TransactionID"}
              label={searchData?.TransactionID !== "" ? "Transaction ID" : ""}
              placeholder={"Transaction ID"}
              autoComplete="off"
              size="small"
              value={searchData.TransactionID}
              change={(e) => handleSearch(e)}
              textLength={20}
            />
          </Col>

          {/* City */}
          <Col lg={6} md={6} sm={24}>
            <SelectBox
              label={
                cityValue !== "" && cityValue !== null ? "Select City" : ""
              }
              placeholder={"Select City"}
              option={city}
              value={cityValue}
              change={CityNameHandler}
              name="FK_CTID"
            />
          </Col>

          {/* Case Status */}
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

          {/* Approval Code */}
          <Col lg={6} md={6} sm={24}>
            <TextField
              fullWidth
              name={"ApprovalCode"}
              label={searchData?.ApprovalCode ? "Approval Code" : ""}
              placeholder={"Approval Code"}
              size="small"
              autoComplete="off"
              value={searchData.ApprovalCode || ""}
              change={(e) => handleSearch(e)}
              textLength={7}
            />
          </Col>
        </Row>

        <Row gutter={16} className="u-margin-top-22px">
          {/* Transaction Amount */}
          <Col lg={6} md={6} sm={24}>
            <FormattedInputs
              fullWidth
              name="TransactionAmount"
              autoComplete="off"
              Label={hasAmountValue ? "Total Dispute Amount" : ""}
              placeholder={"Total Dispute Amount"}
              size="small"
              value={
                searchData.TransactionAmount === null ||
                searchData.TransactionAmount === -99999999999999999999
                  ? null
                  : CommaFormter(searchData.TransactionAmount)
              }
              change={(e) => handleSearch(e)}
            />
          </Col>

          {/* Cash Received Date */}
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
        </Row>

        <Row
          gutter={16}
          className="u-display-flex u-justify-content-center u-margin-top-10px"
        >
          <Col lg={3} md={3} sm={24}>
            <Button
              text="Search"
              icon={
                <i className="icon-size-zero">
                  <Search />
                </i>
              }
              applyClass="btnSecondarySolid2Search2"
              size="small"
              click={handleSearchData}
            />
          </Col>
          <Col lg={3} md={3} sm={24}>
            <Button
              text="Reset"
              icon={<i className="icon-reset icon-size-zero"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </Col>
        </Row>

        <Row gutter={16} className="u-margin-top-1pct">
          <Col lg={24} md={24} sm={24}>
            <Table
              rows={investigationOfficer.SearchADCDisputesData}
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
      </>

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
            <div className="u-display-flex u-justify-content-center">
              {/* <GroupedButtons data={okayButtonProp} /> */}
              <Button
                text="Close"
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
      {setupForms.Loading || investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default SearchADCD;
