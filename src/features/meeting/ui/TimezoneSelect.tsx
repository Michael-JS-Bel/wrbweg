import type { TimezoneOption } from '../../../types/meeting'
import styles from './TimezoneSelect.module.css'

type TimezoneSelectProps = {
  options: TimezoneOption[]
  value: string
  onChange: (timezoneValue: string) => void
}

function TimezoneSelect({ options, value, onChange }: TimezoneSelectProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>Timezone</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((timezone) => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default TimezoneSelect
