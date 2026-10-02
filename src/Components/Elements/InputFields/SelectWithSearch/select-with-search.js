import React from "react";
import { Select } from "antd";

const SelectWithSearch = ({ optionGroup, placeholder, data, givenWidth, size }) => {
  const { Option, OptGroup } = Select;

  return (
    <Select
    size={size}
     style={{width:givenWidth}}
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
    >
      <Option value="1">Not Identified</Option>
      <Option value="2">Closed</Option>
      <Option value="3">Communicated</Option>
      <Option value="4">Identified</Option>
      <Option value="5">Resolved</Option>
      <Option value="6">Cancelled</Option>
    </Select>
  );
};

export default SelectWithSearch;
