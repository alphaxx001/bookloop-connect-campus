
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "@/components/ImageCarousel";
import { BookSetDetails } from "@/components/BookSetDetails";
import { SellerInfo } from "@/components/SellerInfo";

const ViewDetails = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock data - in a real app this would come from an API call using the listingId
  const listing = {
    id: parseInt(listingId || "1"),
    title: "Complete First Year Group 1 Set",
    author: "Various Authors",
    books: ["BITS F110", "BIO F110", "BIO F111", "MATH F111", "BITS F112", "BITS F111", "CS F111"],
    price: 5500,
    quality: "Good",
    seller: "Arjun K.",
    rating: 4.8,
    photos: 3,
    type: "full-set",
    group: "Group 1",
    missingBooks: [],
    averagePrice: 6000,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    ],
    description: "Complete set of first year textbooks for Group 1. All books are in good condition with minimal highlighting. Perfect for incoming students.",
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    fullSetBooks: ["BITS F110", "BIO F110", "BIO F111", "MATH F111", "BITS F112", "BITS F111", "CS F111", "PHY F110"]
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Like New": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Acceptable": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-set": return "bg-purple-100 text-purple-800";
      case "partial-set": return "bg-orange-100 text-orange-800";
      case "individual": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isSet = listing.type === "full-set" || listing.type === "partial-set";
  const isPriceGood = listing.price < listing.averagePrice;

  const handleContactSeller = () => {
    navigate(`/contact-seller/${listing.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Image Carousel */}
        <ImageCarousel images={listing.images} title={listing.title} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Information */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-3">
                      {isSet ? `${listing.group} Book Set` : listing.title}
                    </CardTitle>
                    {!isSet && listing.author && (
                      <p className="text-gray-600 mb-3">by {listing.author}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getQualityColor(listing.quality)}>
                        {listing.quality}
                      </Badge>
                      <Badge className={getTypeColor(listing.type)}>
                        {listing.type === "full-set" ? "Full Set" : 
                         listing.type === "partial-set" ? "Partial Set" : "Individual"}
                      </Badge>
                      {isPriceGood && (
                        <Badge className="bg-green-100 text-green-800">Great Deal!</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{listing.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Avg: ₹{listing.averagePrice.toLocaleString()}
                    </span>
                  </div>
                  {isPriceGood && (
                    <p className="text-sm text-green-600 font-medium">
                      ₹{(listing.averagePrice - listing.price).toLocaleString()} below average price!
                    </p>
                  )}
                </div>

                {listing.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{listing.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Set Details (only for sets) */}
            {isSet && (
              <BookSetDetails 
                booksIncluded={listing.books}
                missingBooks={listing.missingBooks}
                fullSetBooks={listing.fullSetBooks}
                group={listing.group}
              />
            )}
          </div>

          {/* Right Column - Seller Info and Actions */}
          <div className="space-y-6">
            {/* Seller Information */}
            <SellerInfo 
              seller={listing.seller}
              rating={listing.rating}
              avatar={listing.sellerAvatar}
            />

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleContactSeller}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Listing Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span>2 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span>47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos:</span>
                    <span>{listing.photos}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
