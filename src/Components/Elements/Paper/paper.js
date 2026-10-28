import React from "react";

// MUI's Paper here always had elevation={0} (no shadow) and border-radius
// forced to 0 by a global override (.MuiPaper-rounded in App.less) — the
// only actual visual effect was the optional 1px border when `variant` is
// truthy (MUI's default outlined-Paper border color). A plain div with the
// same conditional border reproduces this exactly.
//
// `section`: one block of a dispute add / edit / view form (Customer Details,
// Date, Closure Details, ...) shown as a rounded light-peach card.
const CustomPaper = ({
  children,
  variant,
  height,
  padding,
  mt,
  mb,
  ml,
  mr,
  section,
}) => {
  return (
    <div
      className={section ? "form-section" : undefined}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <div
        style={{
          width: "100%",
          height: `${height}`,
          padding: section ? "4px 20px 20px" : `${padding}%`,
          marginTop: `${mt}%`,
          marginBottom: `${mb}%`,
          marginLeft: `${ml}%`,
          marginRight: `${mr}%`,
          border: variant ? "1px solid rgba(0,0,0,0.12)" : "none",
          borderRadius: section ? 12 : 0,
          background: section ? "#FFF5EE" : "#fff",
          // anchor for the CNIC / account badge pinned to the card's corner
          position: section ? "relative" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPaper;
