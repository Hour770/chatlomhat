import { useState, useEffect } from 'react'
import { checkApiHealth, config } from '@/config'

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const testConnection = async () => {
      setIsLoading(true)
      const connected = await checkApiHealth()
      setIsConnected(connected)
      setIsLoading(false)
    }
    
    testConnection()
  }, [])

  if (isLoading) {
    return (
      <div className="text-sm text-gray-600">
        🔄 Testing API connection...
      </div>
    )
  }

  return (
    <div className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
      {isConnected ? (
        <span>✅ API Connected ({config.apiUrl})</span>
      ) : (
        <div>
          <span>❌ API Connection Failed</span>
          <div className="text-xs mt-1">
            Trying to connect to: {config.apiUrl}
          </div>
          <div className="text-xs">
            Environment: {process.env.NODE_ENV}
          </div>
        </div>
      )}
    </div>
  )
}