import moment from "moment";

export const removeDashesFromDate = (data) => {
  let value = data.split("-");
  return `${value[0]}${value[1]}${value[2]}`;
};

export const DateDisplayFormat = (data) =>
  data.slice(6, 8) + "-" + data.slice(4, 6) + "-" + data.slice(0, 4);

//Remove ":"
export const RemoveTimeDashes = (data) =>
  data.slice(0, 2) + data.slice(3, 5) + data.slice(6, 8);

// Time Format
export const TimeDisplayFormat = (data) =>
  data.slice(0, 2) + ":" + data.slice(2, 4) + ":" + data.slice(4, 6);

// Time Format
export const TimeAndDisplayFormat = (data) =>
  data.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, "$4:$5:$6");
export const DateSendingFormat = (data) => {
  if (data.length > 0) {
    let value = data.split("-");
    return `${value[2]}${value[1]}${value[0]}`;
  }
};

export const currentToOneYearBackDate = (format) => {
  let _moment = moment();

  let toDate = _moment.format(format);
  let fromDate = _moment.subtract(1, "years").format(format);
  return { toThisDate: toDate, fromThisDate: fromDate };
};
export const NumberFormater = (value) => {
  return parseFloat(parseFloat(value).toFixed(2));
};
export const CommaFormter = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const CardNumberFormatter = (num) => {
  return num.match(/.{1,4}/g).join(" ");
};
