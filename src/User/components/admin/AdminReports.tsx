import { useState } from 'react'

export default function AdminReports({ onGenerate }: { onGenerate: (range: { start: string; end: string }) => void }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate({ start, end })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>From:</label>
      <input type="date" value={start} onChange={e => setStart(e.target.value)} required />
      <label>To:</label>
      <input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
      <button type="submit">Generate Report</button>
    </form>
  )
}
