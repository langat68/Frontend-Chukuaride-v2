// src/components/cars/BookCarModal.tsx
import React, { useState } from 'react'

interface Props {
  carId: number
  carName: string
  carPrice: number
  onClose: () => void
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const BookCarModal: React.FC<Props> = ({ carId, carName, carPrice, onClose }) => {
  const [pickupTime, setPickupTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'booking' | 'payment'>('booking')
  const [rentalId, setRentalId] = useState<number | null>(null)

  const user = (() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })()

  const calculateTotal = () => {
    if (!pickupTime || !returnTime) return 0
    const hours = (new Date(returnTime).getTime() - new Date(pickupTime).getTime()) / (1000 * 60 * 60)
    return (Math.ceil(hours / 24) || 1) * carPrice
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return alert('Please log in to book.')
    if (!pickupTime || !returnTime) return alert('Both pickup and return time are required.')

    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          carId,
          pickupTime: new Date(pickupTime).toISOString(),
          returnTime: new Date(returnTime).toISOString(),
          totalCost: calculateTotal().toFixed(2)
        })
      })
      if (!res.ok) throw new Error('Rental creation failed')
      const data = await res.json()
      console.log('📦 Rental response:', data)
      setRentalId(data.id) // <- rentalId is usually data.id
      setStep('payment')
    } catch (err) {
      console.error(err)
      alert('Failed to create rental.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!phoneNumber || !rentalId) return alert('Phone number is required.')

  setLoading(true)
  try {
    const payload = {
      rentalId,
      phone: phoneNumber.replace(/^0/, '254'),
      amount: calculateTotal().toFixed(2),
      paymentProvider: 'mpesa' // ✅ Required field!
    }

    console.log('📤 Sending payment:', payload)

    const res = await fetch(`${baseUrl}/payments/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Payment initiation failed')

    alert('Payment request sent! Check your phone for M-Pesa prompt.')
    onClose()
  } catch (err) {
    console.error(err)
    alert('Failed to initiate payment.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-500 hover:text-black text-xl">×</button>

        {step === 'booking' ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Book {carName}</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <input type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required className="w-full border px-3 py-2" />
              <input type="datetime-local" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required className="w-full border px-3 py-2" />
              <div>Total: KES {calculateTotal().toFixed(2)}</div>
              <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded" disabled={loading}>
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0712345678"
                required
                className="w-full border px-3 py-2"
              />
              <div>Pay: KES {calculateTotal().toFixed(2)}</div>
              <button type="submit" className="bg-green-600 text-white w-full py-2 rounded" disabled={loading}>
                {loading ? 'Processing...' : 'Pay with M-Pesa'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default BookCarModal
