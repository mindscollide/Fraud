import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Space, Row, Col } from "antd";
import { Notification } from "../Notifications";
import {
  FormattedInputs,
} from "../FormatedInput/FormatedInput";
const FancyBox = ({
  ViewState,
  title,
  data,
  disable,
  handler,
  ind,
  index,
  state,
  FRATotal,
  ABNSTotal,
  APBSTotal,
  required,
  setallinput,
  allinput,
}) => {
  const isDisable = disable && styles.disable;
  const [State, setstate] = useState({
    open: true,
    message: "",
  });

  const onBlurPrinciple = () => {
    setallinput(false);
    if (state) {
      if (
        state.FRAPrincipal > 0 &&
        state.ABNSOutstandingPrincipal >= state.FRAPrincipal
      ) {
        setallinput(true);
      } else if (
        state.ABNSOutstandingPrincipal >= 0 &&
        state.ABNSOutstandingPrincipal >= state.FRAPrincipal
      ) {
        setallinput(true);
      } else if (state.ABNSOutstandingPrincipal < state.FRAPrincipal) {
        setallinput(false);
        setstate({
          ...State,
          open: true,
          message:
            "Negotiated Principle Should be Greater than The Relief Principle",
        });
      }
    }
  };
  const onBlurNominal = () => {
    setallinput(false);
    if (state) {
      if (
        state.FRANominated > 0 &&
        state.ABNSOutstandingNominal >= state.FRANominated
      ) {
        setallinput(true);
      } else if (
        state.ABNSOutstandingNominal >= 0 &&
        state.ABNSOutstandingNominal >= state.FRANominated
      ) {
        setallinput(true);
      } else if (state.ABNSOutstandingNominal < state.FRANominated) {
        setallinput(false);
        setstate({
          ...State,
          open: true,
          message:
            "Amount Before Negotiated Principal Outstanding Nominated cannot be Less than Financial Relief Allowed Nominated",
        });
      }
    }
  };
  const onBlurNonAccural = () => {
    setallinput(false);
    if (state) {
      if (
        state.FRANonAccural > 0 &&
        state.ABNSOutstandingNonAccural >= state.FRANonAccural
      ) {
        setallinput(true);
      } else if (
        state.ABNSOutstandingNonAccural >= 0 &&
        state.ABNSOutstandingNonAccural >= state.FRANonAccural
      ) {
        setallinput(true);
      } else if (state.ABNSOutstandingNonAccural < state.FRANonAccural) {
        setallinput(false);
        setstate({
          ...State,
          open: true,
          message:
            "Amount Before Negotiated Principal Outstanding Non-Accrual cannot be Less than Financial Relief Allowed Non-Accrual",
        });
      }
    }
  };
  const onBlurOtherCharges = () => {
    setallinput(false);

    if (state) {
      if (
        state.FRAOtherCharges > 0 &&
        state.ABNSOtherCharges >= state.FRAOtherCharges
      ) {
        setallinput(true);
      } else if (
        state.ABNSOtherCharges >= 0 &&
        state.ABNSOtherCharges >= state.FRAOtherCharges
      ) {
        setallinput(true);
      } else if (state.ABNSOtherCharges < state.FRAOtherCharges) {
        setallinput(false);
        setstate({
          ...State,
          open: true,
          message:
            "Amount Before Negotiated Principal Other Charges cannot be Less than Financial Relief Allowed Other Charges",
        });
      }
    }
  };
  const onBlurPanelInterest = () => {
    setallinput(false);
    if (state) {
      if (
        state.FRAPenalInterest > 0 &&
        state.ABNSPenalInterest >= state.FRAPenalInterest
      ) {
        setallinput(true);
      } else if (
        state.ABNSPenalInterest >= 0 &&
        state.ABNSPenalInterest >= state.FRAPenalInterest
      ) {
        setallinput(true);
      } else if (state.ABNSPenalInterest < state.FRAPenalInterest) {
        setallinput(false);
        setstate({
          ...State,
          open: true,
          message:
            "Amount Before Negotiated Principal Penal Interest cannot be Less than Financial Relief Allowed Penal Interest",
        });
      }
    }
  };
  useEffect(() => {
    if (state) {
      if (state.ABNSOutstandingPrincipal > state.FRAPrincipal) {
        state.APBSOutstandingPrincipal =
          state.ABNSOutstandingPrincipal - state.FRAPrincipal;
      } else {
        state.APBSOutstandingPrincipal = 0;
      }
      if (state.ABNSOutstandingNominal > state.FRANominated) {
        state.APBSOutstandingNominal =
          state.ABNSOutstandingNominal - state.FRANominated;
      } else {
        state.APBSOutstandingNominal = 0;
      }
      if (state.ABNSOutstandingNonAccural > state.FRANonAccural) {
        state.APBSOutstandingNonAccural =
          state.ABNSOutstandingNonAccural - state.FRANonAccural;
      } else {
        state.APBSOutstandingNonAccural = 0;
      }
      if (state.ABNSOtherCharges > state.FRAOtherCharges) {
        state.APBSOtherCharges = state.ABNSOtherCharges - state.FRAOtherCharges;
      } else {
        state.APBSOtherCharges = 0;
      }
      if (state.ABNSPenalInterest > state.FRAPenalInterest) {
        state.APBSPenalInterest =
          state.ABNSPenalInterest - state.FRAPenalInterest;
      } else {
        state.APBSPenalInterest = 0;
      }
    }
  }, [state ? state : ""]);
  return (
    <Row gutter={16} className="u-background-color-e7f5f4 u-padding-1pct">
      <Notification
        setOpen={setstate}
        open={State.open}
        message={State.message}
      />
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>
              {"Amount Before Negotiated Settlement"}
            </div>
            <div className={styles.contentbox}>
              <FormattedInputs
                onblur={onBlurPrinciple}
                name={
                  ViewState
                    ? "abnsOutstandingPrincipal"
                    : "ABNSOutstandingPrincipal"
                }
                change={handler}
                value={
                  state
                    ? state.ABNSOutstandingPrincipal
                    : ViewState
                    ? ViewState.abnsOutstandingPrincipal
                    : ""
                }
                label={"Outstanding Principal"}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNominal}
                name={
                  ViewState
                    ? "abnsOutstandingNominal"
                    : "ABNSOutstandingNominal"
                }
                change={handler}
                label={"Outstanding Nominated (Debited Mark-up)"}
                disable={disable ? true : null}
                value={
                  state
                    ? state.ABNSOutstandingNominal
                    : ViewState
                    ? ViewState.abnsOutstandingNominal
                    : ""
                }
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNonAccural}
                name={
                  ViewState
                    ? "abnsOutstandingNonAccural"
                    : "ABNSOutstandingNonAccural"
                }
                label={"Outstanding Non-Accrual (Un-debited Mark-up)"}
                change={handler}
                value={
                  state
                    ? state.ABNSOutstandingNonAccural
                    : ViewState
                    ? ViewState.abnsOutstandingNonAccural
                    : ""
                }
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <div className="u-display-flex">
                <Space>
                  <FormattedInputs
                    onblur={onBlurOtherCharges}
                    name={ViewState ? "abnsOtherCharges" : "ABNSOtherCharges"}
                    label={"Other Charges"}
                    value={
                      state
                        ? state.ABNSOtherCharges
                        : ViewState
                        ? ViewState.abnsOtherCharges
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                  <FormattedInputs
                    onblur={onBlurPanelInterest}
                    name={ViewState ? "abnsPenalInterest" : "ABNSPenalInterest"}
                    label={"Penal Interest"}
                    value={
                      state
                        ? state.ABNSPenalInterest
                        : ViewState
                        ? ViewState.abnsPenalInterest
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                </Space>
              </div>
              <div className="u-margin-top-10px" />
              <FormattedInputs
                value={ABNSTotal}
                label={"Total"}
                name={ViewState ? "abnsTotal" : "ABNSTotal"}
                disable={true}
                placeholder="Total"
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>
              {"Amount Paid by the Borrower at the time of Settlement"}
            </div>
            <div className={styles.contentbox}>
              <FormattedInputs
                onblur={onBlurPrinciple}
                name={
                  ViewState
                    ? "apbsOutstandingPrincipal"
                    : "APBSOutstandingPrincipal"
                }
                value={
                  state
                    ? state.APBSOutstandingPrincipal
                    : ViewState
                    ? ViewState.apbsOutstandingPrincipal
                    : ""
                }
                label={"Principal"}
                change={handler}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNominal}
                label={"Nominated (Debited Mark-up)"}
                name={
                  ViewState
                    ? "apbsOutstandingNominal"
                    : "APBSOutstandingNominal"
                }
                value={
                  state
                    ? state.APBSOutstandingNominal
                    : ViewState
                    ? ViewState.apbsOutstandingNominal
                    : null
                }
                change={handler}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNonAccural}
                label={"Non-Accrual (Un-Debited Mark-up)"}
                name={
                  ViewState
                    ? "apbsOutstandingNonAccural"
                    : "APBSOutstandingNonAccural"
                }
                value={
                  state
                    ? state.APBSOutstandingNonAccural
                    : ViewState
                    ? ViewState.apbsOutstandingNonAccural
                    : ""
                }
                change={handler}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <div className="u-display-flex">
                <Space>
                  <FormattedInputs
                    onblur={onBlurOtherCharges}
                    label={"Other Charges"}
                    value={
                      state
                        ? state.APBSOtherCharges
                        : ViewState
                        ? ViewState.apbsOtherCharges
                        : ""
                    }
                    name={ViewState ? "apbsOtherCharges" : "APBSOtherCharges"}
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                  <FormattedInputs
                    onblur={onBlurPanelInterest}
                    label={"Penal Interest"}
                    value={
                      state
                        ? state.APBSPenalInterest
                        : ViewState
                        ? ViewState.apbsPenalInterest
                        : ""
                    }
                    name={ViewState ? "apbsPenalInterest" : "APBSPenalInterest"}
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                </Space>
              </div>
              <div className="u-margin-top-10px" />
              <FormattedInputs
                value={APBSTotal}
                name={ViewState ? "apbnsTotal" : "APBSTotal"}
                label={"Total"}
                disable={true}
                placeholder="Total"
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>
              {"Financial Relief Allowed"}
            </div>
            <div className={styles.contentbox}>
              <FormattedInputs
                onblur={onBlurPrinciple}
                label={"Principal"}
                name={ViewState ? "fraPrincipal" : "FRAPrincipal"}
                change={handler}
                disable={disable ? true : null}
                value={
                  state
                    ? state.FRAPrincipal
                    : ViewState
                    ? ViewState.fraPrincipal
                    : ""
                }
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNominal}
                label={"Nominated"}
                name={ViewState ? "fraNominated" : "FRANominated"}
                value={
                  state
                    ? state.FRANominated
                    : ViewState
                    ? ViewState.fraNominated
                    : ""
                }
                change={handler}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <FormattedInputs
                onblur={onBlurNonAccural}
                label={"Non-Accural"}
                name={ViewState ? "fraNonAccural" : "FRANonAccural"}
                value={
                  state
                    ? state.FRANonAccural
                    : ViewState
                    ? ViewState.fraNonAccural
                    : ""
                }
                change={handler}
                disable={disable ? true : null}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required={required}
              />
              <div className="u-margin-top-10px" />
              <div className="u-display-flex">
                <Space>
                  <FormattedInputs
                    onblur={onBlurOtherCharges}
                    label={"Other Charges"}
                    name={ViewState ? "fraOtherCharges" : "FRAOtherCharges"}
                    value={
                      state
                        ? state.FRAOtherCharges
                        : ViewState
                        ? ViewState.fraOtherCharges
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                  <FormattedInputs
                    onblur={onBlurPanelInterest}
                    label={"Penal Interest"}
                    name={ViewState ? "fraPenalInterest" : "FRAPenalInterest"}
                    value={
                      state
                        ? state.FRAPenalInterest
                        : ViewState
                        ? ViewState.fraPenalInterest
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required={required}
                  />
                </Space>
              </div>
              <div className="u-margin-top-10px" />
              <FormattedInputs
                value={FRATotal}
                label={"Total"}
                name={ViewState ? "fraTotal" : "FRATotal"}
                disable={true}
                placeholder="Total"
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FancyBox;
