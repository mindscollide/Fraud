import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/footer";
import styles from "./main.module.css";
import { MaxWidthContainer } from "../../Elements";
import CustomRoutes from "../../../Routes/CustomRoutes";

const Main = ({
  routingData,
  role
}) => {
  const { Content } = Layout;
  // Add / Edit / View dispute pages share one field-spacing system (see .formPage).
  const page = useLocation().pathname.split("/").pop();
  const isFormPage =
    /^(AddEdit|AddNew|CustomerDetails|ViewCustomerDetails|ViewNegativeDataBase|Edit(?!User))/.test(
      page
    );
  return (
    <Layout>
      <Content
        className={`${styles.mainContainer} ${isFormPage ? styles.formPage : ""}`}
      >
        <MaxWidthContainer>
        <CustomRoutes RoutingData={routingData} Role={role}/>
        </MaxWidthContainer>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
