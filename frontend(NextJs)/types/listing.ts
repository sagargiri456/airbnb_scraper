export interface Host {
  name: string
  image: string
  is_superhost: boolean
}

export interface Listing {
  id: number
  title: string
  location: string
  address: string
  price_per_night: number
  currency: string
  total_price: number
  images: string[]
  ratings: number
  description: string
  reviews: number
  amenities: string[]
  host: Host
  property_type: string
}

