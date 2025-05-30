
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Star, MessageSquare, Heart } from "lucide-react";

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
}

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  
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

  const isPriceGood = listing.price < listing.averagePrice;

  const handleContactSeller = () => {
    navigate(`/contact-seller/${listing.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
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
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Books Included */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Books Included:</p>
          <div className="text-sm text-gray-600">
            {listing.books.slice(0, 3).map((book, index) => (
              <span key={book} className="text-green-600">
                {book}{index < Math.min(2, listing.books.length - 1) ? ", " : ""}
              </span>
            ))}
            {listing.books.length > 3 && (
              <span className="text-gray-500"> +{listing.books.length - 3} more</span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {listing.books.length}/{listing.type === "full-set" ? 7 : listing.books.length} books from {listing.group}
          </p>
        </div>

        {/* Missing Books */}
        {listing.missingBooks.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Missing:</p>
            <div className="text-sm text-red-600">
              {listing.missingBooks.slice(0, 2).join(", ")}
              {listing.missingBooks.length > 2 && ` +${listing.missingBooks.length - 2} more`}
            </div>
          </div>
        )}

        {/* Price and Seller Info */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{listing.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              Avg: ₹{listing.averagePrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{listing.seller}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
              {listing.rating}
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Camera className="h-4 w-4 mr-1" />
          {listing.photos} photo{listing.photos !== 1 ? "s" : ""}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={handleContactSeller}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
