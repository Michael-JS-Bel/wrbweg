export type TimezoneOption = {
  id: string
  label: string
  offsetMinutes: number
}

export type ScheduledMeeting = {
  slotUtc: string
  timezoneId: string
  timezoneLabel: string
}

export type SlotRecord = {
  datetime: string
}

export type MeetingRequestPayload = {
  slotUtc: string
  selectedTimezone: string
}
