import React from "react";
import { Layout } from "antd";
import Footer from "../Footer/footer";
import styles from "./main.module.css";
import { MaxWidthContainer } from "../../Elements";
import CustomRoutes from "../../../Routes/CustomRoutes";

const Main = ({
  routingData,
  role
}) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content className={styles.mainContainer}>
        <MaxWidthContainer>
        <CustomRoutes RoutingData={routingData} Role={role}/>
        </MaxWidthContainer>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
