exports.getCurrentTime = () => {
  let date = new Date();
  let hour = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes() + 7).padStart(2, '0');
  let time = `${hour}:${minutes}`;

  return time;
}

exports.getFullDate = () => {
  let date = new Date();
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = String(date.getFullYear());
  let fullDate = `${day}/${month}/${year}`;

  return fullDate;
}