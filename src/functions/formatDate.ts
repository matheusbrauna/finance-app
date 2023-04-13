import dayjs from 'dayjs'

export function formatDate(date: Date, format = 'DD [de] MMMM [de] YYYY') {
  const formattedDate = dayjs(date).format(format)

  return {
    formattedDate,
  }
}
