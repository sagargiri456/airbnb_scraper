"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { fetchListing } from "@/lib/api"
import type { Listing } from "@/types/listing"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Star, Award, Share, Heart, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockListings } from "@/lib/mock-data"

export default function ListingPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const getListing = async () => {
      setLoading(true)
      try {
        const data = await fetchListing(Number.parseInt(id))
        setListing(data)
      } catch (error) {
        console.error("Error fetching listing:", error)
        // Use mock data for now
        const mockListing = mockListings.find((l) => l.id === Number.parseInt(id))
        setListing(mockListing || null)
      } finally {
        setLoading(false)
      }
    }

    getListing()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-8"></div>
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Listing not found</h1>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0

    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return listing.price_per_night * diffDays
  }

  const totalPrice = calculateTotalPrice()

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1" />
          <span className="font-medium mr-1">{listing.ratings}</span>
          <span className="text-gray-500 mr-2">·</span>
          <span className="text-gray-500 underline">{listing.reviews} reviews</span>
          {listing.host.is_superhost && (
            <>
              <span className="text-gray-500 mx-2">·</span>
              <Award className="h-4 w-4 mr-1 text-red-500" />
              <span className="font-medium">Superhost</span>
            </>
          )}
          <span className="text-gray-500 mx-2">·</span>
          <span className="text-gray-500 underline">{listing.location}</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" className="flex items-center">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" className="flex items-center" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={cn("h-4 w-4 mr-2", isFavorite ? "fill-red-500 text-red-500" : "")} />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
        <div className="col-span-2 md:col-span-1 aspect-square relative">
          <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
        </div>
        <div className="hidden md:grid grid-cols-2 gap-2">
          {listing.images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square relative">
              <Image
                src={image || "/placeholder.svg?height=300&width=300"}
                alt={`${listing.title} ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">
                {listing.property_type} hosted by {listing.host.name}
              </h2>
              <p className="text-gray-500">{listing.address}</p>
            </div>
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={listing.host.image || "/placeholder.svg"}
                alt={listing.host.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">About this place</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <span className="text-gray-500">✓</span>
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-8 border rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xl font-bold">${listing.price_per_night}</span>
                <span className="text-gray-500"> night</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>{listing.ratings}</span>
                <span className="text-gray-500 mx-1">·</span>
                <span className="text-gray-500 underline">{listing.reviews} reviews</span>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2">
                <div className="p-3 border-r border-b">
                  <div className="text-xs font-bold">CHECK-IN</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal p-0 h-auto">
                        {checkIn ? format(checkIn, "MMM d, yyyy") : <span className="text-gray-500">Add date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="p-3 border-b">
                  <div className="text-xs font-bold">CHECKOUT</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal p-0 h-auto">
                        {checkOut ? format(checkOut, "MMM d, yyyy") : <span className="text-gray-500">Add date</span>}
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
              </div>
              <div className="p-3">
                <div className="text-xs font-bold">GUESTS</div>
                <div className="flex justify-between items-center">
                  <span>
                    {guests} guest{guests !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{guests}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => setGuests(Math.min(16, guests + 1))}
                      disabled={guests >= 16}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white mb-4"
              disabled={!checkIn || !checkOut}
            >
              Reserve
            </Button>

            {checkIn && checkOut && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="underline">
                    ${listing.price_per_night} x{" "}
                    {Math.ceil(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>${Math.round(totalPrice * 0.15)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total before taxes</span>
                  <span>${totalPrice + 50 + Math.round(totalPrice * 0.15)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

