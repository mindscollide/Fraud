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
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

const IMNONAPIDisputes = () => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    
    return (
        <>
            <Title level={3}>Non API Disputes</Title>
            <Row gutter={8}>
                <Col lg={8} md={8} sm={24}>
                    <TextField fullWidth label="Account Number"
                        size="small" required
                    />
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <TextField fullWidth label="HBL Account Number"
                        size="small" required
                    />
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <TextField fullWidth label="Other Bank Account Number"
                        size="small" required
                    />
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <TextField fullWidth label="CNIC"
                        size="small" required
                    />
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <StartToEndDate
                        label={"Action On"}
                        width="100%!important"
                        size="large"
                    />
                </Col>
                <Col lg={8} md={8} sm={24} className="u-text-align-center">
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

                <Col md={24} lg={24} sm={24} className="u-margin-top-5pct u-text-align-center">
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

export default IMNONAPIDisputes;
