import { apiUser } from '../../boot/axios'; // Suponiendo que apiUser es tu instancia de axios

export class UserService {
  // Contraseña por defecto
  static defaultPassword = 'spgct2121'; // Puedes cambiar esto a la contraseña que prefieras

  // Método para obtener los datos del usuario desde localStorage
  static getUserData(): { name: string; lastName: string; cedula: string; email: string; password: string } | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('Datos del usuario desde localStorage:', userData); // Mostrar los datos por consola
      // Verificamos si la contraseña está definida, si no, le asignamos la predeterminada
      if (!userData.password) {
        userData.password = this.defaultPassword;
        this.saveUserData(userData); // Actualizamos la contraseña en localStorage
        console.log('Se asignó la contraseña por defecto al usuario.');
      }
      return userData;
    }
    console.log('No se encontraron datos de usuario en localStorage.');
    return null;
  }

  // Método para guardar los datos del usuario en localStorage
  static saveUserData(user: { name: string; lastName: string; cedula: string; email: string; password: string }): void {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Datos del usuario guardados en localStorage:', user); // Mostrar los datos guardados por consola
  }

  // Método para asignar una contraseña por defecto si no existe
  static setDefaultPassword(user: { name: string; lastName: string; cedula: string; email: string }): void {
    const userWithPassword = {
      ...user,
      password: this.defaultPassword, // Asignamos la contraseña por defecto
    };
    this.saveUserData(userWithPassword);
    console.log('Contraseña por defecto asignada:', this.defaultPassword);
  }
// Método para realizar un POST a la API con los datos del usuario
static async postUserData(): Promise<void> {
  const user = this.getUserData();

  if (!user) {
    console.error('No se encontraron datos del usuario.');
    return;
  }

  try {
    // Realizar el POST a la API usando solo el path relativo
    const response = await apiUser.post('User', user); // Solo '/User' porque la base URL ya está configurada
    console.log('Respuesta de la API:', response.data); // Mostrar la respuesta del servidor
  } catch (error) {
    console.error('Error al enviar los datos del usuario:', error);
  }
}

}
