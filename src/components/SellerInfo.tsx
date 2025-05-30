
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Shield, MessageSquare } from "lucide-react";

interface SellerInfoProps {
  seller: string;
  rating: number;
  avatar?: string;
}

export const SellerInfo = ({ seller, rating, avatar }: SellerInfoProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          Seller Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={seller} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {getInitials(seller)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{seller}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{formatRating(rating)}</span>
              <span className="text-sm text-gray-600">(23 reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Member since:</span>
            <span>Jan 2023</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Books sold:</span>
            <span>47</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Response time:</span>
            <span className="text-green-600">Usually within 2 hours</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Verified Student</span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            Verified through college email address
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
