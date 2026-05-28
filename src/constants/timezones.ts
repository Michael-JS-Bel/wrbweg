import type { TimezoneOption } from '../types/meeting'

export const timezoneOptions: TimezoneOption[] = [
  { id: 'UTC', label: 'UTC', offsetMinutes: 0 },
  { id: 'UTC+3', label: 'UTC+3', offsetMinutes: 3 * 60 },
  { id: 'EST', label: 'EST (UTC-5)', offsetMinutes: -5 * 60 },
  { id: 'UTC-8', label: 'UTC-8', offsetMinutes: -8 * 60 },
]
