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
  GetAllRegion,
  SaveRegion,
  DeleteRegion,
  EditRegion,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";
const Region = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allRegion, setAllRegion] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [region, setRegion] = useState({
    Code: 0,
    Name: "",
  });
  const [regionName, setRegionName] = useState({
    Name: "",
    Code: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    if (allRegion.length > 0) {
      let flag = false;
      allRegion.map((data, index) => {
        if (data.code === region.Code) {
          flag = true;
        }
      });
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists",
        });
      } else {
        if (region.Title !== "") {
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
            message: "Please Enter Region",
          });
        }
        setBtnStatus(true);
      }
    } else {
      if (region.Title !== "") {
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
          message: "Please Enter Region",
        });
      }
      setBtnStatus(true);
    }
  };

  const deleteit = (e, record) => {
    setRegion({
      ...region,
      Name: record.Name,
      ID: record.pK_RID,
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
    setRegion({
      ...region,
      Code: record.code,
      Name: record.name,
      ID: record.pK_RID,
    });
    setRegionName({
      ...region,
      Code: record.code,
      Name: record.name,
      ID: record.pK_RID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    if (allRegion.length > 0) {
      let flag = false;
      allRegion.map((data, index) => {
        if (data.code === region.Code && region.ID !== data.pK_RID) {
          flag = true;
        }
      });
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists",
        });
      } else {
        dispatch(EditRegion(region));
        setRegion({
          Code: 0,
          Name: "",
        });
        setRegionName({
          Code: 0,
          Name: "",
        });
        setAction({ ...actions, update: false });
        setBtnStatus(true);
      }
    } else {
      dispatch(EditRegion(region));
      setRegion({
        Code: 0,
        Name: "",
      });
      setRegionName({
        Code: 0,
        Name: "",
      });
      setAction({ ...actions, update: false });
      setBtnStatus(true);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setRegion({
      Name: "",
      Code: 0,
    });
    setRegionName({
      Name: "",
      Code: 0,
    });
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveRegion(region));
    setRegion({
      Name: "",
      Code: 0,
    });
    setRegionName({
      Name: "",
      Code: 0,
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteRegion(region));
  };

  const handleCodeChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
      setRegion({
        ...region,
        Code: 0,
      });
    } else {
      setBtnStatus(false);
      const valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck !== "") {
        setRegion({
          ...region,
          Code: parseInt(valueCheck, 10),
        });
      }
    }
  };

  const handleRegionChange = (e) => {
    if (e.target.value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setRegion({
      ...region,
      Name: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(GetAllRegion());
  }, []);

  useEffect(() => {
    setAllRegion(setupForms.RegionData);
  }, [setupForms.RegionData]);

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
    if (region.Code !== "" && region.Name !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [region]);

  const columns = [
    {
      title: "Region Code",
      dataIndex: "code",
      key: "code",
      align: "center",
      width: "40%",
    },
    {
      title: "Region Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "40%",
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
      click: () => handleSave(region),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  return (
    <>
      <Title level={3}>Region</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={region.Code && "Region Code"}
            placeholder={"Region Code *"}
            size="small"
            autoComplete="off"
            required
            value={
              region.Code === 0 || region.Code === null ? null : region.Code
            }
            change={handleCodeChange}
            textLength={4}
          />
        </Col>
        <Col lg={14} md={14} sm={24}>
          <TextField
            fullWidth
            label={region.Name && "Region Name"}
            placeholder={"Region Name *"}
            size="small"
            autoComplete="off"
            required
            value={region.Name}
            change={handleRegionChange}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          {actions.update ? (
            <Button
              text="Update Region"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Region"
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
            rows={allRegion}
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
                Are you sure you want to add Region?
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

export default Region;
