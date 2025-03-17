import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Safety information
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Supporting people with disabilities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Report a neighborhood concern
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb.org: disaster relief housing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Combating discrimination
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Explore hosting resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Visit our community forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  How to host responsibly
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Airbnb</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Learn about new features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Letter from our founders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="text-gray-600">© 2025 Airbnb Clone, Inc.</span>
            <span className="text-gray-600">·</span>
            <Link href="#" className="text-gray-600 hover:underline">
              Privacy
            </Link>
            <span className="text-gray-600">·</span>
            <Link href="#" className="text-gray-600 hover:underline">
              Terms
            </Link>
            <span className="text-gray-600">·</span>
            <Link href="#" className="text-gray-600 hover:underline">
              Sitemap
            </Link>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:underline flex items-center">
              <span className="mr-2">English (US)</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:underline flex items-center">
              <span className="mr-2">$ USD</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

