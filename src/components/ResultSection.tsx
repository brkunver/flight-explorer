import useFlightStore from "../store"
import ResultCard from "./ui/ResultCard"

export default function ResultSection() {
  const flights = useFlightStore((state) => state.flights)
  const isError = useFlightStore((state) => state.isError)
  const isLoading = useFlightStore((state) => state.isLoading)
  const isShowResults = useFlightStore((state) => state.showResults)
  function getResults() {
    if (!isShowResults) {
      return "Start typing for flights,they will be listed her here "
    }
    if (isError) {
      return "error..."
    }
    if (isLoading) {
      return "loading..."
    } else {
      return flights.map((flight) => {
        return <ResultCard singleFlight={flight}></ResultCard>
      })
    }
  }

  return (
    <div className="mx-auto my-20 text-center flex flex-col lg:min-w-[1000px] lg:min-h-[300px]">
      <h2>Results</h2>

      {getResults()}
    </div>
  )
}
