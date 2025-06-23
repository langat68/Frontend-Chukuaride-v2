import { useState } from 'react'
import type{ FuelType, Transmission } from '../../../types/index'

type CarFormProps = {
  onSubmit: (data: {
    make: string
    model: string
    year: number
    category: string
    pricePerHour: number
    pricePerDay: number
    fuel: FuelType
    transmission: Transmission
    capacity: number
    location: string
  }) => void
}

export default function CarForm({ onSubmit }: CarFormProps) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: 2024,
    category: '',
    pricePerHour: 0,
    pricePerDay: 0,
    fuel: 'petrol' as FuelType,
    transmission: 'automatic' as Transmission,
    capacity: 4,
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name.includes('price') || name === 'year' || name === 'capacity' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" />
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
      <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Year" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <input name="pricePerHour" type="number" value={form.pricePerHour} onChange={handleChange} placeholder="Price/Hour" />
      <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="Price/Day" />
      <select name="fuel" value={form.fuel} onChange={handleChange}>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
        <option value="hybrid">Hybrid</option>
      </select>
      <select name="transmission" value={form.transmission} onChange={handleChange}>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
      <input name="capacity" type="number" value={form.capacity} onChange={handleChange} placeholder="Capacity" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      <button type="submit">Save Car</button>
    </form>
  )
}
