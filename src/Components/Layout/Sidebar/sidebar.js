import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeTabDisable } from "../../../store/actions/ui-actions";
import { RESETALLSTATE } from "../../../store/actions/investigation-officer-actions";

const Sidebar = ({ Links, ui }) => {
  const { Sider } = Layout;
  const dispatch = useDispatch();
  // Sidebar only ever mounts under /Fraud (see App.js) — it's a sibling of
  // <CustomRoutes>, not itself rendered through a matched <Route>, so
  // there's no ancestor route for useMatch() to resolve against. This was
  // useRouteMatch().path in v5, which just returned the closest ancestor
  // match; hardcoding is the direct v7 equivalent here.
  const path = "/Fraud";
  const allowedTransactionTypes = JSON.parse(
    localStorage.getItem("allowedTransactionTypes")
  );

  // Selected/open state lives in React state (initialized once from
  // localStorage) rather than being re-read from localStorage on every
  // render. antd's Menu is fully controlled here (selectedKeys + openKeys),
  // so the source of truth for what's visually highlighted/expanded has to
  // be real state that we update — reading localStorage at render time only
  // reflects the previous full page load, not live selection.
  const [selectedKey, setSelectedKey] = useState(
    () => localStorage.getItem("child") || "1"
  );
  const [openKeys, setOpenKeys] = useState(() => [
    localStorage.getItem("parent") || "sub1",
  ]);

  function ttidCheck(num) {
    if (num === 12) {
      return true;
    }
    const found = allowedTransactionTypes.find((element) => element === num);
    return found !== undefined && found !== null;
  }

  // Triggered elsewhere in the app (e.g. after certain edits) to force a
  // full page reload while landing back on a specific tab.
  useEffect(() => {
    if (ui.activeEdit) {
      localStorage.setItem("parent", "sub1");
      localStorage.setItem("child", "2");
      window.location.reload();
    }
  }, [ui.activeEdit]);

  // "New User Requests" notification click (Header) force-selects tab 15
  // under sub1, regardless of whatever was previously open/selected.
  useEffect(() => {
    if (ui.activeTab) {
      localStorage.setItem("parent", "sub1");
      localStorage.setItem("child", "15");
      setSelectedKey("15");
      setOpenKeys(["sub1"]);
    }
  }, [ui.activeTab]);

  // Accordion behaviour: opening a parent closes whichever other parent was
  // open, so only one top-level menu is ever expanded at a time.
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : keys);
  };

  const onSelect = ({ key, keyPath }) => {
    if (key !== "3") {
      dispatch(makeTabDisable());
    }
    dispatch(RESETALLSTATE());
    localStorage.setItem("parent", keyPath[1]);
    localStorage.setItem("child", keyPath[0]);
    setSelectedKey(key);
  };

  // antd's items API (Menu children are deprecated). Parent keys stay
  // "sub<position in Links>" counted before filtering, as before.
  const menuItems = Links.map((item, index) =>
    ttidCheck(item.ttid)
      ? {
          key: `sub${index + 1}`,
          icon: <i className={`${item.icon}`}></i>,
          label: `${item.menuName}`,
          className: styles.menuMainItem,
          children: item.subMenu
            .filter((nestedItem) => ttidCheck(nestedItem.sttid))
            .map((nestedItem) => ({
              key: nestedItem.key,
              label: (
                <Link
                  to={`${path}${nestedItem.link}`}
                  className={styles.noLinkStyles}
                >
                  {nestedItem.name}
                </Link>
              ),
            })),
        }
      : null
  ).filter(Boolean);

  return (
    <Sider width={230} className={styles.sider}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        className={styles.menuSidebarStyle}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
