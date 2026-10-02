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

const IMAGEINGMIS = () => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    
    return (
        <>
            <Title level={3}>Ageing MIS</Title>
            <Row gutter={8}>
                <Col lg={8} md={8} sm={24}>
                    <div className="u-display-flex">
                        <Button
                            applyClass="btnDarkSolid"
                            text="Summary"
                            icon={<DownloadOutlined />}
                        />
                    </div>
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <div className="u-display-flex">
                        <Button
                            applyClass="btnDarkSolid"
                            text="Details"
                            icon={<DownloadOutlined />}
                        />
                    </div>
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <div className="u-display-flex">
                        <Button
                            applyClass="btnDarkSolid"
                            text="Amount Wise"
                            icon={<DownloadOutlined />}
                        />
                    </div>
                </Col>
            </Row>

            {/* <Notification setOpen={setOpen} open={open.flag} message={open.message} /> */}
        </>
    );
};

export default IMAGEINGMIS;