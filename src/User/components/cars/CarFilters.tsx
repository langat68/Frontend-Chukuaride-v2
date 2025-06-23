import { useState } from 'react'

type Props = {
  onFilter: (filters: {
    category?: string
    fuel?: string
    transmission?: string
    location?: string
  }) => void
}

export default function CarFilters({ onFilter }: Props) {
  const [category, setCategory] = useState('')
  const [fuel, setFuel] = useState('')
  const [transmission, setTransmission] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter({ category, fuel, transmission, location })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <select value={fuel} onChange={e => setFuel(e.target.value)}>
        <option value="">All Fuel Types</option>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
        <option value="hybrid">Hybrid</option>
      </select>
      <select value={transmission} onChange={e => setTransmission(e.target.value)}>
        <option value="">All Transmissions</option>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <button type="submit">Apply Filters</button>
    </form>
  )
}
