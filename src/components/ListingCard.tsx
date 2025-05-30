
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Star, MessageSquare, Heart, Eye } from "lucide-react";
import { Listing } from "@/hooks/useListings";

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "New": return "bg-green-100 text-green-800";
      case "Like New": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Acceptable": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (is_set: boolean) => {
    return is_set ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800";
  };

  const handleContactSeller = () => {
    navigate(`/contact-seller/${listing.id}`);
  };

  const handleViewDetails = () => {
    navigate(`/view-details/${listing.id}`);
  };

  const books = listing.listing_books.map(lb => lb.book);
  const thumbnailImage = listing.listing_images.find(img => img.display_order === 0)?.image_url || "/placeholder.svg";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getQualityColor(listing.condition)}>
                {listing.condition}
              </Badge>
              <Badge className={getTypeColor(listing.is_set)}>
                {listing.is_set ? "Book Set" : "Individual"}
              </Badge>
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
        {books.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Books Included:</p>
            <div className="text-sm text-gray-600">
              {books.slice(0, 3).map((book, index) => (
                <span key={book.id} className="text-green-600">
                  {book.title}{index < Math.min(2, books.length - 1) ? ", " : ""}
                </span>
              ))}
              {books.length > 3 && (
                <span className="text-gray-500"> +{books.length - 3} more</span>
              )}
            </div>
            {listing.book_group && (
              <p className="text-xs text-gray-500">
                {books.length} books from {listing.book_group.name}
              </p>
            )}
          </div>
        )}

        {/* Price and Seller Info */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{listing.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{listing.seller.full_name || "Anonymous"}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
              4.5
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Camera className="h-4 w-4 mr-1" />
          {listing.listing_images.length} photo{listing.listing_images.length !== 1 ? "s" : ""}
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
          <Button 
            variant="outline" 
            onClick={handleViewDetails}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
