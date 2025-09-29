export const config = {
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.PROD
    ? 'https://inspection-tool-production.up.railway.app/api'  // ← Your Railway backend
    : 'http://localhost:5001/api')
};