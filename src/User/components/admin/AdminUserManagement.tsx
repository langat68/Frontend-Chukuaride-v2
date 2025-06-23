import { useState } from 'react'
import type { UserRole } from '../../../types'

type Props = {
  user: { id: number; name: string; email: string; role: UserRole }
  onUpdate: (id: number, updates: { name: string; role: UserRole }) => void
}

export default function AdminUserManagement({ user, onUpdate }: Props) {
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState<UserRole>(user.role)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(user.id, { name, role })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email: {user.email}</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value as UserRole)}>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="customer">Customer</option>
      </select>
      <button type="submit">Update User</button>
    </form>
  )
}
