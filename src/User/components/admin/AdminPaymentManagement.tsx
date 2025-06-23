import React, { useEffect, useState } from 'react';

interface Payment {
  id: number;
  userId: number;
  rentalId: number;
  amount: number;
  method: string;
  status: string;
  timestamp: string;
}

const AdminPaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
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

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        };
      case 'pending':
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        };
      case 'failed':
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem' }}>
        Payment Management
      </h1>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading payments...</p>
      ) : error ? (
        <p style={{ color: '#dc2626', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', color: '#374151', textAlign: 'left', fontSize: '0.875rem' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>User ID</th>
                <th style={{ padding: '12px' }}>Rental ID</th>
                <th style={{ padding: '12px' }}>Amount</th>
                <th style={{ padding: '12px' }}>Method</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderTop: '1px solid #e5e7eb', transition: 'background 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td style={{ padding: '12px' }}>{p.id}</td>
                  <td style={{ padding: '12px' }}>{p.userId}</td>
                  <td style={{ padding: '12px' }}>{p.rentalId}</td>
                  <td style={{ padding: '12px', fontWeight: 500 }}>KES {p.amount}</td>
                  <td style={{ padding: '12px' }}>{p.method}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={getStatusStyle(p.status)}>{p.status}</span>
                  </td>
                  <td style={{ padding: '12px', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(p.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentManagement;
