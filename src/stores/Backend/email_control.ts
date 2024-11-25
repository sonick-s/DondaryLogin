import { apiUser } from '../../boot/axios'; // Asegúrate de que la ruta sea correcta

export const getPasswordLocalStorage = () => {
  const resetPasswordData = localStorage.getItem('resetPasswordData');

  console.log('Datos recuperados de localStorage sin json:', resetPasswordData);

  if (resetPasswordData) {
    try {
      const data = JSON.parse(resetPasswordData);
      console.log('Datos recuperados de localStorage:', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error al parsear los datos de JSON:', error);
      return null;
    }
  } else {
    console.log('No se encontraron datos en localStorage.');
    return null;
  }
};

export const sendEmail = async () => {
  const data = getPasswordLocalStorage();
  console.log('Datos que se enviaran a email', data);
  if (data) {
    try {
      const response = await apiUser.post('Mail/send-email', data);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  } else {
    console.log('No hay datos válidos para enviar.');
  }
};
