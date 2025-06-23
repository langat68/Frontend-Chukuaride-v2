import { useState } from 'react'

type Props = {
  requestId: number
  message: string
  onReply: (id: number, response: string) => void
}

export default function AdminSupport({ requestId, message, onReply }: Props) {
  const [response, setResponse] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onReply(requestId, response)
  }

  return (
    <div>
      <p>Customer Message: {message}</p>
      <form onSubmit={handleSubmit}>
        <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="Your Response" />
        <button type="submit">Send Reply</button>
      </form>
    </div>
  )
}
