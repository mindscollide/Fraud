export const checkEmptyField = (data) => {
  let dataToStr = String(data);
  return dataToStr.length > 0 ? false : true;
};
export const validEmailAddress = (data) => {
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let dataToStr = String(data);

  return dataToStr.match(pattern) ? true : false;
};