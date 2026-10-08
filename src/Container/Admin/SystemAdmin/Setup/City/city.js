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
  HideNotification,
  GetAllCity,
  SaveCity,
  DeleteCity,
  EditCity,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";

const City = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [allCity, setAllCity] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [city, setCity] = useState({
    Code: 0,
    Name: "",
    ID: 0,
  });
  const [cityName, setCityName] = useState({
    Name: "",
    Code: 0,
    ID: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    if (allCity.length > 0) {
      let flag = false;
      allCity.map((data, index) => {
        if (data.code === city.Code) {
          flag = true;
        }
      });
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists",
        });
      } else {
        if (city.Title !== "") {
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
            message: "Please Enter City",
          });
        }
        setBtnStatus(true);
      }
    } else {
      if (city.Title !== "") {
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
          message: "Please Enter City",
        });
      }
      setBtnStatus(true);
    }
  };

  const deleteit = (e, record) => {
    setCity({
      ...city,
      Name: record.Name,
      ID: record.pK_CTID,
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
    setCity({
      ...city,
      Code: record.code,
      Name: record.name,
      ID: record.pK_CTID,
    });
    setCityName({
      ...cityName,
      Code: record.code,
      Name: record.name,
      ID: record.pK_CTID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    if (allCity.length > 0) {
      let flag = false;
      allCity.map((data, index) => {
        if (data.code === city.Code && city.ID !== data.pK_CTID) {
          flag = true;
        }
      });
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists",
        });
      } else {
        dispatch(EditCity(city));
        setCity({
          Code: 0,
          Name: "",
        });
        setCityName({
          Code: 0,
          Name: "",
        });
        setAction({ ...actions, update: false });
        setBtnStatus(true);
      }
    } else {
      dispatch(EditCity(city));
      setCity({
        Code: 0,
        Name: "",
      });
      setCityName({
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
    setCity({
      Name: "",
      Code: 0,
    });
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveCity(city));
    setCity({
      Name: "",
      Code: 0,
    });
    setCityName({
      Name: "",
      Code: 0,
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteCity(city));
  };

  const handleCodeChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setAction({
        ...actions,
        update: actions.update ? true : false,
      });

      setCity({
        ...city,
        Code: 0,
      });

      return;
    }

    setBtnStatus(false);

    const valueCheck = value.replace(/[^\d-]/g, "");

    if (valueCheck !== "") {
      setCity({
        ...city,
        Code: parseInt(valueCheck, 10),
      });
    }
  };

  const handleCityChange = (e) => {
    if (e.target.value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setCity({
      ...city,
      Name: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(GetAllCity());
  }, []);

  useEffect(() => {
    setAllCity(setupForms.CityData);
  }, [setupForms.CityData]);

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }

    //         if (setupForms.ShowNotification) {
    //     setOpen({
    //         flag: true,
    //         message: setupForms.responseMessage,
    //     });
    //     dispatch(HideNotification());
    // }
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
      title: "City Code",
      dataIndex: "code",
      key: "code",
      align: "center",
      width: "40%",
    },
    {
      title: "City",
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
      click: () => handleSave(city),
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
    if (city.Code !== "" && city.Name !== "") {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [city]);

  return (
    <>
      <Title level={3}>City</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={city.Code && "City Code"}
            placeholder={"City Code *"}
            size="small"
            autoComplete="off"
            name="Code"
            required
            // type="number"
            value={city.Code === 0 || city.Code === null ? null : city.Code}
            change={handleCodeChange}
            textLength={4}
          />
        </Col>
        <Col lg={14} md={14} sm={24}>
          <TextField
            fullWidth
            label={city.Name !== "" && "City Name"}
            placeholder="City Name"
            size="small"
            autoComplete="off"
            required
            value={city.Name}
            change={handleCityChange}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          {actions.update ? (
            <Button
              text="Update City"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add City"
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
            rows={allCity}
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
                Are you sure you want to add City?
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

export default City;
