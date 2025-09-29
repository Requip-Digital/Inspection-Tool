export const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://inspection-tool-production.up.railway.app/api'
    : 'http://localhost:5001/api'
};