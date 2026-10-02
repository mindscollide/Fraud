import React from "react";
import { Input } from "antd";
import NumberFormat from "react-number-format";
import styles from "../floating-label.module.css";

export const FormattedInputs = ({
  autoComplete,
  label,
  Label,
  value,
  size,
  change,
  name,
  required,
  disable,
  type,
  textLength,
  minLength,
  fullWidth,
  placeholder,
  onblur,
  maxLength,
}) => {
  return (
    <>
      {label ? (
        <b className="u-font-size-0_7rem">
          {label}
          {required ? <i className="u-font-size-0_7rem u-color-red">*</i> : null}
        </b>
      ) : null}
      <div className={Label ? styles.wrapper : undefined}>
        {Label ? (
          <span className={styles.floatingLabel}>
            {Label}
            {required ? <span style={{ color: "red" }}> *</span> : null}
          </span>
        ) : null}
        {/* react-number-format's customInput renders antd's Input as the
            actual DOM element and handles all ref-forwarding internally —
            this replaces the previous MUI TextField + inputComponent +
            hand-built forwardRef/inputRef-stripping dance entirely, rather
            than porting it (that plumbing caused a real crash earlier in
            this migration and was fragile). */}
        <NumberFormat
          customInput={Input}
          thousandsGroupStyle="thousand"
          decimalSeparator="."
          thousandSeparator={true}
          decimalScale={2}
          type={type}
          value={value === null ? "" : value}
          autoComplete={autoComplete}
          onBlur={onblur}
          placeholder={placeholder}
          size="large"
          name={name}
          disabled={disable}
          maxLength={maxLength}
          minLength={minLength}
          style={{
            width: fullWidth ? "100%" : undefined,
          }}
          onValueChange={(values) => {
            change({
              target: {
                name: name,
                value: values.value,
              },
            });
          }}
        />
      </div>
    </>
  );
};
