import { SearchBar } from "@/components/search-bar"
import { ListingGrid } from "@/components/listing-grid"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find places to stay on Airbnb</h1>
        <SearchBar />
        <ListingGrid />
      </div>
    </main>
  )
}

