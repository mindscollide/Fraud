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
  GetAllTransactionTypes,
} from "../../../../../store/actions/setup-forms-actions";
import { ensureLookup } from "../../../../../store/actions/lookup-actions";
import { SearchOutlined as Search } from "@ant-design/icons";

// Display labels for transaction types returned by the API
const TRANSACTION_TYPE_LABELS_BY_ID = {
  1: "Credit Card Dispute",
  2: "Debit Card Dispute",
  3: "Alternate Delivery Channel Disputes",
  4: "Non-API Dispute",
  5: "BB Konnect Disputes",
  6: "Negative Database",
};

const TRANSACTION_TYPE_LABELS_BY_NAME = {
  CreditCardDispute: "Credit Card Dispute",
  DebitCardDispute: "Debit Card Dispute",
  AlternateDeliveryChannelDisputes: "Alternate Delivery Channel Disputes",
  NonAPIDispute: "Non-API Dispute",
  BBKonnect: "BB Konnect Disputes",
  NegativeDatabase: "Negative Database",
};

// Fallback for any new type: "SomeNewType" -> "Some New Type"
const splitPascalCase = (str = "") =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();

const getTransactionLabel = (item) => {
  if (!item) return "";
  return (
    TRANSACTION_TYPE_LABELS_BY_ID[item.transactionTypeID] ||
    TRANSACTION_TYPE_LABELS_BY_NAME[item.transactionName] ||
    splitPascalCase(item.transactionName)
  );
};

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

  // for edit user
  const editUserDataHnaler = (e, val) => {
    // Supports both (e, value) and plain e.target.value signatures.
    // Non-string values (e.g. from the multi-select) are ignored.
    const picked = typeof val === "string" ? val : e?.target?.value;
    if (typeof picked !== "string") return;
    const selectedRegion = (setupForms.RegionData || []).find(
      (data) => data.name === picked
    );
    if (selectedRegion) {
      setclassificationofAdvance((prev) => ({
        ...prev,
        RegionID: selectedRegion.pK_RID,
      }));
      setRegion(selectedRegion.name);
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
    setUserRoleValue([]);
    setUserStatusValue([]);
    dispatch(getAllUserData(data));
    dispatch(ensureLookup("region"));
    dispatch(GetAllTransactionTypes(userid));
  };

  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
    setRegion("");
    setSelected([]);
    setSelectedTransactionTypeName([]);
  };

  const handleProceed = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(editSystemUser(classificationofAdvance, resetSearchData));
    setSelected([]);
    setSelectedTransactionTypeName([]);
  };

  // Formats the Transaction Types column:
  // "Credit Card Dispute, Debit Card Dispute, ..."
  const userRoleshandler = (text) => {
    if (!Array.isArray(text) || text.length === 0) return "";
    return text
      .map((item) => getTransactionLabel(item))
      .filter(Boolean)
      .join(", ");
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
    const match = (setupForms.RegionData || []).find(
      (data) => data.pK_RID === text
    );
    return match ? match.name : "";
  };

  const columns = [
    {
      title: "Login ID",
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      align: "center",
      width: "10%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "10%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "10%",
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
      width: "15%",
    },

    {
      title: "Transaction Types",
      dataIndex: "transactionTypes",
      key: "transactionTypes",
      align: "center",
      width: "30%",
      render: (text) => userRoleshandler(text),
    },
    {
      title: "Region",
      dataIndex: "regionID",
      key: "regionID",
      align: "center",
      width: "10%",
      render: (text) => userRegionhandler(text),
    },
    {
      title: "Status",
      dataIndex: "fK_GSSUserStatusID",
      key: "fK_GSSUserStatusID",
      align: "center",
      width: "5%",

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
      width: "5%",
      render: (text, record) => (
        <div
          onClick={(e) => edit(e, record)}
          className="icon-edit icon-size-one u-color-2f2f2f u-cursor-pointer"
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
    // Region: always reset, so a previous user's region never carries over
    const currentRegion = (setupForms.RegionData || []).find(
      (data) => data.pK_RID === record.regionID
    );
    setRegion(currentRegion ? currentRegion.name : "");

    // Transaction types: always reset, then seed from this record
    const recordTypes = Array.isArray(record.transactionTypes)
      ? record.transactionTypes
      : [];
    setSelected(recordTypes.map((t) => t.transactionName));
    setSelectedTransactionTypeName([]);

    setForm({ ...form, ["LoginID"]: record.userID });
    showModal();
    setclassificationofAdvance({
      ...classificationofAdvance,
      UserIdToEdit: record.userID,
      email: record.userLDAPAccount,
      RegionID: record.regionID,
      // IDs come from the record itself, so changing only the region
      // doesn't send an empty / stale transaction type list.
      TransactionType: recordTypes.map((t) => t.transactionTypeID),
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
    dispatch(ensureLookup("region"));
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
    // Empty means "nothing changed / modal reset": keep the IDs seeded in edit()
    if (selectedTransactionTypeName.length === 0) return;
    const ids = [];
    (setupForms.TransactionTypesData || []).forEach((item) => {
      if (selectedTransactionTypeName.includes(item.ttName)) {
        ids.push(item.pK_TTID);
      }
    });
    setclassificationofAdvance((prev) => ({
      ...prev,
      TransactionType: ids,
    }));
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

      <Row gutter={8} className="u-margin-top-22px">
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
          <Button
            text="Search"
            icon={
              <i className="icon-size-zero">
                <Search />
              </i>
            }
            applyClass="btnSecondarySolid2Search3"
            size="small"
            click={searchHandler}
          />
          <Button
            text="Reset"
            icon={<i className="icon-reset icon-size-zero"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
      </Row>
      <Row gutter={8} className="u-margin-top-22px">
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={row}
            columns={columns}
            scroll={{ x: "1300" }}
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
