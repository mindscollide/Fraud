import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetManagementUnit,
  AddManagementUnit,
  EditManagementUnit,
  DeleteManagementUnit,
  HideNotification,
  SearchManagementUnit,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";
const ManagementUnit = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [managementUnit, setmanagementUnit] = useState({
    ID: null,
    WOFStatus: 4,
    Title: "",
  });
  const add = () => {
    if (managementUnit.Title !== "") {
      showModal();
      setAction({ ...actions, add: true, update: false, delete: false });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter Business Segment",
      });
    }
  };
  const deleteit = (e, record) => {
    setmanagementUnit({
      ...managementUnit,
      Title: record.title,
      ID: record.id,
    });
    showModal();
    setAction({ ...actions, delete: true, update: false, add: false });
  };
  const update = (e, record) => {
    setmanagementUnit({
      ...managementUnit,
      Title: record.title,
      ID: record.id,
    });
    setAction({ ...actions, update: true, add: false, delete: false });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
  };

  const columns = [
    {
      title: "Business Segment",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "60%",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "20%",
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
      width: "20%",
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
      click: () =>
        dispatch(
          DeleteManagementUnit(
            managementUnit,
            setmanagementUnit,
            setIsModalVisible
          )
        ),
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
      click: () =>
        dispatch(AddManagementUnit(managementUnit, setIsModalVisible)),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const handleChange = (e) => {
    if (e.target.value === "") {
      setAction({ ...actions, update: false });
    }
    setmanagementUnit({
      ...managementUnit,
      Title: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(GetManagementUnit());
  }, []);
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetManagementUnit());
    }
  }, [setupForms.ShowNotification]);
  return (
    <>
      <Title level={3}>Business Segment</Title>
      <Row gutter={8}>
        <Col lg={12} md={12} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Enter Business Segment"
            size="small"
            required
            value={managementUnit.Title}
            change={handleChange}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(SearchManagementUnit(managementUnit.Title))}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Reset"
            icon={<Restore />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => {
              setmanagementUnit({
                ...managementUnit,
                Title: "",
              });
              setAction({
                ...actions,
                add: false,
                update: false,
                delete: false,
              });
              dispatch(GetManagementUnit());
            }}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          {actions.update ? (
            <Button
              text="Update"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={() =>
                dispatch(
                  EditManagementUnit(
                    managementUnit,
                    setmanagementUnit,
                    setAction,
                    actions
                  )
                )
              }
            />
          ) : (
            <Button
              text="Add"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
            />
          )}
        </Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={setupForms.ManagementUnits}
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
                Are you sure you want to add Business Segment
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
    </>
  );
};

export default ManagementUnit;
