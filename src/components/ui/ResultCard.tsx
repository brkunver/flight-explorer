import type { Flight } from "@/store"

type Props = {
  singleFlight: Flight
}

function ResultCard({ singleFlight }: Props) {
  const depDate = new Date(singleFlight.departureTime)
  const arvDate = new Date(singleFlight.arrivalTime)

  return (
    <div className="flex gap-x-2 justify-evenly bg-white rounded-sm border-t-[0.2px] px-4 py-2 ">
      <p className="lg:min-w-32">{singleFlight.departureCity}</p>
      <p className="lg:min-w-32">{singleFlight.arrivalCity}</p>
      <p className="lg:min-w-32">
        {depDate.toLocaleDateString()} : {depDate.toLocaleTimeString()}
      </p>
      <p className="lg:min-w-32">
        {arvDate.toLocaleDateString()} : {arvDate.toLocaleTimeString()}
      </p>
      <p className="lg:min-w-32">{singleFlight.duration}</p>
      <p className="lg:min-w-32">{singleFlight.price}</p>
    </div>
  )
}

export default ResultCard
