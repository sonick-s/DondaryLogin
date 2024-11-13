import { apiUser } from '../../boot/axios';

export class UserService {
  // Contraseña por defecto
  static defaultPassword = 'spgct2424';

  // Método para obtener los datos del usuario desde localStorage
  static getUserData(): { id?:string; name: string; lastName: string; cedula: string; email: string; password: string } | null {
    const storedUser = localStorage.getItem('user');
    console.log('Datos del usuario desde localStorage 1:', storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Método para realizar un POST a la API solo con los datos que tengan la contraseña por defecto
  static async postUserDataWithDefaultPassword(): Promise<void> {
    // Obtiene los datos del usuario desde localStorage
    const userData = this.getUserData();

    if (!userData) {
      console.error('No se encontraron datos del usuario.');
      return;
    }

    // Verifica si la contraseña es la predeterminada antes de hacer el POST
    if (userData.password === this.defaultPassword) {
      try {
        const response = await apiUser.post('User', userData);
        console.log('Respuesta del POST a la API:', response.data);
      } catch (error) {
        console.error('Error al hacer POST a la API:', error);
      }
    } else {
      console.log('La contraseña del usuario no es la predeterminada. No se realizará el POST.');
    }
  }
}
