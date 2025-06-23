import { useState } from 'react'

export default function PaymentForm({ onSubmit }: { rentalId: number; onSubmit: (phone: string) => void }) {
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(phone)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="tel" required placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
      <button type="submit">Pay Now</button>
    </form>
  )
}
