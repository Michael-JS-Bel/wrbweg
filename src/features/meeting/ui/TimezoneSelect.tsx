import TimezoneSelectLib, { type ITimezone, type ITimezoneOption } from 'react-timezone-select'
import styles from './TimezoneSelect.module.css'

type TimezonePickerProps = {
  value: ITimezone
  onChange: (timezone: ITimezone) => void
}

export function TimezonePicker({ value, onChange }: TimezonePickerProps) {
  function handleChange(timezone: ITimezoneOption) {
    onChange(timezone)
  }

  return (
    <label className={styles.field}>
      <span className={styles.label}>Timezone</span>
      <div className={styles.selectWrapper}>
        <TimezoneSelectLib value={value} onChange={handleChange} />
      </div>
    </label>
  )
}

export default TimezonePicker
