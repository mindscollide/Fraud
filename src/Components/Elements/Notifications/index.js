import { useEffect } from "react";
import { notification } from "antd";
import { BellFilled, CloseOutlined } from "@ant-design/icons";

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
      // longer messages stay up longer so the whole text can be read
      const text = typeof message === "string" ? message : "";
      const duration = Math.min(8, Math.max(3.5, text.length / 14));
      notification.open({
        message,
        placement: "topRight",
        duration,
        icon: (
          <span className="app-notification-icon">
            <BellFilled />
          </span>
        ),
        closeIcon: <CloseOutlined />,
        className: "app-teal-notification",
        // drives the time-left bar along the bottom (see App.less)
        style: { "--notification-duration": `${duration}s` },
        onClose: handleClose,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);

  return null;
};

export { Notification, Message };
