import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  TextField,
  Notification,
  StartToEndDate,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import { CreditCardReportExcel } from "../../../../store/actions/reports_actions";
const IMCreditCardDisputes = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  //DateRange States
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });
  const [search, setSearch] = useState({
    AccountNumber: "",
    CNIC: "",
  });
  const [clearDateSelect, setDateClearSelect] = useState("");
  const setDate = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        FromDate: DateSendingFormat(e.endDate),
        ToDate: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        FromDate: "",
        ToDate: "",
      });
    }
  };
  const handleSerach = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  };

  return (
    <>
      <Title level={3}> Card Disputes</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="Account Number"
            size="small"
            autoComplete="off"
            name="AccountNumber"
            value={search.AccountNumber}
            change={handleSerach}
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="CNIC"
            size="small"
            autoComplete="off"
            name="CNIC"
            value={search.CNIC}
            change={handleSerach}
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <StartToEndDate
            width="100%!important"
            size="large"
            change={setDate}
            key={clearDateSelect}
            startvalue={
              State.FromDate !== null && State.FromDate !== ""
                ? DateDisplayFormat(State.FromDate)
                : null
            }
            endvalue={
              State.ToDate !== null && State.FromDate !== ""
                ? DateDisplayFormat(State.ToDate)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-text-align-right">
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search2"
            size="small"
          />
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
          />
        </Col>

        <Col md={24} lg={24} sm={24} className="u-margin-top-5pct u-text-align-center">
          <div>
            <Button
              applyClass="btnDarkSolidm"
              text="Download Report"
              icon={<DownloadOutlined />}
              click={dispatch(CreditCardReportExcel(search))}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default IMCreditCardDisputes;
