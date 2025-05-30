
import { Button } from "@/components/ui/button";
import { BookOpen, User, Bell, Search, Heart, ShoppingBag, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">BookLoop</span>
          </div>

          {/* Navigation Links - only show if authenticated */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600"
                onClick={() => navigate("/buy-books")}
              >
                <Search className="h-4 w-4 mr-2" />
                Buy Books
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600"
                onClick={() => navigate("/sell-books")}
              >
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
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1rem] h-5">
                  3
                </Badge>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleAuthClick}>
              {user ? (
                <>
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </>
              ) : (
                <>
                  <User className="h-5 w-5 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
