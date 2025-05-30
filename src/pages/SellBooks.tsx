
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Eye, Save, Camera, DollarSign, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookForm {
  title: string;
  author: string;
  isbn: string;
  courseCode: string;
  bookGroup: string;
  condition: string;
  price: string;
  description: string;
  listingType: "single" | "set";
  selectedBooks: string[];
  images: File[];
}

interface BookOption {
  id: string;
  title: string;
  courseCode: string;
}

const SellBooks = () => {
  const { toast } = useToast();
  
  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    isbn: "",
    courseCode: "",
    bookGroup: "",
    condition: "",
    price: "",
    description: "",
    listingType: "single",
    selectedBooks: [],
    images: []
  });

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock book groups and their books
  const bookGroups = {
    "Engineering Group 1": [
      { id: "calc", title: "Advanced Calculus", courseCode: "MATH101" },
      { id: "linear", title: "Linear Algebra", courseCode: "MATH102" },
      { id: "diff", title: "Differential Equations", courseCode: "MATH103" },
      { id: "prob", title: "Probability Theory", courseCode: "MATH104" }
    ],
    "Physics Group 1": [
      { id: "mech", title: "Mechanics", courseCode: "PHY101" },
      { id: "thermo", title: "Thermodynamics", courseCode: "PHY102" },
      { id: "electro", title: "Electromagnetism", courseCode: "PHY103" },
      { id: "modern", title: "Modern Physics", courseCode: "PHY104" }
    ],
    "Computer Science": [
      { id: "algo", title: "Introduction to Algorithms", courseCode: "CS201" },
      { id: "data", title: "Data Structures", courseCode: "CS202" },
      { id: "db", title: "Database Systems", courseCode: "CS203" },
      { id: "os", title: "Operating Systems", courseCode: "CS204" }
    ]
  };

  const conditions = ["New", "Like New", "Good", "Acceptable"];

  const updateForm = (field: keyof BookForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB`,
          variant: "destructive"
        });
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported image format`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    setForm(prev => ({ 
      ...prev, 
      images: [...prev.images, ...validFiles].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleBookSelection = (bookId: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      selectedBooks: checked 
        ? [...prev.selectedBooks, bookId]
        : prev.selectedBooks.filter(id => id !== bookId)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (form.listingType === "single" && !form.author.trim()) newErrors.author = "Author is required for single books";
    if (!form.courseCode.trim()) newErrors.courseCode = "Course code is required";
    if (!form.condition) newErrors.condition = "Condition is required";
    if (!form.price.trim()) newErrors.price = "Price is required";
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = "Please enter a valid price";
    if (form.listingType === "set" && !form.bookGroup) newErrors.bookGroup = "Book group is required for sets";
    if (form.listingType === "set" && form.selectedBooks.length === 0) newErrors.selectedBooks = "Please select at least one book for the set";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for any missing or invalid information",
        variant: "destructive"
      });
      return;
    }

    // Mock submission
    toast({
      title: "Listing posted successfully!",
      description: "Your book listing is now live and visible to buyers"
    });

    // Reset form
    setForm({
      title: "",
      author: "",
      isbn: "",
      courseCode: "",
      bookGroup: "",
      condition: "",
      price: "",
      description: "",
      listingType: "single",
      selectedBooks: [],
      images: []
    });
  };

  const saveDraft = () => {
    toast({
      title: "Draft saved",
      description: "You can continue editing this listing later"
    });
  };

  const getSuggestedPrice = () => {
    const basePrice = form.listingType === "set" ? 2000 : 800;
    const conditionMultiplier = {
      "New": 1.0,
      "Like New": 0.8,
      "Good": 0.6,
      "Acceptable": 0.4
    };
    
    return Math.round(basePrice * (conditionMultiplier[form.condition as keyof typeof conditionMultiplier] || 0.6));
  };

  const availableBooks = form.bookGroup ? bookGroups[form.bookGroup as keyof typeof bookGroups] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Books</h1>
          <p className="text-gray-600">Create a listing to sell your books to other students</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Listing Type */}
                <div>
                  <Label>Listing Type</Label>
                  <Select value={form.listingType} onValueChange={(value: "single" | "set") => updateForm("listingType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Book</SelectItem>
                      <SelectItem value="set">Book Set</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    placeholder={form.listingType === "set" ? "e.g., Engineering Mathematics Complete Set" : "e.g., Introduction to Algorithms"}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Author (only for single books) */}
                {form.listingType === "single" && (
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={form.author}
                      onChange={(e) => updateForm("author", e.target.value)}
                      placeholder="e.g., Thomas H. Cormen"
                      className={errors.author ? "border-red-500" : ""}
                    />
                    {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author}</p>}
                  </div>
                )}

                {/* ISBN */}
                <div>
                  <Label htmlFor="isbn">ISBN (Optional)</Label>
                  <Input
                    id="isbn"
                    value={form.isbn}
                    onChange={(e) => updateForm("isbn", e.target.value)}
                    placeholder="e.g., 978-0262033848"
                  />
                </div>

                {/* Course Code */}
                <div>
                  <Label htmlFor="courseCode">Course Code *</Label>
                  <Input
                    id="courseCode"
                    value={form.courseCode}
                    onChange={(e) => updateForm("courseCode", e.target.value)}
                    placeholder="e.g., CS201"
                    className={errors.courseCode ? "border-red-500" : ""}
                  />
                  {errors.courseCode && <p className="text-sm text-red-500 mt-1">{errors.courseCode}</p>}
                </div>

                {/* Book Group (only for sets) */}
                {form.listingType === "set" && (
                  <div>
                    <Label>Book Group *</Label>
                    <Select value={form.bookGroup} onValueChange={(value) => updateForm("bookGroup", value)}>
                      <SelectTrigger className={errors.bookGroup ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a book group" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(bookGroups).map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bookGroup && <p className="text-sm text-red-500 mt-1">{errors.bookGroup}</p>}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Book Selection (only for sets) */}
            {form.listingType === "set" && form.bookGroup && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Books in Set</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableBooks.map(book => (
                      <div key={book.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={book.id}
                          checked={form.selectedBooks.includes(book.id)}
                          onCheckedChange={(checked) => handleBookSelection(book.id, checked as boolean)}
                        />
                        <Label htmlFor={book.id} className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-gray-600">{book.courseCode}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedBooks && <p className="text-sm text-red-500 mt-2">{errors.selectedBooks}</p>}
                </CardContent>
              </Card>
            )}

            {/* Condition and Price */}
            <Card>
              <CardHeader>
                <CardTitle>Condition & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Condition */}
                <div>
                  <Label>Condition *</Label>
                  <Select value={form.condition} onValueChange={(value) => updateForm("condition", value)}>
                    <SelectTrigger className={errors.condition ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && <p className="text-sm text-red-500 mt-1">{errors.condition}</p>}
                </div>

                {/* Price */}
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      value={form.price}
                      onChange={(e) => updateForm("price", e.target.value)}
                      placeholder="0"
                      className={`pl-10 ${errors.price ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                  
                  {/* Price Suggestion */}
                  {form.condition && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Suggested price: ₹{getSuggestedPrice().toLocaleString()} based on condition and market rates
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    placeholder="Add any additional details about the book(s), such as highlighting, missing pages, etc."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload images</p>
                        <p className="text-xs text-gray-500 mt-1">Max 5 images, 5MB each (JPG, PNG, WebP)</p>
                      </div>
                    </Label>
                  </div>

                  {/* Image Preview */}
                  {form.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {form.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-lg">{form.title || "Book Title"}</p>
                    {form.listingType === "single" && form.author && (
                      <p className="text-gray-600">by {form.author}</p>
                    )}
                  </div>
                  
                  {form.condition && (
                    <Badge className="bg-blue-100 text-blue-800">{form.condition}</Badge>
                  )}
                  
                  {form.price && (
                    <p className="text-2xl font-bold text-green-600">₹{Number(form.price).toLocaleString()}</p>
                  )}
                  
                  {form.listingType === "set" && form.selectedBooks.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Books included:</p>
                      <div className="text-sm text-gray-600">
                        {form.selectedBooks.map(bookId => {
                          const book = availableBooks.find(b => b.id === bookId);
                          return book ? book.title : bookId;
                        }).join(", ")}
                      </div>
                    </div>
                  )}
                  
                  {form.description && (
                    <p className="text-sm text-gray-600">{form.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button onClick={handleSubmit} className="w-full" size="lg">
                    <Upload className="h-4 w-4 mr-2" />
                    Post Listing
                  </Button>
                  <Button onClick={saveDraft} variant="outline" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellBooks;
