import React from "react";
import { TimePicker } from "antd";
import moment from "moment"
import styles from "../floating-label.module.css";
const CustomTimePicker = ({
  label,
  width,
  size,
  placeholder,
  change,
  name,
  disable,
  value,
  TimeRange
}) => {
  let TimeFormat = "HH:mm:ss"
  function onChange(date, timeString) {
    change({ target: { name: name, value: timeString } });
  }

  const disabledTime = (value) => {
    return value && value > moment().endOf('day');
  }
  return (
    <div className={`${label ? styles.wrapper : undefined} u-display-flex u-align-items-center`}>
      {label ? <span className={styles.floatingLabel}>{label}</span> : null}
      <TimePicker
        // disabledTime={TimeRange ? disabledTime : false}
        disabled={disable}
        // format={TimeFormat}
        value={value ? moment(value, TimeFormat) : null}
        placeholder={placeholder}
        onChange={onChange}
        size={size}
        style={{ width: `${width}`, marginLeft: label ? 0 : "5px" }}
      />
    </div>
  );
};
export default CustomTimePicker;