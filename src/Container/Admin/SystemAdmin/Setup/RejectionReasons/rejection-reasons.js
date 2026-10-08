import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  Loader,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllRejectionReasons,
  SaveRejectionReasons,
  DeleteRejectionReasons,
  EditRejectionReasons,
  HideNotification,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";
const RejectionReasons = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allRejectionReasons, setAllRejectionReasons] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [rejectionReasons, setRejectionReasons] = useState({
    ID: "",
    Reason: "",
  });
  const [rejectionReasonsReason, setRejectionReasonsReason] = useState({
    Reason: "",
    ID: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    if (rejectionReasons.Title !== "") {
      showModal();
      setAction({
        ...actions,
        add: true,
        update: false,
        delete: false,
      });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter Rejection Reason",
      });
    }
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    setRejectionReasons({
      ...rejectionReasons,
      Reason: record.Reason,
      ID: record.pK_RRID,
    });
    showModal();
    setAction({
      ...actions,
      delete: true,
      update: false,
      add: false,
    });
  };

  const update = (e, record) => {
    setRejectionReasons({
      ...rejectionReasons,
      Reason: record.reason,
      ID: record.pK_RRID,
    });
    setRejectionReasonsReason({
      ...rejectionReasons,
      Reason: record.reason,
      ID: record.pK_RRID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditRejectionReasons(rejectionReasons));
    setRejectionReasons({
      ID: null,
      Reason: "",
    });
    setRejectionReasonsReason({
      ID: null,
      Reason: "",
    });
    setAction({ ...actions, update: false });
    setBtnStatus(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setRejectionReasonsReason({
      ID: null,
      Reason: "",
    });
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveRejectionReasons(rejectionReasons));
    setRejectionReasons({
      ID: null,
      Reason: "",
    });
    setRejectionReasonsReason({
      ID: null,
      Reason: "",
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteRejectionReasons(rejectionReasons));
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setRejectionReasons({
      ...rejectionReasonsReason,
      Reason: e.target.value,
    });
    setRejectionReasonsReason({
      ...rejectionReasonsReason,
      Reason: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(GetAllRejectionReasons());
  }, []);

  useEffect(() => {
    setAllRejectionReasons(setupForms.RejectionReasonsData);
  }, [setupForms.RejectionReasonsData]);

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

  const columns = [
    {
      title: "Rejection Reasons",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      width: "80%",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          onClick={(e) => update(e, record)}
          className="icon-edit icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          onClick={(e) => deleteit(e, record)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];

  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => handleSave(rejectionReasons),
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
    if (rejectionReasonsReason.Reason !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [rejectionReasonsReason]);

  return (
    <>
      <Title level={3}>Rejection Reasons</Title>
      <Row gutter={8}>
        <Col lg={18} md={18} sm={24}>
          <TextField
            fullWidth
            label={
              rejectionReasonsReason?.Reason !== "" && "Enter Rejection Reasons"
            }
            placeholder={"Enter Rejection Reasons *"}
            change={handleChange}
            autoComplete="off"
            value={rejectionReasonsReason.Reason}
            size="small"
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          {actions.update ? (
            <Button
              text="Update"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disable={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
              disableBtn={btnStatus}
            />
          )}
        </Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={allRejectionReasons}
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
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add Rejection Reason
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className={styles.deleteModalMain}>
              <i className="icon-trash icon-size-two"></i>

              <span className={styles.deleteModalTitle}>
                Are you sure you want to delete this?
              </span>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default RejectionReasons;
