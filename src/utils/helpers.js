export function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function contains(string, substr) {
  return string.indexOf(substr) !== -1;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(string) {
  let splitStr = string.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

export function appendPositionSuffix(number) {
  const substr = number.toString().slice(0, -1);
  let suffix;
  switch (substr) {
    case "0":
      suffix = "th";
      break;
    case "1":
      if (number.toString().slice(0, -2) == "11") suffix = "th";
      else suffix = "st";
      break;
    case "2":
      if (number.toString().slice(0, -2) == "12") suffix = "th";
      else suffix = "nd";
      break;
    case "3":
      if (number.toString().slice(0, -2) == "13") suffix = "th";
      else suffix = "rd";
      break;
    default:
      suffix = "th";
      break;
  }
  return number + suffix;
}

export function dateStringParser(string) {
  const utcDate = new Date(string);
  const epoch = utcDate.getTime() + 3600 * 1000;
  const date = new Date(epoch);
  const now = new Date();
  const time = now.getTime();
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfTheYr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (time - epoch < 1000 * 60) return "just now";
  else if (time - epoch < 3600 * 1000)
    return "about " + parseInt((time - epoch) / 60000) + " mins ago";
  else if (time - epoch < 86400 * 1000)
    return (
      "today, " +
      pad(date.getHours(), 2) +
      ":" +
      pad(date.getMinutes(), 2) +
      ` ${date.getHours() > 11 ? "pm" : "am"}`
    );
  else if (time - epoch < 2 * (86400 * 1000))
    return (
      "yesterday, " +
      pad(date.getHours(), 2) +
      ":" +
      pad(date.getMinutes(), 2) +
      ` ${date.getHours() > 11 ? "pm" : "am"}`
    );
  else if (date.getFullYear() === now.getFullYear())
    return (
      appendPositionSuffix(date.getDate()) +
      ", " +
      monthsOfTheYr[date.getMonth()]
    );
  else
    return (
      appendPositionSuffix(date.getDate()) +
      ", " +
      monthsOfTheYr[date.getMonth()] +
      " " +
      date.getFullYear()
    );
}
