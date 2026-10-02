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
  Loader,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  HideNotification,
  SaveFraudType,
  GetAllFraudType,
  DeleteFraudType,
  EditFraudType,
} from "../../../../../store/actions/setup-forms-actions";
const FraudType = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allFraudData, setAllFraudData] = useState([]);

  const [fraudTypeName, setFraudTypeName] = useState({
    Name: "",
    ID: null,
  });

  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [fraudType, setFraudType] = useState({
    ID: null,
    Name: "",
  });

  const add = () => {
    if (fraudType.Title !== "") {
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
        message: "Please Enter Fraud Type",
      });
    }
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    setFraudType({
      ...fraudType,
      Name: record.Name,
      ID: record.pK_FTID,
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
    setFraudType({
      ...fraudType,
      Name: record.Name,
      ID: record.pK_FTID,
    });
    setFraudTypeName({
      ...fraudType,
      Name: record.name,
      ID: record.pK_FTID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditFraudType(fraudType));
    setFraudType({
      ID: null,
      Name: "",
    });
    setFraudTypeName({
      ID: null,
      Name: "",
    });
    setAction({ ...actions, update: false });
    setBtnStatus(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setBtnStatus(true);
    setFraudTypeName({
      ID: null,
      Name: "",
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteFraudType(fraudType));
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveFraudType(fraudType));
    setFraudType({
      ID: null,
      Name: "",
    });
    setFraudTypeName({
      ID: null,
      Name: "",
    });
  };

  useEffect(() => {
    dispatch(GetAllFraudType());
  }, []);

  useEffect(() => {
    setAllFraudData(setupForms.FraudTypeData);
  }, [setupForms.FraudTypeData]);

  const columns = [
    {
      title: "Fraud Type",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "80%",
    },
    {
      title: "Edit",
      dataIndex: "ID",
      key: "ID",
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
      click: () => handleSave(fraudType),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const updateButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => updateData(),
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
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setFraudType({
      ...fraudType,
      Name: e.target.value,
    });
    setFraudTypeName({
      ...fraudType,
      Name: e.target.value,
    });
  };

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
    if (fraudTypeName.Name !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [fraudTypeName]);

  return (
    <>
      <Title level={3}>Fraud Type</Title>
      <Row gutter={8}>
        <Col lg={18} md={18} sm={24}>
          <TextField
            fullWidth
            label="Enter Fraud Type"
            size="small"
            autoComplete="off"
            required
            value={fraudTypeName.Name.trimStart()}
            change={handleChange}
            textLength={200}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          {actions.update ? (
            <Button
              text="Update Fraud Type"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Fraud Type"
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
            rows={allFraudData}
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
        {/* this data will be pass to modal when Add Fraud Type btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add Fraud Type
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
        {actions.update && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to update Fraud Type
              </Title>
            </div>
            <GroupedButtons data={updateButtonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default FraudType;
