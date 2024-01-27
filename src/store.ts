import { create } from "zustand"

export type Flight = {
  id?: number
  airline?: string
  departureAirport?: string
  arrivalAirport?: string
  departureCity?: string
  arrivalCity?: string
  departureTime?: string | null
  arrivalTime?: string | null
  duration?: string | null
  price?: number | null
  isRoundTrip?: boolean | null
  returnDepartureAirport?: string | null
  returnArrivalAirport?: string | null
  returnDepartureCity?: string | null
  returnArrivalCity?: string | null
  returnDepartureTime?: string | null
  returnArrivalTime?: string | null
  returnDuration?: string | null
  returnPrice?: number | null
}

export type Flights = Flight[]

type FlightStore = {
  isLoading: boolean
  isError: boolean
  showResults: boolean
  flights: Flights
  setFlights: (filteredFlights: Flights) => void
  setLoading: (loadingInput: boolean) => void
  setError: (errorInput: boolean) => void
  setShowResults: (input: boolean) => void
}

const useFlightStore = create<FlightStore>((set) => ({
  isLoading: false,
  showResults: false,
  isError: false,
  flights: [],
  setFlights: (filteredFlights: Flights) => set(() => ({ flights: filteredFlights })),
  setLoading: (loadingInput) => set(() => ({ isLoading: loadingInput })),
  setError: (errorInput) => set(() => ({ isError: errorInput })),
  setShowResults: (input) => set(() => ({ showResults: input })),
}))

export default useFlightStore
