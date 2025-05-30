
import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { ListingCard } from "@/components/ListingCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Grid, List, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Listing {
  id: number;
  title: string;
  books: string[];
  price: number;
  quality: string;
  seller: string;
  rating: number;
  photos: number;
  type: string;
  group: string;
  missingBooks: string[];
  averagePrice: number;
  datePosted: string;
  author?: string;
  courseCode?: string;
  thumbnail?: string;
}

interface Filters {
  priceRange: number[];
  quality: string[];
  setType: string;
}

const BuyBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000],
    quality: [],
    setType: "all"
  });

  // Mock data - replace with actual API call
  const mockListings: Listing[] = [
    {
      id: 1,
      title: "Engineering Mathematics Set",
      books: ["Advanced Calculus", "Linear Algebra", "Differential Equations"],
      price: 2500,
      quality: "Like New",
      seller: "Rahul Kumar",
      rating: 4.8,
      photos: 5,
      type: "partial-set",
      group: "Engineering Group 1",
      missingBooks: ["Probability Theory"],
      averagePrice: 3000,
      datePosted: "2024-01-25",
      courseCode: "MATH101",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Physics Complete Set",
      books: ["Mechanics", "Thermodynamics", "Electromagnetism", "Modern Physics"],
      price: 1800,
      quality: "Good",
      seller: "Priya Sharma",
      rating: 4.5,
      photos: 8,
      type: "full-set",
      group: "Physics Group 1",
      missingBooks: [],
      averagePrice: 2200,
      datePosted: "2024-01-24",
      courseCode: "PHY101",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      books: ["Introduction to Algorithms"],
      price: 800,
      quality: "Acceptable",
      seller: "Amit Patel",
      rating: 4.2,
      photos: 3,
      type: "individual",
      group: "Computer Science",
      missingBooks: [],
      averagePrice: 950,
      datePosted: "2024-01-23",
      author: "Thomas Cormen",
      courseCode: "CS201",
      thumbnail: "/placeholder.svg"
    }
  ];

  const featuredListings = mockListings.slice(0, 2);

  const filteredAndSortedListings = useMemo(() => {
    let filtered = mockListings.filter(listing => {
      // Search filter
      const searchMatch = searchQuery === "" || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.books.some(book => book.toLowerCase().includes(searchQuery.toLowerCase())) ||
        listing.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.courseCode?.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      const priceMatch = listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1];

      // Quality filter
      const qualityMatch = filters.quality.length === 0 || filters.quality.includes(listing.quality);

      // Set type filter
      const typeMatch = filters.setType === "all" || listing.type === filters.setType;

      return searchMatch && priceMatch && qualityMatch && typeMatch;
    });

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
        default:
          return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      }
    });

    return filtered;
  }, [mockListings, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Books</h1>
          <p className="text-gray-600">Find the perfect books for your studies</p>
        </div>

        {/* Featured Listings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Listings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredListings.map(listing => (
              <Card key={listing.id} className="border-2 border-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">₹{listing.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{listing.quality}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      <span className="text-sm">{listing.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title, author, or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredAndSortedListings.length} listing{filteredAndSortedListings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Listings */}
        {filteredAndSortedListings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Suggestions:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  <li>Check your spelling</li>
                  <li>Try broader search terms</li>
                  <li>Clear some filters</li>
                  <li>Search by course code instead</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredAndSortedListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyBooks;
