import React from "react";
import { Radio } from "antd";

const CustomRadio = ({label, change, value,checked }) => {
  return (

    <Radio value={value} onChange={change} checked={checked}>
      {label}
    </Radio>
   
  );
};

export default CustomRadio;
