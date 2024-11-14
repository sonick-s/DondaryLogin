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
});

// Exportar axios y las instancias de API
export { axios, api, apiUser };
