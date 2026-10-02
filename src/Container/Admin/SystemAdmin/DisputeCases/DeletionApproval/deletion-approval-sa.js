import React, { useEffect, useState, useRef } from "react";


import { Typography, Radio, Tooltip, Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  InputWithBtn,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  SelectBox,
  Notification,
  Loader,
  Button,
} from "../../../../../Components/Elements";

import { useNavigate } from "react-router-dom";

import {
  GetCreditCardDisputesByCnic,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  GetDisputeStatusSAPendingForDeletion,
  GetDisputeStatusGlobal,
  SearchBBKDisputesByCnicAndReferenceNumber,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  GetNegativeDBViewByCnic,
} from "../../../../../store/actions/investigation-officer-actions";
import {
  HideNotification,
  GetAllApprovalReasons,
  GetAllRejectionReasons,
  GetAllPendingForDeletionSystemAdmin,
  SavePendingForDeletion,
  SaveInProcess,
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
} from "../../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  CommaFormter,
  TimeAndDisplayFormat,
} from "../../../../../Common/Functions/date-formatter";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../../store/actions/ui-actions";
import {
  newRequestList,
  newRequestListCount,
} from "../../../../../store/actions/request-actions";

const PendingDeletionApprovals = () => {
  const navigate = useNavigate();
  var userID = localStorage.getItem("UserID");
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms, investigationOfficer } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [approvalReason, setApprovalReason] = useState([]);
  const [approvalReasonValue, setApprovalReasonValue] = useState([]);
  const [rejectionReason, setRejectionReason] = useState([]);
  const [rejectionReasonValue, setRejectionReasonValue] = useState([]);
  //Get All State
  const [allPendingForApproval, setAllPendingForApproval] = useState([]);
  localStorage.setItem("IM", JSON.stringify(true));
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
  const [reason, setReason] = useState({ Reason: "" });

  const setReasons = (Array) => {
    setReason(Array);
  };

  //SearchID
  const [searchData, setSearchData] = useState("");

  //Modal and Loading
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [modal, setModal] = useState({
    approval: false,
    rejection: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  //Modal Opening
  const showModal = () => {
    setIsModalVisible(true);
  };

  //   check data input for enable button for search
  const pendingDeletionHandler = (e) => {
    let Data = e.target.value;
    setSearchData(Data);
  };

  useEffect(() => {
    setAllPendingForApproval(setupForms.PendingForDeletionSystemAdminData);
  }, [setupForms.PendingForDeletionSystemAdminData]);

  //Notification And Loading
  useEffect(() => {
    if (setupForms.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: setupForms.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.ResponseMessage]);

  //Approval Message Popup
  useEffect(() => {
    if (
      setupForms.SavePendingForDeletionSystemAdmin.responseMessage ===
      "The Record Has Been Deleted Successfully"
    ) {
      setOpen({
        flag: true,
        message: setupForms.SavePendingForDeletionSystemAdmin.responseMessage,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.SavePendingForDeletionSystemAdmin]);

  // //Rejection Message Popup
  useEffect(() => {
    if (
      setupForms.SaveInProcessSystemAdminData.responseMessage ===
      "The Record Has Been Rejected"
    ) {
      setOpen({
        flag: true,
        message: setupForms.SaveInProcessSystemAdminData.responseMessage,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.SaveInProcessSystemAdminData]);

  useEffect(() => {}, [approvalReason]);

  useEffect(() => {}, [rejectionReason]);

  //Get APIs call
  useEffect(() => {
    let UserID = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserID.userID;
    dispatch(GetAllApprovalReasons());
    dispatch(GetAllRejectionReasons());
    dispatch(GetAllPendingForDeletionSystemAdmin(userid));
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      dispatch(GetAllPendingForDeletionSystemAdmin(userid));
    }
  }, []);

  // For Approval Reasons DropDown SetState
  useEffect(() => {
    let nameApproval = setupForms.ApprovalReasonsData;
    setApprovalReason(
      nameApproval.map((data, index) => {
        return data.reason;
      })
    );
  }, [setupForms.ApprovalReasonsData]);

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
    await dispatch(SavePendingForDeletion(approveDispute));
    setApproveDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setApprovalReasonValue([]);
    // setBtnStatus(true);
  };

  const handleProceedReject = async () => {
    setIsModalVisible(false);
    await dispatch(SaveInProcess(rejectDispute));
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
    setIsModalVisible2(false);
    setBtnStatus(true);
    setModal({
      approval: false,
      rejection: false,
    });
    setRejectDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setRejectionReasonValue([]);
    setApproveDispute({
      FK_TTID: 0,
      FK_DID: 0,
      Comments: "",
      FK_AORID: 0,
    });
    setApprovalReasonValue([]);
  };

  //View Click
  const View = async (e, record) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(record.referenceNumber)
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
    if (record.fK_TTID === 1) {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(GetCreditCardDisputesByCnic(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetails");
    }
    if (record.fK_TTID === 2) {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(SearchDebitCardDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsDC");
    }
    if (record.fK_TTID === 3) {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(Data2, flag)
      );
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsADC");
    }
    if (record.fK_TTID === 4) {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsNonApi");
    }
    if (record.fK_TTID === 5) {
      let ttid = record.fK_TTID;
      let flag = true;
      localStorage.setItem("fk_TTID", ttid);
      dispatch(SearchBBKDisputesByCnicAndReferenceNumber(Data, flag));
      navigate("/Fraud/SystemAdmin/ViewCustomerDetailsBBK");
    }
    if (record.fK_TTID === 6) {
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

  // For Rejection Reasons DropDown SetState
  useEffect(() => {
    let nameRejection = setupForms.RejectionReasonsData;
    if (nameRejection !== undefined && nameRejection !== null) {
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

  //Modal Buttons For Approve
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

  useEffect(() => {
    let ForCheck =
      investigationOfficer.GetApprovalStatusSAPendingForDeletionData;
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
  }, [investigationOfficer.GetApprovalStatusSAPendingForDeletionData]);

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
      title: "Reference#",
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
      render: (text) => {
        if (String(text) !== "") {
          return text;
        } else {
          return "";
        }
      },
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      align: "center",
      width: "170px",
      render: (text) => {
        if (String(text) !== "") {
          return text;
        } else {
          return "";
        }
      },
    },
    {
      title: "Case Received Date",
      dataIndex: "caseRecievedDate",
      key: "caseRecievedDate",
      align: "center",
      width: "220px",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Total Dispute Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "center",
      width: "170px",
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
      width: "160px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let disputeID = { DID: record.pK_DID, TTID: record.fK_TTID };
              dispatch(
                GetDisputeStatusSAPendingForDeletion(
                  disputeID,
                  setIsModalVisible2,
                  setAction,
                  actions
                )
              );
            }}
            className="icon-edit-list icon-size-one beachGreen u-cursor-pointer"
          ></div>
        );
      },
    },
    {
      title: "Deleted By",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "220px",
    },
    {
      title: "Accept / Reject",
      dataIndex: "Accept/Reject",
      key: "Accept/Reject",
      align: "center",
      width: "220px",
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title="Approve" color={"Black"}>
              <i
                onClick={(e) => {
                  showModal();
                  setModal({
                    ...modal,
                    rejection: false,
                    approval: true,
                  });
                  let testVariable =
                    setupForms.PendingForDeletionSystemAdminData[index];
                  setApproveDispute({
                    ...approveDispute,
                    FK_TTID: testVariable.fK_TTID,
                    FK_DID: testVariable.pK_DID,
                  });
                }}
                className="icon-check icon-size-one greenTick u-cursor-pointer"
              />
            </Tooltip>
            <Tooltip title="Reject" color={"Black"}>
              <i
                onClick={(e) => {
                  showModal();
                  setModal({
                    ...modal,
                    rejection: true,
                    approval: false,
                  });
                  let testVariable =
                    setupForms.PendingForDeletionSystemAdminData[index];
                  setRejectDispute({
                    ...rejectDispute,
                    FK_TTID: testVariable.fK_TTID,
                    FK_DID: testVariable.pK_DID,
                  });
                }}
                className="icon-close icon-size-one crosstick u-cursor-pointer"
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(disableGoBack());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let data = UserDetails.userID;
    if (role === 2) {
      dispatch(newRequestListCount(data));
      dispatch(newRequestList(data));
    }
  }, []);

  // for search filter
  const searchPendingDeletion = (action) => {
    if (searchData !== "") {
      let filteredData = setupForms.PendingForDeletionSystemAdminData.filter(
        (value) => {
          return (
            value.referenceNumber
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.customerName
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.cnicNumber
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.branchName
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.accountNumber
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            DateDisplayFormat(value.caseRecievedDate)
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.transactionAmount
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase()) ||
            value.status
              .toString()
              .toLowerCase()
              .includes(searchData.toLowerCase())
          );
        }
      );
      setAllPendingForApproval(filteredData);
    } else if (searchData === "" || searchData === null) {
      let data = setupForms.PendingForDeletionSystemAdminData;
      setSearchData("");
      setAllPendingForApproval(data);
    }
  };

  const resetData = () => {
    setSearchData("");
    let UserID = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserID.userID;
    dispatch(GetAllPendingForDeletionSystemAdmin(userid));
  };

  return (
    <>
      <Title level={4}>Pending Deletion Approvals</Title>
      <>
        <Row gutter={16}>
          <Col lg={4} md={4}></Col>
          <Col lg={8} md={8}></Col>
          <Col lg={8} md={8} className="SearchPendingApprovals">
            <InputWithBtn
              label="Search"
              fullWidth
              textFieldSize="small"
              icon={<i className="icon-search icon-size-one"></i>}
              name="PendingApprovals"
              applyClass="search-cnic"
              click={searchPendingDeletion}
              onchange={pendingDeletionHandler}
              value={searchData}
              autoComplete={"off"}
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidResetw"
              size="small"
              click={resetData}
            />
          </Col>
          <Col lg={24} md={24}>
            <Table
              rows={allPendingForApproval}
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
                  label="Description"
                  autoComplete="off"
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
      {setupForms.Loading || investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default PendingDeletionApprovals;
