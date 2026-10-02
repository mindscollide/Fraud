import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Row, Col } from "antd";
import {
  GetDisputesByCnicNDB,
  HideNotification,
  negativeDatabaseModal,
  customerFoundModal,
  customerNotFoundModal,
  setDisputemodal,
  GetNegativeDBViewByCnic,
} from "../../../../store/actions/investigation-officer-actions";
import { useNavigate } from "react-router-dom";
import {
  InputWithBtn,
  Modal,
  GroupedButtons,
  Notification,
  Loader,
} from "../../../../Components/Elements";

import {
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
} from "../../../../store/actions/setup-forms-actions";
import {
  enableGoBack,
  disableGoBack,
} from "../../../../store/actions/ui-actions";
const AddEditNegativeDatabase = () => {
  const { Title } = Typography;
  const [btnStatus, setBtnStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { investigationOfficer } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [inputData, setInputData] = useState("");

  //Modal cancellation
  //Cancel Modal
  const handleCancel = () => {
    dispatch(negativeDatabaseModal(false));
    dispatch(customerFoundModal(false));
    dispatch(customerFoundModal(false));
    dispatch(customerNotFoundModal(false));
    dispatch(setDisputemodal(false));
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
  const addButtonProps2 = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel(),
    },
    secondaryButton: {
      text: "",
    },
  };
  const addButtonProps3 = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => EditHandler(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  //onclick search icon to proceed to new record

  const newDataHAndler = (e) => {
    dispatch(setDisputemodal(false));
    setBtnStatus(true);
    navigate("/Fraud/NegativeDatabase/AddNewCustomerDetailsND");
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
  const EditHandler = async (e) => {
    dispatch(customerFoundModal(false));
    setBtnStatus(true);
    await dispatch(GetAllChannel());
    await dispatch(GetAllIndividualInvolved());
    await dispatch(GetAllForgedDocuments());
    await dispatch(GetAllFraudNotAFraud());
    await dispatch(GetAllCompanySegment());
    localStorage.setItem("cnic", inputData);
    let Data = {
      CNICNumber: inputData,
    };
    await dispatch(enableGoBack());
    await dispatch(GetNegativeDBViewByCnic(Data));
    navigate("/Fraud/NegativeDatabase/EditNegativeDatabase");
  };
  // check data input for enable button for search
  const cnicSearchHandler = () => {
    dispatch(GetDisputesByCnicNDB(inputData));
  };

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
  useEffect(() => {
    dispatch(disableGoBack());
  }, []);

  return (
    <>
      <Title level={4}>Add / Edit Negative Database</Title>
      <>
        <div className="u-margin-top-100px" />
        <Row gutter={16} justify="center" align="middle">
          <Col lg={8} md={8} sm={24} xs={24}>
            <InputWithBtn
              isUpperCase={true}
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
        <>
          <div>
            <div className="NoRecordFound">
              <p>Already record exists for :</p>
              <span>{inputData}</span>
            </div>
          </div>
          <div className="u-padding-40px u-display-flex u-justify-content-center">
            <Title level={3} align="center">
              Do you want to edit record ?
            </Title>
          </div>
          <GroupedButtons data={addButtonProps3} />
        </>
      </Modal>
      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.dispuetModal}
        width={650}
      >
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
      </Modal>
      <Modal
        closeModal={handleCancel}
        modalState={investigationOfficer.CustomerNotFoundModal}
        width={650}
      >
        <>
          <div>
            <div className="NoRecordFound">
              <p>{investigationOfficer.ResponseMessage}</p>
              <span>{inputData}</span>
            </div>
          </div>
          <div className="u-padding-40px u-display-flex u-justify-content-center">
            <Title level={3} align="center">
              System will not create new record.
            </Title>
          </div>
          <GroupedButtons data={addButtonProps2} />
        </>
      </Modal>

      {/* Notification and Loader */}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {investigationOfficer.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditNegativeDatabase;
