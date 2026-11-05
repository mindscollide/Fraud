export const checkEmptyField = (data) => {
  let dataToStr = String(data);
  return dataToStr.length > 0 ? false : true;
};
export const validEmailAddress = (data) => {
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let dataToStr = String(data);

  return dataToStr.match(pattern) ? true : false;
};
// Card number as typed into the "9999 XXXX XXXX 9999" mask, or as prefilled
// from IRIS ("1234XXXXXXX2134", no spaces): first and last 4 digits, masked
// or digit middle. An unfinished mask still holds "_" and fails.
export const validCardNumber = (data) => {
  const card = String(data ?? "").replace(/\s/g, "");
  return /^\d{4}[\dX]+\d{4}$/i.test(card) && card.length >= 12;
};