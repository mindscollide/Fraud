import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";

import { EditOutlined as Edit } from "@ant-design/icons";

import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
  SelectBox,
  Loader,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  HideNotification,
  GetAllCityAndRegionMapping,
  GetAllCity,
  GetAllRegion,
  SaveCityAndRegionMapping,
  DeleteCityAndRegionMapping,
  EditCityAndRegionMapping,
} from "../../../../../store/actions/setup-forms-actions";
import styles from "../systemAdmin.module.css";

const CityAndRegionMapping = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnStatusSelect, setBtnStatusSelect] = useState(true);
  const [cityNames, setCityNames] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [CRMID, setCRMID] = useState();
  const [regionName, setRegionName] = useState([]);
  const [regionNames, setRegionNames] = useState("");
  const [allCityAndRegionMapping, setAllCityAndRegionMapping] = useState([]);
  const [addCityAndRegionData, setAddCityAndRegionData] = useState({
    Fk_CTID: 0,
    Fk_RID: 0,
  });

  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [cityAndRegionMapping, setCityAndRegionMapping] = useState({
    PK_CRMID: 0,
    Fk_CTID: 0,
    Fk_RID: 0,
  });
  const [cityAndRegionMappingName, setCityAndRegionMappingName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteit = (e, record) => {
    setCityAndRegionMappingName(record.pK_CRMID);
    showModal();
    setAction({
      ...actions,
      delete: true,
      update: false,
      add: false,
    });
  };

  const update = (e, record) => {
    setRegionName(record.regionName);
    setCityName(record.cityName);
    setAddCityAndRegionData({
      ...addCityAndRegionData,
      ["Fk_CTID"]: record.fk_CTID,
      ["Fk_RID"]: record.fk_RID,
    });
    setCRMID(record.pK_CRMID);
    setAction({ ...actions, update: true });
  };

  const updateData = () => {
    dispatch(EditCityAndRegionMapping(cityAndRegionMapping, CRMID));
    setCityName({
      Name: "",
    });
    setRegionName({
      Name: "",
    });
    setAddCityAndRegionData({
      ...addCityAndRegionData,
      ["Fk_CTID"]: 0,
      ["Fk_RID"]: 0,
    });
    setAction({ ...actions, update: false, add: true });
    setBtnStatus(true);
    setBtnStatusSelect(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setCityName({
      Name: "",
    });
    setRegionName({
      Name: "",
    });
  };

  const add = () => {
    if (addCityAndRegionData.Title !== "") {
      showModal();
      setAction({
        ...actions,
        add: true,
        update: false,
        delete: false,
      });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter City",
      });
    }
  };

  const handleSave = () => {
    setIsModalVisible(false);
    dispatch(SaveCityAndRegionMapping(addCityAndRegionData));
    setCityName({
      Name: "",
    });
    setRegionName({
      Name: "",
    });
    setAddCityAndRegionData({
      ...addCityAndRegionData,
      ["Fk_CTID"]: 0,
      ["Fk_RID"]: 0,
    });
    setBtnStatus(true);
    setBtnStatusSelect(true);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(DeleteCityAndRegionMapping(cityAndRegionMappingName));
  };

  useEffect(() => {
    dispatch(GetAllCityAndRegionMapping());
    dispatch(GetAllCity());
    dispatch(GetAllRegion());
  }, []);

  //For City Names DropDown SetState
  useEffect(() => {
    let nameCity = setupForms.CityData;
    setCityNames(
      nameCity.map((data, index) => {
        return data.name;
      })
    );
  }, [setupForms.CityData]);

  //For Region Names DropDown SetState
  useEffect(() => {
    let nameRegion = setupForms.RegionData;
    setRegionNames(
      nameRegion.map((data, index) => {
        return data.name;
      })
    );
  }, [setupForms.RegionData]);

  useEffect(() => {}, [cityNames]);

  useEffect(() => {}, [regionNames]);

  useEffect(() => {
    setAllCityAndRegionMapping(setupForms.CityAndRegionMappingData);
  }, [setupForms.CityAndRegionMappingData]);

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.ShowNotification]);

  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
    }
  }, [setupForms.Loading]);

  const cityNameHandler = (e, value) => {
    setCityName(value);
    let nameCity = setupForms.CityData;
    nameCity.map((data, index) => {
      if (value === data.name) {
        setAddCityAndRegionData({
          ...addCityAndRegionData,
          ["Fk_CTID"]: data.pK_CTID,
        });
        setCityAndRegionMapping({
          ...addCityAndRegionData,
          ["Fk_CTID"]: data.pK_CTID,
        });
      }
    });
    if (value === null || value === undefined || value === "") {
      setBtnStatus(true);
    }
  };

  const regionNameHandler = (e, value) => {
    setRegionName(value);
    let nameRegion = setupForms.RegionData;
    nameRegion.map((data, index) => {
      if (value === data.name) {
        setAddCityAndRegionData({
          ...addCityAndRegionData,
          ["Fk_RID"]: data.pK_RID,
        });
        setCityAndRegionMapping({
          ...addCityAndRegionData,
          ["Fk_RID"]: data.pK_RID,
        });
      }
    });
    if (value === null || value === undefined || value === "") {
      setBtnStatus(true);
    }
  };

  useEffect(() => {
    if (
      addCityAndRegionData.Fk_CTID !== 0 &&
      addCityAndRegionData.Fk_RID !== 0
    ) {
      setBtnStatus(false);
      setBtnStatusSelect(false);
    } else if (
      addCityAndRegionData.Fk_CTID === 0 ||
      addCityAndRegionData.Fk_RID === 0
    ) {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    } else {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    }
  }, [addCityAndRegionData]);

  useEffect(() => {
    if (
      regionName === null ||
      regionName === undefined ||
      regionName === "" ||
      cityName === null ||
      cityName === undefined ||
      cityName === ""
    ) {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    } else {
      if (
        addCityAndRegionData.Fk_CTID === 0 ||
        addCityAndRegionData.Fk_RID === 0
      ) {
        setBtnStatus(true);
        setBtnStatusSelect(true);
      } else {
        setBtnStatus(false);
        setBtnStatusSelect(false);
      }
    }
  }, [regionName]);

  useEffect(() => {
    if (
      regionName === null ||
      regionName === undefined ||
      regionName === "" ||
      cityName === null ||
      cityName === undefined ||
      cityName === ""
    ) {
      setBtnStatus(true);
      setBtnStatusSelect(true);
    } else {
      if (
        addCityAndRegionData.Fk_CTID === 0 ||
        addCityAndRegionData.Fk_RID === 0
      ) {
        setBtnStatus(true);
        setBtnStatusSelect(true);
      } else {
        setBtnStatus(false);
        setBtnStatusSelect(false);
      }
    }
  }, [cityName]);

  const columns = [
    {
      title: "City Code",
      dataIndex: "cityCode",
      key: "cityCode",
      align: "center",
      width: "10%",
    },
    {
      title: "City",
      dataIndex: "cityName",
      key: "cityName",
      align: "center",
      width: "30%",
    },
    {
      title: "Region Code",
      dataIndex: "regionCode",
      key: "regionCode",
      align: "center",
      width: "10%",
    },
    {
      title: "Region",
      dataIndex: "regionName",
      key: "regionName",
      align: "center",
      width: "30%",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          onClick={(e) => update(e, record)}
          className="icon-edit icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <div
          onClick={(e) => deleteit(e, record)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];

  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => handleSave(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  return (
    <>
      <Title level={3}>City & Region Mapping</Title>
      <Row gutter={8}>
        <Col lg={10} md={10} sm={24}>
          <SelectBox
            name="CityMapping"
            label={cityName?.length > 0 && "City"}
            placeholder={"City *"}
            required
            option={cityNames}
            value={cityName}
            change={cityNameHandler}
          />
        </Col>
        <Col lg={10} md={10} sm={24}>
          <SelectBox
            name="RegionMapping"
            label={regionName?.length > 0 && "Region"}
            placeholder={"Region *"}
            required
            value={regionName}
            option={regionNames}
            change={regionNameHandler}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          {actions.update ? (
            <Button
              text="Update Mapping"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={updateData}
              disableBtn={btnStatusSelect}
            />
          ) : (
            <Button
              text="Add Mapping"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
              disableBtn={btnStatus}
            />
          )}
        </Col>

        <Col lg={24} md={22} sm={24} className="u-margin-top-1pct">
          <Table
            rows={allCityAndRegionMapping}
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
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <div className="u-padding-40px u-display-flex u-justify-content-center">
              <Title level={3} align="center">
                Are you sure you want to add City & Region Mapping?
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div className={styles.deleteModalMain}>
              <i className="icon-trash icon-size-two"></i>

              <span className={styles.deleteModalTitle}>
                Are you sure you want to delete this?
              </span>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default CityAndRegionMapping;
