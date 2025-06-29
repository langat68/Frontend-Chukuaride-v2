import React, { useState } from 'react'

interface Props {
  carId: number
  carName: string
  carPrice: number
  user: any // Pass user data as prop
  onClose: () => void
}

const baseUrl = 'http://localhost:3000'

const BookCarModal: React.FC<Props> = ({ carId, carName, carPrice, user, onClose }) => {
  const [pickupTime, setPickupTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'booking' | 'payment'>('booking')
  const [rentalId, setRentalId] = useState<number | null>(null)

  const calculateTotal = () => {
    if (!pickupTime || !returnTime) return 0
    const pickup = new Date(pickupTime).getTime()
    const returnDate = new Date(returnTime).getTime()
    
    if (returnDate <= pickup) return carPrice // Minimum 1 day
    
    const hours = (returnDate - pickup) / (1000 * 60 * 60)
    const days = Math.ceil(hours / 24)
    return days * carPrice
  }

  const handleBookingSubmit = async () => {
    if (!user) {
      alert('Please log in to book.')
      return
    }
    
    if (!pickupTime || !returnTime) {
      alert('Both pickup and return time are required.')
      return
    }

    const pickup = new Date(pickupTime)
    const returnDate = new Date(returnTime)
    
    if (returnDate <= pickup) {
      alert('Return time must be after pickup time.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          carId,
          pickupTime: pickup.toISOString(),
          returnTime: returnDate.toISOString(),
          totalCost: calculateTotal().toFixed(2)
        })
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Rental creation failed')
      }
      
      const data = await res.json()
      console.log('📦 Rental created:', data)
      setRentalId(data.id)
      setStep('payment')
    } catch (err) {
      console.error('Booking error:', err)
      alert(err instanceof Error ? err.message : 'Failed to create rental.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSubmit = async () => {
    if (!phoneNumber || !rentalId) {
      alert('Phone number is required.')
      return
    }

    // Validate phone number format
    const cleanPhone = phoneNumber.replace(/\s+/g, '')
    if (!/^(0|254)\d{9}$/.test(cleanPhone)) {
      alert('Please enter a valid phone number (e.g., 0712345678)')
      return
    }

    setLoading(true)
    try {
      const formattedPhone = cleanPhone.startsWith('0') 
        ? '254' + cleanPhone.slice(1) 
        : cleanPhone

      const payload = {
        rentalId,
        phone: formattedPhone,
        amount: calculateTotal().toFixed(2),
        paymentProvider: 'mpesa'
      }

      console.log('📤 Initiating payment:', payload)

      const res = await fetch(`${baseUrl}/payments/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Payment initiation failed')
      }

      const result = await res.json()
      console.log('💳 Payment response:', result)
      
      alert('Payment request sent! Check your phone for M-Pesa prompt.')
      onClose()
    } catch (err) {
      console.error('Payment error:', err)
      alert(err instanceof Error ? err.message : 'Failed to initiate payment.')
    } finally {
      setLoading(false)
    }
  }

  const total = calculateTotal()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-white/80 hover:text-white text-2xl font-light transition-colors"
          >
            ×
          </button>
          <h2 className="text-xl font-semibold pr-8">
            {step === 'booking' ? `Book ${carName}` : 'Complete Payment'}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-3 h-3 rounded-full ${step === 'booking' ? 'bg-white' : 'bg-white/40'}`}></div>
            <div className="w-8 h-0.5 bg-white/40"></div>
            <div className={`w-3 h-3 rounded-full ${step === 'payment' ? 'bg-white' : 'bg-white/40'}`}></div>
          </div>
        </div>

        <div className="p-6">
          {step === 'booking' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date & Time
                </label>
                <input 
                  type="datetime-local" 
                  value={pickupTime} 
                  onChange={(e) => setPickupTime(e.target.value)} 
                  required 
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date & Time
                </label>
                <input 
                  type="datetime-local" 
                  value={returnTime} 
                  onChange={(e) => setReturnTime(e.target.value)} 
                  required 
                  min={pickupTime || new Date().toISOString().slice(0, 16)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              {total > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="text-xl font-bold text-blue-600">
                      KES {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {Math.ceil((new Date(returnTime).getTime() - new Date(pickupTime).getTime()) / (1000 * 60 * 60 * 24)) || 1} day(s) @ KES {carPrice.toLocaleString()}/day
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleBookingSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={loading || total === 0}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : 'Continue to Payment'}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-green-800 mb-1">M-Pesa Payment</h3>
                <p className="text-sm text-green-700">
                  Enter your phone number to receive a payment prompt
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712345678 or 254712345678"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: 0712345678 or 254712345678
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="text-xl font-bold text-green-600">
                    KES {total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handlePaymentSubmit}
                className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : 'Pay with M-Pesa'}
              </button>
              
              <button 
                onClick={() => setStep('booking')}
                className="text-gray-600 hover:text-gray-800 w-full py-2 text-sm transition-colors"
                disabled={loading}
              >
                ← Back to Booking Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookCarModal