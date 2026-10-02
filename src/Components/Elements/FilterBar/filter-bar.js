import React, { useState } from "react";
import { Select } from 'antd'
const { Option } = Select;

const FilterBar = ({
  change,
  Options,
  placeholder,
  defaultValue
}) => {
  return (
    <>
     <Select
    onChange={(value) => change(value)} 
    suffixIcon = { <i className="icon-list icon-size-one" style={Style.IconStyle}></i>}
    style={Style.FieldStyle}
    placeholder={placeholder}
    defaultValue={defaultValue}
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {Options?Options.map((item,index) => {
                return <Option key={index} value={item.value}>{item.title}</Option>;
              }):null}
  </Select>
    </>
  );
};
const Style = {
    IconStyle:{
        color:"white",
    },
    FieldStyle:{
        color:"white",
        width: 240,
    }
}
export default FilterBar;
