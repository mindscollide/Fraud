import React, { useEffect } from "react";
import { notification } from "antd";

const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

// Kept as a controlled component with the exact same {setOpen, open, message}
// API every caller already uses (~100+ call sites) — antd's notification is
// an imperative singleton (notification.open({...}) called from anywhere),
// a different programming model from MUI's Snackbar+Alert, so this wrapper
// triggers it internally instead of changing every call site.
const Notification = ({ setOpen, open, message }) => {
  const handleClose = () => {
    // Preserved exactly as the MUI version had it — some callers key their
    // own state on "open", others on "flag"; this always writes "flag",
    // a pre-existing inconsistency this migration isn't meant to fix.
    setOpen({
      flag: false,
      message: "",
    });
  };

  useEffect(() => {
    if (open && message !== "") {
      notification.open({
        message,
        placement: "topRight",
        duration: 2,
        // The original MUI Alert always rendered with a hardcoded teal
        // "success" background regardless of its severity="error" prop
        // (a pre-existing bug — the classes.BackGroundSucces override always
        // won) — preserved exactly rather than "corrected" to show red.
        // className (not just style) is needed because antd's own
        // .ant-notification-notice-message rule sets an explicit text color
        // that would otherwise win over an inherited one from style={}.
        className: "app-teal-notification",
        style: {
          backgroundColor: "#078480",
        },
        onClose: handleClose,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);

  return null;
};

export { Notification, Message };
