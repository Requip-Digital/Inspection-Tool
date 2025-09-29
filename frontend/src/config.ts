export const config = {
  apiUrl: import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
      ? 'https://inspection-tool-backend-ugwa.onrender.com/api'  // Change to your Render URL
      : 'http://localhost:5001/api'  // Change to match your backend port
  ),
};