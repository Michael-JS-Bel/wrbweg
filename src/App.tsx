import { Navigate, Route, Routes } from 'react-router-dom'
import MeetingPage from './pages/MeetingPage.tsx'
import SchedulePage from './pages/SchedulePage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SchedulePage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
