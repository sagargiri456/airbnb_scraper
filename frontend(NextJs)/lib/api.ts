import type { Listing } from "@/types/listing"
import { mockListings } from "./mock-data"

// This function would normally fetch from your Django backend
export async function fetchListings(params?: Record<string, string>): Promise<Listing[]> {
  const query = params ? `?${new URLSearchParams(params)}` : ""

  try {
    const response = await fetch(`http://localhost:8000/api/listings${query}`)
    if (!response.ok) {
      throw new Error("Failed to fetch listings")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching listings:", error)
    return []
  }
}

// This function would normally fetch a single listing from your Django backend
export async function fetchListing(id: number): Promise<Listing> {
  try {
    const response = await fetch(`http://localhost:8000/api/listings/${id}`)
    if (!response.ok) {
      throw new Error(`Listing with ID ${id} not found`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error)
    throw error
  }
}


