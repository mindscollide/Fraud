import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styles from "../floating-label.module.css";
const StartToEndDate = ({
  label,
  width,
  size,
  change,
  DateRange,
  startvalue,
  endvalue,
  required,
}) => {
  const { RangePicker } = DatePicker;
  let dateFormat = "DD-MM-YYYY";
  const picker = (e, dateStr) => {
    const date = {
      name: "dater",
      startDate: dateStr[1] ? dateStr[1] : null,
      endDate: dateStr[0] ? dateStr[0] : null,
    };
    change(date, null);
  };
  const disabledDate = (value) => {
    // Can not select future dates
    return value && value > moment().endOf("day");
  };
  return (
    <div className={`${label ? styles.wrapper : undefined} u-display-flex u-align-items-center`}>
      {label ? <span className={styles.floatingLabel}>{label}</span> : null}
      <RangePicker
        disabledDate={DateRange ? disabledDate : false}
        onChange={picker}
        value={
          startvalue && endvalue
            ? [moment(startvalue, dateFormat), moment(endvalue, dateFormat)]
            : null
        }
        format={dateFormat}
        size={size}
        style={{ width: `${width}`, marginLeft: label ? 0 : "5px" }}
        required={required}
      />
    </div>
  );
};

export default StartToEndDate;
