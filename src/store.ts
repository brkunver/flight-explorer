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
  flights: Flights
  setFlights: (filteredFlights: Flights) => void
}

const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  setFlights: (filteredFlights: Flights) => set(() => ({ flights: filteredFlights })),
}))

export default useFlightStore
