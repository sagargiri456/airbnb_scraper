"use client"

import { useState, useEffect } from "react"
import { ListingCard } from "@/components/listing-card"
import type { Listing } from "@/types/listing"
import { fetchListings } from "@/lib/api"
import { useSearchParams } from "next/navigation"

export function ListingGrid() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const getListings = async () => {
      setLoading(true)
      try {
        // Convert searchParams to an object
        const params: Record<string, string> = {}
        searchParams.forEach((value, key) => {
          params[key] = value
        })

        const data = await fetchListings(params)
        setListings(data)
      } catch (error) {
        console.error("Error fetching listings:", error)
        // Use mock data for now
        setListings(mockListings)
      } finally {
        setLoading(false)
      }
    }

    getListings()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-2"></div>
            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

// Mock data for development
const mockListings: Listing[] = [
  {
    id: 1,
    title: "Cozy Apartment in NYC",
    location: "New York, USA",
    address: "123 Broadway, New York, NY",
    price_per_night: 120,
    currency: "USD",
    total_price: 360,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.8,
    description: "A beautiful apartment in the heart of New York City.",
    reviews: 150,
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Washer", "Dryer"],
    host: {
      name: "John Doe",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: true,
    },
    property_type: "Apartment",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Miami, USA",
    address: "456 Ocean Drive, Miami, FL",
    price_per_night: 350,
    currency: "USD",
    total_price: 1050,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.9,
    description: "Stunning villa with private pool and ocean views.",
    reviews: 87,
    amenities: ["Pool", "WiFi", "Kitchen", "Air Conditioning", "Parking"],
    host: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: true,
    },
    property_type: "Villa",
  },
  {
    id: 3,
    title: "Modern Downtown Loft",
    location: "Chicago, USA",
    address: "789 Michigan Ave, Chicago, IL",
    price_per_night: 180,
    currency: "USD",
    total_price: 540,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.7,
    description: "Stylish loft in downtown Chicago with city views.",
    reviews: 65,
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Gym", "Elevator"],
    host: {
      name: "Mike Johnson",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: false,
    },
    property_type: "Loft",
  },
  {
    id: 4,
    title: "Beachfront Cottage",
    location: "Malibu, USA",
    address: "101 Pacific Coast Hwy, Malibu, CA",
    price_per_night: 275,
    currency: "USD",
    total_price: 825,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.9,
    description: "Charming cottage with direct beach access.",
    reviews: 112,
    amenities: ["WiFi", "Kitchen", "Beachfront", "Patio", "BBQ Grill"],
    host: {
      name: "Sarah Williams",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: true,
    },
    property_type: "Cottage",
  },
  {
    id: 5,
    title: "Mountain Cabin Retreat",
    location: "Aspen, USA",
    address: "222 Mountain Road, Aspen, CO",
    price_per_night: 195,
    currency: "USD",
    total_price: 585,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.8,
    description: "Cozy cabin surrounded by nature with mountain views.",
    reviews: 78,
    amenities: ["WiFi", "Fireplace", "Kitchen", "Hiking Trails", "Hot Tub"],
    host: {
      name: "Robert Brown",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: false,
    },
    property_type: "Cabin",
  },
  {
    id: 6,
    title: "Historic Brownstone",
    location: "Boston, USA",
    address: "333 Beacon St, Boston, MA",
    price_per_night: 210,
    currency: "USD",
    total_price: 630,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.7,
    description: "Elegant brownstone in historic Boston neighborhood.",
    reviews: 92,
    amenities: ["WiFi", "Kitchen", "Washer", "Dryer", "Garden"],
    host: {
      name: "Emily Davis",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: true,
    },
    property_type: "Townhouse",
  },
  {
    id: 7,
    title: "Desert Oasis with Hot Tub",
    location: "Scottsdale, USA",
    address: "444 Cactus Rd, Scottsdale, AZ",
    price_per_night: 165,
    currency: "USD",
    total_price: 495,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.6,
    description: "Modern home with private hot tub and desert views.",
    reviews: 54,
    amenities: ["WiFi", "Hot Tub", "Pool", "Kitchen", "Air Conditioning"],
    host: {
      name: "David Wilson",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: false,
    },
    property_type: "House",
  },
  {
    id: 8,
    title: "Lakefront Cabin",
    location: "Lake Tahoe, USA",
    address: "555 Lakeshore Dr, Lake Tahoe, CA",
    price_per_night: 230,
    currency: "USD",
    total_price: 690,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    ratings: 4.9,
    description: "Rustic cabin with stunning lake views and private dock.",
    reviews: 103,
    amenities: ["WiFi", "Fireplace", "Kitchen", "Dock", "Kayaks"],
    host: {
      name: "Lisa Thompson",
      image: "/placeholder.svg?height=50&width=50",
      is_superhost: true,
    },
    property_type: "Cabin",
  },
]

