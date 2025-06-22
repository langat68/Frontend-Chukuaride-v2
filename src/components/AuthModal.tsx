import React, { useState } from 'react';

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting:", isLogin ? "signin" : "signup", {
      name,
      email,
      password,
    });

    const endpoint = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    console.log('Making request to:', endpoint);
    console.log('Payload:', payload);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response received:', res.status, res.statusText);

      if (res.ok) {
        const data = await res.json();
        console.log('Success response:', data);
        localStorage.setItem('token', data.token);
        window.location.reload();
      } else {
        const responseText = await res.text();
        console.error('Error response:', res.status, responseText);
        
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || 'Unknown error';
        } catch {
          errorMessage = responseText || `HTTP ${res.status}`;
        }
        
        alert(`Authentication failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Network error details:', error);
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      
      // Type-safe error handling
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      console.error('Error message:', errorMessage);
      alert(`Network error: ${errorMessage}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-80 relative space-y-4">
        <h2 className="text-xl font-semibold">{isLogin ? 'Sign In' : 'Create Account'}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create an account' : 'Already have an account? Sign In'}
        </p>

        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
      </form>
    </div>
  );
};

export default AuthModal;