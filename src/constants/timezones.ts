import type { TimezoneOption } from '../types/meeting'

function formatUtcLabel(offset: number) {
  if (offset === 0) {
    return 'UTC'
  }

  return offset > 0 ? `UTC+${offset}` : `UTC${offset}`
}

function offsetToIana(offsetHours: number) {
  if (offsetHours === 0) {
    return 'UTC'
  }

  const sign = offsetHours > 0 ? '+' : '-'
  const hours = String(Math.abs(offsetHours)).padStart(2, '0')
  return `${sign}${hours}:00`
}

export function generateUtcTimezones(): TimezoneOption[] {
  return Array.from({ length: 27 }, (_, index) => {
    const offset = index - 12
    const value = formatUtcLabel(offset)

    return {
      label: value,
      value,
      offset,
      iana: offsetToIana(offset),
    }
  })
}

const estTimezone: TimezoneOption = {
  label: 'EST',
  value: 'EST',
  offset: -5,
  iana: 'America/New_York',
}

export const timezoneOptions: TimezoneOption[] = [...generateUtcTimezones(), estTimezone]

export function findTimezoneByValue(value: string): TimezoneOption {
  return timezoneOptions.find((timezone) => timezone.value === value) ?? timezoneOptions[0]
}
