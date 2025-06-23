import { useState } from 'react'

type Props = {
  paymentId: number
  onRefund: (id: number, amount: number) => void
}

export default function AdminPaymentManagement({ paymentId, onRefund }: Props) {
  const [amount, setAmount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRefund(paymentId, amount)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} placeholder="Refund Amount" />
      <button type="submit">Issue Refund</button>
    </form>
  )
}
