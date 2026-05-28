import { formatSlotInTimezone } from '../../../utils/time'
import styles from './SlotList.module.css'

type SlotListProps = {
  slotsUtc: string[]
  selectedSlotUtc: string | null
  timeZone: string
  onSelectSlot: (slotUtc: string) => void
}

function SlotList({ slotsUtc, selectedSlotUtc, timeZone, onSelectSlot }: SlotListProps) {
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
              <span>{formatSlotInTimezone(slotUtc, timeZone)}</span>
              <small className={styles.utcText}>UTC: {slotUtc}</small>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default SlotList
