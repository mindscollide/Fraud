import React from "react";

// MUI's Paper here always had elevation={0} (no shadow) and border-radius
// forced to 0 by a global override (.MuiPaper-rounded in App.less) — the
// only actual visual effect was the optional 1px border when `variant` is
// truthy (MUI's default outlined-Paper border color). A plain div with the
// same conditional border reproduces this exactly.
const CustomPaper = ({
  children,
  variant,
  height,
  padding,
  mt,
  mb,
  ml,
  mr,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          width: "100%",
          height: `${height}`,
          padding: `${padding}%`,
          marginTop: `${mt}%`,
          marginBottom: `${mb}%`,
          marginLeft: `${ml}%`,
          marginRight: `${mr}%`,
          border: variant ? "1px solid rgba(0,0,0,0.12)" : "none",
          borderRadius: 0,
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPaper;
