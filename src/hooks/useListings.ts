
import { useQuery } from "@tanstack/react-query";

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

// Sample data that matches the Listing interface
const sampleListings: Listing[] = [
  {
    id: 1,
    title: "Complete First Year Group 1 Set",
    description: "All books for first year Group 1 curriculum in excellent condition",
    price: 5500,
    condition: "Good",
    is_set: true,
    status: "active",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    seller: {
      id: "1",
      full_name: "Arjun K.",
      avatar_url: null
    },
    book_group: {
      id: "1",
      name: "Engineering Group 1",
      description: "Core engineering mathematics and physics"
    },
    listing_books: [
      { book: { id: "1", title: "BITS F110", author: "Author 1", course_code: "BITS F110" } },
      { book: { id: "2", title: "BIO F110", author: "Author 2", course_code: "BIO F110" } },
      { book: { id: "3", title: "BIO F111", author: "Author 3", course_code: "BIO F111" } },
      { book: { id: "4", title: "MATH F111", author: "Author 4", course_code: "MATH F111" } },
      { book: { id: "5", title: "BITS F112", author: "Author 5", course_code: "BITS F112" } },
      { book: { id: "6", title: "BITS F111", author: "Author 6", course_code: "BITS F111" } },
      { book: { id: "7", title: "CS F111", author: "Author 7", course_code: "CS F111" } }
    ],
    listing_images: [
      { id: "1", image_url: "/placeholder.svg", display_order: 0 },
      { id: "2", image_url: "/placeholder.svg", display_order: 1 },
      { id: "3", image_url: "/placeholder.svg", display_order: 2 }
    ]
  },
  {
    id: 2,
    title: "Partial Group 2 Set (4 Books)",
    description: "Four essential books from Group 2 curriculum",
    price: 3200,
    condition: "Like New",
    is_set: true,
    status: "active",
    created_at: "2024-01-14T15:30:00Z",
    updated_at: "2024-01-14T15:30:00Z",
    seller: {
      id: "2",
      full_name: "Priya S.",
      avatar_url: null
    },
    book_group: {
      id: "2",
      name: "Physics Group 1",
      description: "Basic physics curriculum"
    },
    listing_books: [
      { book: { id: "8", title: "PHY F111", author: "Physics Author 1", course_code: "PHY F111" } },
      { book: { id: "9", title: "CHEM F111", author: "Chemistry Author 1", course_code: "CHEM F111" } },
      { book: { id: "10", title: "MATH F112", author: "Math Author 2", course_code: "MATH F112" } },
      { book: { id: "11", title: "EEE F111", author: "EEE Author 1", course_code: "EEE F111" } }
    ],
    listing_images: [
      { id: "4", image_url: "/placeholder.svg", display_order: 0 },
      { id: "5", image_url: "/placeholder.svg", display_order: 1 }
    ]
  },
  {
    id: 3,
    title: "MATH F111 Textbook",
    description: "Individual mathematics textbook in acceptable condition",
    price: 800,
    condition: "Acceptable",
    is_set: false,
    status: "active",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-13T09:15:00Z",
    seller: {
      id: "3",
      full_name: "Rahul M.",
      avatar_url: null
    },
    book_group: {
      id: "1",
      name: "Engineering Group 1",
      description: "Core engineering mathematics and physics"
    },
    listing_books: [
      { book: { id: "4", title: "MATH F111", author: "Author 4", course_code: "MATH F111" } }
    ],
    listing_images: [
      { id: "6", image_url: "/placeholder.svg", display_order: 0 }
    ]
  },
  {
    id: 4,
    title: "Computer Science Fundamentals",
    description: "Essential CS books including algorithms and data structures",
    price: 2400,
    condition: "New",
    is_set: false,
    status: "active",
    created_at: "2024-01-12T14:20:00Z",
    updated_at: "2024-01-12T14:20:00Z",
    seller: {
      id: "4",
      full_name: "Sneha T.",
      avatar_url: null
    },
    book_group: {
      id: "3",
      name: "Computer Science",
      description: "Programming and algorithms"
    },
    listing_books: [
      { book: { id: "12", title: "Introduction to Algorithms", author: "Thomas Cormen", course_code: "CS201" } }
    ],
    listing_images: [
      { id: "7", image_url: "/placeholder.svg", display_order: 0 },
      { id: "8", image_url: "/placeholder.svg", display_order: 1 }
    ]
  },
  {
    id: 5,
    title: "Engineering Mathematics Bundle",
    description: "Complete set of mathematics books for engineering students",
    price: 4200,
    condition: "Good",
    is_set: true,
    status: "active",
    created_at: "2024-01-11T11:45:00Z",
    updated_at: "2024-01-11T11:45:00Z",
    seller: {
      id: "5",
      full_name: "Vikram P.",
      avatar_url: null
    },
    book_group: {
      id: "4",
      name: "Mathematics",
      description: "Pure and applied mathematics"
    },
    listing_books: [
      { book: { id: "1", title: "Advanced Calculus", author: "Robert Adams", course_code: "MATH101" } },
      { book: { id: "2", title: "Linear Algebra", author: "Gilbert Strang", course_code: "MATH102" } },
      { book: { id: "3", title: "Differential Equations", author: "Dennis Zill", course_code: "MATH201" } }
    ],
    listing_images: [
      { id: "9", image_url: "/placeholder.svg", display_order: 0 },
      { id: "10", image_url: "/placeholder.svg", display_order: 1 },
      { id: "11", image_url: "/placeholder.svg", display_order: 2 }
    ]
  }
];

export const useListings = () => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Fetching listings:", sampleListings.length);
      return sampleListings;
    },
  });
};
