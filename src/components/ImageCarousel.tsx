
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const placeholderImage = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop";

  const nextImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const currentImage = hasImages ? images[currentIndex] : placeholderImage;

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Main Image */}
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
          {hasImages ? (
            <img
              src={currentImage}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="h-16 w-16 mb-2" />
              <p className="text-sm">No images available</p>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {hasImages && images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {hasImages && images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasImages && images.length > 1 && (
        <div className="p-4 border-t">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                  index === currentIndex ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
