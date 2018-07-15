export function formatDuration(duration) {
  const hours = Math.floor(duration);
  const minutes = Math.floor((duration) % 1 * 60);
  return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m`: ''}`;
}