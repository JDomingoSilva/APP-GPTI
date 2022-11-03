function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}


function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function addDays(date, days) {
  date.setDate(date.getDate() + parseInt(days));
  date.setHours(0, 0, 0, 0);
  return formatDate(date);
}

export default addDays;