// src/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
      ? 'https://inspection-tool-production.up.railway.app/api'
      : 'http://localhost:8080/api'  
  ),
};