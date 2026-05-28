import { useMemo, useState } from 'react'
import { findTimezoneByValue, timezoneOptions } from '../../../constants/timezones'
import { createMeetingPayload, getAvailableSlotsUtc } from '../../../services/slots'
import type { ScheduledMeeting } from '../../../types/meeting'
import { getDefaultTimezoneValue } from '../../../utils/time'

export function useScheduleMeeting() {
  const [selectedTimezoneValue, setSelectedTimezoneValue] = useState(getDefaultTimezoneValue)
  const [selectedSlotUtc, setSelectedSlotUtc] = useState<string | null>(null)

  const availableSlotsUtc = getAvailableSlotsUtc()
  const selectedTimezone = useMemo(
    () => findTimezoneByValue(selectedTimezoneValue),
    [selectedTimezoneValue],
  )

  const canConfirm = selectedSlotUtc !== null

  function buildMeetingDraft(): {
    meeting: ScheduledMeeting
    payload: ReturnType<typeof createMeetingPayload>
  } | null {
    if (!selectedSlotUtc) {
      return null
    }

    const payload = createMeetingPayload(selectedSlotUtc, selectedTimezone.value)
    const meeting: ScheduledMeeting = {
      slotUtc: selectedSlotUtc,
      timezoneId: selectedTimezone.value,
      timezoneLabel: selectedTimezone.label,
    }

    return { meeting, payload }
  }

  return {
    timezoneOptions,
    availableSlotsUtc,
    selectedTimezone,
    selectedTimezoneValue,
    selectedSlotUtc,
    canConfirm,
    selectTimezone: setSelectedTimezoneValue,
    selectSlot: setSelectedSlotUtc,
    buildMeetingDraft,
  }
}
