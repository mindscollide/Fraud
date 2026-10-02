import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Loader, SelectBox } from "../../../../Components/Elements";
import { GetAllRegion } from "../../../../store/actions/setup-forms-actions";
import { RegionWiseReportExcel } from "../../../../store/actions/reports_actions";
import { useDispatch, useSelector } from "react-redux";

const IORegionWiseStaffList = () => {
  const { Title } = Typography;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { reports, setupForms } = state;
  // for already selected value
  const [region, setRegion] = useState("");
  const [userRegion, setUserRegion] = useState([]);
  const [classificationofAdvance, setclassificationofAdvance] = useState({
    RegionID: 0,
  });
  useEffect(() => {
    dispatch(GetAllRegion());
  }, []);
  useEffect(() => {
    let RegionData = setupForms.RegionData;
    if (
      RegionData !== undefined &&
      RegionData.length > 0 &&
      RegionData !== null
    ) {
      setUserRegion(
        RegionData.map((role, i) => {
          return role.name;
        })
      );
    }
  }, [setupForms.RegionData]);
  // for edit user
  const editUserDataHnaler = (e, val) => {
    let name = e.target.name;
    if (val !== undefined && val !== null) {
      let RegionData = setupForms.RegionData;
      if (
        RegionData !== undefined &&
        RegionData !== null &&
        RegionData.length > 0
      ) {
        RegionData.map((data, index) => {
          if (val === data.name) {
            setclassificationofAdvance({
              ...classificationofAdvance,
              ["RegionID"]: data.pK_RID,
            });
            setRegion(data.name);
          }
        });
      }
    }
  };
  // reset state manage handler
  const handleReset = () => {
    setclassificationofAdvance({
      RegionID: 0,
    });
    setRegion("");
  };
  return (
    <>
      <Title level={3}>Region Wise Staff List</Title>
      <Row gutter={8}>
        <Col lg={8} md={8} sm={24}>
          <SelectBox
            label="Select Region"
            name="SelectRegion"
            option={userRegion}
            value={region}
            change={editUserDataHnaler}
          />
        </Col>
        <Col lg={2} md={2} sm={24}></Col>
        <Col lg={8} md={8} sm={24}>
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={handleReset}
          />
        </Col>
        <Col md={10} lg={10} sm={24} className="u-margin-top-5pct"></Col>
        <Col md={8} lg={8} sm={24} className="u-margin-top-5pct">
          <div>
            <Button
              applyClass="btnDarkSolidm"
              text="Download Report"
              icon={<DownloadOutlined />}
              click={() =>
                dispatch(
                  RegionWiseReportExcel(classificationofAdvance.RegionID)
                )
              }
            />
          </div>
        </Col>
      </Row>
      {reports.isLoading ? <Loader /> : null}
    </>
  );
};

export default IORegionWiseStaffList;
