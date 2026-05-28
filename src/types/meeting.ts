export type TimezoneOption = {
  label: string
  value: string
  offset: number
  iana: string
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
