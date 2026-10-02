import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

const SystemAdminAuditTrail = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [State, setState] = useState({
    Id: "",
    ApprovalFlowName: "",
    ApprovalFlowDescription: "",
  });
  //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalTableData, setModalTableData] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: "Action By",
      dataIndex: "ActionBy",
      key: "ActionBy",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      width: "20%",
    },
    {
      title: "Action On",
      dataIndex: "ActionOn",
      key: "ActionOn",
      align: "center",
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      align: "center",
      width: "30%",
    },
    {
      title: "View Details",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return (
          <div
            onClick={() => showModal()}
            className="icon-edit-list icon-size-one beachGreen u-cursor-pointer"
          ></div>
        );
      },
    },
  ];
  //   rows and column for modal starts
  const columnsForModal = [
    {
      title: "Account Number",
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    {
      title: "Field Name",
      dataIndex: "approvalFlowPriority",
      key: "approvalFlowPriority",
      align: "center",
    },
    {
      title: "Previous Value",
      dataIndex: "delete",
      key: "delete",
      align: "center",
    },
    {
      title: "Updated Value",
      dataIndex: "delete",
      key: "delete",
      align: "center",
    },
  ];
  return (
    <>
      <Title level={3}>Audit Trial</Title>
      <Row gutter={8}>
        <Col lg={4} md={4} sm={24}>
          <TextField
            name={"WofCode"}
            fullWidth
            label="Wof Code"
            autoComplete="off"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowName}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name={"MysisCustomerCode"}
            label="Mysis Customer Code"
            size="small"
            autoComplete="off"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name={"BorrowerNPLCode"}
            label="Borrower NPL Code"
            size="small"
            autoComplete="off"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            name={"ActionBy"}
            label="Action By"
            size="small"
            autoComplete="off"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <SelectBox
            label="Select Action"
            // change={handleUser}
            // option={remainingUserList}
            // value={updateApprovalFlowForEdit.UserID}
            name="RemainingUser"
            propertyName={"Fullname"}
          />
        </Col>

        <Col lg={10} md={10} sm={24} className="u-margin-top-22px">
          <StartToEndDate
            label={"Case Received Date"}
            // change={datehandler}
            width="100%!important"
            size="large"
            // startvalue={form.DateFrom!=null && form.DateFrom!==""? DateDisplayFormat(form.DateFrom):''}
            // endvalue={form.DateTO!=null && form.DateFrom!=="" ?DateDisplayFormat(form.DateTO):''}
            DateRange={true}
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnSecondarySolid2Search"
            size="small"
          />
        </Col>
        <Col lg={4} md={4} sm={24} className="u-margin-top-22px">
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
          />
        </Col>
        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={tableData}
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
        modalTitle={<b>Audit Detail</b>}
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={800}
        padding="5"
      >
        {/* this data will be pass to modal when Add Approval btn will be clicked */}

        {isModalVisible && (
          <>
            <div className="u-padding-10px u-display-flex u-justify-content-center">
              <Row gutter={16}>
                <Col lg={12} md={12} sm={24} className="u-margin-top-1pct">
                  <Text className="u-width-25pct u-color-025f5c">
                    Action By
                  </Text>
                </Col>
                <Col lg={12} md={12} sm={24} className="u-margin-top-1pct">
                  <Text className="u-width-25pct u-color-025f5c">
                    Action On
                  </Text>
                </Col>
                <Col lg={12} md={12} sm={24} className="u-margin-top-1pct">
                  <Text className="u-width-25pct u-color-025f5c">
                    Description
                  </Text>
                </Col>

                <Col lg={24} md={24} sm={24} className="u-margin-top-1pct">
                  <Table
                    rows={modalTableData}
                    columns={columnsForModal}
                    scroll={{ x: "max-content" }}
                  />
                </Col>
              </Row>
            </div>
            <div className="u-margin-top-25px" />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default SystemAdminAuditTrail;
