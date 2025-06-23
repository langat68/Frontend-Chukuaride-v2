import { useState } from 'react'
import type { FuelType, Transmission } from '../../../types'

type CarFormData = {
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
  availability: boolean
}

type Props = {
  initialData?: CarFormData
  onSubmit: (data: CarFormData) => void
}

export default function AdminCarManagement({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<CarFormData>(
    initialData || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: '',
      pricePerHour: 0,
      pricePerDay: 0,
      fuel: 'petrol',
      transmission: 'automatic',
      capacity: 4,
      location: '',
      availability: true,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    const updatedValue =
      type === 'number'
        ? Number(value)
        : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value

    setForm(prev => ({
      ...prev,
      [name]: updatedValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" />
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
      <input type="number" name="year" value={form.year} onChange={handleChange} />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <input type="number" name="pricePerHour" value={form.pricePerHour} onChange={handleChange} />
      <input type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} />
      
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
      
      <input type="number" name="capacity" value={form.capacity} onChange={handleChange} />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      
      <label>
        <input
          type="checkbox"
          name="availability"
          checked={form.availability}
          onChange={handleChange}
        />
        Available
      </label>

      <button type="submit">Save Car</button>
    </form>
  )
}
