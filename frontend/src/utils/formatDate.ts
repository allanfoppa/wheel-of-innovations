
export const formatDate = (date: string): string => {
  const dateFormated = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateFormated);
};
