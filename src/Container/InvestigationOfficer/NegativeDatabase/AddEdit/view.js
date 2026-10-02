import React, { useEffect, useState } from "react";
import { Typography, Row, Col } from "antd";
import moment from "moment";
import {
  SaveDisputeNegativeDB,
  RESETALLSTATE,
  GetNegativeDBViewByCnic,
} from "../../../../store/actions/investigation-officer-actions";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  GroupedButtons,
  Modal,
  Button,
  Notification,
  Loader,
} from "../../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllChannel,
  GetAllIndividualInvolved,
  GetAllForgedDocuments,
  GetAllFraudNotAFraud,
  GetAllCompanySegment,
  GetAllCity,
} from "../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  TimeDisplayFormat,
  TimeAndDisplayFormat,
  removeDashesFromDate,
} from "../../../../Common/Functions/date-formatter";

const ViewNDB = () => {
  var cnic = localStorage.getItem("cnic");
  const state = useSelector((state) => state);
  const Details = JSON.parse(localStorage.getItem("UserDetails"));

  const { setupForms, investigationOfficer } = state;

  const { Title } = Typography;
  const dispatch = useDispatch();
  const [channelType, setChannelType] = useState([]);
  const [channelTypeName, setChannelTypeName] = useState([]);
  const [individualInvolvedType, setIndividualInvolvedType] = useState([]);
  const [individualInvolvedTypeName, setIndividualInvolvedTypeName] = useState(
    []
  );
  const [forgedDocumentsType, setForgedDocumentsType] = useState([]);
  const [forgedDocumentsTypeName, setForgedDocumentsTypeName] = useState([]);
  const [fraudNotAFraudType, setFraudNotAFraudType] = useState([]);
  const [fraudNotAFraudTypeName, setFraudNotAFraudTypeName] = useState([]);
  const [companySegmentType, setCompanySegmentType] = useState([]);
  const [companySegmentTypeName, setCompanySegmentTypeName] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [date, setDate] = useState(
    moment(new Date()).format("DD-MM-YYYY, HH:mm:ss")
  );
  const [time, setTime] = useState(moment(new Date()).format("HH:mm:ss"));
  const [recordIndex, setRecordIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [btnRole, setBtnRole] = useState(false);

  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [saveValue, setsaveValue] = useState([]);
  const [btnStatus, setBtnStatus] = useState(true);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const [FDCustomer, setFDCustomer] = useState({
    CNICNumber: cnic,
    CustomerName: "",
    // CMCity: "",
    fK_CTID: 0,
  });

  const [neg, setNeg] = useState({
    FK_IIID: 0,
    FK_CID: 0,
    FK_FDID: 0,
    FK_FNFID: 0,
    FK_CSGID: 0,
    OldNIC: "",
    CompanyName: "",
    CompanyAddress: "",
    OfficePhone: "",
    ResidenceAddress: "",
    HBLReferenceNumber: "",
    ResidencePhone: "",
    MobileNumber: "",
    CityCode: "",
    ReferenceNumber: "",
  });
  //   const date = moment().format("YYYY-MM-DD");
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  const [ListOfComments, setListOfComments] = useState([]);
  const [comments, setComments] = useState([
    {
      Comment: "",
      CreationDateTime: "",
      ModifiedDateTime: "",
      CreatedByUserID: null,
    },
  ]);
  const [actions, setAction] = useState({
    add: false,
    modal: false,
    refresh: false,
  });

  //   commentshandler
  const commentshandler = (e) => {
    let value = e.target.value;
    setComments({
      ...comments,
      ["Comment"]: value,
    });
  };
  //   add new comments
  const addFields = async () => {
    let flag = true;
    if (comments.Comment.length > 0) {
      if (ListOfComments.length > 0) {
        ListOfComments.map((cmntData, index) => {
          if (cmntData.Comment === comments.Comment) {
            flag = false;
          }
        });
        if (flag) {
          let tem = ListOfComments;
          await tem.push({
            Comment: comments.Comment,
            CreationDateTime: removeDashesFromDate(date),
            ModifiedDateTime: "",
            CreatedByUserID: userid,
          });
          setListOfComments(tem);
          setComments({
            Comment: "",
            CreationDateTime: "",
            ModifiedDateTime: "",
            CreatedByUserID: null,
          });
        } else {
          setOpen({
            open: true,
            message: "Comment Already Exsist",
          });
        }
      } else {
        let tem = ListOfComments;
        await tem.push({
          Comment: comments.Comment,
          CreationDateTime: removeDashesFromDate(date),
          ModifiedDateTime: "",
          CreatedByUserID: userid,
        });
        setListOfComments(tem);
        setComments({
          Comment: "",
          CreationDateTime: "",
          ModifiedDateTime: "",
          CreatedByUserID: null,
        });
      }
    } else {
      setOpen({
        open: true,
        message: "Please Enter Comment",
      });
    }
  };

  //   update previous comments
  const updateFields = async () => {
    if (comments.Comment.length > 0) {
      let flag = true;
      ListOfComments.map((cmntData, index) => {
        if (cmntData.Comment === comments.Comment && recordIndex !== index) {
          flag = false;
        }
      });
      if (flag) {
        let tem = {
          Comment: comments.Comment,
          CreationDateTime: removeDashesFromDate(date),
          ModifiedDateTime: "",
          CreatedByUserID: userid,
        };
        if (recordIndex !== -1) {
          ListOfComments[recordIndex] = tem;
        }
        setRecordIndex();
        setBtnRole(false);
        setComments({
          Comment: "",
          CreationDateTime: "",
          ModifiedDateTime: "",
          CreatedByUserID: null,
        });
      } else {
        setOpen({
          open: true,
          message: "Comment Already Exsist",
        });
      }
    } else {
      setOpen({
        open: true,
        message: "Please Enter Comment",
      });
    }
  };
  //   update new comments
  const update = async (e, record) => {
    var objIndex = ListOfComments.findIndex(
      (obj) => obj.Comment === record.Comment
    );
    setComments({
      ...comments,
      ["Comment"]: record.Comment,
    });
    setRecordIndex(objIndex);
    setBtnRole(true);
  };

  //Cancel Modal for discard the procedure
  const handleCancel = () => {
    // dispatch(negativeDatabaseModal(false));
    setAction({
      add: false,
      modal: false,
      refresh: false,
    });
    setIsModalVisible(false);
    setBtnStatus(true);
    setInputData("");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  //Modal Buttons
  const addButtonProps = {
    primaryButton: {
      text: "Yes",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => newDataHAndler(),
    },
    secondaryButton: {
      text: "No",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const newDataHAndler = (e) => {
    setAction({
      add: false,
      refresh: false,
    });
    setBtnStatus(true);
    navigate("/Fraud/NegativeDatabase/AddNewCustomerDetailsND");
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  //Refresh All states
  const refresh = () => {
    showModal();
    setAction({
      ...actions,
      refresh: true,
      add: false,
    });
  };

  //Modal Yes for Refresh

  const proceedRefresh = (e, record) => {
    setNeg({
      ...neg,
      CustomerName: "",
      IndividualInvolved: "",
      forgedDocumentsType: "",
      FraudNotAFraudType: "",
      OldNIC: "",
      CompanyName: "",
      CompanySegment: "",
      CompanyAddress: "",
      OfficePhone: "",
      ResidenceAddress: "",
      HBLReferenceNumber: "",
      ResidencePhone: "",
      CityCode: "",
      ReferenceNumber: "",
      comments: "",
    });

    setFDCustomer({
      CNICNumber: "",
      CustomerName: "",
      City: "",
    });

    setAction({
      ...actions,
      refresh: false,
      update: false,
      add: false,
    });
    setIsModalVisible(false);
  };

  ////Props for Refresh Button Modal
  const refreshButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => proceedRefresh(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  // Selected channel Dropdown value
  const channelNameHandler = (e, value) => {
    setChannelTypeName(value);
    let nameChannel = setupForms.ChannelData;
    nameChannel.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CID;
        setNeg({
          ...neg,
          ["FK_CID"]: parseInt(id),
        });
      }
    });
  };

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let Data = {
        CNICNumber: cnic,
      };
      dispatch(GetNegativeDBViewByCnic(Data));
      dispatch(GetAllChannel());
      dispatch(GetAllIndividualInvolved());
      dispatch(GetAllForgedDocuments());
      dispatch(GetAllFraudNotAFraud());
      dispatch(GetAllCompanySegment());
      dispatch(GetAllCity());
    }
  }, []);
  useEffect(() => {
    setOpen({
      open: true,
      message: investigationOfficer.ResponseMessage,
    });
  }, [investigationOfficer.ResponseMessage]);

  // For channel DropDown SetState
  //exceptional handling
  useEffect(() => {
    let nameChannel = setupForms.ChannelData;
    if (
      nameChannel !== undefined &&
      nameChannel !== null &&
      Object.keys(nameChannel).length > 0
    ) {
      setChannelType(
        nameChannel.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.ChannelData]);

  useEffect(() => {}, [channelType]);

  //selected Dropdown value for individualinvolveddata

  const individualNameHandler = (e, value) => {
    setIndividualInvolvedTypeName(value);
    let nameIndividual = setupForms.IndividualInvolvedData;
    nameIndividual.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_IIID;
        setNeg({
          ...neg,
          ["FK_IIID"]: parseInt(id),
        });
      }
    });
  };

  //end of drop down

  // for individual dropdown setstate

  useEffect(() => {
    let nameIndividual = setupForms.IndividualInvolvedData;
    if (
      nameIndividual !== undefined &&
      nameIndividual !== null &&
      Object.keys(nameIndividual).length > 0
    ) {
      setIndividualInvolvedType(
        nameIndividual.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.IndividualInvolvedData]);

  useEffect(() => {}, [individualInvolvedType]);

  //end of dropdown

  //selected Dropdown value for documentsdata

  const documentsNameHandler = (e, value) => {
    setForgedDocumentsTypeName(value);
    let nameDocuments = setupForms.ForgedDocumentsData;
    nameDocuments.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FDID;
        setNeg({
          ...neg,
          ["FK_FDID"]: parseInt(id),
        });
      }
    });
  };

  //end of drop down

  // for forged documents dropdown setstate

  useEffect(() => {
    let nameDocuments = setupForms.ForgedDocumentsData;
    if (
      nameDocuments !== undefined &&
      nameDocuments !== null &&
      Object.keys(nameDocuments).length > 0
    ) {
      setForgedDocumentsType(
        nameDocuments.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.ForgedDocumentsData]);

  useEffect(() => {}, [forgedDocumentsType]);

  //end of dropdown

  //selected Dropdown value for fraudnotafrauddata

  const fraudNotAFraudNameHandler = (e, value) => {
    setFraudNotAFraudTypeName(value);
    let nameFraudNotAFraud = setupForms.FraudNotAFraudData;
    nameFraudNotAFraud.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_FNFID;
        setNeg({
          ...neg,
          ["FK_FNFID"]: parseInt(id),
        });
      }
    });
  };

  //end of drop down

  // for fraudnotafraud dropdown setstate

  useEffect(() => {
    let nameFraudNotAFraud = setupForms.FraudNotAFraudData;
    if (
      nameFraudNotAFraud !== undefined &&
      nameFraudNotAFraud !== null &&
      Object.keys(nameFraudNotAFraud).length > 0
    ) {
      setFraudNotAFraudType(
        nameFraudNotAFraud.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.FraudNotAFraudData]);

  useEffect(() => {}, [fraudNotAFraudType]);

  //selected Dropdown value for companysegment

  const companySegmentHandler = (e, value) => {
    setCompanySegmentTypeName(value);
    let nameCompanySegment = setupForms.CompanySegmentData;
    nameCompanySegment.map((data, index) => {
      if (value === data.name) {
        let id = data.pK_CSGID;
        setNeg({
          ...neg,
          ["FK_CSGID"]: parseInt(id),
        });
      }
    });
  };

  //end of drop down

  // for dropdown setstate

  useEffect(() => {
    let nameCompanySegment = setupForms.CompanySegmentData;
    if (
      nameCompanySegment !== undefined &&
      nameCompanySegment !== null &&
      Object.keys(nameCompanySegment).length > 0
    ) {
      setCompanySegmentType(
        nameCompanySegment.map((data, index) => {
          return data.name;
        })
      );
    }
  }, [setupForms.CompanySegmentData]);

  useEffect(() => {}, [companySegmentType]);

  useEffect(() => {
    let newlist = investigationOfficer.GetCreditCardDisputesData.listOfComments;
    if (newlist !== undefined && newlist !== null) {
      setListOfComments(newlist);
    }
    let newNeg = investigationOfficer.GetCreditCardDisputesData.neg;
    if (newNeg !== undefined && newNeg !== null) {
      setNeg({
        ...neg,
        FK_IIID: newNeg.fK_IIID,
        FK_CID: newNeg.fK_CID,
        FK_FDID: newNeg.fK_FDID,
        FK_FNFID: newNeg.fK_FNFID,
        FK_CSGID: newNeg.fK_CSGID,
        OldNIC: newNeg.oldNIC,
        CompanyName: newNeg.companyName,
        CompanyAddress: newNeg.companyAddress,
        OfficePhone: newNeg.officePhone,
        ResidenceAddress: newNeg.residenceAddress,
        HBLReferenceNumber: newNeg.hblReferenceNumber,
        ResidencePhone: newNeg.residencePhone,
        MobileNumber: newNeg.mobileNumber,
        CityCode: newNeg.cityCode,
        ReferenceNumber: newNeg.referenceNumber,
      });

      let nameFraudNotAFraud = setupForms.FraudNotAFraudData;
      nameFraudNotAFraud.map((data, index) => {
        if (newNeg.fK_FNFID === data.pK_FNFID) {
          let value = data.name;

          setFraudNotAFraudTypeName(value);
        }
      });
      let nameIndividual = setupForms.IndividualInvolvedData;
      nameIndividual.map((data, index) => {
        if (newNeg.fK_IIID === data.pK_IIID) {
          let value = data.name;
          setIndividualInvolvedTypeName(value);
        }
      });

      let nameChannel = setupForms.ChannelData;
      nameChannel.map((data, index) => {
        if (newNeg.fK_CID === data.pK_CID) {
          let value = data.name;
          setChannelTypeName(value);
        }
      });

      let nameDocuments = setupForms.ForgedDocumentsData;
      nameDocuments.map((data, index) => {
        if (newNeg.fK_FDID === data.pK_FDID) {
          let value = data.name;
          setForgedDocumentsTypeName(value);
        }
      });
      let nameCompanySegment = setupForms.CompanySegmentData;
      nameCompanySegment.map((data, index) => {
        if (newNeg.fK_CSGID === data.pK_CSGID) {
          let value = data.name;
          setCompanySegmentTypeName(value);
        }
      });
    }

    let newFDCustomer =
      investigationOfficer.GetCreditCardDisputesData.fdCustomer;
    if (newFDCustomer !== undefined && newFDCustomer !== null) {
      setFDCustomer({
        ...FDCustomer,
        CNICNumber: newFDCustomer.cnicNumber,
        CustomerName: newFDCustomer.customerName,
        fK_CTID: newFDCustomer.fK_CID,
      });
      let cityValue = setupForms.CityData;
      cityValue.map((data, index) => {
        if (newFDCustomer.fK_CTID === data.pK_CTID) {
          setCityValue(data.name);
        }
      });
    }
  }, [investigationOfficer.GetCreditCardDisputesData]);

  //FD Handler

  const FDCustomerHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (
      name !== "CustomerName" &&
      name !== "CMCity" &&
      (value !== "" || value === false)
    ) {
      setFDCustomer({
        ...FDCustomer,
        [name]: value,
      });
    } else {
      setFDCustomer({
        ...FDCustomer,
        [name]: "",
      });
    }
    if (name === "CustomerName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");

      if (valueCheck != "") {
        setFDCustomer({
          ...FDCustomer,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CustomerName" && value === "") {
      setFDCustomer({
        ...FDCustomer,
        [name]: "",
      });
    }

    if (name === "CMCity" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck != "") {
        setFDCustomer({
          ...FDCustomer,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CMCity" && value === "") {
      setFDCustomer({
        ...FDCustomer,
        [name]: "",
      });
    }
  };

  //neg Handler
  const negHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (
      name !== "CustomerName" &&
      name !== "OldNIC" &&
      name !== "CompanyName" &&
      name !== "OfficePhone" &&
      name !== "ResidencePhone" &&
      name !== "MobileNumber" &&
      name !== "CityCode" &&
      (value !== "" || value === false)
    ) {
      setNeg({
        ...neg,
        [name]: value,
      });
    } else if (name === "OldNIC" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setNeg({
          ...neg,
          [name]: valueCheck,
        });
      }
    } else if (name === "OldNIC" && value === "") {
      setNeg({
        ...neg,
        [name]: "",
      });
    } else if (name === "OfficePhone" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setNeg({
          ...neg,
          [name]: valueCheck,
        });
      }
    } else if (name === "OfficePhone" && value === "") {
      setNeg({
        ...neg,
        [name]: "",
      });
    } else if (name === "ResidencePhone" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setNeg({
          ...neg,
          [name]: valueCheck,
        });
      }
    } else if (name === "ResidencePhone" && value === "") {
      setNeg({
        ...neg,
        [name]: "",
      });
    } else if (name === "MobileNumber" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setNeg({
          ...neg,
          [name]: valueCheck,
        });
      }
    } else if (name === "MobileNumber" && value === "") {
      setNeg({
        ...neg,
        [name]: "",
      });
    } else if (name === "CityCode" && value !== "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (valueCheck != "") {
        setNeg({
          ...neg,
          [name]: valueCheck,
        });
      }
    } else if (name === "CityCode" && value === "") {
      setNeg({
        ...neg,
        [name]: "",
      });
    }
    if (name === "CustomerName" || name === "CompanyName") {
      let spREmove = value.replace(/[^a-zA-Z ]/g, "");
      if (spREmove !== "") {
        setNeg({
          ...neg,
          [name]: spREmove.trimStart(),
        });
      } else {
        setNeg({
          ...neg,
          [name]: "",
        });
      }
    }
  };

  const goToSaveHandler = async (e) => {
    await dispatch(RESETALLSTATE());
    e.preventDefault();
    if (saveValue === 1) {
      let data = {
        neg,
        FDCustomer,
        ListOfComments,
      };
      let searchData = {
        MobileNo: "",
        CustomerName: "",
        CNIC: "",
        CompanyName: "",
        ReferenceNumber: "",
        City: "",
      };
      dispatch(SaveDisputeNegativeDB(data, searchData));
    }
  };

  useEffect(() => {
    let valueCity = setupForms.CityData;
    valueCity.map((data, index) => {
      if (FDCustomer.fK_CTID === data.pK_CTID) {
        setCityValue(data.name);
      }
    });
  }, [setupForms.CityData]);

  useEffect(() => {}, [cityValue]);

  return (
    <>
      {investigationOfficer.Loading ? <Loader /> : null}
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Paper padding="1">
          <Row gutter={16}>
            <Col lg={18} md={18} sm={18} xs={24}>
              <h1
                className="u-font-size-18px u-margin-top-15px u-margin-left-20px u-color-21706d"
              >
                Customer Details
              </h1>
            </Col>
            <Col lg={6} md={6} sm={6} xs={24} className="p-0 u-text-align-left">
              <div
                className="Level-Section u-padding-5px u-right-50px u-width-240px u-color-fff u-position-absolute u-background-color-04bbb4"
              >
                <div>
                  <i className="icon-card icon-size-one"></i>
                  <div
                    className="u-position-absolute u-right-75px u-top-5px"
                  >
                    <span className="LevelHeading">CNIC Number</span>
                    <br />
                    <span className="SubHeading">{cnic}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="u-margin-top-30px" />
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                name="IndividualInvolved"
                label="Select Individual Involved"
                option={individualInvolvedType}
                value={individualInvolvedTypeName}
                change={individualNameHandler}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                name="ChannelType"
                option={channelType}
                value={channelTypeName}
                change={channelNameHandler}
                label="Select Channel"
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                name="ForgedDocuments"
                label="Select Type of Documents"
                option={forgedDocumentsType}
                change={documentsNameHandler}
                value={forgedDocumentsTypeName}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                name="FraudNotAFraud"
                label="Fraud / Not a Fraud"
                option={fraudNotAFraudType}
                change={fraudNotAFraudNameHandler}
                value={fraudNotAFraudTypeName}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="CustomerName"
                value={FDCustomer.CustomerName}
                change={FDCustomerHandler}
                size="small"
                placeholder="Customer Name"
                disable
                label={"Customer Name"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="OldNIC"
                value={neg.OldNIC}
                change={negHandler}
                size="small"
                placeholder="Old NIC"
                textLength={13}
                minLength={13}
                label={"Old NIC"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="CompanyName"
                value={neg.CompanyName}
                size="small"
                change={negHandler}
                placeholder="Company Name"
                disable
                label={"Company Name"}
                fullWidth
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                name="CompanySegment"
                label="Company Segment"
                option={companySegmentType}
                change={companySegmentHandler}
                value={companySegmentTypeName}
                disable
              />
            </Col>
            <Col lg={18} md={18} sm={24} xs={24}>
              <TextField
                name="CompanyAddress"
                value={neg.CompanyAddress}
                change={negHandler}
                size="small"
                placeholder="Company Address"
                label={"Company Address"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="OfficePhone"
                value={neg.OfficePhone}
                change={negHandler}
                size="small"
                placeholder="Office Phone"
                textLength={11}
                minLength={11}
                label={"Office Phone"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={18} md={18} sm={24} xs={24}>
              <TextField
                name="ResidenceAddress"
                change={negHandler}
                value={neg.ResidenceAddress}
                size="small"
                placeholder="Residence Address"
                label={"Residence Address"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name="ResidencePhone"
                value={neg.ResidencePhone}
                change={negHandler}
                size="small"
                placeholder="Residence Phone"
                label={"Residence Phone"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                name="MobileNumber"
                value={neg.MobileNumber}
                change={negHandler}
                size="small"
                placeholder="Mobile No"
                textLength={11}
                minLength={11}
                label={"Mobile No"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                label="City"
                value={cityValue}
                name="fK_CTID"
                disable={true}
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                name="CityCode"
                size="small"
                change={negHandler}
                value={neg.CityCode}
                placeholder="City Code"
                label={"City Code"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <TextField
                name="Reference"
                value={neg.ReferenceNumber}
                change={negHandler}
                size="small"
                placeholder="Reference #"
                label={"Reference #"}
                fullWidth
                disable
              />
            </Col>
            <Col lg={16} md={16} sm={24} xs={24}>
              <TextField
                name="HBLReferenceNumber"
                value={neg.HBLReferenceNumber}
                change={negHandler}
                size="small"
                placeholder="HBL Reference Number"
                label={"HBL Reference Number"}
                fullWidth
                disable
              />
            </Col>
          </Row>
          <div className="u-margin-top-30px" />
          {ListOfComments &&
            ListOfComments.map((item, ind) => (
              <div key={ind}>
                <Row>
                  <Col lg={10} md={10} sm={24} xs={24}>
                    <TextField
                      name="Comment"
                      size="small"
                      value={item.comment}
                      placeholder="Comment"
                      disable={true}
                      label={"Comment"}
                      fullWidth
                      width="100%"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <TextField
                      name="Enterd By"
                      size="small"
                      value={Details.firstName + " " + Details.lastName}
                      placeholder="enterdby"
                      disable={true}
                      label={"Enterd By"}
                      width="100%"
                      fullWidth
                    />
                  </Col>
                  <Col lg={8} md={8} sm={24} xs={24}>
                    <TextField
                      name="On"
                      size="small"
                      value={
                        DateDisplayFormat(item.creationDateTime) +
                        " " +
                        TimeAndDisplayFormat(item.creationDateTime)
                      }
                      placeholder="enterdby"
                      disable={true}
                      label={"On"}
                      width="100%"
                      fullWidth
                    />
                  </Col>
                </Row>
                <div className="u-margin-bottom-25px" />
              </div>
            ))}
        </Paper>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </>
  );
};

export default ViewNDB;
