import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-summarizer-backend-part.onrender.com/',
});

export default api;