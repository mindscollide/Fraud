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
  GetNatureOfSecurity,
  AddNatureOfSecurity,
  EditNatureOfSecurity,
  DeleteNatureOfSecurity,
  HideNotification,
  SearchNatureOfSecurity,
} from "../../../../../store/actions/setup-forms-actions";
const NatureOfSecurity = () => {
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
  const [natureofSecurity, setnatureofSecurity] = useState({
    ID: null,
    WOFStatus: 4,
    Title: "",
  });
  const add = () => {
    if (natureofSecurity.Title !== "") {
      showModal();
      setAction({ ...actions, add: true, update: false, delete: false });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter Nature of Security",
      });
    }
  };
  const deleteit = (e, record) => {
    setnatureofSecurity({
      ...natureofSecurity,
      Title: record.title,
      ID: record.id,
    });
    showModal();
    setAction({ ...actions, delete: true, update: false, add: false });
  };
  const update = (e, record) => {
    setnatureofSecurity({
      ...natureofSecurity,
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
      title: "Nature of Security",
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
          DeleteNatureOfSecurity(
            natureofSecurity,
            setnatureofSecurity,
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
        dispatch(AddNatureOfSecurity(natureofSecurity, setIsModalVisible)),
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
    setnatureofSecurity({
      ...natureofSecurity,
      Title: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(GetNatureOfSecurity());
  }, []);
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetNatureOfSecurity());
    }
  }, [setupForms.ShowNotification]);

  return (
    <>
      <Title level={3}>Nature of Security</Title>
      <Row gutter={8}>
        <Col lg={12} md={12} sm={24}>
          <TextField
            fullWidth
            label="Enter Nature of Security"
            value={natureofSecurity.Title}
            autoComplete="off"
            change={handleChange}
            size="small"
            required
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() =>
              dispatch(SearchNatureOfSecurity(natureofSecurity.Title))
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
              setnatureofSecurity({
                ...natureofSecurity,
                Title: "",
              });
              setAction({
                ...actions,
                add: false,
                update: false,
                delete: false,
              });
              dispatch(GetNatureOfSecurity());
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
                  EditNatureOfSecurity(
                    natureofSecurity,
                    setnatureofSecurity,
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
            rows={setupForms.NatureOfSecuritys}
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
                Are you sure you want to add Nature of Security
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

export default NatureOfSecurity;
