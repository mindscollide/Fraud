import React, { useEffect, useState } from "react";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Tooltip, Typography, Radio, Col, Row } from "antd";
import { EditOutlined as Edit } from "@ant-design/icons";
import {
  Paper,
  InputWithBtn,
  TextField,
  Table,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  FormattedInputs,
} from "../../../../Components/Elements";
import {
  HideNotification,
  GetDebitCardDisputesForEditByCnicAndRefrenceNumber,
  GetTransactionDetailsByAccountNumber,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  RESETALLSTATE,
} from "../../../../store/actions/investigation-officer-actions";
import { GetAllCity } from "../../../../store/actions/setup-forms-actions";
import { enableGoBack } from "../../../../store/actions/ui-actions";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerDetailsDebitCardDisputeAccount = () => {
  var accountNumber = localStorage.getItem("AccountNumber");

  const { Title } = Typography;

  const [btnStatus, setBtnStatus] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const navigate = useNavigate();

  const [CNIC, setCNIC] = useState({
    CNIC: "",
  });

  const [customer, setCustomer] = useState({
    custName: "",
    cityName: "",
    cnicNumber: "",
  });

  const [cityValue, setCityValue] = useState("");

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [transactionDetails, setTransactionDetailsNIC] = useState([]);

  const { investigationOfficer, setupForms } = state;

  const [allTransactionDetailsByAccount, setAllTransactionDetailsByAccount] =
    useState([]);

  const [transactionDetailsAccount, setTransactionDetailsAccount] = useState(
    []
  );

  //For Grid
  useEffect(() => {
    if (investigationOfficer.GetTransactionDetailsByAccountData) {
      let tDetails =
        investigationOfficer.GetTransactionDetailsByAccountData
          .transactionDetails;
      if (tDetails !== undefined && tDetails !== null) {
        let GetTransactionDetailsByCNICArray = tDetails.map((item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        });
        setTransactionDetailsAccount(GetTransactionDetailsByCNICArray);
      }
    }
  }, [investigationOfficer.GetTransactionDetailsByAccountData]);

  //For Input Fields
  useEffect(() => {
    if (investigationOfficer.GetTransactionDetailsByAccountData) {
      let newData =
        investigationOfficer.GetTransactionDetailsByAccountData.customerDetails;
      if (newData !== undefined && newData !== null) {
        setCustomer({
          custName: newData.customerName,
          // cityName: newData.cmCity,
          fK_CTID: newData.fK_CTID,
          cnicNumber: newData.cnicNumber,
        });
        let valueCity = setupForms.CityData;
        valueCity.map((data, index) => {
          if (newData.fK_CTID === data.pK_CTID) {
            setCityValue(data.name);
          }
        });
      }
      setAllTransactionDetailsByAccount(
        investigationOfficer.GetTransactionDetailsByAccountData
      );
    }
  }, [investigationOfficer.GetTransactionDetailsByAccountData]);

  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (customer.fK_CTID === data.pK_CTID) {
        setCityValue(data.name);
        setCustomer({
          ...customer,
          ["fK_CTID"]: parseInt(data.pK_CTID),
        });
      }
    });
  }, [setupForms.CityData]);

  //To show notification
  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ShowNotification]);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      dispatch(GetTransactionDetailsByAccountNumber(accountNumber));
    }
    dispatch(GetAllCity());
  }, []);

  const View = (e, value) => {
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.setItem("cnic", JSON.stringify(customer.cnicNumber));
    let data = {
      CNICNumber: customer.cnicNumber,
      ReferenceNumber: value.refrenceNumber,
    };
    dispatch(enableGoBack());
    dispatch(SearchDebitCardDisputesByCnicAndReferenceNumber(data));
  };

  const checkBtn = (flag) => {
    console.log("checkBtn", flag);
    if (flag) {
      console.log("checkBtn", flag);

      setBtnStatus(true);
    } else {
      console.log("checkBtn", flag);

      setBtnStatus(false);
    }
  };

  const EDIT = (e, value) => {
    localStorage.setItem("CNICNumber", JSON.stringify(customer.cnicNumber));
    localStorage.setItem("cnic2", customer.cnicNumber);
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber)
    );
    localStorage.setItem("accountNumber", value.accountNumber);
    let data = {
      CNICNumber: customer.cnicNumber,
      ReferenceNumber: value.refrenceNumber,
    };
    dispatch(GetDebitCardDisputesForEditByCnicAndRefrenceNumber(data));
  };

  // check for add new record
  useEffect(() => {
    if (
      transactionDetailsAccount !== undefined &&
      transactionDetailsAccount !== null &&
      transactionDetailsAccount.length > 0
    ) {
      let flag = false;
      transactionDetailsAccount.map((data, index) => {
        if (
          data.statusDescription === "In Process" ||
          data.statusDescription === "Pending For Approval"
        ) {
          flag = true;
        } else if (data.statusDescription === "Approved") {
          // flag = true;
        }
      });
      checkBtn(flag);
    }
  }, [transactionDetailsAccount]);

  //   Colums for Table
  const columns = [
    {
      title: "Case Reference #",
      dataIndex: "refrenceNumber",
      key: "refrenceNumber",
      align: "center",
      width: "220px",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            className="u-cursor-pointer u-color-blue"
            onClick={(e) => View(e, record)}
          >
            {text}
          </i>
        </Tooltip>
      ),
    },

    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Debit Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
      align: "center",
      width: "200px",
    },
    {
      title: "# of Transactions",
      dataIndex: "numberOfTransaction",
      key: "numberOfTransaction",
      align: "center",
      width: "220px",
    },
    {
      title: "Total Dispute Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "180px",
      render: (text) => {
        if (String(text) !== "" && text !== -99999999999999999999) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Case Resolved Date",
      dataIndex: "caseResolvedDate",
      key: "caseResolvedDate",
      align: "center",
      width: "200px",
      render: (text) => {
        if (text === "") {
          return null;
        } else {
          return DateDisplayFormat(text);
        }
      },
    },
    {
      title: "Case Received Date",
      dataIndex: "caseReceivedDate",
      key: "caseReceivedDate",
      align: "center",
      width: "200px",
      render: (text) => {
        if (text === "") {
          return null;
        } else {
          return DateDisplayFormat(text);
        }
      },
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
      width: "220px",
    },
    {
      title: "Edit",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: "100px",
      render: (text, record) => {
        return record.statusDescription === "In Process" ? (
          <div
            onClick={(e) => EDIT(e, record)}
            className="icon-edit icon-size-one beachGreen u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];
  const addDisputeData = async () => {
    localStorage.setItem("flag", JSON.stringify(2));
    localStorage.removeItem("CNICNumber");
    localStorage.setItem("AccountNumber", accountNumber);
    navigate("/Fraud/DebitCardDisputes/AddEditCCD");
  };

  return (
    <>
      <Paper>
        <Row gutter={16}>
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1
              className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
            >
              Customer Details
            </h1>
          </Col>
          <Col lg={6} md={6} sm={6} xs={24} className="u-margin-0 u-position-relative u-text-align-left">
            <div className="Level-Section">
              <div>
                <i className="icon-card icon-size-one"></i>
                <div className="LevelSectionDetails">
                  <span className="LevelHeading">Account Number</span>
                  <br />
                  <span className="SubHeading">{accountNumber}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="u-margin-top-20px" />
        <Paper padding="1">
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Customer Name"
                size="small"
                disable={true}
                required
                value={customer.custName}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="Select City"
                value={cityValue}
                name="fK_CTID"
                disable={true}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                fullWidth
                label="CNIC Number"
                size="small"
                disable={true}
                required
                value={customer.cnicNumber}
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <Button
                text="Add Dispute"
                icon={<AddIcon />}
                applyClass="btnSecondarySolid2Search"
                size="small"
                disableBtn={btnStatus}
                click={addDisputeData}
              />
            </Col>
          </Row>
          <div className="u-margin-top-5pct" />
          <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
            <div className="TransactionHeading">Transaction Details</div>
            <Table
              rows={transactionDetailsAccount}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </Col>
        </Paper>
      </Paper>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default CustomerDetailsDebitCardDisputeAccount;
