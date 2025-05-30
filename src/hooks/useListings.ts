
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Listing {
  id: number;
  title: string;
  description: string | null;
  price: number;
  condition: string;
  is_set: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  seller: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  book_group: {
    id: string;
    name: string;
    description: string | null;
  } | null;
  listing_books: {
    book: {
      id: string;
      title: string;
      author: string | null;
      course_code: string | null;
    };
  }[];
  listing_images: {
    id: string;
    image_url: string;
    display_order: number;
  }[];
}

export const useListings = () => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          seller:profiles!seller_id(id, full_name, avatar_url),
          book_group:book_groups(id, name, description),
          listing_books(
            book:books(id, title, author, course_code)
          ),
          listing_images(id, image_url, display_order)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
        throw error;
      }

      return data as Listing[];
    },
  });
};
