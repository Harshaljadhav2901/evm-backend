// API Configuration

// Change this to your backend API URL
// For local development: 'http://localhost:8000'
// For production: 'https://your-api-domain.com'
// You can set this via environment variable VITE_API_BASE_URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  SAVE_USER_INFO: `${API_BASE_URL}/api/users`,
};

// API utility functions
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Try to parse JSON, but handle cases where response might not be JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (e) {
        // If JSON parsing fails, create a basic error
        throw new Error(`Server returned invalid response (Status: ${response.status})`);
      }
    } else {
      // If not JSON, get text instead
      const text = await response.text();
      data = text ? { message: text } : { message: `HTTP ${response.status} ${response.statusText}` };
    }

    if (!response.ok) {
      // Use backend error message if available
      const errorMessage = data.message || `API Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    // If it's already an Error object, check if it's a network error
    if (error instanceof Error) {
      // Network errors (like "Failed to fetch") indicate the server is down or unreachable
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Backend server is not running. Please start the backend server.');
      }
      throw error;
    }
    // Otherwise, wrap it in an Error
    throw new Error('Network error occurred. Please check your connection.');
  }
};
