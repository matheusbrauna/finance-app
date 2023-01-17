export function useGetDate(timestamp: any) {
  if (!timestamp) return
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(timestamp.toDate())

  return formattedDate
}
