import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  StartToEndDate,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBorrowerType,
  AddBorrowerType,
  EditBorrowerType,
  DeleteBorrowerType,
  HideNotification,
  SearchBorrowerType,
} from "../../../../../store/actions/setup-forms-actions";
const AGEINGMIS = () => {
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
  const [borrowerType, setborrowerType] = useState({
    ID: null,
    WOFStatus: 4,
    Title: "",
  });
  const add = () => {
    if (borrowerType.Title !== "") {
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
        message: "Please Enter Borrower Type",
      });
    }
  };
  const deleteit = (e, record) => {
    setborrowerType({
      ...borrowerType,
      Title: record.title,
      ID: record.id,
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
    setborrowerType({
      ...borrowerType,
      Title: record.title,
      ID: record.id,
    });
    setAction({ ...actions, update: true });
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
      title: "Source",
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
          DeleteBorrowerType(borrowerType, setborrowerType, setIsModalVisible)
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
      click: () => dispatch(AddBorrowerType(borrowerType, setIsModalVisible)),
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
    setborrowerType({
      ...borrowerType,
      Title: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(GetBorrowerType());
  }, []);
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetBorrowerType());
    }
  }, [setupForms.ShowNotification]);
  return (
    <>
      <Title level={3}>Ageing MIS</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24}>
          <div className="u-display-flex">
            <Button
              applyClass="btnDarkSolid"
              text="Summary"
              icon={<DownloadOutlined />}
            />
          </div>
        </Col>
        <Col lg={8} md={8} sm={24}>
          <div className="u-display-flex">
            <Button
              applyClass="btnDarkSolid"
              text="Details"
              icon={<DownloadOutlined />}
            />
          </div>
        </Col>
        <Col lg={8} md={8} sm={24}>
          <div className="u-display-flex">
            <Button
              applyClass="btnDarkSolid"
              text="Amount Wise"
              icon={<DownloadOutlined />}
            />
          </div>
        </Col>
      </Row>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add Source
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default AGEINGMIS;
