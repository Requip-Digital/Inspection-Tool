export const config = {
  apiUrl: import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
      ? 'https://inspection-tool-backend-ugwa.onrender.com'
      : 'http://localhost:5001'
  ),
};