import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'https://smartlead.0xkrc.dev/api/v1'
    : 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // to send cookie
});
