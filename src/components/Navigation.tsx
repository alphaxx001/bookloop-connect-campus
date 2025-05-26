
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Bell, Search, Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Navigation = () => {
  const [notifications] = useState(3);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">BookLoop</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <Search className="h-4 w-4 mr-2" />
              Buy Books
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Sell Books
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <ShoppingBag className="h-4 w-4 mr-2" />
              My Listings
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1rem] h-5">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
