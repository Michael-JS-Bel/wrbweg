import { formatInTimeZone } from 'date-fns-tz'
import type { ITimezone } from 'react-timezone-select'

const SLOT_DISPLAY_FORMAT = 'EEE, dd MMM HH:mm'

export function getTimezoneIana(timezone: ITimezone) {
  return typeof timezone === 'string' ? timezone : timezone.value
}

export function normalizeTimezone(timezone: ITimezone) {
  if (typeof timezone === 'string') {
    return { value: timezone, label: timezone }
  }

  return { value: timezone.value, label: timezone.label }
}

export function getDefaultTimezone(): ITimezone {
  const value = Intl.DateTimeFormat().resolvedOptions().timeZone
  return { value, label: value }
}

export function formatSlotInTimezone(utcIso: string, timeZone: string) {
  return formatInTimeZone(utcIso, timeZone, SLOT_DISPLAY_FORMAT)
}
