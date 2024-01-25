import useFlightStore from "../store"

export default function ResultSection() {
  const flights = useFlightStore((state) => state.flights)
  const isError = useFlightStore((state) => state.isError)
  const isLoading = useFlightStore((state) => state.isLoading)
  const isShowResults = useFlightStore((state) => state.showResults)
  function getResults() {
    if (!isShowResults) {
      return ""
    }
    if (isError) {
      return "error..."
    }
    if (isLoading) {
      return "loading..."
    } else {
      return flights.map((flight) => {
        return (
          <div key={flight.id}>
            <p>
              Departure City = {flight.departureCity} --- Arrival City = {flight.arrivalCity}
            </p>
          </div>
        )
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
