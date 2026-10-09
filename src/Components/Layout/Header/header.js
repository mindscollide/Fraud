import React, { useEffect } from "react";
import { Layout, Typography, Tooltip, Badge, Dropdown, Menu } from "antd";
import { BellOutlined as NotificationsNoneIcon } from "@ant-design/icons";
import UserImage from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/auth-actions";
import {
  newRequestList,
  newRequestListCount,
  newRequestListCountIM,
} from "../../../store/actions/request-actions";
import Helper from "../../../Common/Functions/history_logout";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { disableGoBack } from "../../../store/actions/ui-actions";
import { makeTabActive } from "../../../store/actions/ui-actions";
const Header = ({ Notification, title, UserDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { requestReducer, ui } = state;
  const { Title } = Typography;
  const { Header } = Layout;
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleClick = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    Helper.navigate = navigate;
  }, []);
  const openUserRequest = () => {
    dispatch(newRequestList(Details.userID));
  };

  //Tab Close Clear Storage
  useEffect(() => {
    // define increment counter part
    const tabsOpen = localStorage.getItem("tabsOpen");
    if (tabsOpen === null) {
      localStorage.setItem("tabsOpen", 1);
    } else {
      localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
    }

    // define decrement counter part
    window.onunload = function (e) {
      const newTabCount = localStorage.getItem("tabsOpen");
      if (newTabCount !== null) {
        localStorage.setItem("tabsOpen", newTabCount - 1);
      }
    };
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      window.localStorage.isMySessionActive = "false";
    } else {
      const newTabCount2 = localStorage.getItem("tabsOpen");
      let value = localStorage.getItem("isMySessionActive");
      if (value === "true") {
        if (newTabCount2 - 1 === 0) {
          dispatch(signOut());
          window.localStorage.isMySessionActive = "false";
        } else {
          window.localStorage.isMySessionActive = "false";
        }
      }
    }
  }, []);

  // call user request list and user list count on refresh on reloaded
  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
      let data = UserDetails.userID;
      if (role === 2) {
        dispatch(newRequestListCount(data));
        dispatch(newRequestList(data));
      } else if (role === 4) {
        dispatch(newRequestListCountIM(data));
      }
    }
  }, []);

  return (
    <Header className="header">
      {/* logo */}
      <div className="inner-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        {/* middle text */}
        <div className="heading-main-container">
          <Title level={3} className="heading-main">
            {title}
          </Title>
        </div>
        {/* its go back button  */}
        {ui.isGoBack && (
          <Tooltip placement="bottom" title="Back">
            <div className="logout-icon-section">
              <div
                onClick={() => {
                  window.history.back();
                  dispatch(disableGoBack());
                }}
              >
                <div className="logout-icon">
                  <i className="icon-arrow-left icon-size-one "></i>
                </div>
              </div>
            </div>
          </Tooltip>
        )}
        {/* its notification icon — only System Administrator (role 2) ever
        gets Notification: true from UserSelection() in routingData.js, so
        this is the only reachable notification bell in the app */}
        {Notification !== null && Notification === true ? (
          <Tooltip placement="bottom" title="Notification">
            <div className="notify">
              <Dropdown
                open={menuOpen}
                onOpenChange={setMenuOpen}
                trigger={["click"]}
                placement="bottomRight"
                overlay={
                  <Menu onClick={handleClose} className="header-menu">
                    <Menu.Item key="new-user-requests">
                      <span
                        onClick={() => {
                          dispatch(newRequestList(Details.userID));
                          localStorage.setItem("parent", "sub1");
                          localStorage.setItem("child", "15");
                          dispatch(makeTabActive());
                          navigate("/Fraud/SystemAdmin/NewRequestList");
                        }}
                        className="NewUserHeading"
                      >
                        {requestReducer.userRequestCount} New User Requests
                      </span>
                    </Menu.Item>
                  </Menu>
                }
              >
                <span onClick={handleClick} className="noti-icon">
                  <Badge count={requestReducer.userRequestCount}>
                    <NotificationsNoneIcon
                    // Matches MUI's fontSize="large" (35px), which this
                    // icon used before the antd swap.
                    // style={{ fontSize: "25px" }}
                    />
                  </Badge>
                </span>
              </Dropdown>
            </div>
          </Tooltip>
        ) : null}
        {/* its logout button */}
        <Tooltip placement="bottom" title="Logout">
          <div className="logout-icon-section">
            <div onClick={() => dispatch(signOut())}>
              <div className="logout-icon">
                <i className="icon-login icon-size-one "></i>
              </div>
            </div>
          </div>
        </Tooltip>
        {/* its avatar */}
        <div className="action-container">
          <div className="avatar">
            <div className="user-name">
              <p>
                {Details.firstName ? Details.firstName : null}{" "}
                {Details.lastName ? Details.lastName : null}
              </p>
            </div>
            <div className="user-figure">
              <img src={UserImage} alt="user" className={"user-icon-header"} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Header;

// import React, { useEffect } from "react";
// import { Layout, Typography, Tooltip, Badge, Dropdown, Menu } from "antd";
// import {
//   DownOutlined,
//   LogoutOutlined,
//   BellOutlined as NotificationsNoneIcon,
//   UserOutlined,
// } from "@ant-design/icons";
// import UserImage from "../../../assets/images/user.png";
// import Logo from "../../../assets/images/logo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { signOut } from "../../../store/actions/auth-actions";
// import {
//   newRequestList,
//   newRequestListCount,
//   newRequestListCountIM,
// } from "../../../store/actions/request-actions";
// import Helper from "../../../Common/Functions/history_logout";
// import "./header.css";
// import { useNavigate } from "react-router-dom";
// import { disableGoBack } from "../../../store/actions/ui-actions";
// import { makeTabActive } from "../../../store/actions/ui-actions";
// const Header = ({ Notification, title, UserDetails }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   const { requestReducer, ui } = state;
//   const { Title } = Typography;
//   const { Header } = Layout;
//   const Details = JSON.parse(localStorage.getItem("UserDetails"));
//   const role = parseInt(JSON.parse(localStorage.getItem("role")));
//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const handleClick = () => {
//     setMenuOpen(true);
//   };

//   const handleClose = () => {
//     setMenuOpen(false);
//   };
//   useEffect(() => {
//     Helper.navigate = navigate;
//   }, []);
//   const openUserRequest = () => {
//     dispatch(newRequestList(Details.userID));
//   };

//   //Tab Close Clear Storage
//   useEffect(() => {
//     // define increment counter part
//     const tabsOpen = localStorage.getItem("tabsOpen");
//     if (tabsOpen === null) {
//       localStorage.setItem("tabsOpen", 1);
//     } else {
//       localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
//     }

//     // define decrement counter part
//     window.onunload = function (e) {
//       const newTabCount = localStorage.getItem("tabsOpen");
//       if (newTabCount !== null) {
//         localStorage.setItem("tabsOpen", newTabCount - 1);
//       }
//     };
//     if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
//       window.localStorage.isMySessionActive = "false";
//     } else {
//       const newTabCount2 = localStorage.getItem("tabsOpen");
//       let value = localStorage.getItem("isMySessionActive");
//       if (value === "true") {
//         if (newTabCount2 - 1 === 0) {
//           dispatch(signOut());
//           window.localStorage.isMySessionActive = "false";
//         } else {
//           window.localStorage.isMySessionActive = "false";
//         }
//       }
//     }
//   }, []);

//   // call user request list and user list count on refresh on reloaded
//   useEffect(() => {
//     if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
//       let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
//       let data = UserDetails.userID;
//       if (role === 2) {
//         dispatch(newRequestListCount(data));
//         dispatch(newRequestList(data));
//       } else if (role === 4) {
//         dispatch(newRequestListCountIM(data));
//       }
//     }
//   }, []);

//   return (
//     <Header className="header">
//       {/* logo */}
//       <div className="inner-container">
//         <div className="logo-container">
//           <img src={Logo} alt="logo" />
//         </div>
//         {/* middle text */}
//         <div className="heading-main-container">
//           <Title level={3} className="heading-main">
//             {title}
//           </Title>
//         </div>
//         {/* its go back button  */}
//         {ui.isGoBack && (
//           <Tooltip placement="bottom" title="Back">
//             <div className="logout-icon-section">
//               <div
//                 onClick={() => {
//                   window.history.back();
//                   dispatch(disableGoBack());
//                 }}
//               >
//                 <div className="logout-icon">
//                   <i className="icon-arrow-left icon-size-one "></i>
//                 </div>
//               </div>
//             </div>
//           </Tooltip>
//         )}
//         {/* its notification icon — only System Administrator (role 2) ever
//         gets Notification: true from UserSelection() in routingData.js, so
//         this is the only reachable notification bell in the app */}
//         {Notification !== null && Notification === true ? (
//           <Tooltip placement="bottom" title="Notification">
//             <div className="notify">
//               <Dropdown
//                 open={menuOpen}
//                 onOpenChange={setMenuOpen}
//                 trigger={["click"]}
//                 placement="bottomRight"
//                 overlay={
//                   <Menu onClick={handleClose} className="header-menu">
//                     <Menu.Item key="new-user-requests">
//                       <span
//                         onClick={() => {
//                           dispatch(newRequestList(Details.userID));
//                           localStorage.setItem("parent", "sub1");
//                           localStorage.setItem("child", "15");
//                           dispatch(makeTabActive());
//                           navigate("/Fraud/SystemAdmin/NewRequestList");
//                         }}
//                         className="NewUserHeading"
//                       >
//                         {requestReducer.userRequestCount} New User Requests
//                       </span>
//                     </Menu.Item>
//                   </Menu>
//                 }
//               >
//                 <span onClick={handleClick} className="noti-icon">
//                   <Badge count={requestReducer.userRequestCount}>
//                     <NotificationsNoneIcon
//                     // Matches MUI's fontSize="large" (35px), which this
//                     // icon used before the antd swap.
//                     // style={{ fontSize: "25px" }}
//                     />
//                   </Badge>
//                 </span>
//               </Dropdown>
//             </div>
//           </Tooltip>
//         ) : null}
//         {/* its logout button */}
//         {/* <Tooltip placement="bottom" title="Logout">
//           <div className="logout-icon-section">
//             <div onClick={() => dispatch(signOut())}>
//               <div className="logout-icon">
//                 <i className="icon-login icon-size-one "></i>
//               </div>
//             </div>
//           </div>
//         </Tooltip> */}
//         {/* its avatar */}
//         {/* <div className="action-container">
//           <div className="avatar">
//             <div className="user-name">
//               <p>
//                 {Details.firstName ? Details.firstName : null}
//                 {Details.lastName ? Details.lastName : null}
//               </p>
//             </div>
//             <div className="user-figure">
//               <img src={UserImage} alt="user" className={"user-icon-header"} />
//             </div>
//           </div>
//         </div> */}

//         {/* user image + dropdown */}
//         <div className="action-container">
//           <Dropdown
//             className="profileDropdownStyle"
//             trigger={["click"]}
//             placement="bottomRight"
//             overlayClassName="user-dropdown-overlay"
//             menu={{
//               items: [
//                 {
//                   key: "user-name",
//                   // icon: <UserOutlined />,
//                   label: `${Details.firstName || ""} ${
//                     Details.lastName || ""
//                   }`.trim(),
//                   disabled: true,
//                 },
//                 { type: "divider" },
//                 {
//                   key: "logout",
//                   icon: <i className="icon-login icon-size-one "></i>,
//                   label: "Logout",
//                   onClick: () => dispatch(signOut()),
//                 },
//               ],
//             }}
//           >
//             <div className="avatar">
//               <div className="user-figure">
//                 <img src={UserImage} alt="user" className="user-icon-header" />
//               </div>
//               <DownOutlined className="user-dropdown-arrow" />
//             </div>
//           </Dropdown>
//         </div>
//       </div>
//     </Header>
//   );
// };

// export default Header;
