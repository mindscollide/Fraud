import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import "./table.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const CustomTable = ({
  columns,
  rows,
  pagination,
  scroll,
  rowSelection,
  id,
}) => {
  return (
    <Table
      rowClassName="rowColor"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={rows}
      bordered
      pagination={pagination}
      scroll={scroll}
    />
  );
};

export default CustomTable;
