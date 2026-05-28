import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useScheduleMeeting } from '../features/meeting/model/useScheduleMeeting'
import SlotList from '../features/meeting/ui/SlotList'
import TimezoneSelect from '../features/meeting/ui/TimezoneSelect'
import { loadMeetingFromStorage, saveMeetingToStorage } from '../services/meetingStorage'
import pageLayoutStyles from './PageLayout.module.css'
import styles from './SchedulePage.module.css'

function SchedulePage() {
  const navigate = useNavigate()
  const [requestLog, setRequestLog] = useState('')
  const {
    timezoneOptions,
    availableSlotsUtc,
    selectedTimezone,
    selectedTimezoneValue,
    selectedSlotUtc,
    canConfirm,
    selectTimezone,
    selectSlot,
    buildMeetingDraft,
  } = useScheduleMeeting()

  const meeting = loadMeetingFromStorage()

  function confirmSlot() {
    const draft = buildMeetingDraft()
    if (!draft) {
      return
    }

    saveMeetingToStorage(draft.meeting)
    setRequestLog(JSON.stringify(draft.payload, null, 2))
    navigate('/meeting')
  }

  if (meeting) {
    return <Navigate to="/meeting" replace />
  }

  return (
    <main className={pageLayoutStyles.container}>
      <section className={pageLayoutStyles.panel}>
        <h1>Schedule a Meeting</h1>
        <p className={pageLayoutStyles.description}>
          Slots are received in UTC. You choose a timezone to see local time.
        </p>

        <TimezoneSelect
          options={timezoneOptions}
          value={selectedTimezoneValue}
          onChange={selectTimezone}
        />

        <h2>Available slots</h2>
        <SlotList
          slotsUtc={availableSlotsUtc}
          selectedSlotUtc={selectedSlotUtc}
          timeZone={selectedTimezone.iana}
          onSelectSlot={selectSlot}
        />

        <button
          type="button"
          className={styles.button}
          disabled={!canConfirm}
          onClick={confirmSlot}
        >
          Confirm selected slot
        </button>

        {requestLog && (
          <>
            <h2>Request payload</h2>
            <pre className={styles.payload}>{requestLog}</pre>
          </>
        )}
      </section>
    </main>
  )
}

export default SchedulePage
