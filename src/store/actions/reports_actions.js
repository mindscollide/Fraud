import * as actions from "../action_types";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";

import {
  reportsApi,
  downloadExcelFile,
  InvestigationOfficerAPI,
  InvestigationOfficerAPIDC,
  InvestigationOfficerAPIADC,
  InvestigationOfficerAPIBBK,
  InvestigationOfficerAPINONAPI,
} from "../../Common/Api/apis-end-points";

import {
  completeReportConfigs,
  creditPolicyReportConfigs,
  balanceSheetReportConfigs,
  completeReportExcelConfigs,
  creditReportExcelConfigs,
  balanceReportExcelConfigs,
  UploadDocument,
  creditCardReportExcel,
  debitCardReportExcel,
  adcReportExcel,
  BBKReportExcel,
  nonAPIReportExcel,
  ageingReportExcel,
  regionwiseReportExcel,
  ndReportExcel,
  auditTrailReportExcel,
} from "../../Common/Api/apis-config";

import { SomeThingWentWrong } from "./ui-actions";

//   COMPLETE REPORT ACTIONS
const completeReportInit = () => {
  return {
    type: actions.COMPLETE_REPORT_INIT,
  };
};

const completeReportSuccess = (response) => {
  return {
    type: actions.COMPLETE_REPORT_SUCCESS,
    response: response,
  };
};

const completeReportFauilure = (response) => {
  return {
    type: actions.COMPLETE_REPORT_FAIL,
    response: response,
  };
};

const completeReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", completeReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        // _token: completeReportConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReport(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound) {
            dispatch(completeReportSuccess(response.data));
          } else {
            dispatch(completeReportFauilure(response.data));
          }
        }
      })
      .catch((response) => {
        dispatch(completeReportFauilure(response.data));
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//   CREDIT POLICY REPORT ACTIONS

const creditPolicyReportInit = () => {
  return {
    type: actions.CREDIT_POLICY_REPORT_INIT,
  };
};

const creditPolicyReportSuccess = (response) => {
  return {
    type: actions.CREDIT_POLICY_REPORT_SUCCESS,
    response: response,
  };
};

const creditPolicyReportFauilure = (response) => {
  return {
    type: actions.CREDIT_POLICY_REPORT_FAIL,
    response: response,
  };
};

const creditPolicyReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", creditPolicyReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(creditPolicyReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(creditPolicyReport(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(creditPolicyReportSuccess(response.data));
          } else {
            dispatch(creditPolicyReportFauilure(response.data));
          }
        }
      })
      .catch((response) => {
        dispatch(creditPolicyReportFauilure(response.data));
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//   BALANCE SHEET REPORT ACTIONS
const balanceSheetReportInit = () => {
  return {
    type: actions.BALANCE_SHEET_REPORT_INIT,
  };
};

const balanceSheetReportSuccess = (response) => {
  return {
    type: actions.BALANCE_SHEET_REPORT_SUCCESS,
    response: response,
  };
};

const balanceSheetReportFauilure = (response) => {
  return {
    type: actions.BALANCE_SHEET_REPORT_FAIL,
    response: response,
  };
};

const balanceSheetReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", balanceSheetReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(balanceSheetReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(balanceSheetReport(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(balanceSheetReportSuccess(response.data));
          } else {
            dispatch(balanceSheetReportFauilure(response.data));
          }
        }
      })
      .catch((response) => {
        dispatch(balanceSheetReportFauilure(response.data));
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const downloadExcelFileInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_FILE_INIT,
  };
};

const downloadExcelFileFail = (response) => {
  return {
    type: actions.DOWNLOAD_EXCEL_FILE_FAIL_INIT,
    response: response,
  };
};

const balanceReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let form = new FormData();
  form.append("RequestMethod", balanceReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: balanceReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(balanceReportExcel(data));
        } else if (response.data.responseCode === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "balance-report.xlsx");
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const completeReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let form = new FormData();
  form.append("RequestMethod", completeReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: completeReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReportExcel(data));
        } else if (response.data.responseCode === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "complete-report.xlsx");
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const creditReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let form = new FormData();
  form.append("RequestMethod", creditReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: creditReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(creditReportExcel(data));
        } else if (response.data.responseCode === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "credit-report.xlsx");
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const uploadDocumentSuccess = (response) => {
  return {
    type: actions.UPLOAD_DOCUMNET_FILE_SUCCESS,
    response: response,
  };
};
const RESETALLSTATEFORREPORTS = () => {
  return {
    type: actions.RESET_ALL_STATE_REPORTS,
    response: [],
  };
};

const setStateOfUploadDocumentCreditCard = () => {
  return {
    type: actions.RESET_UPLOAD_FILES,
    response: [],
  };
};

// for loader
const LOADERREPORT = (response) => {
  return {
    type: actions.LOADER_REPORT,
    action: response,
  };
};

// credit card report download
const CreditCardReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", creditCardReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(CreditCardReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "credit-card-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Debit card report download
const DebitCardReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", debitCardReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(DebitCardReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "debit-card-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// ADC report download
const ADCReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", adcReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(ADCReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "adc-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// BBKonnect Report Excel download
const BBKonnectReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", BBKReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(BBKonnectReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "bbkonnect-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// NON API Report Excel download
const NONAPIReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", nonAPIReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(NONAPIReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "non-api-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// NON API Report Excel download
const NegativeDBExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", ndReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(NegativeDBExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "negative-DB-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Download Ageing Report
const AgeingReportExcel = (data) => {
  let Data = { ReportTypeRequest: data };
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", ageingReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    if (data === 1) {
      axios({
        method: "post",
        url: downloadExcelFile,
        data: form,
        headers: {
          _token: token,
          "Content-Disposition": "attachment; filename=template.xlsx",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "arraybuffer",
      })
        .then(async (response) => {
          if (response.status === 417) {
            await dispatch(refreshToken());
            dispatch(AgeingReportExcel(data));
          } else if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            let newName;
            if (data === 1) {
              newName = "ageing-Summary-report.xlsx";
            } else if (data === 2) {
              newName = "ageing-Details-report.csv";
            } else if (data === 3) {
              newName = "ageing-AmountWise-report.csv";
            }
            link.setAttribute("download", newName);
            document.body.appendChild(link);
            link.click();

            dispatch(LOADERREPORT(false));
          }
        })
        .catch((response) => {
          dispatch(SomeThingWentWrong(response));
        });
    } else {
      axios({
        method: "post",
        url: downloadExcelFile,
        data: form,
        headers: {
          _token: token,
          "Content-Disposition": "attachment; filename=template.csv",
          "Content-Type": "text/csv",
        },
        responseType: "arraybuffer",
      })
        .then(async (response) => {
          if (response.status === 417) {
            await dispatch(refreshToken());
            dispatch(AgeingReportExcel(data));
          } else if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            let newName;
            if (data === 1) {
              newName = "ageing-Summary-report.xlsx";
            } else if (data === 2) {
              newName = "ageing-Details-report.csv";
            } else if (data === 3) {
              newName = "ageing-AmountWise-report.csv";
            }
            link.setAttribute("download", newName);
            document.body.appendChild(link);
            link.click();

            dispatch(LOADERREPORT(false));
          }
        })
        .catch((response) => {
          dispatch(SomeThingWentWrong(response));
        });
    }
  };
};

// Download Region Wise Staff
const RegionWiseReportExcel = (data) => {
  let Data = { RegionID: data };
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", regionwiseReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(RegionWiseReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "region-wise-staff-list-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// DownloadUploadFile
const DownloadUploadFile = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", debitCardReportExcel.RequestMethod1);
  form.append("RequestData", JSON.stringify(data));
  var ext = data.OriginalFileName.split(".").pop();
  let contentType;
  if (ext === "doc") {
    contentType = "application/msword";
  } else if (ext === "docx") {
    contentType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (ext === "xls") {
    contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (ext === "xlsx") {
    contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (ext === "pdf") {
    contentType = "application/pdf";
  } else if (ext === "png") {
    contentType = "image/png";
  } else if (ext === "txt") {
    contentType = "text/plain";
  } else if (ext === "jpg") {
    contentType = "image/jpeg";
  } else if (ext === "jpeg") {
    contentType = "image/jpeg";
  } else {
  }
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template." + ext,
        "Content-Type": contentType,
      },
      responseType: "blob",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(DownloadUploadFile(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data.DisplayFileName);
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Credit Card
const UploadFileCC = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let finalObject = {};

  let form = new FormData();
  form.append("RequestMethod", UploadDocument.RequestMethod);
  form.append("RequestData", JSON.stringify(finalObject));
  form.append("File", data);
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UploadFileCC(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            dispatch(uploadDocumentSuccess(response.data.responseResult));
          } else {
            dispatch(downloadExcelFileFail());
          }
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Debit Card
const UploadFileDC = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let finalObject = {};

  let form = new FormData();
  form.append("RequestMethod", UploadDocument.RequestMethod);
  form.append("RequestData", JSON.stringify(finalObject));
  form.append("File", data);
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UploadFileDC(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            dispatch(uploadDocumentSuccess(response.data.responseResult));
          } else {
            dispatch(downloadExcelFileFail());
          }
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//ADC
const UploadFileADC = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let finalObject = {};

  let form = new FormData();
  form.append("RequestMethod", UploadDocument.RequestMethod);
  form.append("RequestData", JSON.stringify(finalObject));
  form.append("File", data);
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UploadFileADC(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            dispatch(uploadDocumentSuccess(response.data.responseResult));
          } else {
            dispatch(downloadExcelFileFail());
          }
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//BBKonnect
const UploadFileBBK = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let finalObject = {};
  let form = new FormData();
  form.append("RequestMethod", UploadDocument.RequestMethod);
  form.append("RequestData", JSON.stringify(finalObject));
  form.append("File", data);
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UploadFileBBK(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            dispatch(uploadDocumentSuccess(response.data.responseResult));
          } else {
            dispatch(downloadExcelFileFail());
          }
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//NON API
const UploadFileNPI = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let finalObject = {};
  let form = new FormData();
  form.append("RequestMethod", UploadDocument.RequestMethod);
  form.append("RequestData", JSON.stringify(finalObject));
  form.append("File", data);
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UploadFileNPI(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            dispatch(uploadDocumentSuccess(response.data.responseResult));
          } else {
            dispatch(downloadExcelFileFail());
          }
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Download Region Wise Staff
const AuditTrailReportDownload = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", auditTrailReportExcel.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.status === 417) {
          await dispatch(refreshToken());
          dispatch(AuditTrailReportDownload(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "audit-trail-report.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(LOADERREPORT(false));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  RESETALLSTATEFORREPORTS,
  setStateOfUploadDocumentCreditCard,
  completeReport,
  creditPolicyReport,
  balanceSheetReport,
  balanceReportExcel,
  completeReportExcel,
  creditReportExcel,
  UploadFileCC,
  UploadFileDC,
  UploadFileADC,
  UploadFileBBK,
  UploadFileNPI,
  uploadDocumentSuccess,
  CreditCardReportExcel,
  DebitCardReportExcel,
  ADCReportExcel,
  BBKonnectReportExcel,
  NONAPIReportExcel,
  AgeingReportExcel,
  RegionWiseReportExcel,
  LOADERREPORT,
  NegativeDBExcel,
  DownloadUploadFile,
  AuditTrailReportDownload,
};
