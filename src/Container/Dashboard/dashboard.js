import React, { useState, useEffect } from "react";
import { Header, Sidebar, Main } from "../../Components/Layout";
import { Notification, Message } from "../../Components/Elements";
import { Layout } from "antd";
import { UserSelection, } from "../../Routes/routingData";
import { Loader } from "../../Components/Elements";
import { useSelector ,useDispatch} from "react-redux";
import {SomeThingWentWrongRemove} from '../../store/actions/ui-actions'
import { useNavigate } from "react-router-dom";
import Helper from "../../Common/Functions/history_logout";
const Dashboard = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  Helper.navigate = navigate;
  const {
    reports,
    auth,
    ui
  } = state;
  const dispatch = useDispatch();
  const { Content } = Layout;
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState({
    open:false,
    message:''
  });
 
  // code to set loader on api calls, just add the chunk of state in "if" and "else" block and also as dependency:
  useEffect(() => {
    if (reports.isLoading) {
      setLoad(true);
    }

    if (!reports.isLoading) {
      setLoad(false);
    }
  }, [reports.isLoading]);
  useEffect(() => {
    if (ui.SomeThingWentWrong===true) {
      setOpen({
        ...open,
        open:true,
        message:"Unable  to connect to server please check your connection or contact support"
      });
      dispatch(SomeThingWentWrongRemove())
    }
  }, [ui.SomeThingWentWrong]);
  // useEffect(() => {
  //   if (writeOffCases.Loading) {
  //     setLoad(true);
  //   }

  //   if (!writeOffCases.Loading) {
  //     setLoad(false);
  //   }
  // }, [writeOffCases.Loading]);
  // useEffect(() => {
  //   if (wofApprovals.Loading) {
  //     setLoad(true);
  //   }
  //   if (!wofApprovals.Loading) {
  //     setLoad(false);
  //   }
  // }, [wofApprovals.Loading]);
  useEffect(() => {
    if (auth.isLoggedIn===true) {
      setOpen({
        ...open,
        open:true,
        message:"Login Successfully"
      });
    }
  }, [auth.isLoggedIn]);
  // Find customer account from misys loader:
  // useEffect(() => {
  //   if (findCustomerFromMisys.isLoading) {
  //     setLoad(true);
  //   }

  //   if (!findCustomerFromMisys.isLoading) {
  //     setLoad(false);
  //   }
  // }, [findCustomerFromMisys.isLoading]);
  const token = JSON.parse(localStorage.getItem("token"));
  const UserDetails = JSON.parse(localStorage.getItem("UserDetails")); 
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const [AppContent, setAppContent] = useState(UserSelection(token, role));
  return  (
    <>
        <Layout style={Style.Shell}>
          <Header
            title={AppContent.Title}
            UserDetails={UserDetails}
            Notification ={AppContent.Notification}
          />
          <Content>
            <Layout>
              <Sidebar Links={AppContent.SidebarData}  ui={ui} />
              <Main
                routingData={AppContent.MainMenu}
                role={AppContent.UserRoleId}
              />
            </Layout>
          </Content>
          <Notification setOpen={setOpen} open={open.open} message={open.message} />
        </Layout>
        {load?<Loader/>:null}
      </>
  )

};
const Style = {
  // Header/Sidebar/Main/Footer are all fixed-positioned (see their own
  // CSS), so none of them occupy space in normal document flow anymore —
  // this just guarantees the shell itself is pinned to exactly one
  // viewport and never grows the page/body height, so there's no
  // page-level scrollbar on any resolution. Login/SignUp/404 render
  // outside Dashboard entirely and are unaffected.
  Shell: {
    height: "100vh",
    overflow: "hidden",
  },
};
export default Dashboard;
