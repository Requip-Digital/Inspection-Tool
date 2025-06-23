export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:5001/api'
}; 