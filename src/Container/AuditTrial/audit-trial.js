import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import InputMask from "react-input-mask";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
  Loader,
} from "../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  DateDisplayFormat,
  DateSendingFormat,
} from "../../Common/Functions/date-formatter";
import { GetAllActions } from "../../store/actions/setup-forms-actions";
import { AuditTrailReportDownload } from "../../store/actions/reports_actions";

const AuditTrail = () => {
  const { Title } = Typography;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const { setupForms, reports } = state;

  const [actionType, setActionType] = useState([]);

  const [actionTypeName, setActionTypeName] = useState([]);

  const [searchData, setSearchData] = useState({
    ReferenceNumber: "",
    CustomerName: "",
    // CardNumber: "",
    AccountNumber: "",
    CNICNumber: "",
    ActionBy: "",
    ActionID: 0,
  });

  const [State, setState] = useState({
    DateFrom: "",
    DateTO: "",
  });

  // Selected Dropdown value
  const actionTypeHandler = (e, value) => {
    setActionTypeName(value);
    let actionName = setupForms.ActionData;
    actionName.map((data, index) => {
      if (value === data.actionName) {
        let id = data.pK_AuditTrailActionID;
        setSearchData({
          ...searchData,
          ["ActionID"]: parseInt(id),
        });
      }
    });
  };

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "CustomerName" &&
      name !== "ActionBy" &&
      name !== "CNICNumber" &&
      name !== "AccountNumber"
    ) {
      setSearchData({
        ...searchData,
        [name]: value.trimStart(),
      });
    } else if (name === "CustomerName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CustomerName" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "CNICNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CNICNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "AccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "AccountNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "ActionBy" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "ActionBy" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    }
  };

  const setDate = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        DateFrom: DateSendingFormat(e.endDate),
        DateTO: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        DateFrom: "",
        DateTO: "",
      });
    }
  };

  const resetData = (e) => {
    setSearchData({
      ...searchData,
      ReferenceNumber: "",
      CustomerName: "",
      AccountNumber: "",
      CNICNumber: "",
      // CardNumber: "",
      ActionBy: "",
      ActionID: 0,
    });
    setState({
      ...State,
      DateFrom: "",
      DateTO: "",
    });
    setActionTypeName("");
  };

  const downloadReport = (e) => {
    let data = {
      ReferenceNumber: searchData.ReferenceNumber,
      CustomerName: searchData.CustomerName,
      CNICNumber: searchData.CNICNumber,
      AccountNumber: searchData.AccountNumber,
      ActionBy: searchData.ActionBy,
      ActionID: parseInt(searchData.ActionID),
      DateFrom: State.DateFrom,
      DateTO: State.DateTO,
    };
    dispatch(AuditTrailReportDownload(data));
  };

  useEffect(() => {
    dispatch(GetAllActions());
  }, []);

  // For Action DropDown SetState
  useEffect(() => {
    let actionName = setupForms.ActionData;
    if (
      actionName.length > 0 &&
      actionName !== undefined &&
      actionName !== null
    ) {
      setActionType(
        actionName.map((data, index) => {
          return data.actionName;
        })
      );
    }
  }, [setupForms.ActionData]);

  // For Action Options
  useEffect(() => {}, [actionType]);

  return (
    <>
      <Title level={3}>Audit Trail</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name={"ReferenceNumber"}
            fullWidth
            label="Reference Number"
            value={searchData.ReferenceNumber}
            change={(e) => handleSearch(e)}
            autoComplete="off"
            size="small"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"CustomerName"}
            label="Customer Name"
            value={searchData.CustomerName}
            change={(e) => handleSearch(e)}
            size="small"
            autoComplete="off"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"CNICNumber"}
            label="CNIC Number"
            value={searchData.CNICNumber}
            change={(e) => handleSearch(e)}
            size="small"
            autoComplete="off"
            textLength={13}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"AccountNumber"}
            label="Account Number"
            value={searchData.AccountNumber}
            change={(e) => handleSearch(e)}
            size="small"
            autoComplete="off"
            textLength={14}
          />
        </Col>
        <Col lg={10} md={10} sm={24} xs={24} className="u-margin-top-22px">
          <SelectBox
            label="Select Action"
            name="ActionID"
            option={actionType}
            value={actionTypeName}
            change={actionTypeHandler}
          />
        </Col>
        <Col lg={8} md={8} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name={"ActionBy"}
            label="Action By"
            value={searchData.ActionBy}
            change={(e) => handleSearch(e)}
            size="small"
            autoComplete="off"
          />
        </Col>

        <Col lg={6} md={6} sm={24}>
          <StartToEndDate
            label={"Action On"}
            width="100%!important"
            size="large"
            change={setDate}
            startvalue={
              State.DateFrom !== null && State.DateFrom !== ""
                ? DateDisplayFormat(State.DateFrom)
                : null
            }
            endvalue={
              State.DateTO !== null && State.DateFrom !== ""
                ? DateDisplayFormat(State.DateTO)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
          <Button
            applyClass="btnSecondarySolid2Search"
            size="small"
            text="Download"
            click={downloadReport}
            icon={<DownloadOutlined />}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
      </Row>
      {reports.isLoading ? <Loader /> : null}
    </>
  );
};

export default AuditTrail;
