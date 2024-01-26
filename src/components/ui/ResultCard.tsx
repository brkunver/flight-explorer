import type { Flight } from "@/store"

type Props = {
  singleFlight: Flight
}

function ResultCard({ singleFlight }: Props) {
  return (
    <div className="flex gap-x-2">
      <p>{singleFlight.departureCity}</p>
      <p>{singleFlight.arrivalCity}</p>
      <p>{singleFlight.departureTime}</p>
      <p>{singleFlight.arrivalTime}</p>
      <p>{singleFlight.duration}</p>
      <p>{singleFlight.price}</p>
    </div>
  )
}

export default ResultCard
