import type { Flights } from "@/store"

export default async function fetchFlights(api: string): Promise<Flights> {
  let response = await fetch(api)
  let data = await response.json()
  return data.flights
}
