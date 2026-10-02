import React, { memo } from "react";
import { Select, Button } from "antd";
import styles from "./styles.module.css";
import floatingLabelStyles from "../../floating-label.module.css";

const content = ["No Data Found"];

// See select-box.js for the index-as-value adapter rationale — same pattern.
const getOptionLabel = (item, propertyName) => {
  if (item && item[propertyName]) {
    return typeof item[propertyName] === "string" ||
      item[propertyName] instanceof String
      ? item[propertyName]
      : "";
  }
  return item && (typeof item === "string" || item instanceof String)
    ? item
    : "";
};

const SelectBoxWithButton = memo(
  ({
    btnSize,
    icon,
    name,
    value,
    option,
    label,
    width,
    required,
    placeholder,
    change,
    focus,
    propertyName,
    disable,
    applyClass,
    text,
    click,
  }) => {
    const options = option ? option : content;
    const isEmptyValue =
      value === "" ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0);
    const selectedIndex = isEmptyValue
      ? undefined
      : options.findIndex((item) => item === value);

    const antdOptions = options.map((item, idx) => ({
      value: idx,
      label: getOptionLabel(item, propertyName),
    }));

    const handleChange = (idx) => {
      // See select-box.js — MUI's Autocomplete onChange was (event, newValue)
      // and no caller ever reads the event arg, so it's preserved as null.
      change(null, idx === undefined ? null : options[idx]);
    };

    return (
      <div className="u-display-flex">
        <div
          className={label ? floatingLabelStyles.wrapper : undefined}
          style={{ flex: 1 }}
        >
          {label ? (
            <span className={floatingLabelStyles.floatingLabel}>
              {label}
              {required ? <span style={{ color: "red" }}> *</span> : null}
            </span>
          ) : null}
          <Select
            showSearch
            allowClear
            disabled={disable}
            onFocus={focus}
            id={name}
            value={selectedIndex === -1 ? undefined : selectedIndex}
            placeholder={placeholder && placeholder}
            size="large"
            options={antdOptions}
            // See select-box.js — width is never actually passed by callers;
            // fall back to 100% so it fills its flex:1 wrapper.
            style={{ width: width ? width : "100%" }}
            onChange={handleChange}
            onClear={() => change(null, null)}
            filterOption={(input, opt) =>
              (opt?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
        <Button
          onClick={click}
          size="large"
          disabled={disable ? true : false}
          type="primary"
          className={styles[`${applyClass}`]}
        >
          {/* See Button/button.js — antd only auto-spaces its own icon
              components via CSS, not the plain <i className="icon-..."> font
              icons this app passes here. */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {icon ? icon : null}
            {text ? <span>{text}</span> : null}
          </span>
        </Button>
      </div>
    );
  }
);

export default SelectBoxWithButton;
