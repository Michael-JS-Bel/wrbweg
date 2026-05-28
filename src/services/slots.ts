import slotsData from '../data/exp-slots.json'
import requestTemplate from '../data/exp-request.json'
import type { MeetingRequestPayload, SlotRecord } from '../types/meeting'

export function getAvailableSlotsUtc() {
  return (slotsData as SlotRecord[]).map((slot) => slot.datetime)
}

export function createMeetingPayload(
  slotUtc: string,
  selectedTimezone: string,
): MeetingRequestPayload {
  return {
    ...requestTemplate,
    slotUtc,
    selectedTimezone,
  }
}
