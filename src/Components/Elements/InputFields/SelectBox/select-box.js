import React, { memo } from "react";
import { Select } from "antd";
import styles from "../../floating-label.module.css";

const content = ["No Data Found"];

// MUI's Autocomplete is object-based: options={items}, value={theActualItem},
// onChange(event, newValue). antd's Select is value-based: options must be
// {label, value} pairs, and `value` must match one option's primitive
// `value`. Rather than changing the ~68 call sites that pass raw objects/
// strings and expect the real item back in `change`, the index of each
// option in the `option` array is used as antd's primitive `value` — purely
// an internal implementation detail, invisible to callers.
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

const SelectBox = memo(
  ({
    size,
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
      // MUI's Autocomplete onChange was (event, newValue) — every existing
      // caller's handler expects that same shape, so it's preserved exactly
      // (the event arg was never actually read by any of them).
      change(null, idx === undefined ? null : options[idx]);
    };

    return (
      <div className={label ? styles.wrapper : undefined}>
        {label ? (
          <span className={styles.floatingLabel}>
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
          // `width` is never actually passed by any real caller — MUI's
          // Autocomplete defaulted to filling its container; antd's Select
          // doesn't, so without an explicit 100% fallback it was rendering
          // at its own intrinsic width instead of the Col's full width.
          style={{ width: width ? width : "100%" }}
          onChange={handleChange}
          onClear={() => change(null, null)}
          filterOption={(input, opt) =>
            (opt?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    );
  }
);

export default SelectBox;
