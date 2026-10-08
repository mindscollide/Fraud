import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
// import style from "./custom-css.css";
import styles from "../../../../../Components/Elements/Loader/style.module.css";
// import {StopOutlined} from  '@mui/icons-material/StopOutlined';

import { useDispatch, useSelector } from "react-redux";
// import { roles } from "../../../../Common/SelectFieldOption/select-field-option";
import {
  TextField,
  Table,
  SelectBox,
  Button,
  Loader,
  GroupedButtons,
  Modal,
  MultipleSelectCheckmarks,
} from "../../../../../Components/Elements";
import {
  getAllUserData,
  editSystemUser,
} from "../../../../../store/actions/request-actions";
import {
  GetAllRegion,
  GetAllTransactionTypes,
} from "../../../../../store/actions/setup-forms-actions";
import { SearchOutlined as Search } from "@ant-design/icons";

const EditUser = () => {
  const { Title } = Typography;
  const state = useSelector((state) => state);
  const { requestReducer, setupForms } = state;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState();
  const [classificationofAdvance, setclassificationofAdvance] = useState({
    UserIdToEdit: null,
    RegionID: 0,
    email: "",
    TransactionType: [],
  });
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  const [resetSearchData, setResetSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [selectedTransactionTypeName, setSelectedTransactionTypeName] =
    useState([]);
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });
  const [row, setRows] = useState([]);
  const [form, setForm] = useState({
    LoginID: "",
    SelectRole: 0,
    SelectStaus: 0,
  });
  // for User Roles
  const [userRoleValue, setUserRoleValue] = useState([]);
  const [userRolesName, setUserRolesName] = useState([]);
  const [userRegion, setUserRegion] = useState([]);
  const [selected, setSelected] = React.useState([]);

  const [userRoles, setUserRoles] = useState([
    { name: "Security Administrator", value: 1 },
    { name: "System Administrator", value: 2 },
    { name: "Investigation Officer", value: 3 },
    { name: "Investigation Manager", value: 4 },
    { name: "QA Manager", value: 5 },
    { name: "MIS Manager", value: 6 },
  ]);
  // for already selected value
  const [region, setRegion] = useState("");
  const [userMStatus, setMUserStatus] = useState("");
  // for User Status
  const [userStatusValue, setUserStatusValue] = useState([]);
  const [userStatusName, setUserStatusName] = useState([]);
  const [editUpdateBtnStatus, setEditUpdateBtnStatus] = useState(true);

  const [userStatus, setUserStatus] = useState([
    { name: "Enabled", value: 1 },
    { name: "Disabled", value: 2 },
    { name: "Locked", value: 3 },
    { name: "Closed", value: 4 },
    { name: "Dormant", value: 9 },
  ]);

  const [searchData, setSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });

  // const fieldsHandler = (e, val) => {
  //   let id =
  //     e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   if (val === "Investigation Manager") {
  //     setSearchData({ ...searchData, ["UserRole"]: 4 });
  //     setUserRoleValue(val);
  //   } else if (val === "Investigation Officer") {
  //     setSearchData({ ...searchData, ["UserRole"]: 3 });
  //     setUserRoleValue(val);
  //   } else if (val === "Auditor") {
  //     setSearchData({ ...searchData, ["UserRole"]: 7 });
  //     setUserRoleValue(val);
  //   } else if (val === "QA Manager") {
  //     setSearchData({ ...searchData, ["UserRole"]: 5 });
  //     setUserRoleValue(val);
  //   } else if (val === "MIS Manager") {
  //     setSearchData({ ...searchData, ["UserRole"]: 6 });
  //     setUserRoleValue(val);
  //   } else if (val === "System Administrator") {
  //     setSearchData({ ...searchData, ["UserRole"]: 2 });
  //     setUserRoleValue(val);
  //   } else if (val === "Security Administrator") {
  //     setSearchData({ ...searchData, ["UserRole"]: 1 });
  //     setUserRoleValue(val);
  //   } else if (val === "Enabled") {
  //     setSearchData({ ...searchData, ["UserStatus"]: 1 });
  //     setUserStatusValue(val);
  //   } else if (val === "Disabled") {
  //     setSearchData({ ...searchData, ["UserStatus"]: 2 });
  //     setUserStatusValue(val);
  //   } else if (val === "Locked") {
  //     setSearchData({ ...searchData, ["UserStatus"]: 3 });
  //     setUserStatusValue(val);
  //   } else if (val === "Closed") {
  //     setSearchData({ ...searchData, ["UserStatus"]: 4 });
  //     setUserStatusValue(val);
  //   } else if (val === "Dormant") {
  //     setSearchData({ ...searchData, ["UserStatus"]: 9 });
  //     setUserStatusValue(val);
  //   } else if (id && id.includes("UserStatus")) {
  //   } else {
  //     setSearchData({ ...searchData, [name]: value.trimStart() });
  //   }
  // };

  // for edit user
  const editUserDataHnaler = (e, val) => {
    let name = e.target.name;
    if (val !== undefined && val !== null) {
      let RegionData = setupForms.RegionData;
      if (
        RegionData !== undefined &&
        RegionData !== null &&
        RegionData.length > 0
      ) {
        RegionData.map((data, index) => {
          if (val === data.name) {
            setclassificationofAdvance({
              ...classificationofAdvance,
              ["RegionID"]: data.pK_RID,
            });
            setRegion(data.name);
          }
        });
      }
    }
  };
  // Foe Save Edit user details

  const showModal = () => {
    setIsModalVisible(true);
  };

  // for search
  const searchHandler = () => {
    dispatch(getAllUserData(searchData));
  };
  // cleare all states
  const resetData = async () => {
    await setSearchData({
      LoginID: "",
      Email: "",
      FirstName: "",
      LastName: "",
      UserRole: 0,
      UserStatus: 0,
    });
    let data = {
      LoginID: "",
      Email: "",
      FirstName: "",
      LastName: "",
      UserRole: 0,
      UserStatus: 0,
    };
    setUserRoleValue();
    setUserStatusValue();
    dispatch(getAllUserData(data));
    dispatch(GetAllRegion());
    dispatch(GetAllTransactionTypes(userid));
  };

  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
  };

  const handleProceed = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(editSystemUser(classificationofAdvance, resetSearchData));
    setSelected([]);
    setSelectedTransactionTypeName([]);
  };

  // for region maping
  const userRoleshandler = (text) => {
    if (text !== undefined && text !== null) {
      let tem = [];
      text.map((data, index) => {
        let n = data.transactionName;
        if (tem === []) {
          tem = [n];
        } else {
          tem = [...tem, n];
        }
      });
      return tem.join(", ");
    } else {
      return "";
    }
  };

  const roleChangeHandler = (e, val) => {
    const role = userRoles.find((r) => r.name === val);
    setSearchData((prev) => ({ ...prev, UserRole: role ? role.value : 0 }));
    setUserRoleValue(val ?? null);
  };

  const statusChangeHandler = (e, val) => {
    const status = userStatus.find((s) => s.name === val);
    setSearchData((prev) => ({
      ...prev,
      UserStatus: status ? status.value : 0,
    }));
    setUserStatusValue(val ?? null);
  };

  // text fields keep using a simplified fieldsHandler
  const fieldsHandler = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: (value ?? "").trimStart() }));
  };

  // For User transactionName DropDown SetState
  useEffect(() => {
    let transactionName = setupForms.TransactionTypesData;
    setTransactionTypes(
      transactionName.map((data, index) => {
        return data.ttName;
      })
    );
  }, [setupForms.TransactionTypesData]);

  const userRegionhandler = (text) => {
    let RegionData = setupForms.RegionData;
    if (
      text !== undefined &&
      text !== null &&
      RegionData !== undefined &&
      RegionData !== null &&
      RegionData.length > 0
    ) {
      return RegionData.map((data, index) => {
        if (data.pK_RID === text) {
          return data.name;
        } else {
          return "";
        }
      });
    }
  };

  const columns = [
    {
      title: "LoginID",
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      align: "center",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "fK_GSSUserRoleID",
      key: "fK_GSSUserRoleID",
      render: (text) => (
        <>
          {text === 7 ? (
            <div>Auditor</div>
          ) : text === 4 ? (
            <div>Investigation Manager</div>
          ) : text === 2 ? (
            <div>System Administrator</div>
          ) : text === 3 ? (
            <div>Investigation Officer</div>
          ) : text === 5 ? (
            <div>QA Manager</div>
          ) : text === 6 ? (
            <div>MIS Manager</div>
          ) : (
            <div>Security Administrator</div>
          )}
        </>
      ),
      align: "center",
      width: "20%",
    },

    {
      title: "Transaction Name",
      dataIndex: "transactionTypes",
      key: "transactionTypes",
      align: "center",
      width: "60%",
      render: (text) => userRoleshandler(text),
    },
    {
      title: "Region",
      dataIndex: "regionID",
      key: "regionID",
      align: "center",
      width: "60%",
      render: (text) => userRegionhandler(text),
    },
    {
      title: "Status",
      dataIndex: "fK_GSSUserStatusID",
      key: "fK_GSSUserStatusID",
      align: "center",
      width: "20%",

      render: (text) => (
        <>
          {text === 1 ? (
            <div className="icon-check icon-size-one greenTick u-cursor-pointer"></div>
          ) : text === 2 ? (
            <div className="icon-not-allowed icon-size-one crossRed u-cursor-pointer"></div>
          ) : text === 3 ? (
            <div className="icon-lock icon-size-one crossRed u-cursor-pointer"></div>
          ) : (
            <div className="icon-close icon-size-one crossRed u-cursor-pointer"></div>
          )}
        </>
      ),
      //   render: (text) => (
      //     <div
      //       //
      //       // onClick={showModal}
      //       className="icon-check icon-size-one greenTick u-cursor-pointer"
      //     />
      //   ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div
          onClick={(e) => edit(e, record)}
          className="icon-edit icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },
  ];

  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: "",
      click: () => null,
    },
    secondaryButton: {
      text: "Cancle",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => null,
    },
  };

  const editButtonProps = {
    primaryButton: {
      text: "Update",
      icon: <i className="icon-update icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: editUpdateBtnStatus,
      click: () => update(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => handleCancel(),
    },
  };

  const edit = (e, record) => {
    let RegionData = setupForms.RegionData;
    if (
      RegionData !== undefined &&
      RegionData !== null &&
      RegionData.length > 0
    ) {
      RegionData.map((data, index) => {
        if (record.regionID === data.pK_RID) {
          setRegion(data.name);
        }
      });
    }
    let transactionTypes = record.transactionTypes;
    if (transactionTypes !== null && transactionTypes !== undefined) {
      if (transactionTypes.length > 0) {
        let temp = [];
        record.transactionTypes.map((name, index) => {
          let Username = name.transactionName;
          temp = [...temp, Username];
        });
        setSelected(temp);
      }
    }
    let tem2 = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem2 = [...tem2, pkID];
        }
      });
    });
    setForm({ ...form, ["LoginID"]: record.userID });
    showModal();
    setclassificationofAdvance({
      ...classificationofAdvance,
      UserIdToEdit: record.userID,
      email: record.userLDAPAccount,
      RegionID: record.regionID,
      TransactionType: tem2,
    });
    setAction({ ...actions, edit: !actions.edit });
  };

  const update = async () => {
    showModal();
    setAction({ ...actions, update: !actions.update, edit: false });
  };

  // Api call for user data
  useEffect(() => {
    dispatch(getAllUserData(resetSearchData));
    dispatch(GetAllRegion());
    dispatch(GetAllTransactionTypes());
    if (userRoles) {
      setUserRolesName(
        userRoles.map((role, i) => {
          return role.name;
        })
      );
    }
    if (userStatus) {
      setUserStatusName(
        userStatus.map((status, i) => {
          return status.name;
        })
      );
    }
  }, []);

  useEffect(() => {
    let RegionData = setupForms.RegionData;
    if (
      RegionData !== undefined &&
      RegionData.length > 0 &&
      RegionData !== null
    ) {
      setUserRegion(
        RegionData.map((role, i) => {
          return role.name;
        })
      );
    }
  }, [setupForms.RegionData]);

  // Selected Dropdown value
  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.TransactionTypesData;
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem = [...tem, pkID];
        }
      });
    });
    let tem2 = [];
    dataUser.map((name, index) => {
      selectedTransactionTypeName.map((id, index) => {
        if (name.ttName === id) {
          let pkID = name.pK_TTID;
          tem2 = [...tem2, pkID];
        }
      });
    });
    setclassificationofAdvance({
      ...classificationofAdvance,
      ["TransactionType"]: tem2,
    });
  }, [selectedTransactionTypeName]);
  // User data Responce
  useEffect(() => {
    if (requestReducer.ResponseMessage === "Record Found") {
      var addKey = requestReducer.UserDetails.map((item, index) => {
        return { ...item, key: index };
      });
      setRows(addKey);
    } else {
      setRows([]);
    }
  }, [requestReducer.UserDetails]);

  useEffect(() => {
    if (selected.length > 0) {
      setEditUpdateBtnStatus(false);
    } else {
      setEditUpdateBtnStatus(true);
    }
  }, [selected]);
  return (
    <>
      <Title className="EditUserTitle" level={3}>
        Edit User
      </Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={searchData.LoginID !== "" && "Login ID"}
            placeholder={"Login ID"}
            size="small"
            autoComplete="off"
            name="LoginID"
            value={searchData.LoginID}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={searchData.FirstName !== "" && "First Name"}
            placeholder={"First Name"}
            size="small"
            autoComplete="off"
            name="FirstName"
            value={searchData.FirstName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={searchData.LastName !== "" && "Last Name"}
            placeholder={"Last Name"}
            size="small"
            autoComplete="off"
            name="LastName"
            value={searchData.LastName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          {/* <SelectBox
            label="Select Role"
            size="small"
            height="10px!important"
            option={userRolesName}
            name="UserRole"
            value={userRoleValue}
            change={fieldsHandler}
          /> */}

          <SelectBox
            label={userRoleValue?.length !== 0 && "Select Role"}
            option={userRolesName}
            name="UserRole"
            value={userRoleValue}
            change={roleChangeHandler}
            placeholder={"Select Role"}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 10, gap: 8 }}>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={userStatusValue?.length !== 0 && "Select Status"}
            placeholder={"Select Status"}
            option={userStatusName}
            name="UserStatus"
            value={userStatusValue}
            change={statusChangeHandler}
          />
        </Col>
        <Col md={16} lg={16} sm={24}>
          <div>
            <Button
              text="Search"
              icon={<Search />}
              applyClass="btnSecondarySolid2Search3"
              size="small"
              click={searchHandler}
            />
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </div>
        </Col>

        <div className="u-margin-top-10pct" />
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={row}
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

      {/* modal starts here */}
      <Modal
        modalTitle={
          actions.edit && (
            <h3>
              <b>Edit User</b>
            </h3>
          )
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        {actions.edit && (
          <div className="u-padding-40px u-display-flex u-justify-content-center u-flex-direction-column">
            <TextField
              focus
              disable
              label="Email"
              fullWidth
              value={classificationofAdvance.email}
              disabled={true}
            />
            <div className="u-margin-top-3pct" />
            <Row gutter={16}>
              <Col md={8} lg={8} sm={24}>
                <SelectBox
                  label="Select Region"
                  name="SelectRegion"
                  option={userRegion}
                  value={region}
                  change={editUserDataHnaler}
                />
              </Col>
              <Col md={16} lg={16} sm={24} className="EditUserModalMultiSelect">
                <MultipleSelectCheckmarks
                  // names={userRoles}
                  selected={selected}
                  setSelected={setSelected}
                  selectedUserRoleName={selectedTransactionTypeName}
                  setSelectedUserRoleName={setSelectedTransactionTypeName}
                  lable="Transaction Type *"
                  change={editUserDataHnaler}
                  option={transactionTypes}
                  name="transactionType"
                  required
                />
              </Col>
            </Row>
            <div className="u-margin-top-7pct" />
            <GroupedButtons data={editButtonProps} />
          </div>
        )}
      </Modal>
      {/* a separate modal for edit user prompt */}
      {actions.update && (
        <>
          <Modal
            closeModal={handleCancel}
            modalState={isModalVisible}
            width={700}
          >
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <div className="icon-update-user icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want to update the user?
              </Title>
            </div>
            <div className="u-text-align-center">
              <Button
                click={handleProceed}
                applyClass="btnBorderStyledBeach"
                text="Proceed"
                endIcon={<i className="icon-proceed icon-size-one"></i>}
              />
            </div>
          </Modal>
        </>
      )}
      {requestReducer.Loading ? (
        <Loader loaderstyle={styles.WhiteSection} />
      ) : null}
    </>
  );
};

export default EditUser;

// export default EditUser;
