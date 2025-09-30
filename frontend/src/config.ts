export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://inspection-tool-backend-ugwa.onrender.com/api'
    : 'http://localhost:5001/api'
};