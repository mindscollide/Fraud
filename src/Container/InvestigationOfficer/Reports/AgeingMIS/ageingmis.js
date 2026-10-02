import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
    Button,
    Notification,
} from "../../../../Components/Elements";
import { useDispatch } from "react-redux";
import { AgeingReportExcel } from "../../../../store/actions/reports_actions";

const IOAGEINGMIS = () => {
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
                            click={()=>dispatch(AgeingReportExcel(1))}
                        />
                    </div>
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <div className="u-display-flex">
                        <Button
                            applyClass="btnDarkSolid"
                            text="Details"
                            icon={<DownloadOutlined />}
                            click={()=>dispatch(AgeingReportExcel(2))}
                        />
                    </div>
                </Col>
                <Col lg={8} md={8} sm={24}>
                    <div className="u-display-flex">
                        <Button
                            applyClass="btnDarkSolid"
                            text="Amount Wise"
                            icon={<DownloadOutlined />}
                            click={()=>dispatch(AgeingReportExcel(3))}
                        />
                    </div>
                </Col>
            </Row>

            {/* <Notification setOpen={setOpen} open={open.flag} message={open.message} /> */}
        </>
    );
};

export default IOAGEINGMIS;