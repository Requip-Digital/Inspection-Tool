export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://inspection-tool-production.up.railway.app/api'  // ← Your Railway backend
    : 'http://localhost:5001/api'
};