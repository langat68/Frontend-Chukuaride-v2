import { useState } from 'react'

type Props = {
  carId: number
  onSubmit: (data: {
    pickupTime: string
    returnTime: string
  }) => void
}

export default function BookingForm({  onSubmit }: Props) {
  const [pickupTime, setPickupTime] = useState('')
  const [returnTime, setReturnTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      pickupTime,
      returnTime,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Pick-up Time</label>
      <input type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

      <label>Return Time</label>
      <input type="datetime-local" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />

      <button type="submit">Book This Car</button>
    </form>
  )
}
