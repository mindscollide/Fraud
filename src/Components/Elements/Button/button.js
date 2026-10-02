import React from "react";
import { Button } from "antd";
import styles from "./button.module.css";

const CustomButton = ({
  text,
  icon,
  click,
  applyClass,
  endIcon,
  disableBtn,
  disableClass,
  type,
}) => {
  return (
    <Button
      // antd's `type` is the visual variant (primary/dashed/...), not the
      // native HTML button type — `type="submit"` callers need `htmlType`.
      htmlType={type}
      // All buttons render at antd's "large" (40px) regardless of the
      // "small"/"large" prop this app passes in.
      size="large"
      className={styles[applyClass] + " " + styles[disableClass]}
      disabled={disableBtn}
      onClick={click}
    >
      {/* antd only auto-spaces its own icon components (via CSS targeting
          .anticon) when passed through the `icon` prop — this app also
          passes plain <i className="icon-..."> font icons as icon/endIcon,
          which that CSS doesn't reach, and endIcon has no spacing rule at
          all since it isn't a dedicated prop. One flex row with a fixed
          gap aligns and spaces both icon types the same way regardless. */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {icon ? icon : null}
        {text ? <span>{text}</span> : null}
        {endIcon ? endIcon : null}
      </span>
    </Button>
  );
};

export default CustomButton;
