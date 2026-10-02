import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  TextField,
  Notification,
  StartToEndDate,
  Loader,
  MultipleSelectCheckmarks,
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
import { GetAllStatus } from "../../../../store/actions/setup-forms-actions";

const IOCreditCardDisputes = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { reports, setupForms } = state;

  //DateRange States
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });
  const [search, setSearch] = useState({
    CNIC: "",
    CaseStatus: [],
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
    } else if (name === "AccountNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck != "") {
        setSearch({
          ...search,
          [name]: valueCheck,
        });
      }
    } else if (name === "AccountNumber" && value === "") {
      setSearch({
        ...search,
        [name]: "",
      });
    }
  };

  // reset state manage handler
  const handleReset = () => {
    setSearch({
      CNIC: "",
      CaseStatus: [],
    });
    setState({
      FromDate: "",
      ToDate: "",
    });
  };

  // Download handler
  const downloadExcel = () => {
    let data = {
      DateFrom: State.FromDate,
      DateTO: State.ToDate,
      CNIC: search.CNIC,
      CaseStatus: search.CaseStatus,
    };
    dispatch(CreditCardReportExcel(data));
  };

  //For Transaction Types
  const [selected, setSelected] = React.useState([]);
  const [selectedStatusName, setSelectedStatusName] = useState([]);
  const [status, setStatus] = useState([]);

  // For User Roles DropDown SetState
  useEffect(() => {
    let statusName = setupForms.StatusData;
    setStatus(
      statusName.map((data, index) => {
        return data.statusDescription;
      }),
    );
  }, [setupForms.StatusData]);

  // Selected Dropdown value
  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.StatusData;
    dataUser.map((name, index) => {
      selectedStatusName.map((id, index) => {
        if (name.pK_CSID === id) {
          let csID = name.pK_CSID;
          tem = [...tem, csID];
        }
      });
    });
  }, [selectedStatusName]);

  useEffect(() => {}, [status]);

  useEffect(() => {
    let tem = [];
    let dataUser = setupForms.StatusData;
    dataUser.map((name, index) => {
      selectedStatusName.map((id, index) => {
        if (name.statusDescription === id) {
          let csID = name.pK_CSID;
          tem = [...tem, csID];
        }
      });
    });
    setSearch({
      ...search,
      ["CaseStatus"]: tem,
    });
  }, [selectedStatusName]);

  useEffect(() => {
    let data = {
      IsNegativeDatabase: false,
    };
    dispatch(GetAllStatus(data));
  }, []);

  return (
    <>
      <Title level={3}> Credit Card Disputes</Title>
      <Row gutter={8}>
        <Col
          lg={8}
          md={8}
          sm={24}
          className="MultipleSelectClass u-position-relative"
        >
          <MultipleSelectCheckmarks
            selected={selected}
            setSelected={setSelected}
            selectedUserRoleName={selectedStatusName}
            setSelectedUserRoleName={setSelectedStatusName}
            lable="Dispute Status"
            option={status}
            name="CaseStatus"
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="CNIC"
            autoComplete="off"
            size="small"
            name="CNIC"
            value={search.CNIC}
            textLength={13}
            change={handleSerach}
            required
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <StartToEndDate
            label={"Case Received Date"}
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
        <Col lg={6} md={6} sm={24} className="u-margin-top-10px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={handleReset}
          />
        </Col>

        <Col
          md={24}
          lg={24}
          sm={24}
          className="u-margin-top-5pct u-text-align-center"
        >
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

export default IOCreditCardDisputes;
