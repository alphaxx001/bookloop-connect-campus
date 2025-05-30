
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface BookSetDetailsProps {
  booksIncluded: string[];
  missingBooks: string[];
  fullSetBooks: string[];
  group: string;
}

export const BookSetDetails = ({ 
  booksIncluded, 
  missingBooks, 
  fullSetBooks, 
  group 
}: BookSetDetailsProps) => {
  // Calculate missing books if not provided
  const calculatedMissingBooks = missingBooks.length > 0 
    ? missingBooks 
    : fullSetBooks.filter(book => !booksIncluded.includes(book));

  return (
    <div className="space-y-4">
      {/* Books Included */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Books Included in This Set
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {booksIncluded.map((book, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-gray-900">{book}</p>
                  <p className="text-sm text-gray-600">{group} Course</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Included</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{booksIncluded.length}</strong> of <strong>{fullSetBooks.length}</strong> books from {group}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Missing Books */}
      {calculatedMissingBooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              Books Missing from the Standard Set
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {calculatedMissingBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{book}</p>
                    <p className="text-sm text-gray-600">{group} Course</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Missing</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                You'll need to purchase <strong>{calculatedMissingBooks.length}</strong> additional book{calculatedMissingBooks.length !== 1 ? 's' : ''} separately to complete the {group} set.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
