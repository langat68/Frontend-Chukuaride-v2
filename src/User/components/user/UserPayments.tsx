import type { Payment } from '../../../types/index'

type Props = {
  payments: Payment[]
}

export default function UserPayments({ payments }: Props) {
  return (
    <div>
      <h3>My Payments</h3>
      {payments.length === 0 ? <p>No payments found.</p> : (
        payments.map(p => (
          <div key={p.id}>
            <p>Amount: KES {p.amount}</p>
            <p>Provider: {p.paymentProvider}</p>
            <p>Status: {p.status}</p>
            <p>Paid: {new Date(p.paidAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
