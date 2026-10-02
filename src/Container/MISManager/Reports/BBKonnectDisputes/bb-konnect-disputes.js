import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
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
import {
  CardNumberFormatter,
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";

const IMBBKonnectDisputes = () => {
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
      <Title level={3}>BB Konnect Disputes</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Account Number"
            size="small"
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Other Bank Account Number"
            size="small"
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            autoComplete="off"
            label="CNIC"
            size="small"
            required
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
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
        <Col lg={8} md={8} sm={24} className="u-text-align-center">
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
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default IMBBKonnectDisputes;
