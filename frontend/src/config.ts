export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://requip-chi.vercel.app'
    : 'http://localhost:5001'
}; 