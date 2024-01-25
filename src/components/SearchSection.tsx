import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import useFlightStore from "../store"

function SearchSection() {
  const [depDate, setDepDate] = useState<Date>()
  const [arvDate, setArvDate] = useState<Date>()

  const flights = useFlightStore((state) => state.flights)
  const setFlights = useFlightStore((state) => state.setFlights)

  return (
    <main className="lg:bg-white bg-slate-100 lg:w-fit flex flex-col rounded-md mx-auto h-full px-4 py-4 mt-10">
      <div id="citySelection" className="flex flex-col lg:flex-row  gap-x-8">
        <div className="flex flex-col justify-center align-middle content-center text-center w-[280px]">
          <Label htmlFor="departureCity" className="my-4">
            Departure City
          </Label>
          <Input id="departureCity" name="departureCity" type="text" placeholder="London" />
        </div>
        <div className="flex flex-col justify-center align-middle content-center text-center w-[280px]">
          <Label htmlFor="arrivalCity" className="my-4">
            Arrival City
          </Label>
          <Input id="arrivalCity" name="arrivalCity" type="text" placeholder="New York" />
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
              className={cn("w-[280px] justify-start text-left font-normal", !arvDate && "text-gray-700")}
            >
              {arvDate ? arvDate.toDateString() : <span>Pick arrival date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={arvDate} onSelect={setArvDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  )
}

export default SearchSection
