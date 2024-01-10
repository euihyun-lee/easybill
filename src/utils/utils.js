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

export const makeBill = (title, memberList, deliveryList) => {
  let billText = "💰" + title + "💰\n";
  let total = 0;
  for (let member of memberList) {
    let memberTotal = getTotal(member.orders);
    billText = billText + "@" + member.name + " " + numWithCommas(memberTotal) + "원\n";
    total = total + memberTotal;
  }
  billText = billText + "=======\n";
  billText = billText + "총 " + numWithCommas(total) + "원";
  
  for (let delivery of deliveryList) {
    billText = billText + "\n\n";
    billText = billText + "[" + delivery.name + " (" + delivery.payer + " 결제)]\n";
    for (let detail of delivery.details) {
      billText = billText + "@" + detail.name + " " + numWithCommas(detail.cost) + "원\n";
    }
    billText = billText + "=======\n";
    billText = billText + "총 " + numWithCommas(delivery.cost) + "원";
  }
  return billText;
};

// from stackoverflow - 4976936
export const getWindowSize = (function() {
  var docEl = document.documentElement,
      IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

  // Used to feature test Opera returning wrong values
  // for documentElement.clientHeight.
  function isDocumentElementHeightOff () {
      var d = document,
          div = d.createElement('div');
      div.style.height = "2500px";
      d.body.insertBefore(div, d.body.firstChild);
      var r = d.documentElement.clientHeight > 2400;
      d.body.removeChild(div);
      return r;
  }

  if (typeof document.clientWidth == "number") {
     return function () {
       return { width: document.clientWidth, height: document.clientHeight };
     };
  } else if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
      var b = document.body;
      return function () {
        return { width: b.clientWidth, height: b.clientHeight };
      };
  } else {
      return function () {
        return { width: docEl.clientWidth, height: docEl.clientHeight };
      };
  }
})();

/**
  * Uses canvas.measureText to compute and return the width of
  * the given text of given font in pixels.
  * 
  * @param {String} text The text to be rendered.
  * @param {String} font The css font descriptor that text is
  *                 to be rendered with (e.g. "bold 14px verdana").
  * 
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
  */
export function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
  
  return `${fontWeight} ${fontSize} ${fontFamily}`;
}
