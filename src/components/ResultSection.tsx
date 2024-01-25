import useFlightStore from "../store"

export default function ResultSection() {
  const flights = useFlightStore((state) => state.flights)
  const isError = useFlightStore((state) => state.isError)
  const isLoading = useFlightStore((state) => state.isLoading)

  console.log("Results.jsx : Error =>", isError, "Loading =>" , isLoading)

  function getResults() {
    if (isError) {
      return "error..."
    }
    if (isLoading) {
      return "loading..."
    } else {
      return flights.map((flight) => {
        return <p key={flight.id}>{flight.id}</p>
      })
    }
  }

  return (
    <div className="mx-auto text-center flex flex-col">
      <h2>Results</h2>

      {getResults()}
    </div>
  )
}
