import { useState } from 'react'

export default function SupportForm({ onSubmit }: { onSubmit: (message: string) => void }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(message)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="Describe your issue..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Submit Request</button>
    </form>
  )
}
