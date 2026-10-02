import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Typography, Radio, Row, Col } from "antd";
import moment from "moment";
import {
  Paper,
  InputWithBtn,
  GroupedButtons,
  Modal,
  TextField,
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
import { useSelector, useDispatch } from "react-redux";
import Title from "antd/lib/skeleton/Title";
import CustomerDetailsCreditCardDispute from "./customer-details";
import AddNewCustomerDetails from "./add-new-customer-details";
import {
  GetIRISCustomerByCnicCC,
  GetTransactionDetailsByCnic,
  creditCardDisputeModal,
  HideNotification,
  customerNotFoundModal,
  customerFoundModal,
} from "../../../../store/actions/investigation-officer-actions";
import { useNavigate } from "react-router-dom";

const AddEditCreditCardDispute = () => {
  const { Title } = Typography;
  const [btnStatus, setBtnStatus] = useState(true);
  const [found, setFound] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { investigationOfficer } = state;
  const [actions, setAction] = useState({
    customerFound: false,
    customerNotFound: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Cancel Modal
  const handleCancel = () => {
    dispatch(creditCardDisputeModal(false));
    // setAction({ customerFoundModal: false});
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    setBtnStatus(true);
    setInputData("");
  };

  //Modal Buttons
  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => newDataHAndler(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

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

  //OnClick Search Icon
  const newDataHAndler = (e) => {
    let Data = {
      CNICNumber: inputData,
    };
    dispatch(GetIRISCustomerByCnicCC(Data));
    dispatch(creditCardDisputeModal(false));
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    setAction({ add: false });
    setBtnStatus(true);
    // navigate("/Fraud/CreditCardDispute/AddNewCustomerDetails");
  };

  //   check data input for enable button for search
  const cnicSectionHandler = (e) => {
    const telNo = e.target.value;
    const re = /^[0-9\b]+$/;
    if (telNo === "" || re.test(telNo)) {
      let Data = e.target.value;
      if (Data.length === 13) {
        setBtnStatus(false);
        setInputData(Data);
      } else if (Data.length < 13) {
        setBtnStatus(true);
      }
      setInputData(Data);
    }
  };

  //   check data input for enable button for search
  const cnicSearchHandler = () => {
    dispatch(GetTransactionDetailsByCnic(inputData));
  };

  //Notification
  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.Message,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.ShowNotification]);

  //LOADER
  useEffect(() => {
    if (investigationOfficer.ShowNotification) {
      setOpen({
        flag: true,
        message: investigationOfficer.Message,
      });
      dispatch(HideNotification());
    }
  }, [investigationOfficer.Loading]);

  return (
    <>
      <Title level={4}>Add / Edit Credit Card Disputes</Title>
      <>
        <div className="u-margin-top-100px" />
        <Row gutter={16} justify="center" align="middle">
          <Col lg={8} md={8}>
            <InputWithBtn
              onchange={cnicSectionHandler}
              label="Enter CNIC"
              fullWidth
              autoComplete="off"
              textFieldSize="small"
              applyClass="search-cnic"
              textLength={13}
              minLength={13}
              icon={<i className="icon-search icon-size-one"></i>}
              disable={btnStatus}
              required
              value={inputData}
              name="CnicNumber"
              click={cnicSearchHandler}
            />
          </Col>
        </Row>
      </>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerFoundModal}
        width={650}
      >
        {/* this data will be pass to modal when Add Fraud Type btn will be clicked */}
        {investigationOfficer.CustomerFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for CNIC Number in Fraud DB</p>
                <span>{inputData}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Do you wish to create a new record?
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerNotFoundModal}
        width={650}
      >
        {/* Customer Not Found Modal */}
        {/* this data will be pass to modal when Account Number is searched */}
        {investigationOfficer.CustomerNotFoundModal && (
          <>
            <div>
              <div className="NoRecordFound">
                <p>No records available for CNIC Number in IRIS.</p>
                <span>{inputData}</span>
              </div>
            </div>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                System will not create new record.
              </Title>
            </div>
            <div className="u-margin-left-70px">
              <GroupedButtons data={okayButtonProp} />
            </div>
          </>
        )}
      </Modal>

      {/* Notification and Loader */}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditCreditCardDispute;
