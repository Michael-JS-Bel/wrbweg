import { useMemo, useState } from 'react'
import { timezoneOptions } from '../../../constants/timezones'
import { createMeetingPayload, getAvailableSlotsUtc } from '../../../services/slots'
import type { ScheduledMeeting } from '../../../types/meeting'
import { getDefaultTimezoneId } from '../../../utils/time'

export function useScheduleMeeting() {
  const [selectedTimezoneId, setSelectedTimezoneId] = useState(getDefaultTimezoneId)
  const [selectedSlotUtc, setSelectedSlotUtc] = useState<string | null>(null)

  const availableSlotsUtc = getAvailableSlotsUtc()
  const selectedTimezone = useMemo(
    () =>
      timezoneOptions.find((timezone) => timezone.id === selectedTimezoneId) ??
      timezoneOptions[0],
    [selectedTimezoneId],
  )

  function buildMeetingDraft(): {
    meeting: ScheduledMeeting
    payload: ReturnType<typeof createMeetingPayload>
  } | null {
    if (!selectedSlotUtc) {
      return null
    }

    const payload = createMeetingPayload(selectedSlotUtc, selectedTimezone.id)
    const meeting: ScheduledMeeting = {
      slotUtc: selectedSlotUtc,
      timezoneId: selectedTimezone.id,
      timezoneLabel: selectedTimezone.label,
    }

    return { meeting, payload }
  }

  return {
    timezoneOptions,
    availableSlotsUtc,
    selectedTimezone,
    selectedTimezoneId,
    selectedSlotUtc,
    setSelectedTimezoneId,
    setSelectedSlotUtc,
    buildMeetingDraft,
  }
}
