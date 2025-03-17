"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, Users } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("1")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [rating, setRating] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (checkIn) params.append("checkIn", checkIn.toISOString())
    if (checkOut) params.append("checkOut", checkOut.toISOString())
    if (guests) params.append("guests", guests)
    // params.append("minPrice", priceRange[0].toString())
    // params.append("maxPrice", priceRange[1].toString())
    // if (rating) params.append("rating", rating)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-full shadow-lg p-2 mb-8 flex flex-col md:flex-row">
      <div className="flex-1 p-2 border-b md:border-b-0 md:border-r">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <Input
            type="text"
            placeholder="Where are you going?"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-2 border-b md:border-b-0 md:border-r">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
              {checkIn ? format(checkIn, "PPP") : <span className="text-gray-500">Check-in</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1 p-2 border-b md:border-b-0 md:border-r">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
              {checkOut ? format(checkOut, "PPP") : <span className="text-gray-500">Check-out</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              initialFocus
              disabled={(date) => (checkIn ? date < checkIn : false) || date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1 p-2 border-b md:border-b-0 md:border-r">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <span>
                {guests} Guest{Number.parseInt(guests) !== 1 ? "s" : ""}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4 p-2">
              <h3 className="font-medium">Guests</h3>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Guest{num !== 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="p-2">
        <Button onClick={handleSearch} className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}

