import { useState } from 'react'

type Props = {
  settings: {
    taxRate: number
    maxBookingHours: number
  }
  onSave: (settings: Props['settings']) => void
}

export default function AdminSettings({ settings, onSave }: Props) {
  const [taxRate, setTaxRate] = useState(settings.taxRate)
  const [maxBookingHours, setMaxBookingHours] = useState(settings.maxBookingHours)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ taxRate, maxBookingHours })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" step="0.1" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} placeholder="Tax Rate (%)" />
      <input type="number" value={maxBookingHours} onChange={e => setMaxBookingHours(Number(e.target.value))} placeholder="Max Booking Hours" />
      <button type="submit">Save Settings</button>
    </form>
  )
}
