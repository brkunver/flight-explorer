import useFlightStore from "../store"
import ResultCard from "./ui/ResultCard"
import { useState } from "react"

export default function ResultSection() {
  const [sortTime, setSortTime] = useState(true)

  console.log("Result Section Rendered")

  const flights = useFlightStore((state) => state.flights)
  const setFlights = useFlightStore((state) => state.setFlights)
  const isError = useFlightStore((state) => state.isError)
  const isLoading = useFlightStore((state) => state.isLoading)
  const isShowResults = useFlightStore((state) => state.showResults)
  function getResults() {
    if (!isShowResults) {
      return <p>Start typing for flights,they will be listed her here</p>
    }
    if (isError) {
      return <p>Error Occured</p>
    }
    if (isLoading) {
      return <p>Loading...</p>
    } else {
      return flights.map((flight) => {
        return <ResultCard key={flight.id} singleFlight={flight}></ResultCard>
      })
    }
  }

  function sortByDate() {
    let newFlights
    if (sortTime) {
      newFlights = flights.sort((flight1, flight2) => {
        return new Date(flight2.departureTime).getTime() - new Date(flight1.departureTime).getTime()
      })
    } else {
      newFlights = flights.sort((flight1, flight2) => {
        return new Date(flight1.departureTime).getTime() - new Date(flight2.departureTime).getTime()
      })
    }

    setFlights(newFlights)
    setSortTime((state) => !state)
  }

  function getTopBar() {
    if (isShowResults && !isError) {
      return (
        <div className="flex gap-x-2 justify-evenly bg-white rounded-sm border-t-[0.2px] px-4 py-2 font-semibold text-lg">
          <p className="lg:min-w-32">Departure City</p>
          <p className="lg:min-w-32">Arrival City</p>
          <button onClick={sortByDate} className="lg:min-w-32">
            Departure Time
          </button>
          <p className="lg:min-w-32">Return Time</p>
          <p className="lg:min-w-32">Trip Duration</p>
          <p className="lg:min-w-32">Price</p>
        </div>
      )
    }
  }

  return (
    <div className="mx-auto my-8 lg:my-24 text-center flex flex-col lg:min-w-[1000px] lg:min-h-[200px] border-[0.2px] border-gray-200 bg-gray-50 rounded-md shadow-md">
      <h2>Results</h2>
      {getTopBar()}
      {getResults()}
    </div>
  )
}
