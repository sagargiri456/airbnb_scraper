import { SearchBar } from "@/components/search-bar"
import { ListingGrid } from "@/components/listing-grid"
import { Suspense } from "react"

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        {/* <SearchBar /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <ListingGrid />
        </Suspense>
      </div>
    </main>
  )
}

