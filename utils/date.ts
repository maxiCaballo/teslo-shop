export function convert_to_DD_MM_YYYY(date: string): string {
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, '0');
  const month = newDate.getMonth().toString().padStart(2, '0');
  const year = newDate.getFullYear().toString();

  return `${day}-${month}-${year}`;
}
