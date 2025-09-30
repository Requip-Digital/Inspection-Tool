export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://inspection-tool-backend-ugwa.onrender.com'
    : 'http://localhost:5001/api'
};