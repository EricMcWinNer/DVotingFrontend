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
