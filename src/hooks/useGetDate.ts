import dayjs from 'dayjs'

export function useGetDate(date: Date) {
  const dateFormat = 'DD [de] MMMM [de] YYYY'
  const formattedDate = dayjs(date).format(dateFormat)

  return formattedDate
}
