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
  DatePicker,
} from "../../../../../Components/Elements";
import {
  DateDisplayFormat,
  DateSendingFormat,
} from "../../../../../Common/Functions/date-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  HideNotification,
  GetAllHoliday,
  SaveHoliday,
  DeleteHoliday,
  EditHoliday,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";

const Holiday = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [allHolidayData, setAllHolidayData] = useState([]);

  // const [holidayName, setHolidayName] = useState({
  //   HolidayName: "",
  //   DateOfHoliday: "",
  //   PK_OHID: null,
  // });

  const [holiday, setHoliday] = useState({
    HolidayName: "",
    DateOfHoliday: "",
    PK_OHID: null,
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

  const add = () => {
    if (holiday.HolidayName !== "") {
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
        message: "Please Enter Holiday",
      });
    }
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    setHoliday({
      ...holiday,
      PK_OHID: record.pK_OHID,
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
    setHoliday({
      ...holiday,
      HolidayName: record.holidayName,
      DateOfHoliday: record.dateOfHoliday,
      PK_OHID: record.pK_OHID,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditHoliday(holiday));
    setHoliday({
      ...holiday,
      HolidayName: "",
      DateOfHoliday: "",
      PK_OHID: null,
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
    setBtnStatus(true);
    setHoliday({
      ...holiday,
      HolidayName: "",
      DateOfHoliday: "",
      PK_OHID: null,
    });
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteHoliday(holiday));
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveHoliday(holiday));
    setHoliday({
      ...holiday,
      HolidayName: "",
      DateOfHoliday: "",
      PK_OHID: null,
    });
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
    }
    setBtnStatus(false);
    setHoliday({
      ...holiday,
      HolidayName: e.target.value,
    });
  };

  // DAte handler
  const HolidayDateHandler = (e, val) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (value !== "") {
      setHoliday({
        ...holiday,
        [name]: DateSendingFormat(value),
      });
    }
    if (name === "DateOfHoliday" && value !== "") {
      setHoliday({
        ...holiday,
        [name]: DateSendingFormat(value),
      });
    }
  };

  const columns = [
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
      align: "center",
      width: "60%",
    },
    {
      title: "Holiday Date",
      dataIndex: "dateOfHoliday",
      key: "dateOfHoliday",
      align: "center",
      width: "20%",
      render: (text) => DateDisplayFormat(text),
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
      click: () => handleSave(holiday),
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

  useEffect(() => {
    dispatch(GetAllHoliday(true));
  }, []);

  useEffect(() => {
    setAllHolidayData(setupForms.HolidayData);
  }, [setupForms.HolidayData]);

  useEffect(() => {
    if (holiday.HolidayName === "" || holiday.DateOfHoliday === "") {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    } else {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    }
  }, [holiday]);

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

  return (
    <>
      <Title level={3}>Holiday</Title>
      <Row gutter={8}>
        <Col lg={12} md={12} sm={24}>
          <TextField
            fullWidth
            label={holiday?.HolidayName !== "" && "Enter Holiday"}
            placeholder={"Enter Holiday *"}
            name="HolidayName"
            size="small"
            autoComplete="off"
            required
            value={holiday.HolidayName.trimStart()}
            change={handleChange}
            textLength={200}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <DatePicker
            label={
              holiday.DateOfHoliday && (
                <>
                  Holiday Date <span className={styles.required}>*</span>
                </>
              )
            }
            // required
            name="DateOfHoliday"
            size="large"
            width="100%"
            placeholder={"Holiday Date *"}
            change={HolidayDateHandler}
            value={
              holiday.DateOfHoliday
                ? DateDisplayFormat(holiday.DateOfHoliday)
                : null
            }
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          {actions.update ? (
            <Button
              text="Update Holiday"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Holiday"
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
            rows={allHolidayData}
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
        {/* this data will be pass to modal when Add Holiday btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add Holiday
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
        {actions.update && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to update Holiday
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

export default Holiday;
