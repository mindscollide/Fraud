import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
  DateDisplayFormat,
  DateSendingFormat,
} from "../../../../Common/Functions/date-formatter";
import {
  Button,
  TextField,
  Notification,
  StartToEndDate,
  Loader,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import { ADCReportExcel } from "../../../../store/actions/reports_actions";
const IMADCDisputes = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { reports } = state;

  //DateRange States
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });

  const [search, setSearch] = useState({
    CNIC: "",
    HBLAccountNumber: "",
    OtherBankAccountNumber: "",
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

  // reset state manage handler
  const handleReset = () => {
    setSearch({
      CNIC: "",
      HBLAccountNumber: "",
      OtherBankAccountNumber: "",
    });
    setState({
      FromDate: "",
      ToDate: "",
    });
  };

  // search state manage handler
  const handleSerach = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "CNIC" && value !== "") {
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearch({
          ...search,
          [name]: valueCheck,
        });
      }
    } else if (name === "CNIC" && value === "") {
      setSearch({
        ...search,
        [name]: "",
      });
    } else if (name === "HBLAccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearch({
          ...search,
          [name]: valueCheck,
        });
      }
    } else if (name === "HBLAccountNumber" && value === "") {
      setSearch({
        ...search,
        [name]: "",
      });
    } else if (name === "OtherBankAccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearch({
          ...search,
          [name]: valueCheck,
        });
      }
    } else if (name === "OtherBankAccountNumber" && value === "") {
      setSearch({
        ...search,
        [name]: "",
      });
    }
  };

  // Download handler
  const downloadExcel = () => {
    let data = {
      DateFrom: State.FromDate,
      DateTO: State.ToDate,
      CNIC: search.CNIC,
      HBLAccountNumber: search.HBLAccountNumber,
      OtherBankAccountNumber: search.OtherBankAccountNumber,
    };
    dispatch(ADCReportExcel(data));
  };

  return (
    <>
      <Title level={3}>ADC Disputes</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            label="HBL Account Number"
            size="small"
            required
            name="HBLAccountNumber"
            value={search.HBLAccountNumber}
            textLength={14}
            change={handleSerach}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            label="Other Bank Account Number"
            size="small"
            required
            name="OtherBankAccountNumber"
            value={search.OtherBankAccountNumber}
            textLength={14}
            change={handleSerach}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            label="CNIC"
            size="small"
            name="CNIC"
            value={search.CNIC}
            textLength={13}
            change={handleSerach}
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
        <Col lg={8} md={8} sm={24}>
          <div className="u-display-inline-block">
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={handleReset}
            />
          </div>
        </Col>

        <Col md={24} lg={24} sm={24} className="u-margin-top-5pct u-text-align-center">
          <div>
            <Button
              applyClass="btnDarkSolidm"
              text="Download Report"
              icon={<DownloadOutlined />}
              click={downloadExcel}
            />
          </div>
        </Col>
      </Row>
      {reports.isLoading ? <Loader /> : null}
    </>
  );
};

export default IMADCDisputes;
