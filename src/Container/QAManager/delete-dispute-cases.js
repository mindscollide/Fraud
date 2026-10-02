import React, { useState, useEffect } from "react";
import { Typography, Tooltip, Row, Col } from "antd";
import {
  DateDisplayFormat,
  DateSendingFormat,
  TimeAndDisplayFormat,
  CommaFormter,
} from "../../Common/Functions/date-formatter";
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
  FormattedInputs,
  Loader,
  MultipleSelectCheckmarks,
} from "../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllTransactionTypes,
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
  GetAllStatus,
  GetAllCity,
} from "./../../store/actions/setup-forms-actions";
import { enableGoBack, disableGoBack } from "./../../store/actions/ui-actions";
import {
  GetAllDisputesQM,
  SendPendingForDeletion,
  ResetAllDisputesData,
} from "./../../store/actions/qa-manager-actions";
import {
  GetCreditCardDisputesByCnic,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchBBKDisputesByCnicAndReferenceNumber,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  GetDisputeStatusGlobal,
  GetNegativeDBViewByCnic,
} from "./../../store/actions/investigation-officer-actions";

const DeleteDisputeCases = () => {
  const { Title } = Typography;
  const state = useSelector((state) => state);
  const { setupForms, qaManager, investigationOfficer } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actions, setAction] = useState({
    delete: false,
    viewApprovalHistory: false,
  });
  const [pendingForDeletion, setPendingForDeletion] = useState({
    FK_TTID: 0,
    FK_DID: 0,
    Comments: "",
  });

  const [row, setRow] = useState([]);

  //DateRange States
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });

  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rejectionComment, setRejectionComment] = useState("");

  //For Transaction Types
  const [selected, setSelected] = React.useState([]);
  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [searchData, setSearchData] = useState({
    AccountNumber: "",
    TransactionId: "",
    TransactionTypeIDs: [],
    RefrenceNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    CNIC: "",
    fk_csid: -1,
    TransactionAmount: -99999999999999999999,
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
        ToDate: DateSendingFormat(e.startDate),
        FromDate: DateSendingFormat(e.endDate),
      });
    } else {
      setState({
        ...State,
        FromDate: "",
        ToDate: "",
      });
    }
  };

  //Modal Opening Function
  const showModal = () => {
    setIsModalVisible(true);
  };

  //Reset Button
  const resetData = () => {
    setSearchData({
      AccountNumber: "",
      TransactionId: "",
      TransactionTypeIDs: [],
      RefrenceNumber: "",
      CustomerName: "",
      FK_CTID: 0,
      CNIC: "",
      fk_csid: -1,
      TransactionAmount: -99999999999999999999,
    });

    setSelectedTransactionTypeName([]);
    setCityValue("");
    setSelected([]);
    setCaseStatus("");
    setState({
      FromDate: "",
      ToDate: "",
    });
    dispatch(ResetAllDisputesData());
  };

  // for Reject Comments
  const Comments = (e) => {
    let value = e.target.value;

    if (value !== "") {
      setRejectionComment(e.target.value);
      setPendingForDeletion({ ...pendingForDeletion, ["Comments"]: value });
      setBtnDisabled(false);
    } else {
      setRejectionComment("");
      setPendingForDeletion({ ...pendingForDeletion, ["Comments"]: "" });
      setBtnDisabled(true);
    }
  };

  //Search Data
  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "TransactionAmount" &&
      name !== "CustomerName" &&
      name !== "TransactionId" &&
      name !== "CMCity" &&
      name !== "CNIC" &&
      name !== "AccountNumber" &&
      value !== "" &&
      value !== false
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (name === "TransactionId" && value !== "") {
      let valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CMCity" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CustomerName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");

      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CNIC" && value !== "") {
      let valueCheck = value.replace(/[^\d-]/g, "");

      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "AccountNumber" && value !== "") {
      let valueCheck = value.replace(/[^\d-]/g, "");

      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (
      name === "TransactionAmount" &&
      value !== -99999999999999999999
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
      if (name === "TransactionAmount") {
        setSearchData({
          ...searchData,
          [name]: parseInt(-99999999999999999999),
        });
      } else {
        setSearchData({
          ...searchData,
          [name]: "",
        });
      }
    }
  };

  //Search On Click
  const handleSearchData = () => {
    dispatch(GetAllDisputesQM(searchData, State));
  };

  //For Delete Icon Click
  const deleteit = (e, record, index) => {
    showModal();
    setAction({
      ...actions,
      delete: true,
    });
    setPendingForDeletion({
      ...pendingForDeletion,
      FK_TTID: record.ttid,
      FK_DID: record.did,
    });
  };

  //Delete Modal Proceed Functionality
  const handleDelete = () => {
    setIsModalVisible(false);
    let sData = {
      AccountNumber: "",
      TransactionId: "",
      TransactionTypeIDs: [],
      RefrenceNumber: "",
      CustomerName: "",
      CMCity: "",
      CNIC: "",
      fk_csid: -1,
      TransactionAmount: -99999999999999999999,
    };
    let dData = {
      FromDate: "",
      ToDate: "",
    };
    dispatch(SendPendingForDeletion(pendingForDeletion, sData, dData));
    setRejectionComment("");
    setPendingForDeletion({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
    });
    setBtnDisabled(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible2(false);
    setAction({ delete: false });
    setRejectionComment("");
    setSearchData({
      ...searchData,
      AccountNumber: "",
      TransactionId: "",
      TransactionTypeIDs: [],
      RefrenceNumber: "",
      CustomerName: "",
      CMCity: "",
      CNIC: "",
      fk_csid: -1,
      TransactionAmount: -99999999999999999999,
      FromDate: "",
      ToDate: "",
      FK_CTID: 0,
    });
    setCityValue("");
    setRejectionComment("");
    setPendingForDeletion({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
    });
  };

  //View Click
  const View = async (e, record) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(record.refrenceNumber),
    );
    let Data = {
      CNICNumber: record.cnicNumber,
      ReferenceNumber: record.refrenceNumber,
    };
    let Data2 = {
      CNICNumber: record.cnicNumber,
      RefrenceNumber: record.refrenceNumber,
    };
    let DataND = {
      CNICNumber: record.cnicNumber,
    };
    dispatch(enableGoBack());
    if (record.ttid === 1) {
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      dispatch(GetCreditCardDisputesByCnic(Data, flag));
      navigate("/Fraud/QAM/ViewCustomerDetails");
    }
    if (record.ttid === 2) {
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      dispatch(SearchDebitCardDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/QAM/ViewCustomerDetailsDC");
    }
    if (record.ttid === 3) {
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(Data2, flag),
      );
      navigate("/Fraud/QAM/ViewCustomerDetailsADC");
    }
    if (record.ttid === 4) {
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/QAM/ViewCustomerDetailsNonApi");
    }
    if (record.ttid === 5) {
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/QAM/ViewCustomerDetailsBBK");
    }
    if (record.ttid === 6) {
      localStorage.setItem("cnic", record.cnicNumber);
      let ttid = record.ttid;
      let flag = true;
      localStorage.setItem("ttid", ttid);
      await dispatch(GetAllChannel());
      await dispatch(GetAllIndividualInvolved());
      await dispatch(GetAllForgedDocuments());
      await dispatch(GetAllFraudNotAFraud());
      await dispatch(GetAllCompanySegment());
      dispatch(GetNegativeDBViewByCnic(DataND, flag));
      navigate("/Fraud/QAM/ViewCustomerDetailsND");
    }
  };

  //For Transaction Type Dropdown
  useEffect(() => {
    let UserID = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserID.userID;
    dispatch(GetAllTransactionTypes(userid));
    dispatch(ResetAllDisputesData());
    dispatch(GetAllCity());
    dispatch(disableGoBack());
    window.scrollTo(0, 0);
  }, []);

  // Selected Dropdown value
  const transactionTypeHandler = (e, value) => {};

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

  // For User Roles DropDown SetState
  useEffect(() => {
    let transactionName = setupForms.TransactionTypesData;
    setTransactionTypes(
      transactionName.map((data, index) => {
        return data.ttName;
      }),
    );
  }, [setupForms.TransactionTypesData]);

  //For Row Population
  useEffect(() => {}, [qaManager.AllDisputesData]);

  //Notification And Loading
  useEffect(() => {
    if (qaManager.ResponseMessage === "No Records Found") {
      setOpen({
        flag: true,
        message: qaManager.ResponseMessage,
      });
    } else if (qaManager.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: qaManager.ResponseMessage,
      });
    } else if (
      qaManager.ResponseMessage === "The Dispute Has Been Sent For Deletion"
    ) {
      setOpen({
        flag: true,
        message: qaManager.ResponseMessage,
      });
    }
  }, [qaManager.ResponseMessage]);

  useEffect(() => {
    if (qaManager.ShowNotification) {
      setOpen({
        flag: true,
        message: qaManager.ResponseMessage,
      });
    }
  }, [qaManager.Loading]);

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

  //Column Names
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
      width: "200px",
    },
    {
      title: "CNIC",
      dataIndex: "cnicNumber",
      key: "cnicNumber",
      align: "center",
      width: "200px",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      align: "center",
      width: "200px",
    },
    {
      title: "Total Dispute Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "250px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      width: "200px",
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
              let disputeID = { DID: record.did, TTID: record.ttid };
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
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "200px",
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "",
      align: "center",
      width: "200px",
      render: (text, record, index) => (
        <>
          {record.status === "Deleted" ||
          record.status === "Pending For Deletion" ? null : (
            <div
              onClick={(e) => deleteit(e, record)}
              className="icon-trash icon-size-one pdfRed u-cursor-pointer"
            />
          )}
        </>
      ),
    },
  ];

  //Modal Buttons
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
      disable: btnDisabled,
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

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
  }, []);

  // City handler
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
      }),
    );
  }, [setupForms.CityData]);

  return (
    <>
      <Title level={3}>Search Dispute Cases</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24} className="MultipleSelectClass">
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
            name={"RefrenceNumber"}
            fullWidth
            autoComplete="off"
            label="Reference Number"
            size="small"
            value={searchData.RefrenceNumber}
            textLength={20}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            name={"AccountNumber"}
            fullWidth
            autoComplete="off"
            label="Account Number"
            size="small"
            value={searchData.AccountNumber}
            textLength={14}
            change={(e) => handleSearch(e)}
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
            textLength={20}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name={"CustomerName"}
            label="Customer Name"
            size="small"
            autoComplete="off"
            value={searchData.CustomerName}
            textLength={30}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="u-margin-top-22px" />
          <TextField
            fullWidth
            name={"CNIC"}
            label="CNIC"
            size="small"
            autoComplete="off"
            value={searchData.CNIC}
            textLength={13}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="u-margin-top-22px" />
          <SelectBox
            label="Select City"
            option={city}
            value={cityValue}
            change={CityNameHandler}
            name="FK_CTID"
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <StartToEndDate
            label={"Case Received Date"}
            size="large"
            change={setDate}
            // key={clearDateSelect}
            startvalue={
              State.FromDate !== null && State.ToDate !== ""
                ? DateDisplayFormat(State.FromDate)
                : null
            }
            endvalue={
              State.ToDate !== null && State.FromDate !== ""
                ? DateDisplayFormat(State.ToDate)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="u-margin-top-22px" />
          <FormattedInputs
            name={"TransactionAmount"}
            value={
              searchData.TransactionAmount !== null &&
              searchData.TransactionAmount !== -99999999999999999999
                ? searchData.TransactionAmount
                : null
            }
            textLength={(999, 999, 999, 999, 999, 999, 999)}
            size="small"
            Label={"Total Dispute Amount"}
            fullWidth
            autoComplete="off"
            change={(e) => handleSearch(e)}
            max={15}
            min={15}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="u-margin-top-22px" />
          <SelectBox
            label="Select Case Status"
            option={caseStatusOptions}
            name="fk_csid"
            value={caseStatus}
            change={caseStatusHandler}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={4} md={4} sm={24}>
          <div className="u-margin-top-22px" />

          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="large"
            click={handleSearchData}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <div className="u-margin-top-22px" />

          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="large"
            click={resetData}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={qaManager.AllDisputesData}
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
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {actions.delete && (
          <>
            <div className="u-padding-20px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <div className="u-padding-20px u-display-flex u-justify-content-center">
              <p className="m-0 u-color-b27706">
                Type your Comments<span className="u-color-ce0000">*</span>
              </p>
              <TextField
                multiline
                rows={4}
                placeholder="Comments"
                autoComplete="off"
                change={Comments}
                value={rejectionComment}
                fullWidth
                name="Comments"
                textLength={500}
              />
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
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
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {qaManager.Loading || investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default DeleteDisputeCases;
