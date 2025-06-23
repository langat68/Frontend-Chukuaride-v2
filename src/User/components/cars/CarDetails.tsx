import type { Car } from '../../../types'

type Props = {
  car: Car
}

export default function CarDetails({ car }: Props) {
  return (
    <div className="car-details">
      <h2>{car.make} {car.model} ({car.year})</h2>
      <p><strong>Category:</strong> {car.category}</p>
      <p><strong>Fuel:</strong> {car.fuel}</p>
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Capacity:</strong> {car.capacity}</p>
      <p><strong>Location:</strong> {car.location}</p>
      <p><strong>Price Per Hour:</strong> KES {car.pricePerHour}</p>
      <p><strong>Price Per Day:</strong> KES {car.pricePerDay}</p>
      <p><strong>Availability:</strong> {car.availability ? 'Available' : 'Unavailable'}</p>
      <p><strong>Listed By:</strong> User #{car.createdBy}</p>
    </div>
  )
}
