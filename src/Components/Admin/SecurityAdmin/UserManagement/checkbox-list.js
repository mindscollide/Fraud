import { Checkbox } from "antd";
function onChange(checkedValues) {}
const Styles = {
  parentCheckBox: {
    color: "#025f5c",
    fontWeight: "600",
  },
  childCheckbox: {
    marginTop: 10,
  },
};
const CheckBoxesList = () => {
  return (
    <>
      <Checkbox.Group
        className="u-width-100pct u-padding-10px"
        onChange={onChange}
      >
        <div className="u-display-flex u-flex-direction-column u-width-100pct">
          <Checkbox value="CaptureWriteOff">
            <span style={Styles.parentCheckBox}> Capture Write Off</span>
          </Checkbox>
          <Checkbox value="AddWriteOff" style={Styles.childCheckbox}>
            Add Write Off
          </Checkbox>
          <Checkbox value="EditWriteOff" style={Styles.childCheckbox}>
            Edit Write Off
          </Checkbox>
        </div>
      </Checkbox.Group>

      <div className="u-margin-top-20px" />
      <Checkbox.Group className="u-width-100pct" onChange={onChange}>
        <div className="u-display-flex u-flex-direction-column">
          <Checkbox value="Reports">
            <span style={Styles.parentCheckBox}>Reports</span>
          </Checkbox>
          <Checkbox value="CompleteReport" style={Styles.childCheckbox}>
            Complete Report
          </Checkbox>
          <Checkbox value="Credit Policy" style={Styles.childCheckbox}>
            Credit Policy
          </Checkbox>
          <Checkbox value="Balance Sheet Format" style={Styles.childCheckbox}>
            Balance Sheet Format
          </Checkbox>
        </div>
      </Checkbox.Group>
      <div className="u-margin-top-20px" />
      <Checkbox.Group className="u-width-100pct" onChange={onChange}>
        <div className="u-display-flex u-flex-direction-column">
          <Checkbox value="Audit rail">
            <span style={Styles.parentCheckBox}> Audit Trail</span>
          </Checkbox>
          <Checkbox value="UserActivity" style={Styles.childCheckbox}>
            User Activity
          </Checkbox>
          <Checkbox value="UserLoginHistory" style={Styles.childCheckbox}>
            User Login History
          </Checkbox>
          <Checkbox value="CurrentlyLoggedinUsers" style={Styles.childCheckbox}>
            Currently Logged in Users
          </Checkbox>
        </div>
      </Checkbox.Group>
    </>
  );
};

export default CheckBoxesList;
