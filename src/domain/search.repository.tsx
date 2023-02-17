import axios from 'axios';

export const getSearchResults = async (searchInput: string) => {
  const response = await axios.get(`https://api.example.com/search?q=${searchInput}`);
  return response.data;
};
