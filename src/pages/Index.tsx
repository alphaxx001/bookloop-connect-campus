
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Users, TrendingDown, Shield, Star } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import { Navigation } from "@/components/Navigation";
import { ListingCard } from "@/components/ListingCard";
import { SearchFilters } from "@/components/SearchFilters";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 10000],
    quality: [],
    setType: "all"
  });

  // Sample listings data
  const sampleListings = [
    {
      id: 1,
      title: "Complete First Year Group 1 Set",
      books: ["BITS F110", "BIO F110", "BIO F111", "MATH F111", "BITS F112", "BITS F111", "CS F111"],
      price: 5500,
      quality: "Good",
      seller: "Arjun K.",
      rating: 4.8,
      photos: 3,
      type: "full-set",
      group: "Group 1",
      missingBooks: [],
      averagePrice: 6000
    },
    {
      id: 2,
      title: "Partial Group 2 Set (4 Books)",
      books: ["PHY F111", "CHEM F111", "MATH F112", "EEE F111"],
      price: 3200,
      quality: "Like New",
      seller: "Priya S.",
      rating: 4.9,
      photos: 2,
      type: "partial-set",
      group: "Group 2",
      missingBooks: ["ME F110", "MATH F113", "CHEM F110", "PHY F110"],
      averagePrice: 3500
    },
    {
      id: 3,
      title: "MATH F111 Textbook",
      books: ["MATH F111"],
      price: 800,
      quality: "Acceptable",
      seller: "Rahul M.",
      rating: 4.6,
      photos: 1,
      type: "individual",
      group: "Group 1",
      missingBooks: [],
      averagePrice: 900
    }
  ];

  const filteredListings = sampleListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.books.some(book => book.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPrice = listing.price >= selectedFilters.priceRange[0] && listing.price <= selectedFilters.priceRange[1];
    const matchesQuality = selectedFilters.quality.length === 0 || selectedFilters.quality.includes(listing.quality);
    const matchesSetType = selectedFilters.setType === "all" || listing.type === selectedFilters.setType;
    
    return matchesSearch && matchesPrice && matchesQuality && matchesSetType;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">BookLoop</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              The smart marketplace for college textbooks - by students, for students
            </p>
            <Button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Best Prices</CardTitle>
                <CardDescription>
                  Compare prices across all listings and find the best deals with our smart pricing guidance
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Safe & Secure</CardTitle>
                <CardDescription>
                  Verified college students only - authentication through .edu email addresses
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Student Community</CardTitle>
                <CardDescription>
                  Built by students for students - fair pricing and transparent book listings
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How BookLoop Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Sign Up</h3>
                  <p className="text-gray-600">Register with your college email to join our verified student community</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Buy or Sell</h3>
                  <p className="text-gray-600">List your books or browse thousands of listings with transparent pricing</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Connect</h3>
                  <p className="text-gray-600">Chat with buyers/sellers and arrange safe pickup on campus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)}
          onLogin={() => {
            setIsLoggedIn(true);
            setIsLoginOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BookLoop</h1>
          <p className="text-gray-600">Find the best deals on textbooks or sell your books to fellow students</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Search className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Buy Books</h3>
                  <p className="opacity-90">Find textbooks at the best prices</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-600 text-white hover:bg-green-700 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Sell Books</h3>
                  <p className="opacity-90">List your books and earn money</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for books, course codes, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg"
                />
              </div>
              <SearchFilters 
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>
          </CardContent>
        </Card>

        {/* Price Guidance */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center text-blue-800">
              <TrendingDown className="h-5 w-5 mr-2" />
              <span className="font-medium">Market Insights:</span>
              <span className="ml-2">Full Group 1 sets average ₹6,000 • Individual books average ₹800-1,200</span>
            </div>
          </CardContent>
        </Card>

        {/* Listings */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more results</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
