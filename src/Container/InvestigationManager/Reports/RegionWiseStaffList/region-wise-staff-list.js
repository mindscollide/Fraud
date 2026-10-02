import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { SearchOutlined as Search } from "@ant-design/icons";
import { EditOutlined as Edit } from "@ant-design/icons";
import { UndoOutlined as Restore } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import {
    Button,
    Table,
    GroupedButtons,
    Modal,
    TextField,
    Notification,
    StartToEndDate,
    SelectBox,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

const IMRegionWiseStaffList = () => {

    const { Title } = Typography;

    const dispatch = useDispatch();

    const state = useSelector((state) => state);

    return (
        <>
            <Title level={3}>Region Wise Staff List</Title>
            <Row gutter={8}>
                <Col lg={8} md={8} sm={24}>
                    <SelectBox
                        label="Select Region"
                        name="Region"
                        propertyName={"Region"}
                    />
                </Col>
                <Col lg={2} md={2} sm={24}></Col>
                <Col lg={8} md={8} sm={24}>
                    <Button
                        text="Search"
                        icon={<Search />}
                        applyClass="btnSecondarySolid2Search2"
                        size="small"
                    />
                    <Button
                        text="Reset"
                        icon={<i className="icon-reset"></i>}
                        applyClass="btnSecondarySolidReset"
                        size="small"
                    />
                </Col>
                <Col md={10} lg={10} sm={24} className="u-margin-top-5pct"></Col>
                <Col md={8} lg={8} sm={24} className="u-margin-top-5pct">
                    <div>
                        <Button
                            applyClass="btnDarkSolidm"
                            text="Download Report"
                            icon={<DownloadOutlined />}
                        />
                    </div>
                </Col>
            </Row>

            {/* <Notification setOpen={setOpen} open={open.flag} message={open.message} /> */}
        </>
    );
};

export default IMRegionWiseStaffList;