import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const analyzeRepo = async (owner, repo) => {
  const response = await axios.post(`${API_BASE}/analyze`, {
    owner,
    repo
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await axios.get(`${API_BASE}/health`);
  return response.data;
};