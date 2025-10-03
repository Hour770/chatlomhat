// Environment configuration
const getApiUrl = () => {
  // In production (Vercel), always use the environment variable
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://chatlomhat.onrender.com'
  }
  
  // In development, check if we have a custom API URL set, otherwise use localhost
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'
}

export const config = {
  // Use environment variable in production, fallback based on environment
  apiUrl: getApiUrl(),
  
  // Environment check
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Helper function to get API endpoint
export const getApiEndpoint = (path: string): string => {
  const url = `${config.apiUrl}${path.startsWith('/') ? path : '/' + path}`
  
  // Debug logging to help troubleshoot
  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`API Call to: ${url}`)
  console.log(`NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`)
  
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