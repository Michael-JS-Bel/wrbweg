import { formatInTimezone } from '../../../utils/time'
import styles from './SlotList.module.css'

type SlotListProps = {
  slotsUtc: string[]
  selectedSlotUtc: string | null
  timezoneOffsetMinutes: number
  onSelectSlot: (slotUtc: string) => void
}

function SlotList({
  slotsUtc,
  selectedSlotUtc,
  timezoneOffsetMinutes,
  onSelectSlot,
}: SlotListProps) {
  return (
    <ul className={styles.slotList}>
      {slotsUtc.map((slotUtc) => {
        const isActive = selectedSlotUtc === slotUtc
        return (
          <li key={slotUtc}>
            <button
              type="button"
              className={`${styles.slotButton} ${isActive ? styles.active : ''}`}
              onClick={() => onSelectSlot(slotUtc)}
            >
              <span>{formatInTimezone(slotUtc, timezoneOffsetMinutes)}</span>
              <small className={styles.utcText}>UTC: {slotUtc}</small>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default SlotList
