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
} from "../../../Common/Functions/date-formatter";
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
} from "../../../Components/Elements";
import { enableGoBack, disableGoBack } from "../../../store/actions/ui-actions";
import {
  HideNotification,
  GetCreditCardDisputesByCnic,
  resetGlobalDisputeTable,
  SearchGlobalDisputes,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchBBKDisputesByCnicAndReferenceNumber,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  GetNegativeDBViewByCnic,
  GetDisputeStatusGlobal,
} from "../../../store/actions/investigation-officer-actions";
import {
  GetAllTransactionTypes,
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
  GetAllStatus,
} from "../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchDisputeIM = () => {
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
    fk_csid: -1,
    TotalTransactionAmount: -99999999999999999999,
    FK_CTID: 0,
  });
  //For Transaction Types
  const [selected, setSelected] = React.useState([]);
  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [row, setRow] = useState([]);
  const transactionTypeHandler = (e, value) => {};
  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });
  const resetData = () => {
    setSearchData({
      ...searchData,
      TransactionTypeIDs: [],
      ReferenceNumber: "",
      CNIC: "",
      AccountNumber: "",
      fk_csid: -1,
      FK_CTID: 0,
    });
    setCaseStatus("");
    setSelectedTransactionTypeName([]);
    setSelected([]);
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
      value !== "" &&
      value !== false
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (name === "CNIC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "AccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    }
  };

  const View = async (e, record) => {
    let Data = {
      CNICNumber: record.cnicNumber,
      ReferenceNumber: record.referenceNumber,
    };
    if (record.fK_TTID === 1) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTIDGS = true;
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      await dispatch(GetCreditCardDisputesByCnic(Data, TTIDGS));
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetails");
    }
    if (record.fK_TTID === 2) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTIDGS = true;
      localStorage.setItem("TTIDGS", true);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      await dispatch(
        SearchDebitCardDisputesByCnicAndReferenceNumber(Data, TTIDGS),
      );
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsDC");
    }
    if (record.fK_TTID === 3) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTIDGS = true;
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      let ADCData = {
        CNICNumber: record.cnicNumber,
        RefrenceNumber: record.referenceNumber,
      };
      await dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(ADCData, TTIDGS),
      );
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsADC");
    }
    if (record.fK_TTID === 4) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTIDGS = true;
      localStorage.setItem("TTIDGS", true);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      await dispatch(
        SearchNonApiDisputesByCnicAndReferenceNumber(Data, TTIDGS),
      );
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsNonApi");
    }
    if (record.fK_TTID === 5) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTIDGS = true;
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber),
      );
      let BBKData = {
        CNICNumber: record.cnicNumber,
        ReferenceNumber: record.referenceNumber,
      };
      await dispatch(
        SearchBBKDisputesByCnicAndReferenceNumber(BBKData, TTIDGS),
      );
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsBBK");
    }
    if (record.fK_TTID === 6) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      localStorage.setItem("cnic", record.cnicNumber);
      let TTIDGS = true;
      let NDData = {
        CNICNumber: record.cnicNumber,
      };
      await dispatch(GetAllChannel());
      await dispatch(GetAllIndividualInvolved());
      await dispatch(GetAllForgedDocuments());
      await dispatch(GetAllFraudNotAFraud());
      await dispatch(GetAllCompanySegment());
      dispatch(enableGoBack());
      await dispatch(GetNegativeDBViewByCnic(NDData, TTIDGS));
      dispatch(enableGoBack());
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsND");
    }
  };

  const handleSearchData = () => {
    dispatch(SearchGlobalDisputes(searchData, State));
  };

  const handleCancel = () => {
    setIsModalVisible2(false);
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

  useEffect(() => {
    let UserID = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserID.userID;
    localStorage.removeItem("fk_TTIDDelete");
    dispatch(resetGlobalDisputeTable());
    dispatch(GetAllTransactionTypes(userid));
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

  const columns = [
    {
      title: "Reference Number",
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
            return data.ttName;
          }
        });
      },
    },
    {
      title: "Total Transaction Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "180px",
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
      width: "170px",
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
            size="small"
            autoComplete="off"
            value={searchData.CNIC}
            change={(e) => handleSearch(e)}
            textLength={13}
          />
        </Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name={"AccountNumber"}
            label="Account Number"
            size="small"
            autoComplete="off"
            value={searchData.AccountNumber}
            change={(e) => handleSearch(e)}
            textLength={14}
          />
        </Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-22px">
          <SelectBox
            label="Select Case Status"
            option={caseStatusOptions}
            name="fk_csid"
            value={caseStatus}
            change={caseStatusHandler}
          />
          {/* <Checkbox
            className="SearchCheckbox"
            checked={searchData.Inprocess}
            onChange={onChange}
          >
            In Process Only
          </Checkbox> */}
        </Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-22px">
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
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={handleSearchData}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
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

export default SearchDisputeIM;
