import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  StartToEndDate,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

const IMADCDisputes = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  //DateRange States
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
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

  return (
    <>
      <Title level={3}>ADC Disputes</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField fullWidth label="Account Number" size="small" required />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="HBL Account Number"
            size="small"
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="Beneficiary Account Number"
            size="small"
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField fullWidth label="Mobile #" size="small" required />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField fullWidth label="IMEI #" size="small" required />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField fullWidth label="IP Address" size="small" required />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField fullWidth label="CNIC" size="small" required />
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
        <Col lg={24} md={24} sm={24} className="u-text-align-center">
          <div className="u-display-inline-block">
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
          </div>
        </Col>

        <Col md={24} lg={24} sm={24} className="u-margin-top-5pct u-text-align-center">
          <div>
            <Button
              applyClass="btnDarkSolidm"
              text="Download Report"
              icon={<DownloadOutlined />}
            />
          </div>
        </Col>
      </Row>

      {/* <Notification setOpen={setOpen} open={open.flag} message={open.message} /> */}
    </>
  );
};

export default IMADCDisputes;
