import { Navigate, useNavigate } from 'react-router-dom'
import {
  clearMeetingFromStorage,
  loadMeetingFromStorage,
} from '../services/meetingStorage'
import { formatSlotInTimezone } from '../utils/time'
import pageLayoutStyles from './PageLayout.module.css'
import styles from './MeetingPage.module.css'

function MeetingPage() {
  const navigate = useNavigate()
  const meeting = loadMeetingFromStorage()

  if (!meeting) {
    return <Navigate to="/" replace />
  }

  function cancelMeeting() {
    clearMeetingFromStorage()
    navigate('/', { replace: true })
  }

  return (
    <main className={pageLayoutStyles.container}>
      <section className={pageLayoutStyles.panel}>
        <h1>Scheduled Meeting</h1>
        <p className={pageLayoutStyles.description}>
          The meeting is stored locally and remains visible after page reload.
        </p>
        <dl className={styles.details}>
          <div className={styles.detailItem}>
            <dt>Time in selected timezone</dt>
            <dd>{formatSlotInTimezone(meeting.slotUtc, meeting.timezoneId)}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Selected timezone</dt>
            <dd>{meeting.timezoneLabel}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>UTC time sent to server</dt>
            <dd>{meeting.slotUtc}</dd>
          </div>
        </dl>
        <button type="button" className={styles.cancelButton} onClick={cancelMeeting}>
          Cancel meeting
        </button>
      </section>
    </main>
  )
}

export default MeetingPage
