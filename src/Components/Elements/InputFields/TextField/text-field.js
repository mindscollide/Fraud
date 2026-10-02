import React from "react";
import { Input } from "antd";
import styles from "../../floating-label.module.css";

// This app's "small"/"large" convention was written for MUI's outlined
// TextField, where size="small" renders ~40px tall. antd's own "small"
// preset is only 24px — mapping to antd's "large" (40px) instead keeps the
// same rendered height these fields have always had, rather than shrinking
// every text input relative to the still-MUI dropdowns.
const ANTD_SIZE = { small: "large", medium: "large", large: "large" };

const CustomizedTextField = ({
  autoComplete,
  ref,
  id,
  focus,
  value,
  label,
  width,
  required,
  disable,
  type,
  size,
  helper,
  error,
  fullWidth,
  multiline,
  rows,
  placeholder,
  textLength,
  margin,
  change,
  name,
  minLength,
  isUpperCase,
  applyClass,
  classpass,
}) => {
  const InputComponent = multiline ? Input.TextArea : Input;

  return (
    <div className={label ? styles.wrapper : undefined}>
      {label ? (
        <span className={styles.floatingLabel}>
          {label}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </span>
      ) : null}
      <InputComponent
        autoComplete={autoComplete}
        className={applyClass}
        ref={ref && ref}
        id={id && id}
        onFocus={focus}
        name={name && name}
        onChange={change}
        style={{
          width: fullWidth ? "100%" : `${width}`,
          margin: `${margin}`,
          WebkitTextSecurity: classpass,
          textTransform: isUpperCase ? "uppercase" : "none",
        }}
        placeholder={placeholder && placeholder}
        rows={rows}
        value={value === null ? "" : value}
        size={ANTD_SIZE[size] || "large"}
        status={error ? "error" : undefined}
        type={type}
        maxLength={textLength}
        minLength={minLength}
        disabled={disable}
        required={required ? true : false}
      />
      {error && helper ? (
        <div style={{ color: "red", fontSize: "0.75rem" }}>{helper}</div>
      ) : null}
    </div>
  );
};
export default CustomizedTextField;
