import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { findTimezoneByValue, timezoneOptions } from '../constants/timezones'

const SLOT_DISPLAY_FORMAT = 'EEE, dd MMM HH:mm'

export function formatSlotInTimezone(utcIso: string, iana: string) {
  return formatInTimeZone(utcIso, iana, SLOT_DISPLAY_FORMAT)
}

export function getDefaultTimezoneValue() {
  const now = new Date()
  const browserIana = Intl.DateTimeFormat().resolvedOptions().timeZone
  const browserOffset = getTimezoneOffset(browserIana, now)

  const matched = timezoneOptions.find(
    (timezone) => getTimezoneOffset(timezone.iana, now) === browserOffset,
  )

  return matched?.value ?? 'UTC'
}

export function getTimezoneForMeeting(timezoneId: string) {
  return findTimezoneByValue(timezoneId)
}
