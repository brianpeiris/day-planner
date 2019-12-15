export function formatDuration(duration) {
  const hours = Math.floor(duration);
  const minutes = Math.floor((duration % 1) * 60);
  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m` : ""}`;
}

export function snapTo15(pixelsPerHour, pos) {
  const pixelsPer15 = pixelsPerHour / 4;
  const snapped = (Math.round(pos / pixelsPer15) * pixelsPer15) / pixelsPerHour;
  return Math.round(snapped * 100) / 100;
}

export function last(arr) {
  if (!arr) return null;
  return arr[arr.length - 1];
}

const minutes = {
  "15": 0.25,
  "30": 0.5,
  "45": 0.75
};
export function parseDuration(str) {
  const parts = str.match(/((\d+)h)?((\d+)m?)?/);
  let hour = parts[2] ? parseInt(parts[2], 10) : 0;
  let min = parts[4] ? minutes[parts[4]] : 0;
  if (!hour && !min) {
    hour = parseInt(parts[4], 10);
    min = 0;
  }
  return hour + min || null;
}

export function fromJSON(klass, jobj) {
  const obj = new klass();
  for (const key in jobj) {
    if (!jobj.hasOwnProperty(key)) continue;
    obj[key] = jobj[key];
  }
  return obj;
}

export function formatTime(time) {
  const hour = Math.floor(time)
    .toString()
    .padStart(2, "0");
  return `${hour}:${Math.round((time % 1) * 60) || "00"}`;
}
