import { timezoneOptions } from '../constants/timezones'

export function getDefaultTimezoneId() {
  const browserOffset = -new Date().getTimezoneOffset()
  const matchedTimezone = timezoneOptions.find(
    (timezone) => timezone.offsetMinutes === browserOffset,
  )
  return matchedTimezone?.id ?? 'UTC'
}

export function formatInTimezone(utcIso: string, offsetMinutes: number) {
  const utcDate = new Date(utcIso)
  const shiftedDate = new Date(utcDate.getTime() + offsetMinutes * 60 * 1000)

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(shiftedDate)
}
