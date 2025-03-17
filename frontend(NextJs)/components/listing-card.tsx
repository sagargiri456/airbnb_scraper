"use client"

import Image from "next/image"
import Link from "next/link"
import type { Listing } from "@/types/listing"
import { Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <div className="absolute right-3 top-3 z-10">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
              className="rounded-full p-2 bg-white/70 hover:bg-white transition"
            >
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </button>
          </div>
          <div className="relative h-full w-full">
            <Image
              src={listing.images[0] || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{listing.title}</h3>
            <div className="flex items-center">
              <span className="text-sm">★</span>
              <span className="text-sm ml-1">{listing.ratings}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{listing.location}</p>
          <p className="text-gray-500 text-sm">{listing.property_type}</p>
          <p className="mt-1">
            <span className="font-semibold">${listing.price_per_night}</span>
            <span className="text-gray-500"> night</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

