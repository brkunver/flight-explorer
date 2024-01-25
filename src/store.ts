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
}

export type Flights = Flight[]

type FlightStore = {
  isLoading: boolean
  isError: boolean
  flights: Flights
  setFlights: (filteredFlights: Flights) => void
  setLoading: (loadingInput: boolean) => void
  setError: (errorInput: boolean) => void
}

const useFlightStore = create<FlightStore>((set) => ({
  isLoading: false,
  isError: false,
  flights: [],
  setFlights: (filteredFlights: Flights) => set(() => ({ flights: filteredFlights })),
  setLoading: (loadingInput) => set(() => ({ isLoading: loadingInput })),
  setError: (errorInput) => set(() => ({ isError: errorInput })),
}))

export default useFlightStore
