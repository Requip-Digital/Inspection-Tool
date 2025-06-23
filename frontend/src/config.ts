export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://requip.onrender.com/api'
    : 'http://localhost:5001/api'
}; 