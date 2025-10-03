// Environment configuration
export const config = {
  // Use environment variable in production, fallback to localhost in development
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002',
  
  // Environment check
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Helper function to get API endpoint
export const getApiEndpoint = (path: string): string => {
  return `${config.apiUrl}${path.startsWith('/') ? path : '/' + path}`
}