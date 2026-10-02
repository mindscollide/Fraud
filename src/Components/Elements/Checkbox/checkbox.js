import React from "react";
import { Checkbox } from "antd";

const CustomCheckbox = ({ label, checkState }) => {
  return <Checkbox onChange={checkState}>{label}</Checkbox>;
};

export default CustomCheckbox;
