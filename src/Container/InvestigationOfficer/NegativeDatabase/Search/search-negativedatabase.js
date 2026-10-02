import React, { useState, useEffect } from "react";
import { Tooltip, Typography, Row, Col } from "antd";
import { SearchOutlined as Search } from "@ant-design/icons";
import {
  SearchNDBDisputes,
  HideNotification,
  GetNegativeDBViewByCnic,
  GetDisputeStatusND,
  resetNegativeDatabase,
} from "../../../../store/actions/investigation-officer-actions";
import {
  DateDisplayFormat,
  TimeAndDisplayFormat,
} from "../../../../Common/Functions/date-formatter";
import {
  Button,
  Table,
  TextField,
  Notification,
  Loader,
  Modal,
  SelectBox,
  GroupedButtons,
} from "../../../../Components/Elements";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../store/actions/ui-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
  GetAllStatus,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";

const SearchNegativeDatabase = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { investigationOfficer, setupForms } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [row, setRow] = useState([]);
  // Case Status Functionality
  const [caseStatus, setCaseStatus] = useState("");
  const [caseStatusOptions, setCaseStatusOptions] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [city, setCity] = useState("");
  var caseStatusItem = parseInt(localStorage.getItem("CaseStatus"));

  const [searchData, setSearchData] = useState({
    MobileNo: "",
    CustomerName: "",
    CNIC: "",
    CompanyName: "",
    ReferenceNumber: "",
    City: "",
    fk_csid: -1,
    FK_CTID: 0,
  });
  const [actions, setAction] = useState({
    viewApprovalHistory: false,
  });
  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "MobileNo" && value !== "") {
      let mbno = value.replace(/[^\d.-]/g, "");
      setSearchData({
        ...searchData,
        [name]: mbno.trimStart(),
      });
    } else if (name === "CNIC" && value !== "") {
      let cnc = value.replace(/[^\d.-]/g, "");
      setSearchData({
        ...searchData,
        [name]: cnc.trimStart(),
      });
    } else if (name === "CompanyName" && value !== "") {
      let compname = value.replace();
      setSearchData({
        ...searchData,
        [name]: compname.trimStart(),
      });
    } else if (name === "CustomerName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");

      if (valueCheck != "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "ReferenceNumber" && value !== "") {
      let custname = value.replace();
      setSearchData({
        ...searchData,
        [name]: custname.trimStart(),
      });
    } else {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    }
  };

  // // City handler
  const CityNameHandler = (e, value) => {
    setCityValue(value);
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CTID;
        setSearchData({
          ...searchData,
          ["FK_CTID"]: parseInt(id),
          // ["CMCity"]: data.name,
        });
      }
    });
  };

  const resetData = () => {
    setSearchData({
      ...searchData,
      MobileNo: "",
      CustomerName: "",
      CNIC: "",
      CompanyName: "",
      ReferenceNumber: "",
      City: "",
      fk_csid: -1,
      FK_CTID: 0,
    });
    setCityValue("");
    setCaseStatus("");
    dispatch(resetNegativeDatabase());
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = () => {
    dispatch(SearchNDBDisputes(searchData));
  };

  useEffect(() => {
    if (
      caseStatusItem !== undefined &&
      caseStatusItem !== -1 &&
      caseStatusItem !== null
    ) {
      let caseStatusData = setupForms.StatusData;
      caseStatusData.map((data, index) => {
        if (caseStatusItem === data.pK_CSID) {
          setCaseStatus(data.statusDescription);
          setSearchData({
            ...searchData,
            ["fk_csid"]: parseInt(caseStatusItem),
          });
        }
        localStorage.removeItem("CaseStatus");
      });
    } else {
      setCaseStatus("");
      localStorage.removeItem("CaseStatus");
    }
    dispatch(disableGoBack());
  }, []);

  // For Loader
  useEffect(() => {
    if (investigationOfficer.ShowNotifiation === true) {
      setOpen({
        flag: true,
        message: investigationOfficer.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ShowNotifiation]);

  useEffect(() => {
    if (investigationOfficer.SearchNDDisputeData.length > 0) {
      setRow(investigationOfficer.SearchNDDisputeData);
    } else {
      setRow([]);
    }
  }, [investigationOfficer.SearchNDDisputeData]);

  useEffect(() => {
    let ForCheck = investigationOfficer.GetApprovalStatusNDData;
    if (
      ForCheck !== undefined &&
      ForCheck !== null &&
      Object.keys(ForCheck).length > 0
    ) {
      const data =
        ForCheck &&
        ForCheck.map((item) => {
          return item;
        });
      setRow(data);
    }
  }, [investigationOfficer.GetApprovalStatusNDData]);

  // For view modal
  const View = async (e, value) => {
    localStorage.setItem("cnic", value.cnicNumber);
    let Data = {
      CNICNumber: value.cnicNumber,
    };
    setCaseStatus("");
    localStorage.removeItem("CaseStatus");
    await dispatch(enableGoBack());
    await dispatch(GetNegativeDBViewByCnic(Data));
    await dispatch(GetAllChannel());
    await dispatch(GetAllIndividualInvolved());
    await dispatch(GetAllForgedDocuments());
    await dispatch(GetAllFraudNotAFraud());
    await dispatch(GetAllCompanySegment());
    await dispatch(GetAllCity());
    navigate("/Fraud/NegativeDatabase/ViewNegativeDataBase");
  };

  //For Edit Modal
  const update = async (e, value) => {
    localStorage.setItem("cnic", value.cnicNumber);
    let Data = {
      CNICNumber: value.cnicNumber,
    };
    setCaseStatus("");
    localStorage.removeItem("CaseStatus");
    await dispatch(enableGoBack());
    let flagForGlobalDispute = false;
    await localStorage.setItem("FlagForGlobalDispute", flagForGlobalDispute);
    await dispatch(GetNegativeDBViewByCnic(Data));
    await dispatch(GetAllChannel());
    await dispatch(GetAllIndividualInvolved());
    await dispatch(GetAllForgedDocuments());
    await dispatch(GetAllFraudNotAFraud());
    await dispatch(GetAllCompanySegment());
    await dispatch(GetAllCity());
    navigate("/Fraud/NegativeDatabase/EditNegativeDatabase");
  };

  const viewApprovalColumn = [
    {
      title: "Date",
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Time",
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      render: (text) => TimeAndDisplayFormat(text),
    },
    {
      title: "Status",
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "comments",
      key: "comments",
      align: "center",
    },
    {
      title: "Action By",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
  ];

  const okayButtonProp = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel(),
    },
    secondaryButton: {
      text: "",
    },
  };

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
      width: "220px",
    },
    {
      title: "CNIC",
      dataIndex: "cnicNumber",
      key: "cnicNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      align: "center",
      width: "220px",
    },

    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      width: "220px",
    },
    {
      title: "View Status History",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "220px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let disputeID = record.pK_NDDID;
              dispatch(
                GetDisputeStatusND(disputeID, showModal, setAction, actions),
              );
            }}
            className="icon-edit-list icon-size-one beachGreen u-cursor-pointer"
          ></div>
        );
      },
    },
    {
      title: "City",
      dataIndex: "fK_CTID",
      key: "fK_CTID",
      align: "center",
      width: "220px",
      render: (text) => {
        return setupForms.CityData.map((data, index) => {
          if (text === data.pK_CTID) {
            return data.name;
          }
        });
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
      dataIndex: "statusDescription",
      key: "statusDescription",
      align: "center",
      width: "100px",
      render: (text, record) => {
        return record.statusDescription === "Created" ? (
          <div
            onClick={(e) => update(e, record)}
            className="icon-edit icon-size-one beachGreen u-cursor-pointer"
          />
        ) : null;
      },
    },
  ];

  // Selected Dropdown value
  const caseStatusHandler = (e, value) => {
    setCaseStatus(value);
    let caseStatus = setupForms.StatusData;
    caseStatus.map((data, index) => {
      if (value === data.statusDescription) {
        let id = data.pK_CSID;
        setSearchData({
          ...searchData,
          ["fk_csid"]: parseInt(id),
        });
      }
    });
  };

  // Case Status type names selection for drop down
  useEffect(() => {
    let caseStatus = setupForms.StatusData;
    setCaseStatusOptions(
      caseStatus.map((data, index) => {
        return data.statusDescription;
      }),
    );
  }, [setupForms.StatusData]);

  useEffect(() => {
    let data = {
      IsNegativeDatabase: true,
    };
    dispatch(GetAllStatus(data));
    dispatch(GetAllCity());
  }, []);

  // // sourceofib type names selection for drop down
  useEffect(() => {
    let valueCity = setupForms.CityData;
    setCity(
      valueCity.map((data, index) => {
        return data.name;
      }),
    );
  }, [setupForms.CityData]);

  return (
    <>
      <Title level={3}>Search Negative Database Cases</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name={"ReferenceNumber"}
            value={searchData.ReferenceNumber}
            autoComplete="off"
            fullWidth
            label="Reference Number"
            size="small"
            change={handleData}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name={"MobileNo"}
            value={searchData.MobileNo}
            textLength={11}
            minLength={11}
            autoComplete="off"
            fullWidth
            label="Mobile No"
            size="small"
            change={handleData}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name="CustomerName"
            autoComplete="off"
            value={searchData.CustomerName}
            change={handleData}
            label="Customer Name"
            size="small"
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label="Select City"
            option={city}
            value={cityValue}
            change={CityNameHandler}
            name="FK_CTID"
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <SelectBox
            label="Select Case Status"
            option={caseStatusOptions}
            name="fk_csid"
            value={caseStatus}
            change={caseStatusHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24} xs={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name="CNIC"
            value={searchData.CNIC}
            textLength={13}
            minlenghth={13}
            label="CNIC"
            autoComplete="off"
            size="small"
            change={handleData}
          />
        </Col>
        <Col lg={6} md={6} sm={24} className="u-margin-top-22px">
          <TextField
            fullWidth
            name="CompanyName"
            autoComplete="off"
            value={searchData.CompanyName}
            label="Company Name"
            change={handleData}
            size="small"
          />
        </Col>
        <Col lg={6} md={6} sm={24}></Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col
          lg={4}
          md={4}
          sm={24}
          className="u-margin-top-10px u-text-align-right"
        >
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={(e) => handleSearch()}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-10px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={() => resetData()}
          />
        </Col>
        <Col lg={8} md={8} sm={24}></Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={investigationOfficer.SearchNDDisputeData}
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
      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
        modalTitle={<Title level={3}>View Status History</Title>}
      >
        {/* this data will be pass to modal when View Approval Icon will be clicked */}
        {actions.viewApprovalHistory && (
          <>
            <Table rows={row} columns={viewApprovalColumn} />
            <GroupedButtons data={okayButtonProp} />
          </>
        )}
      </Modal>
      {investigationOfficer.Loading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default SearchNegativeDatabase;
