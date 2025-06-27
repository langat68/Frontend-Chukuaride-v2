import { useEffect, useState } from 'react';

interface Payment {
  id: number;
  rentalId: number;
  amount: string | null;
  status: string;
  paidAt: string;
  receipt: string | null;
  phone: string | null;
  checkoutRequestId: string | null;
  paymentProvider: string;
}

const AdminPaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://chukuaride3.onrender.com';
        const res = await fetch(`${baseUrl}/payments`);
        if (!res.ok) throw new Error('Failed to fetch payments');
        const data = await res.json();
        setPayments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filtered = payments.filter((p) =>
    [
      p.paymentProvider,
      p.amount?.toString() ?? '',
      p.status,
      p.receipt ?? '',
      p.phone ?? '',
      p.checkoutRequestId ?? '',
    ]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return '';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>

      <input
        type="text"
        placeholder="Search by status, receipt, phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
      />

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Provider</th>
                <th className="border px-4 py-2">Amount (KES)</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Paid At</th>
                <th className="border px-4 py-2">Receipt</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Checkout ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{payment.paymentProvider}</td>
                  <td className="border px-4 py-2">
                    {payment.amount ? `KES ${payment.amount}` : '—'}
                  </td>
                  <td className={`border px-4 py-2 font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </td>
                  <td className="border px-4 py-2">
                    {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '—'}
                  </td>
                  <td className="border px-4 py-2">{payment.receipt ?? '—'}</td>
                  <td className="border px-4 py-2">{payment.phone ?? '—'}</td>
                  <td className="border px-4 py-2">{payment.checkoutRequestId ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-gray-500 mt-2">No results found.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminPaymentManagement;
