import * as React from "react";
import { Select, Checkbox } from "antd";
import styles from "../../floating-label.module.css";
import { useState } from "react";

export default function MultipleSelectCheckmarks({
  setSelectedUserRoleName,
  selectedUserRoleName,
  selected,
  setSelected,
  option,
  lable,
  disable,
  placeholder,
}) {
  const isAllSelected = option.length > 0 && selected.length === option.length;
  const isIndeterminate =
    selected.length > 0 && selected.length < option.length;

  // The dropdown's own displayed value is selectedUserRoleName, kept one
  // render behind `selected` via this effect — preserved exactly as the
  // original MUI version had it, since callers may rely on this specific
  // two-prop pair (raw selection vs. the synced display value) elsewhere.
  React.useEffect(() => {
    setSelectedUserRoleName(selected);
  }, [selected]);

  const antdOptions = option.map((name) => ({ label: name, value: name }));
  const [deselectClicked, setDeselectClicked] = useState(false);
  const selectAll = () => {
    setSelected(option);
    setDeselectClicked(false);
  };
  const deselectAll = () => {
    setSelected([]);
    setDeselectClicked(true);
  };

  return (
    <div className={lable ? styles.wrapper : undefined}>
      {lable ? <span className={styles.floatingLabel}>{lable}</span> : null}
      <Select
        mode="multiple"
        size="large"
        value={selectedUserRoleName}
        onChange={(newValue) => {
          setSelected(newValue);
          setDeselectClicked(false);
        }}
        options={antdOptions}
        disabled={disable}
        style={{ width: "100%" }}
        listHeight={224}
        dropdownMatchSelectWidth={250}
        // Collapses every selected tag into one plain comma-joined string
        // (matching MUI's old renderValue) instead of antd's default
        // per-item tag pills.
        maxTagCount={0}
        maxTagPlaceholder={() => selected.join(", ")}
        dropdownRender={(menu) => (
          // onMouseDown/preventDefault on the whole block, not just each
          // row, stops antd's Select from treating any click in here as a
          // blur-and-close — without it the dropdown closed before the
          // click handlers below ever ran.
          <div onMouseDown={(e) => e.preventDefault()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "5px 12px",
              }}
            >
              <span
                className="CheckAllClick"
                onClick={selectAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={selectAll}
                />
                <span style={{ fontWeight: 500, marginLeft: 8 }}>
                  Select All
                </span>
              </span>
              {/* <span
                className="UncheckAllClick"
                onClick={deselectAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={deselectAll}
                />
                <span style={{ fontWeight: 500, marginLeft: 8 }}>
                  Deselect All
                </span>
              </span> */}

              <span
                className="UncheckAllClick"
                onClick={deselectAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Checkbox checked={deselectClicked} />
                <span style={{ fontWeight: 500, marginLeft: 8 }}>
                  Deselect All
                </span>
              </span>
            </div>
            {menu}
          </div>
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
