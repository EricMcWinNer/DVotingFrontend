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
