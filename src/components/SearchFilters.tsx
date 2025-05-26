
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Filters {
  priceRange: number[];
  quality: string[];
  setType: string;
}

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const qualityOptions = ["Like New", "Good", "Acceptable"];
  const setTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "individual", label: "Individual Books" },
    { value: "partial-set", label: "Partial Sets" },
    { value: "full-set", label: "Full Sets" }
  ];

  const handleQualityChange = (quality: string, checked: boolean) => {
    const newQuality = checked 
      ? [...filters.quality, quality]
      : filters.quality.filter(q => q !== quality);
    
    onFiltersChange({ ...filters, quality: newQuality });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      quality: [],
      setType: "all"
    });
  };

  const hasActiveFilters = filters.quality.length > 0 || 
                          filters.setType !== "all" || 
                          filters.priceRange[0] > 0 || 
                          filters.priceRange[1] < 10000;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="absolute top-full left-0 right-0 z-10 mt-2">
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>

              {/* Set Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Book Type</Label>
                <Select 
                  value={filters.setType} 
                  onValueChange={(value) => onFiltersChange({ ...filters, setType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {setTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Condition</Label>
                <div className="space-y-2">
                  {qualityOptions.map(quality => (
                    <div key={quality} className="flex items-center space-x-2">
                      <Checkbox
                        id={quality}
                        checked={filters.quality.includes(quality)}
                        onCheckedChange={(checked) => handleQualityChange(quality, checked as boolean)}
                      />
                      <Label htmlFor={quality} className="text-sm">
                        {quality}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};
