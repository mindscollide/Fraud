import React, { useState, useEffect } from "react";
import { Typography, Space, Radio, Row, Col } from "antd";
import {
  SelectBox,
  Button,
  Table,
  StartToEndDate,
  Paper,
  TextField,
  FormattedInputs,
} from "../../../../../Components/Elements";

import {
  GetAdvanceClassification,
  GetManagementUnit,
  GetWOFReason,
} from "../../../../../store/actions/setup-forms-actions";

import { useDispatch, useSelector } from "react-redux";

import {
  completeReport,
  completeReportExcel,
} from "../../../../../store/actions/reports_actions";

import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";

const RevertCases = () => {
  const structure = {
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
    ManagementUnitID: "Select",
    WriteOffReason: "Select",
  };

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { reports, setupForms } = state;
  const { Title } = Typography;

  // data states
  var [rows, setRows] = useState([]);
  const [submitType, setsubmitType] = useState(1);
  const [enableRadio, setEnableRadio] = useState(true);
  const [form, setForm] = useState({
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
    ManagementUnitID: "Select",
    WriteOffReason: "Select",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const fieldsHandler = (e, val) => {
    let id =
      e.target.id !== undefined && e.target.id !== null ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("ManagementUnitID")) {
      setForm({ ...form, ["ManagementUnitID"]: val.title });
    } else if (id && id.includes("AdvanceClassificationID")) {
      setForm({ ...form, ["AdvanceClassificationID"]: val.title });
    } else if (id && id.includes("WriteOffReason")) {
      setForm({ ...form, ["WriteOffReason"]: val.title });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const datehandler = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setForm({
        ...form,
        DateTO: DateSendingFormat(e.startDate),
        DateFrom: DateSendingFormat(e.endDate),
      });
    } else {
      setForm({ ...form, DateTO: "", DateFrom: "" });
    }
  };

  const ammountFieldHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(Number(e.target.value)).length <= 17) {
      setForm({ ...form, [name]: NumberFormater(value) });
    } else {
    }
  };

  const CNIChandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (!value === "") {
      if (Number(value)) {
        setForm({ ...form, [name]: value });
      } else {
      }
    }
  };

  // dispatch action here to make api post request
  const handleSubmit = (e, submitType) => {
    e.preventDefault();
    let FinalSendingObject = { ...form };
    if (FinalSendingObject.AdvanceClassificationID === "Select") {
      FinalSendingObject.AdvanceClassificationID = 0;
    }
    if (FinalSendingObject.WriteOffReason === "Select") {
      FinalSendingObject.WriteOffReason = 0;
    }
    if (FinalSendingObject.ManagementUnitID === "Select") {
      FinalSendingObject.ManagementUnitID = 0;
    } else {
      let AdvanceClassificationIDIndex =
        setupForms.ClassificationOfAdvances.findIndex(
          (x) => x.title === FinalSendingObject.AdvanceClassificationID
        );
      let WriteOffReasonIndex = setupForms.WOFReasons.findIndex(
        (x) => x.title === FinalSendingObject.WriteOffReason
      );
      let ManagementUnitIDIndex = setupForms.ManagementUnits.findIndex(
        (x) => x.title === FinalSendingObject.ManagementUnitID
      );
      FinalSendingObject.AdvanceClassificationID =
        setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
      FinalSendingObject.WriteOffReason =
        setupForms.WOFReasons[WriteOffReasonIndex].id;
      FinalSendingObject.ManagementUnitID =
        setupForms.ManagementUnits[ManagementUnitIDIndex].id;
    }

    if (submitType === 1) {
      dispatch(completeReport(FinalSendingObject));
    } else if (submitType === 2) {
      dispatch(completeReportExcel(FinalSendingObject));
    }
  };

  useEffect(() => {
    if (form.AdvanceClassificationID === "Charged Off") {
      setEnableRadio(false);
      setForm({ ...form, ChargeOfType: 2 });
    } else if (form.AdvanceClassificationID !== "Charged Off") {
      setEnableRadio(true);
      setForm({ ...form, ChargeOfType: 1 });
    }
  }, [form.AdvanceClassificationID]);

  useEffect(() => {
    var addedKey, data;
    if (reports.isRecordFound && reports.completeReport.length > 0) {
      data = [...reports.completeReport];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
  }, [reports.completeReport]);

  useEffect(() => {
    let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    if (
      toThisDate !== undefined &&
      fromThisDate !== undefined &&
      toThisDate !== null &&
      fromThisDate !== null
    ) {
      setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
    }
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetWOFReason());
  }, []);

  const columns = [
    {
      title: "Company Code",
      dataIndex: "miSysCode",
      key: "miSysCode",
      align: "center",
      width: "3%",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "4%",
    },
    {
      title: "WOF Code",
      dataIndex: "wofCode",
      key: "wofCode",
      align: "center",
      width: "5%",
    },

    {
      title: "Classification Of Advances",
      dataIndex: "advanceClassificationID",
      key: "advanceClassificationID",
      align: "center",
      width: "5%",
    },
    {
      title: "FRA Principle",
      dataIndex: "fraPrincipal",
      key: "fraPrincipal",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "FRA Total",
      dataIndex: "fraTotal",
      key: "fraTotal",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Date of Write-off",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "5%",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "View Status History",
      dataIndex: "ViewApprovalHistory",
      key: "ViewApprovalHistory",
      align: "center",
      width: "5%",
    },
  ];
  return (
    <form onSubmit={(e) => handleSubmit(e, submitType)}>
      <>
        <Paper padding="2">
          <Row gutter={8}>
            {/* Row 01 */}
            <Col lg={18} md={18} sm={24}>
              <Title level={3}>In-Active Cases</Title>
            </Col>
            <Col lg={6} md={6} sm={24} className="u-text-align-right">
              <Space>
                <Button
                  type="submit"
                  click={() => setsubmitType(2)}
                  applyClass="transparentBtn"
                  text="Export To Excel"
                  icon={<i className="icon-export-excel icon-size-one"></i>}
                />
              </Space>
              <br />
              <br />
            </Col>
            <div className="u-margin-top-8pct" />
            {/* Row 2 */}
            <Row gutter={8}>
              <Col lg={8} md={8} sm={24}>
                <StartToEndDate
                  label="Date"
                  change={datehandler}
                  width="100%!important"
                  size="large"
                  startvalue={
                    form.DateFrom !== null && form.DateFrom !== ""
                      ? DateDisplayFormat(form.DateFrom)
                      : ""
                  }
                  endvalue={
                    form.DateTO !== null && form.DateFrom !== ""
                      ? DateDisplayFormat(form.DateTO)
                      : ""
                  }
                  DateRange={true}
                />
              </Col>
              <Col lg={8} md={8} sm={24}>
                <label>
                  <b>Amount</b>
                </label>
                <br />
                <div className="u-display-flex">
                  <FormattedInputs
                    placeholder="From"
                    label={null}
                    size="small"
                    minLength={15}
                    fullWidth
                    name="AmountFrom"
                    value={form.AmountFrom}
                    change={ammountFieldHandler}
                  />
                  <FormattedInputs
                    placeholder="To"
                    label={null}
                    minLength={15}
                    fullWidth
                    size="small"
                    name="AmountTo"
                    value={form.AmountTo}
                    change={ammountFieldHandler}
                  />
                </div>
              </Col>
              <Col lg={8} md={8} sm={24}>
                <label>
                  <b>MISYS Customer Code</b>
                </label>
                <br />
                <TextField
                  name="MiSysCustomerCode"
                  value={form.MiSysCustomerCode}
                  change={fieldsHandler}
                  textLength={6}
                  autoComplete="off"
                  helper="Please Enter 6 Digit Code"
                  error={
                    form.MiSysCustomerCode !== ""
                      ? form.MiSysCustomerCode.length >= 6
                        ? false
                        : true
                      : false
                  }
                  fullWidth
                  minLength={6}
                  label={null}
                  size="small"
                />
              </Col>
              <div className="u-margin-top-8pct" />
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Borrower NPL Code</b>
                </label>
                <br />
                <TextField
                  name="BorrowserNPLCode"
                  value={form.BorrowserNPLCode}
                  change={fieldsHandler}
                  autoComplete="off"
                  label={null}
                  size="small"
                  fullWidth
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>CNIC Number</b>
                </label>
                <br />
                <TextField
                  name="CNICNumber"
                  value={form.CNICNumber}
                  change={CNIChandler}
                  fullWidth
                  autoComplete="off"
                  label={null}
                  size="small"
                  textLength={13}
                  minLength={13}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Name of Sponsor / Owner</b>
                </label>
                <br />
                <TextField
                  name="NameOfSponsor"
                  value={form.NameOfSponsor}
                  change={fieldsHandler}
                  autoComplete="off"
                  fullWidth
                  label={null}
                  size="small"
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Classification of Advance</b>
                </label>
                <br />
                <SelectBox
                  name="AdvanceClassificationID"
                  value={form.AdvanceClassificationID}
                  change={fieldsHandler}
                  label={null}
                  propertyName={"title"}
                  option={setupForms.ClassificationOfAdvances}
                />
              </Col>
            </Row>
            {/* Row 03 */}
            <Row gutter={8}>
              <Col lg={8} md={8} sm={24} className="u-text-align-left">
                <label>
                  <b>Charge Off</b>
                </label>
                <br />
                <Radio.Group
                  onChange={fieldsHandler}
                  name="ChargeOfType"
                  value={form.ChargeOfType}
                >
                  <Radio disabled={enableRadio} value={2}>
                    New Charge-Off
                  </Radio>
                  <Radio disabled={enableRadio} value={3}>
                    Old Charge-Off
                  </Radio>
                </Radio.Group>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Business Segment</b>
                </label>
                <br />
                <SelectBox
                  option={setupForms.ManagementUnits}
                  name="ManagementUnitID"
                  value={form.ManagementUnitID}
                  change={fieldsHandler}
                  label={null}
                  propertyName={"title"}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Reason of Write Off</b>
                </label>
                <br />
                <SelectBox
                  propertyName={"title"}
                  option={setupForms.WOFReasons}
                  name="WriteOffReason"
                  value={form.WriteOffReason}
                  change={fieldsHandler}
                  label={null}
                />
              </Col>
              <Col lg={4} md={4} sm={24}>
                <div className="u-margin-top-14pct" />
                <Button
                  applyClass="btnMiniPrimary"
                  text="Search"
                  icon={<i className="icon-search icon-size-one"></i>}
                  click={() => setsubmitType(1)}
                  type="submit"
                />
              </Col>
              <Col lg={24} md={24} sm={24} className="u-margin-top-2pct">
                <Table
                  rows={rows}
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
          </Row>
        </Paper>
      </>
    </form>
  );
};

export default RevertCases;
