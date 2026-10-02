import React, { useEffect, useState, useRef } from "react";


import { Typography, Radio, Tooltip, Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  InputWithBtn,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  FormattedInputs,
} from "../../../../../Components/Elements";

import Title from "antd/lib/skeleton/Title";

import { useNavigate } from "react-router-dom";

import {
  HideNotification,
  GetAllPendingForApprovalByID,
  saveDeletionApprove,
  saveDeletionReject,
} from "../../../../../store/actions/investigation-manager-actions";

import {
  GetCreditCardDisputesByCnic,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
} from "../../../../../store/actions/investigation-officer-actions";

import {
  GetAllApprovalReasons,
  GetAllRejectionReasons,
} from "../../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";

const PendingDeletionApprovals = () => {
  const navigate = useNavigate();
  var userID = localStorage.getItem("UserID");
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { investigationManager, setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [filteredApprovalHistRow, setFilteredApprovalHistRow] = useState([]);
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
  const [searchData, setSearchData] = useState([]);

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

  //Modal Opening
  const showModal = () => {
    setIsModalVisible(true);
  };

  //   check data input for enable button for search
  const pendingApprovalHandler = (e) => {
    let Data = e.target.value;
    setSearchData(Data);
  };

  //API Call

  useEffect(() => {
    setAllPendingForApproval(investigationManager.PendingForApprovalData);
  }, [investigationManager.PendingForApprovalData]);

  //Notification And Loading
  useEffect(() => {
    if (investigationManager.ResponseMessage === "Record Found") {
      setOpen({
        flag: true,
        message: investigationManager.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationManager.ResponseMessage]);

  //Approval Message Popup
  useEffect(() => {
    if (
      investigationManager.SaveApprovalData.responseMessage ===
      "The Dispute Has Been Approved"
    ) {
      setOpen({
        flag: true,
        message: investigationManager.SaveApprovalData.responseMessage,
      });
      dispatch(HideNotification());
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
      dispatch(HideNotification());
    }
  }, [investigationManager.SaveRejectionData]);

  useEffect(() => {
    if (investigationManager.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationManager.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationManager.ShowNotification]);

  useEffect(() => {}, [approvalReason]);

  useEffect(() => {}, [rejectionReason]);

  //Get APIs call
  useEffect(() => {
    dispatch(GetAllApprovalReasons());
    dispatch(GetAllRejectionReasons());
    dispatch(GetAllPendingForApprovalByID(userID));
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
  const handleProceedApprove = () => {
    dispatch(saveDeletionApprove(approveDispute));
    setIsModalVisible(false);
    setBtnStatus(true);
  };

  const handleProceedReject = async () => {
    await setIsModalVisible(false);
    await dispatch(saveDeletionReject(rejectDispute));
  };

  //Cancel Button
  const handleCancel = () => {
    setIsModalVisible(false);
    setBtnStatus(true);
    setModal({
      approval: false,
      rejection: false,
    });
  };

  //View Click
  const View = async (e, record) => {
    let Data = {
      CNICNumber: record.cnicNumber,
      ReferenceNumber: record.referenceNumber,
    };
    if (record.fK_TTID === 1) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber)
      );

      // let flag=true
      await dispatch(GetCreditCardDisputesByCnic(Data));
      navigate("/Fraud/DisputeCases/ViewCustomerDetails");
    }
    if (record.fK_TTID === 2) {
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTID = true;
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber)
      );
      // await localStorage.setItem(
      //   "CNICNumber",
      //   JSON.stringify(record.cnicNumber)
      // );
      await dispatch(
        SearchDebitCardDisputesByCnicAndReferenceNumber(Data, TTID)
      );
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsDC");
    }
    if (record.fK_TTID === 3) {
      // dispatch(SearchTransactionDetailsADCByCNICAndReferenceNumber(Data));
      await localStorage.setItem("FK_TTID", record.fK_TTID);
      let TTID = true;
      await localStorage.setItem(
        "ReferenceNumber",
        JSON.stringify(record.referenceNumber)
      );
      let ADCData = {
        CNICNumber: record.cnicNumber,
        RefrenceNumber: record.referenceNumber,
      };
      // await localStorage.setItem(
      //   "CNICNumber",
      //   JSON.stringify(record.cnicNumber)
      // );
      await dispatch(
        SearchTransactionDetailsADCByCNICAndReferenceNumber(ADCData, TTID)
      );
      navigate("/Fraud/DisputeCases/ViewCustomerDetailsADC");
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
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      dispatch(GetAllPendingForApprovalByID(userID));
    }
  }, []);
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

  const columns = [
    {
      title: "Reference#",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
      width: "5%",
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
      width: "5%",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      align: "center",
      width: "5%",
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
      width: "5%",
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
      width: "5%",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "5%",
    },
    {
      title: "Deleted By",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "5%",
    },
    {
      title: "Accept / Reject",
      dataIndex: "Accept/Reject",
      key: "Accept/Reject",
      align: "center",
      width: "10%",
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
                    investigationManager.PendingForApprovalData[index];
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
                    investigationManager.PendingForApprovalData[index];
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

  return (
    <>
      <Title level={4}>Pending Deletion Approvals</Title>
      <>
        <Row gutter={16}>
          <Col lg={8} md={8}></Col>
          <Col lg={8} md={8}></Col>
          <Col lg={8} md={8} className="SearchPendingApprovals">
            <InputWithBtn
              label="Search"
              fullWidth
              textFieldSize="small"
              autoComplete="off"
              icon={<i className="icon-search icon-size-one"></i>}
              name="PendingApprovals"
              applyClass="search-cnic"
              // click={searchPendingApprovals}
              onchange={pendingApprovalHandler}
              value={searchData}
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
                  autoComplete="off"
                  label="Description"
                  change={handleChangeApprove}
                  value={approveDispute.Comments}
                  fullWidth
                  required
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
                />
              </Col>
            </div>
            <GroupedButtons data={buttonPropsReject} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationManager.Loading ? <Loader /> : null}
    </>
  );
};

export default PendingDeletionApprovals;
