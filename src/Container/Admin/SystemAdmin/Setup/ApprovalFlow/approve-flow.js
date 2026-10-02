import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetApprovalFlow,
  DeleteApprovalFlow,
  SearchApprovalFlow,
  HideNotification,
  GetApprovalFlowForEdit,
  UpdateApprovalFlowForEdit,
  DeleteApprovalFlowForEdit,
} from "../../../../../store/actions/setup-forms-actions";
const ApprovalFlow = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const priorityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [actions, setAction] = useState({
    add: false,
    addRole: false,
    delete: false,
    delete1: false,
    modalDelete: false,
  });
  const [State, setState] = useState({
    Id: "",
    ApprovalFlowName: "",
    ApprovalFlowDescription: "",
  });
  const [approvalFlow, setapprovalFlow] = useState({
    Id: "",
    ApprovalFlowName: "",
    ApprovalFlowDescription: "",
  });
  const [remainingUserList, setremainingUserList] = useState([
    {
      key: null,
      Fullname: null,
      userID: null,
      firstName: null,
      lastName: null,
      userReferenceCode: null,
      ldapAccount: null,
      approvalFlowPriority: null,
    },
  ]);
  const [existingUserList, setexistingUserList] = useState([
    {
      key: null,
      Fullname: null,
      userID: null,
      firstName: null,
      lastName: null,
      userReferenceCode: null,
      ldapAccount: null,
      approvalFlowPriority: null,
    },
  ]);
  const [updateApprovalFlowForEdit, setupdateApprovalFlowForEdit] = useState({
    ID: null,
    UserID: null,
    ApprovalFlowPriority: null,
  });
  const add = () => {
    showModal();
    setAction({
      ...actions,
      add: true,
      addRole: false,
      delete: false,
      modalDelete: false,
      delete1: false,
    });
  };
  //
  const addRoleHandler = (e, record) => {
    showModal();
    dispatch(GetApprovalFlowForEdit(record.id));
    setAction({
      ...actions,
      addRole: true,
      add: false,
      delete: false,
      modalDelete: false,
      delete1: false,
    });
  };
  const modalDelete = (e, record) => {
    showModal();
    setAction({ ...actions, add: false, delete: false, modalDelete: true });
    setupdateApprovalFlowForEdit({
      ...updateApprovalFlowForEdit,
      UserID: record.userID,
    });
  };

  const deleteit = (e, record) => {
    setState({
      ...State,
      Id: record.id,
      ApprovalFlowName: record.approvalFlowName,
      ApprovalFlowDescription: record.approvalFlowDescription,
    });
    showModal();
    setAction({
      ...actions,
      add: false,
      addRole: false,
      modalDelete: false,
      delete: false,
      delete1: true,
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({
      add: false,
      delete: false,
      addRole: false,
      modalDelete: false,
    });
  };
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };
  const handleUser = (e, value) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    if (id && id.includes("RemainingUser")) {
      setupdateApprovalFlowForEdit({
        ...updateApprovalFlowForEdit,
        UserID: value.Fullname,
      });
    } else if (id && id.includes("Priority")) {
      setupdateApprovalFlowForEdit({
        ...updateApprovalFlowForEdit,
        ApprovalFlowPriority: value,
      });
    }
  };
  const AddUser = () => {
    if (
      updateApprovalFlowForEdit.UserID === "" ||
      updateApprovalFlowForEdit.UserID === null
    ) {
      setOpen({
        flag: true,
        message: "Please Select User",
      });
    } else if (
      updateApprovalFlowForEdit.ApprovalFlowPriority === "" ||
      updateApprovalFlowForEdit.ApprovalFlowPriority === null
    ) {
      setOpen({
        flag: true,
        message: "Please Select Priority",
      });
    } else {
      let sendingData = {
        ID: Number(updateApprovalFlowForEdit.ID),
        UserID:
          remainingUserList[
            remainingUserList.findIndex(
              (x) => x.Fullname === updateApprovalFlowForEdit.UserID
            )
          ].userID,
        ApprovalFlowPriority: Number(
          updateApprovalFlowForEdit.ApprovalFlowPriority
        ),
      };
      let index = existingUserList.findIndex(
        (x) => x.approvalFlowPriority === sendingData.ApprovalFlowPriority
      );
      if (index === -1) {
        dispatch(UpdateApprovalFlowForEdit(sendingData));
      } else {
        setOpen({
          flag: true,
          message: "User With The Same Priority Already Exist",
        });
      }
    }
  };
  const columns = [
    {
      title: "Flow Name",
      dataIndex: "approvalFlowName",
      key: "approvalFlowName",
      align: "center",
      width: "35%",
    },
    {
      title: "Description",
      dataIndex: "approvalFlowDescription",
      key: "approvalFlowDescription",
      align: "center",
      width: "35%",
    },
    {
      title: "Add User",
      dataIndex: "addUser",
      key: "addUser",
      align: "center",
      render: (text, record) => (
        <div
          onClick={(e) => addRoleHandler(e, record)}
          className="icon-list-add icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },
  ];
  //   rows and column for modal starts
  const columnsForModal = [
    {
      title: "User Name",
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "approvalFlowPriority",
      key: "approvalFlowPriority",
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render: (text, record) => (
        <div
          onClick={(e) => modalDelete(e, record)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];

  const ApprovalFlowbuttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "small",
      disable: false,
      // click: () => dispatch(DeleteApprovalFlow(State.Id)),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "small",
      disable: false,
      click: () => handleCancel(),
    },
  };
  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      size: "small",
      disable: false,
      // click: () => console.log("Add Button Props"),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "small",
      disable: false,
      click: () => handleCancel(),
    },
  };
  const ApprovalFlowForEditButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      size: "small",
      disable: false,
      click: () => {
        setAction({
          ...actions,
          modalDelete: false,
        });
        dispatch(DeleteApprovalFlowForEdit(updateApprovalFlowForEdit));
      },
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "small",
      disable: false,
      click: () => handleCancel(),
    },
  };
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetApprovalFlow());
    }
  }, [setupForms.ShowNotification]);
  useEffect(() => {
    setupdateApprovalFlowForEdit({
      ...updateApprovalFlowForEdit,
      ID: setupForms.ApprovalFlowsForEdit.id
        ? setupForms.ApprovalFlowsForEdit.id
        : null,
    });
    setapprovalFlow({
      ...approvalFlow,
      Id: setupForms.ApprovalFlowsForEdit.id,
      ApprovalFlowName: setupForms.ApprovalFlowsForEdit.approvalFlowName,
      ApprovalFlowDescription:
        setupForms.ApprovalFlowsForEdit.approvalFlowDescription,
    });
    setremainingUserList(setupForms.RemainingUserList);
    setexistingUserList(setupForms.ExistingUserList);
  }, [
    setupForms.ApprovalFlowsForEdit,
    setupForms.RemainingUserList,
    setupForms.ExistingUserList,
  ]);
  useEffect(() => {
    dispatch(GetApprovalFlow());
  }, []);

  return (
    <>
      <Title level={3}>Approval Flow</Title>
      <Row gutter={8}>
        <Col lg={4} md={4} sm={24}>
          <TextField
            name={"ApprovalFlowName"}
            fullWidth
            autoComplete="off"
            label="Approval Flow Name"
            size="small"
            required
            change={handleChange}
            value={State.ApprovalFlowName}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            name={"ApprovalFlowDescription"}
            label="Approval Description"
            size="small"
            required
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() =>
              dispatch(
                SearchApprovalFlow(
                  State.ApprovalFlowName,
                  State.ApprovalFlowDescription
                )
              )
            }
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Reset"
            icon={<Restore />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => {
              setState({
                ...State,
                Id: "",
                ApprovalFlowName: "",
                ApprovalFlowDescription: "",
              });
              setAction({
                ...actions,
                add: false,
                update: false,
                delete: false,
              });
              dispatch(GetApprovalFlow());
            }}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Add New"
            icon={<AddIcon />}
            applyClass="btnDarkSolid"
            size="small"
            disableBtn={true}
            click={add}
          />
        </Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={setupForms.ApprovalFlows}
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
        modalTitle={actions.addRole && <b>Add User</b>}
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={800}
        padding="5"
      >
        {/* this data will be pass to modal when Add Approval btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add Approval Flow
              </Title>
            </div>
            <GroupedButtons data={ApprovalFlowbuttonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <div className="icon-trash icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {actions.delete1 && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <div className="icon-trash icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={ApprovalFlowbuttonProps} />
          </>
        )}

        {/* this data will be pass to modal when add role icon btn in the table  will be clicked */}
        {actions.addRole && (
          <>
            <div className="u-padding-10px u-display-flex u-justify-content-center">
              <Row gutter={16}>
                <Col md={12} lg={12} sm={24}>
                  <b>Approval Flow Name</b>
                  <TextField
                    disable
                    fullWidth
                    size="small"
                    value={approvalFlow.ApprovalFlowName}
                  />
                  <div className="u-margin-top-10px" />
                  <b>
                    Select User<i className="u-color-red">*</i>
                  </b>
                  <SelectBox
                    change={handleUser}
                    option={remainingUserList}
                    value={updateApprovalFlowForEdit.UserID}
                    name="RemainingUser"
                    propertyName={"Fullname"}
                    required
                  />
                  <div className="u-margin-top-14px" />
                  <b>
                    Select Priority<i className="u-color-red">*</i>
                  </b>
                  <SelectBox
                    name="Priority"
                    value={updateApprovalFlowForEdit.ApprovalFlowPriority}
                    change={handleUser}
                    option={priorityOptions}
                    required
                  />
                </Col>
                <Col md={12} lg={12} sm={24}>
                  <b>Description</b>
                  <TextField
                    rows={7}
                    multiline
                    disable
                    fullWidth
                    value={approvalFlow.ApprovalFlowDescription}
                  />
                </Col>
                <Col lg={24} md={24} sm={24} className="u-padding-top-20px u-text-align-center">
                  <Button
                    text="Add User"
                    applyClass="btnDarkSolidMini"
                    size="small"
                    click={() => AddUser()}
                  />
                </Col>
                <Col lg={24} md={24} sm={24} className="u-margin-top-1pct">
                  <Table
                    rows={existingUserList}
                    columns={columnsForModal}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20", "30"],
                    }}
                    scroll={{ x: "max-content" }}
                  />
                </Col>
              </Row>
            </div>
            <div className="u-margin-top-25px" />
          </>
        )}
      </Modal>
      {/* a separate modal fo edit user prompt */}
      {actions.modalDelete && (
        <>
          <Modal
            closeModal={handleCancel}
            modalState={isModalVisible}
            width={700}
          >
            <>
              <div className="u-padding-40px u-display-flex u-justify-content-center">
                <div className="icon-trash icon-size-two"></div>
                <Title level={3} align="center">
                  Are you sure you want to delete this?
                </Title>
              </div>
              <GroupedButtons data={ApprovalFlowForEditButtonProps} />
            </>
          </Modal>
        </>
      )}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default ApprovalFlow;
