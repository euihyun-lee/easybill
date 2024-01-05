export const numWithCommas = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const isDigit = string => /^\d+$/.test(string);
