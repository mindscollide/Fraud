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
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  SearchADCDisputesForEditByCnicAndReferenceNumber,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  GetTransactionDetailsByAccountNumberADC,
} from "../../../../store/actions/investigation-officer-actions";
import { GetAllCity } from "../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import { enableGoBack } from "../../../../store/actions/ui-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerDetailsADCAccount = () => {
  var accountNumber = localStorage.getItem("AccountNumber");

  const { Title } = Typography;

  const [btnStatus, setBtnStatus] = useState(true);

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const navigate = useNavigate();

  const [CNIC, setCNIC] = useState({
    CNIC: "",
  });

  const [customer, setCustomer] = useState({
    custName: "",
    fK_CTID: "",
    // cityName: "",
    cnicNumber: "",
  });

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const { investigationOfficer, setupForms } = state;

  const [allTransactionDetailsByAccount, setAllTransactionDetailsByAccount] =
    useState([]);

  const [transactionDetailsAccount, setTransactionDetailsAccount] = useState(
    [],
  );

  const [cityValue, setCityValue] = useState("");

  //For Grid
  useEffect(() => {
    if (investigationOfficer.GetTransactionDetailsByAccountADCData) {
      let tDetails =
        investigationOfficer.GetTransactionDetailsByAccountADCData
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
  }, [investigationOfficer.GetTransactionDetailsByAccountADCData]);

  //For Input Fields
  useEffect(() => {
    if (investigationOfficer.GetTransactionDetailsByAccountADCData) {
      let newData =
        investigationOfficer.GetTransactionDetailsByAccountADCData
          .customerDetails;
      if (newData !== undefined && newData !== null) {
        setCustomer({
          custName: newData.customerName,
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
        investigationOfficer.GetTransactionDetailsByAccountADCData,
      );
    }
  }, [investigationOfficer.GetTransactionDetailsByAccountADCData]);

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
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.Message,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.Loading]);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      dispatch(GetTransactionDetailsByAccountNumberADC(accountNumber));
    }
    dispatch(GetAllCity());
  }, []);

  const View = (e, value) => {
    localStorage.setItem(
      "RefrenceNumber",
      JSON.stringify(value.refrenceNumber),
    );
    let Data = {
      CNICNumber: customer.cnicNumber,
      RefrenceNumber: value.refrenceNumber,
    };
    dispatch(enableGoBack());
    dispatch(SearchTransactionDetailsADCByCNICAndReferenceNumber(Data));
  };

  const update = (e, value) => {
    localStorage.setItem("CNICNumber", JSON.stringify(customer.cnicNumber));
    localStorage.setItem("cnic2", customer.cnicNumber);
    localStorage.setItem(
      "ReferenceNumber",
      JSON.stringify(value.refrenceNumber),
    );
    localStorage.setItem("accountNumber", JSON.stringify(value.accountNumber));
    let data = {
      CNICNumber: customer.cnicNumber,
      RefrenceNumber: value.refrenceNumber,
    };
    dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(data));
  };

  const checkBtn = (flag) => {
    if (flag) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  };

  useEffect(() => {
    if (
      transactionDetailsAccount !== undefined &&
      transactionDetailsAccount !== null &&
      transactionDetailsAccount.length > 0
    ) {
      let flag = true;
      transactionDetailsAccount.map((data, index) => {
        if (
          data.statusDescription === "In Process" ||
          data.statusDescription === "Pending For Approval"
        ) {
          flag = false;
        } else if (data.statusDescription === "Approved") {
          flag = true;
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
      width: "200px",
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
      width: "200px",
    },
    {
      title: "# of Transactions",
      dataIndex: "numberOfTransaction",
      key: "numberOfTransaction",
      align: "center",
      width: "200px",
    },
    {
      title: "Total Dispute Amount",
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      align: "center",
      width: "200px",
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
      width: "200px",
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
            onClick={(e) => update(e, record)}
            className="icon-edit icon-size-one beachGreen u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];

  const addDisputeData = () => {
    localStorage.setItem("flag", JSON.stringify(2));
    localStorage.removeItem("CNICNumber");
    localStorage.setItem("AccountNumber", accountNumber);
    navigate("/Fraud/ADCD/AddEditADC");
  };

  return (
    <>
      <Paper>
        <Row gutter={16}>
          <Col lg={18} md={18} sm={18} xs={24}>
            <h1 className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d">
              Customer Details
            </h1>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={6}
            xs={24}
            className="u-padding-0 u-margin-0 u-position-relative u-text-align-left"
          >
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
                label="City"
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
            <div className="TransactionHeading">
              Manually Entered Transaction
            </div>
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

export default CustomerDetailsADCAccount;
