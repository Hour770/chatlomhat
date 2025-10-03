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
  const url = `${config.apiUrl}${path.startsWith('/') ? path : '/' + path}`
  
  // Debug logging in development
  if (config.isDevelopment) {
    console.log(`API Call to: ${url}`)
  }
  
  return url
}

// Utility to check if API is reachable
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(getApiEndpoint('/health'))
    const data = await response.json()
    console.log('API Health Check:', data)
    return response.ok && data.status === 'healthy'
  } catch (error) {
    console.error('API Health Check Failed:', error)
    return false
  }
}