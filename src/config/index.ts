// Environment configuration
const normalizeApiUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }
  return normalizeApiUrl(envUrl);
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
  return `${config.apiUrl}${path.startsWith('/') ? path : '/' + path}`
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