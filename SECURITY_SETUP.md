# API Key and Environment Setup Guide

## 🚨 Security Warning
Never commit API keys or sensitive information to your repository!

## Backend Setup (Render)

### Local Development
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your actual API key:
   ```
   GOOGLE_AI_API_KEY=your_actual_google_ai_api_key_here
   FLASK_ENV=development
   FLASK_DEBUG=True
   FRONTEND_URL=http://localhost:3000
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Render Deployment
1. In your Render dashboard:
   - Go to your service settings
   - Navigate to "Environment"
   - Add environment variables:
     - `GOOGLE_AI_API_KEY`: Your actual Google AI API key
     - `FLASK_ENV`: `production`
     - `FLASK_DEBUG`: `False`

2. Your app will automatically use these environment variables.

## Frontend Setup (Vercel)

### Local Development
1. Navigate to the frontend project directory:
   ```bash
   cd frontend/project
   ```

2. Create a `.env.local` file based on `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

3. Edit `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5002
   ```

4. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Vercel Deployment
1. In your Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)

2. Redeploy your application after setting environment variables.

## Important Notes

### File Security
- `.env` files are automatically ignored by Git (see `.gitignore`)
- Never commit files containing API keys
- Use `.env.example` files to show the required structure without real values

### API Key Management
- **Development**: Use `.env` files
- **Production**: Use platform environment variables (Render/Vercel dashboards)
- **Rotation**: Regularly rotate your API keys for security

### Troubleshooting
- If you get "API key not found" errors, check that your environment variables are set correctly
- In production, ensure environment variables are set in your hosting platform
- Restart your services after changing environment variables

### Testing Your Setup
1. Start backend locally: `python api.py`
2. Start frontend locally: `npm run dev`
3. Check that the frontend can communicate with the backend
4. Verify no API keys are visible in your browser's developer tools or source code