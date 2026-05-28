import type { ScheduledMeeting } from '../types/meeting'

const STORAGE_KEY = 'scheduled-meeting'

export function loadMeetingFromStorage(): ScheduledMeeting | null {
  const rawData = localStorage.getItem(STORAGE_KEY)
  if (!rawData) {
    return null
  }

  try {
    return JSON.parse(rawData) as ScheduledMeeting
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function saveMeetingToStorage(meeting: ScheduledMeeting) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meeting))
}

export function clearMeetingFromStorage() {
  localStorage.removeItem(STORAGE_KEY)
}
