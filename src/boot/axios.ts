import { boot } from 'quasar/wrappers';
import axios from 'axios';

// Primera API Datos
const api = axios.create({
  baseURL: 'https://localhost:7026/api/', // Primera API baseURL
});

// Segunda API Usuarios
const apiUser = axios.create({
  baseURL: 'https://localhost:7085/api/', // Segunda API baseURL
});

// Función boot de Quasar
export default boot(async ({ app }) => {
  // Hacer que axios y ambas APIs estén disponibles globalmente
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$apiUser = apiUser;

  // Prueba de conexión a la Primera API
  try {
    const response1 = await api.get('/ruta-de-prueba'); // Cambia '/ruta-de-prueba' a un endpoint real
    console.log('Primera API Conectada:', response1.data);
  } catch (error) {
    console.error('Error conectando a la Primera API:', error);
  }

  // Prueba de conexión a la Segunda API
  try {
    const response2 = await apiUser.get('/ruta-de-prueba'); // Cambia '/ruta-de-prueba' a un endpoint real
    console.log('Segunda API Conectada:', response2.data);
  } catch (error) {
    console.error('Error conectando a la Segunda API:', error);
  }
});

// Exportar axios y las instancias de API
export { axios, api, apiUser };
