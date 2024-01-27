import useFlightStore, { type Flights } from "../store"
import ResultCard from "./ui/ResultCard"
import { useState } from "react"
import parseDuration from "@/lib/parseDuration"
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA } from "lucide-react"

export default function ResultSection() {
  const [sortTime, setSortTime] = useState(true)
  const [sortDepCity, setSortDepCity] = useState(true)
  const [sortArvCity, setSortArvCity] = useState(true)
  const [sortDuration, setSortDuration] = useState(true)

  console.log("Result Section Rendered")

  const flights = useFlightStore((state) => state.flights)
  const setFlights = useFlightStore((state) => state.setFlights)
  const isError = useFlightStore((state) => state.isError)
  const isLoading = useFlightStore((state) => state.isLoading)
  const isShowResults = useFlightStore((state) => state.showResults)

  function sortByDate() {
    let newFlights: Flights
    if (sortTime) {
      newFlights = flights.toSorted((flight1, flight2) => {
        return new Date(flight2.departureTime).getTime() - new Date(flight1.departureTime).getTime()
      })
    } else {
      newFlights = flights.toSorted((flight1, flight2) => {
        return new Date(flight1.departureTime).getTime() - new Date(flight2.departureTime).getTime()
      })
    }

    setFlights(newFlights)
    setSortTime((state) => !state)
  }

  function sortByDuration() {
    let newFlights: Flights
    if (sortDuration) {
      newFlights = flights.toSorted((flight1, flight2) => {
        return parseDuration(flight1.duration) - parseDuration(flight2.duration)
      })
    } else {
      newFlights = flights.toSorted((flight1, flight2) => {
        return parseDuration(flight2.duration) - parseDuration(flight1.duration)
      })
    }
    setFlights(newFlights)
    setSortDuration((state) => !state)
  }

  function sortByDepartureCity() {
    let newFlights: Flights
    if (sortDepCity) {
      newFlights = flights.toSorted((flight1, flight2) => {
        return flight1.departureCity.localeCompare(flight2.departureCity)
      })
    } else {
      newFlights = flights.toSorted((flight1, flight2) => {
        return flight2.departureCity.localeCompare(flight1.departureCity)
      })
    }
    setFlights(newFlights)
    setSortDepCity((state) => !state)
  }

  function sortByArrivalCity() {
    let newFlights: Flights
    if (sortArvCity) {
      newFlights = flights.toSorted((flight1, flight2) => {
        return flight1.arrivalCity.localeCompare(flight2.arrivalCity)
      })
    } else {
      newFlights = flights.toSorted((flight1, flight2) => {
        return flight2.arrivalCity.localeCompare(flight1.arrivalCity)
      })
    }
    setFlights(newFlights)
    setSortArvCity((state) => !state)
  }

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

  function getTopBar() {
    if (isShowResults && !isError) {
      return (
        <div className="flex gap-x-2 justify-evenly bg-white rounded-sm border-t-[0.2px] px-4 py-2 font-semibold text-lg">
          <button onClick={sortByDepartureCity} className="lg:min-w-32">
            <div className="flex justify-center items-center">
              <p>Departure City</p>

              {sortDepCity ? <ArrowDownZA /> : <ArrowDownAZ />}
            </div>
          </button>
          <button onClick={sortByArrivalCity} className="lg:min-w-32">
            <div className="flex justify-center items-center">
              <p>Arrival City</p>

              {sortArvCity ? <ArrowDownZA /> : <ArrowDownAZ />}
            </div>
          </button>
          <button onClick={sortByDate} className="lg:min-w-32">
            <div className="flex justify-center items-center">
              <p>Departure Time</p>

              {sortTime ? <ArrowDown01 /> : <ArrowDown10 />}
            </div>
          </button>
          <p className="lg:min-w-32">Return Time</p>

          <button onClick={sortByDuration} className="lg:min-w-32">
            <div className="flex justify-center items-center">
              <p>Trip Duration</p>

              {sortDuration ? <ArrowDown01 /> : <ArrowDown10 />}
            </div>
          </button>

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
