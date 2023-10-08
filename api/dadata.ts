import axios from 'axios';

const dadataAPI = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
  headers: {
    Authorization: 'Token 547792d89345210e90e756667aeb1e50aa8b0dc3', // Замените API-ключ на свой
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getCompanyInfoByINN = async (inn: string) => {
  try {
    const response = await dadataAPI.post('', { query: inn });
    return response.data.suggestions[0];
  } catch (error) {
    console.error('Ошибка при получении данных от DaData:', error);
    throw error;
  }
};
