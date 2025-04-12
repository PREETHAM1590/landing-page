import axios, { AxiosError } from 'axios'; // Import AxiosError

const API_URL = 'https://fakestoreapi.com';

// Define expected response type
interface LoginResponse {
  token: string;
}

// Define expected error structure from API if known, otherwise use generic AxiosError
interface ApiError {
  message?: string; // Example error structure
}

const api = axios.create({
  baseURL: API_URL,
});

// Add types to parameters and return type
const login = async (username: string, password: string): Promise<LoginResponse> => {
  // Simulate login check for admin/admin
  if (username === 'admin' && password === 'admin') {
    console.log('Admin login successful (simulated)');
    // Return a dummy token
    return { token: 'dummy-admin-token' };
  } else {
    // Simulate failed login for other credentials
    console.log(`Login attempt failed for user: ${username}`);
    throw new Error('Invalid username or password.');
  }
  // Remove original API call logic for now
  /*
  try {
    const response = await api.post<LoginResponse>('/auth/login', { // Specify response type for post
      username,
      password,
    });

    if (response.data && response.data.token) {
      return response.data;
    } else {
      throw new Error('Login successful but no token received.');
    }
  } catch (error) {
    console.error('Login API Error:', (error as AxiosError).response || (error as Error).message);

    // Type check the error before accessing response
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>; // Type assertion with potential API error structure
      if (axiosError.response && axiosError.response.status === 401) {
        // Use message from API response if available, otherwise default
        throw new Error(axiosError.response.data?.message || 'Invalid username or password.');
      }
    }
    // Fallback error
    throw new Error('Login failed. Please try again later.');
  }
  */
};

export const AuthService = {
  login,
};

// Optional: Add interceptors for handling tokens globally if needed later
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)
