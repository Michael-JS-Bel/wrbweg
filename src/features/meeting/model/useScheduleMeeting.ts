import { useState } from 'react'
import type { ITimezone } from 'react-timezone-select'
import { createMeetingPayload, getAvailableSlotsUtc } from '../../../services/slots'
import type { ScheduledMeeting } from '../../../types/meeting'
import {
  getDefaultTimezone,
  getTimezoneIana,
  normalizeTimezone,
} from '../../../utils/time'

export function useScheduleMeeting() {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(getDefaultTimezone)
  const [selectedSlotUtc, setSelectedSlotUtc] = useState<string | null>(null)

  const availableSlotsUtc = getAvailableSlotsUtc()
  const canConfirm = selectedSlotUtc !== null

  function buildMeetingDraft(): {
    meeting: ScheduledMeeting
    payload: ReturnType<typeof createMeetingPayload>
  } | null {
    if (!selectedSlotUtc) {
      return null
    }

    const timezone = normalizeTimezone(selectedTimezone)
    const payload = createMeetingPayload(selectedSlotUtc, timezone.value)
    const meeting: ScheduledMeeting = {
      slotUtc: selectedSlotUtc,
      timezoneId: timezone.value,
      timezoneLabel: timezone.label,
    }

    return { meeting, payload }
  }

  return {
    availableSlotsUtc,
    selectedTimezone,
    selectedSlotUtc,
    selectedTimeZone: getTimezoneIana(selectedTimezone),
    canConfirm,
    selectTimezone: setSelectedTimezone,
    selectSlot: setSelectedSlotUtc,
    buildMeetingDraft,
  }
}
