import React, { useState, useEffect } from "react";
import { Typography, Space, Checkbox, Tooltip, Row, Col } from "antd";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";
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
} from "../../../../../Components/Elements";
import {
  HideNotification,
  resetCustomerDetailsCreditCard,
  GetCreditCardDisputesByCnic,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumber,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchBBKDisputesByCnicAndReferenceNumber,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  GetNegativeDBViewByCnic,
} from "../../../../../store/actions/investigation-officer-actions";
import {
  GetAllFraudType,
  GetAllTransactionTypes,
  SearchDeleteCases,
  resetDisputeTable,
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
} from "../../../../../store/actions/setup-forms-actions";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../../store/actions/ui-actions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewDeleteCases = () => {
  let inProgressOnly = localStorage.getItem("InProgressOnly");
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
  const { setupForms } = state;
  const [clearDateSelect, setDateClearSelect] = useState("");
  const [row, setRow] = useState([]);
  const [searchData, setSearchData] = useState({
    TransactionTypeIDs: [],
    ReferenceNumber: "",
    CNIC: "",
  });
  const [State, setState] = useState({
    from: "",
    to: "",
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

  //Approve Dispute
  const [approvalStatus, setApprovalStatus] = useState({
    FK_DID: 0,
  });

  const resetData = () => {
    localStorage.removeItem("InProgressOnly");
    setSearchData({
      ...searchData,
      TransactionTypeIDs: [],
      ReferenceNumber: "",
      CNIC: "",
    });
    setState({
      ...State,
      from: "",
      to: "",
    });
    setSelectedTransactionTypeName([]);
    setSelected([]);
    dispatch(resetDisputeTable());
  };

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name !== "TransactionAmountPKR") {
      if (name === "ReferenceNumber") {
        setSearchData({
          ...searchData,
          [name]: value.trimStart(),
        });
      }
      if (name === "CNIC") {
        var valueCheck = value.replace(/[^\d-]/g, "");
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    }
    if (name === "TransactionAmountPKR") {
      setSearchData({
        ...searchData,
        [name]: parseInt(value),
      });
    } else if (name === "TransactionAmountPKR" && value === "") {
      setSearchData({
        ...searchData,
        [name]: parseInt(0),
      });
    }
  };
  var TTID = localStorage.getItem("FK_TTID");
  var TTIDQM = localStorage.getItem("ttid");
  var Fk_TTID = localStorage.getItem("fk_TTID");
  //   View Click
  const View = async (e, record) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(record.referenceNumber),
    );
    let Data = {
      CNICNumber: record.cnicNumber,
      ReferenceNumber: record.referenceNumber,
    };
    let Data2 = {
      CNICNumber: record.cnicNumber,
      RefrenceNumber: record.referenceNumber,
    };
    let NDData = {
      CNICNumber: record.cnicNumber,
    };
    dispatch(enableGoBack());
    if (record.fK_TTID === "1") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(GetCreditCardDisputesByCnic(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetails");
    }
    if (record.fK_TTID === "2") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      localStorage.setItem("fk_TTIDDelete", true);
      dispatch(SearchDebitCardDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsDC");
    }
    if (record.fK_TTID === "3") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      localStorage.setItem("fk_TTIDDelete", true);
      dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(Data2, flag),
      );
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsADC");
    }
    if (record.fK_TTID === "4") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      localStorage.setItem("fk_TTIDDelete", true);
      dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsNonApi");
    }
    if (record.fK_TTID === "5") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      localStorage.setItem("fk_TTIDDelete", true);
      dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsBBK");
    }
    if (record.fK_TTID === "6") {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      localStorage.setItem("cnic", record.cnicNumber);
      await dispatch(GetAllChannel());
      await dispatch(GetAllIndividualInvolved());
      await dispatch(GetAllForgedDocuments());
      await dispatch(GetAllFraudNotAFraud());
      await dispatch(GetAllCompanySegment());
      dispatch(GetNegativeDBViewByCnic(NDData, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsND");
    }
  };

  const handleSearchData = () => {
    dispatch(SearchDeleteCases(searchData, State));
  };

  //For Transaction Types
  const [selected, setSelected] = React.useState([]);
  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  const transactionTypeHandler = (e, value) => {};

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
    dispatch(resetCustomerDetailsCreditCard());
    dispatch(GetAllTransactionTypes(userid));
    dispatch(disableGoBack());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, [setupForms.ViewDeleteDisputeCasesData]);
  var cnic = localStorage.getItem("cnic");

  //Edit Click
  const update = (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber),
    );
    localStorage.setItem("cnic", value.cnicNumber);
    let data = {
      CNICNumber: value.cnicNumber,
      ReferenceNumber: value.refrenceNumber,
    };
    dispatch(GetCreditCardDisputesForEditByCnicAndRefrenceNumber(data));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
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
      title: "Case Received Date",
      dataIndex: "caseReceivedDate",
      key: "caseReceivedDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Transaction Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "170px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
      width: "130px",
    },
    {
      title: "Deleted By",
      dataIndex: "userName",
      key: "userName",
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

  //Loader Notification
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.ShowNotification]);

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.Loading]);

  useEffect(() => {
    if (setupForms.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: setupForms.ResponseMessage,
      });
      dispatch(HideNotification());
    } else if (setupForms.ResponseMessage === "Displaying All Records") {
      setOpen({
        flag: false,
        message: setupForms.ResponseMessage,
      });
      dispatch(HideNotification());
    } else {
      setOpen({
        flag: true,
        message: setupForms.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.ResponseMessage]);

  return (
    <>
      <Title level={3}>Search</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            name={"ReferenceNumber"}
            fullWidth
            autoComplete="off"
            label="Reference Number"
            size="small"
            value={searchData.ReferenceNumber}
            textLength={20}
            change={(e) => handleSearch(e)}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
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
              State.to !== null && State.to !== ""
                ? DateDisplayFormat(State.to)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col
          lg={8}
          md={8}
          sm={24}
          className="MultipleSelectClass u-margin-top-22px"
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
            rows={setupForms.ViewDeleteDisputeCasesData}
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
          </>
        )}
      </Modal>

      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewDeleteCases;
