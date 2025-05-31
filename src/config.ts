export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://requip.vercel.app/api'
    : 'http://localhost:5001/api'
}; 