import useFlightStore from "../store"

export default function ResultSection() {
  const flights = useFlightStore((state) => state.flights)

  return (
    <div>
      <button>Update</button>
    </div>
  )
}
