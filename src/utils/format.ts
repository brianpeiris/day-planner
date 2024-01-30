export function friendlyDuration(
  duration: number,
  options?: { full: boolean },
): string {
  const hours = Math.floor(duration);
  const minutes = Math.floor((duration - hours) * 60);
  if ((hours && minutes) || options?.full) {
    return `${hours}h ${minutes}m`;
  } else {
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h`;
  }
}
export function formatTime(
  time: number,
  options?: { seconds: boolean },
): string {
  const hour = Math.floor(time);
  const minute = Math.floor((time - hour) * 60);
  const hourStr = hour.toString().padStart(2, "0");
  const minuteStr = minute.toString().padStart(2, "0");
  if (options?.seconds) {
    const seconds = Math.floor((time - hour - minute / 60) * 60 * 60);
    const secondsStr = seconds.toString().padStart(2, "0");
    return `${hourStr}:${minuteStr}:${secondsStr}`;
  } else {
    return `${hourStr}:${minuteStr}`;
  }
}
