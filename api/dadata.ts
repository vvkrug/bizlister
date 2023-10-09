import axios from 'axios';

const dadataAPI = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
  headers: {
    Authorization: 'Token 80cd8380abc5a408adeae18d0096cac437797800', // Замените API-ключ на свой. ИНН для теста: 7707083893
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
