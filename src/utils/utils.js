export const numWithCommas = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const isDigit = string => /^\d+$/.test(string);

export const getCurrentDate = () => {
  let rawDate = new Date();
  let year = rawDate.getFullYear().toString();
  let month = (rawDate.getMonth() + 1).toString();
  let date = rawDate.getDate().toString();

  return (year + "." +
          (month.length < 2 ? "0" : "") + month + "." +
          (date.length < 2 ? "0" : "") + date);
};

export const getTotal = orders => {
  let total = 0;
  for (let order of orders) {
    total = total + order.cost * order.amount;
  }
  return total;
};

export const makeBill = (title, memberList) => {
  let billText = "💰" + title + "💰\n";
  let total = 0;
  for (let member of memberList) {
    let memberTotal = getTotal(member.orders);
    billText = billText + "@" + member.name + " " + numWithCommas(memberTotal) + "원\n";
    total = total + memberTotal;
  }
  billText = billText + "=======\n";
  billText = billText + "총 " + numWithCommas(total) + "원";
  return billText;
};
