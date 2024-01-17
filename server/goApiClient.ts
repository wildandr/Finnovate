import axios from 'axios';

// Ganti dengan API key Anda
const apiKey = process.env.GOAPI_KEY;

const goApiClient = axios.create({
  baseURL: 'https://api.goapi.io',
  headers: {
    'X-API-KEY': apiKey,
  },
});

export async function testConnection() {
  try {
    const response = await goApiClient.get('/stock/idx/BBCA/historical');
    console.log('Connection successful:', response.data);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

export default goApiClient;
