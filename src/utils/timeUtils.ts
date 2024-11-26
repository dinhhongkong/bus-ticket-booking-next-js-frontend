export function formatTime(time: string) {
  if (!/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    console.warn('formatTime: Invalid time format. Expected "HH:MM:SS"');
    return 'Invalid time';
  }

  const [hours, minutes] = time.split(':');

  return `${hours}h${minutes}`;
}


export function getHours(timeString: string) {
  const [hours] = timeString.split(':');
  return parseInt(hours, 10).toString();
}


export function formatDate(dateString: string): string {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return "";
    throw new Error('Invalid date format. Expected yyyy-MM-dd');
  }

  const [year, month, day] = dateString.split('-');

  return `${day}/${month}/${year}`;
}