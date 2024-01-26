import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "./ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import useFlightStore from "../store"
import fetchFlights from "@/lib/fetchFlights"
import compareDates from "@/lib/compareDate"

function SearchSection() {
  const [depDate, setDepDate] = useState<Date>()
  const [retDepDate, setretDepDate] = useState<Date>()

  const [depCity, setDepCity] = useState("")
  const [arvCity, setArvCity] = useState("")

  const [isOneWay, setIsOneWay] = useState<any>(false)

  const API = "/api/flights.json"

  const setFlights = useFlightStore((state) => state.setFlights)
  const setError = useFlightStore((state) => state.setError)
  const setLoading = useFlightStore((state) => state.setLoading)
  const setShowResults = useFlightStore((state) => state.setShowResults)

  useEffect(() => {
    async function handleSearch() {
      setLoading(true)
      try {
        const fetchedFlights = await fetchFlights(API)
        setError(false)
        setLoading(false)

        let filteredFlights = fetchedFlights.filter((item) => {
          let depCityEquality = item.departureCity.toLowerCase().includes(depCity.toLowerCase())
          let arvCityEquality = item.arrivalCity.toLowerCase().includes(arvCity.toLowerCase())
          let depDateEquality = compareDates(depDate || new Date("1999"), new Date(item.departureTime))
          let retDepDateEquality = compareDates(retDepDate || new Date("1999"), new Date(item.returnDepartureTime))
          let oneWayEquality = item.isRoundTrip && isOneWay

          if (arvCity != "" && depCity != "") {
            if (depDate == undefined && retDepDate == undefined) {
              return arvCityEquality && depCityEquality
            } else if (depDate == undefined) {
              return arvCityEquality && depCityEquality && retDepDateEquality
            } else if (retDepDate == undefined) {
              return arvCityEquality && depCityEquality && depDateEquality
            }
            return false
          } else if (depCity == "") {
            if (depDate == undefined && retDepDate == undefined) {
              return arvCityEquality
            } else if (depDate == undefined) {
              return arvCityEquality && retDepDateEquality
            } else if (retDepDate == undefined) {
              return arvCityEquality && depDateEquality
            }
            return false
          } else if (arvCity == "") {
            if (depDate == undefined && retDepDate == undefined) {
              return depCityEquality
            } else if (depDate == undefined) {
              return depCityEquality && retDepDateEquality
            } else if (retDepDate == undefined) {
              return depCityEquality && depDateEquality
            }
            return false
          } else {
            return false
          }
        })

        setFlights(filteredFlights)
      } catch {
        setError(true)
        setLoading(false)
      }
    }

    if (depCity != "" || arvCity != "") {
      setTimeout(handleSearch, 100)
      setShowResults(true)
    } else {
      setShowResults(false)
    }

    console.log("Dep City = ", depCity, "Arv City = ", arvCity)
    console.log("Dep Date = ", depDate, "Arv Date = ", retDepDate)
  }, [depCity, arvCity])

  return (
    <main className="lg:bg-white bg-slate-100 lg:w-fit flex flex-col rounded-md mx-auto h-full px-4 py-4 mt-10">
      <div id="citySelection" className="flex flex-col lg:flex-row gap-x-8">
        <div className="flex flex-col justify-center align-middle content-center text-center w-[280px]">
          <Label htmlFor="departureCity" className="my-4">
            Departure City
          </Label>
          <Input
            id="departureCity"
            name="departureCity"
            type="text"
            placeholder="London"
            onChange={(e) => {
              setDepCity(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col justify-center align-middle content-center text-center w-[280px]">
          <Label htmlFor="arrivalCity" className="my-4">
            Arrival City
          </Label>
          <Input
            id="arrivalCity"
            name="arrivalCity"
            type="text"
            placeholder="New York"
            onChange={(e) => {
              setArvCity(e.target.value)
            }}
          />
        </div>
      </div>

      <div id="dateSelection" className="flex flex-col lg:flex-row gap-x-8 mt-4">
        <Popover>
          <PopoverTrigger className="mt-4" asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !depDate && "text-gray-700")}
            >
              {depDate ? depDate.toDateString() : <span>Pick departure date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={depDate} onSelect={setDepDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="mt-4" asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !retDepDate && "text-gray-700")}
              disabled={isOneWay}
            >
              {retDepDate ? retDepDate.toDateString() : <span>Pick return date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={retDepDate} onSelect={setretDepDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col lg:flex-row mt-4 gap-x-2 justify-center align-middle">
        <Checkbox id="one-way" className={cn("my-auto")} onCheckedChange={(e) => setIsOneWay(e)} />
        <label htmlFor="one-way" className="my-auto">
          One Way Trip ?
        </label>
      </div>
    </main>
  )
}

export default SearchSection
