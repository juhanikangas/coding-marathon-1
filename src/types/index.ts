interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publishedYear: number;
  description: string;
  coverImage?: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  image?: string;
}

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
} 