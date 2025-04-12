import axios, { AxiosError } from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Define Product type (can be shared in a types file later)
interface Product {
  id: number; // API uses numbers for IDs
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { // Add rating structure
    rate: number;
    count: number;
  };
}

// Define potential API error structure
interface ApiError {
  message?: string;
}

const api = axios.create({
  baseURL: API_URL,
});

// Type the functions
const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products'); // Specify response type
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', (error as AxiosError).response || (error as Error).message);
    throw new Error('Could not fetch products.');
  }
};

const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>('/products/categories'); // Specify response type
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', (error as AxiosError).response || (error as Error).message);
    throw new Error('Could not fetch categories.');
  }
};

const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products/category/${encodeURIComponent(categoryName)}`); // Specify response type
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryName}:`, (error as AxiosError).response || (error as Error).message);
    throw new Error(`Could not fetch products for category ${categoryName}.`);
  }
};

const getProductById = async (id: number | string): Promise<Product> => { // ID can be string from URL param
  try {
    const response = await api.get<Product>(`/products/${id}`); // Specify response type
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, (error as AxiosError).response || (error as Error).message);
    throw new Error(`Could not fetch product ${id}.`);
  }
};


export const ProductService = {
  getProducts,
  getCategories,
  getProductsByCategory,
  getProductById,
};
