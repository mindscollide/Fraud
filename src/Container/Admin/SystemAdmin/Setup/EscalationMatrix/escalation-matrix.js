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
  MultipleSelectCheckmarks,
  Loader,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  HideNotification,
  GetAllUserRoles,
  GetAllEscalationMatrix,
  SaveEscalationMatrix,
  DeleteEscalationMatrix,
  EditEscalationMatrix,
} from "../../../../../store/actions/setup-forms-actions";
import { render } from "react-dom";
const EscalationMatrix = () => {
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
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [dataForSave, setDataForSave] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [selectedUserRoleName, setSelectedUserRoleName] = useState([]);
  const [escalationMatrixName, setEscalationMatrixName] = useState([]);
  const [allEscalationMatrix, setAllEscalationMatrix] = useState([]);
  const [addUserRoleData, setAddUserRoleData] = useState({
    pK_GSSUserRoleID: 0,
  });
  const [addEscalationMatrix, setAddEscalationMatrix] = useState({
    Days: 0,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDaysChange = (e) => {
    let value = e.target.value;
    if (value === 0 || value === "") {
      setAction({ ...actions, update: actions.update ? true : false });
      setAddEscalationMatrix({
        ...addEscalationMatrix,
        Days: 0,
      });
    }

    var valueCheck = value.replace(/[^\d-]/g, "");
    if (!valueCheck === 0) {
      setAddEscalationMatrix({
        ...addEscalationMatrix,
        Days: parseInt(valueCheck),
      });
    }
  };

  const deleteit = (e, record) => {
    setEscalationMatrixName(record.days.pK_EMID, record.userRoles.fK_EMID);
    showModal();
    setAction({
      ...actions,
      delete: true,
      update: false,
      add: false,
    });
  };

  const [pkeID, setPkeID] = useState(0);

  const update = (e, record) => {
    let uName = record.userRoles;
    let Daysn = record.days.days;
    let PK_EMID = record.days.pK_EMID;
    setPkeID(PK_EMID);
    let temp = [];
    uName.map((name, index) => {
      let Username = name.userRoleName;
      temp = [...temp, Username];
    });
    setSelected(temp);
    setSelectedUserRoleName(temp);
    setAddEscalationMatrix({
      Days: Daysn,
    });
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    if (allEscalationMatrix.length > 0) {
      let flag = false;
      allEscalationMatrix.map((data, index) => {
        if (
          data.days.days === addEscalationMatrix.Days &&
          pkeID !== data.days.pK_EMID
        ) {
          flag = true;
        }
      });
      let Daysc = addEscalationMatrix.Days;
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists for" + " " + [Daysc] + " " + "days",
        });
      } else {
        dispatch(EditEscalationMatrix(addEscalationMatrix, dataForSave, pkeID));
        setAddEscalationMatrix({
          Days: 0,
        });
        setDataForSave([]);
        setSelectedUserRoleName([]);
        setSelected([]);
        setAction({ ...actions, update: false });
        setBtnStatus(true);
      }
    } else {
      dispatch(EditEscalationMatrix(addEscalationMatrix, dataForSave, pkeID));
      setAddEscalationMatrix({
        Days: 0,
      });
      setDataForSave([]);
      setSelectedUserRoleName([]);
      setSelected([]);
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
  };

  const add = () => {
    if (allEscalationMatrix.length > 0) {
      let flag = false;
      allEscalationMatrix.map((data, index) => {
        if (data.days.days === addEscalationMatrix.Days) {
          flag = true;
        }
      });
      let Daysc = addEscalationMatrix.Days;
      if (flag) {
        setOpen({
          flag: true,
          message: "Record already exists for" + " " + [Daysc] + " " + "days",
        });
      } else {
        if (addUserRoleData.Title !== "") {
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
            message: "Please Enter ",
          });
        }
        setBtnStatus(true);
      }
    } else {
      if (addUserRoleData.Title !== "") {
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
          message: "Please Enter ",
        });
      }
      setBtnStatus(true);
    }
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveEscalationMatrix(addEscalationMatrix, dataForSave));
    setAddEscalationMatrix({
      Days: "",
    });
    setDataForSave([]);
    setSelectedUserRoleName([]);
    setSelected([]);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteEscalationMatrix(escalationMatrixName));
  };

  useEffect(() => {
    dispatch(GetAllEscalationMatrix());
    dispatch(GetAllUserRoles());
  }, []);

  // For User Roles DropDown SetState
  useEffect(() => {
    let nameUserRoles = setupForms.UserRolesData;
    setUserRoles(
      nameUserRoles.map((data, index) => {
        return data.userRoleName;
      })
    );
  }, [setupForms.UserRolesData]);

  useEffect(() => {}, [userRoles]);

  // Selected Dropdown value
  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.UserRolesData;
    dataUser.map((name, index) => {
      selectedUserRoleName.map((id, index) => {
        if (name.userRoleName === id) {
          let pkID = name.pK_GSSUserRoleID;
          tem = [...tem, pkID];
        }
      });
    });
    setDataForSave(tem);
  }, [selectedUserRoleName]);

  useEffect(() => {
    let check = setupForms.EscalationMatrixData;
    if (check !== undefined && check !== null) {
      setAllEscalationMatrix(setupForms.EscalationMatrixData);
    }
  }, [setupForms.EscalationMatrixData]);

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

  const userRoleshandler = (text) => {
    let tem = [];
    text.map((data, index) => {
      let n = data.userRoleName;
      if (tem === []) {
        tem = [n];
      } else {
        tem = [...tem, n];
      }
    });
    return tem.join(", ");
  };

  useEffect(() => {
    if (
      addEscalationMatrix.Days !== "" &&
      dataForSave.length > 0 &&
      addEscalationMatrix.Days !== undefined &&
      addEscalationMatrix.Days !== null
    ) {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [addEscalationMatrix]);

  useEffect(() => {
    if (
      addEscalationMatrix.Days !== "" &&
      dataForSave.length > 0 &&
      addEscalationMatrix.Days !== undefined &&
      addEscalationMatrix.Days !== null
    ) {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [dataForSave]);

  const columns = [
    {
      title: "Days (>)",
      dataIndex: "days",
      key: "days",
      align: "center",
      width: "20%",
      render: (text) => {
        return text.days;
      },
    },
    {
      title: "Role",
      dataIndex: "userRoles",
      key: "userRoles",
      align: "center",
      width: "60%",
      render: (text) => userRoleshandler(text),
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
      click: () => handleSave(),
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
      <Title level={3}>Escalation Matrix</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            label="Days (>)"
            size="small"
            autoComplete="off"
            change={handleDaysChange}
            value={
              addEscalationMatrix.Days === 0 ||
              addEscalationMatrix.Days === null
                ? null
                : addEscalationMatrix.Days
            }
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24} className="MultipleSelectClass">
          <MultipleSelectCheckmarks
            // names={userRoles}
            selected={selected}
            setSelected={setSelected}
            selectedUserRoleName={selectedUserRoleName}
            setSelectedUserRoleName={setSelectedUserRoleName}
            lable="Select Role"
            option={userRoles}
            name={userRoles}
            // value=[]
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          {actions.update ? (
            <Button
              disableBtn={btnStatusSelect}
              text="Update Escalation Matrix"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
            />
          ) : (
            <Button
              disableBtn={btnStatus}
              text="Add Escalation Matrix"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
            />
          )}
        </Col>

        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={allEscalationMatrix}
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
                Are you sure you want to add Escalation Matrix
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
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default EscalationMatrix;
