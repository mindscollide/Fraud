import React from "react";
import { Button } from "antd";
import styles from "./styles.module.css";
import TextField from "../InputFields/TextField/text-field";

const InputWithBtn = ({
  click,
  ref,
  label,
  icon,
  text,
  autoComplete,
  placeholder,
  applyClass,
  helperText,
  textFieldSize,
  fullWidth,
  error,
  textLength,
  required,
  onchange,
  value,
  classpas,
  name,
  disable,
  isUpperCase,
  type,
  size,
  maxLength,
  minLength,
  disable1,
}) => {
  return (
    <div className="u-display-flex">
      {/* flex:1 so the input fills all space the Button doesn't need —
          without this it only takes its natural content width, ending up
          visibly shorter than a plain full-width field with no button
          attached (e.g. SignUp's "Enter LDAP ID" beside "Enter Password"). */}
      <div style={{ flex: 1 }}>
        <TextField
          placeholder={placeholder ? placeholder : null}
          size={size}
          autoComplete={autoComplete}
          type={type ? type : null}
          isUpperCase={isUpperCase}
          disable={disable1 ? true : false}
          ref={ref}
          name={name}
          value={value}
          change={onchange}
          helper={helperText}
          size={textFieldSize}
          label={label}
          fullWidth={fullWidth}
          error={error && error}
          textLength={textLength}
          classpass={classpas}
          required={required}
          InputLabelProps={{
            maxLength: textLength,
            minLength: minLength,
            shrink: true,
          }}
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
            icons this app passes here; a flex row with a fixed gap aligns
            and spaces both consistently. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {icon ? icon : null}
          {text ? <span>{text}</span> : null}
        </span>
      </Button>
    </div>
  );
};

export default InputWithBtn;
