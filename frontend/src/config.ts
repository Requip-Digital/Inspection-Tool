export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://requip.onrender.com'
    : 'http://localhost:5001'
}; 