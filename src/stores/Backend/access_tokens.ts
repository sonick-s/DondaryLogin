import { apiUser } from '../../boot/axios';
import { UserModel } from '../../models/spgct.models.user';

export class UserService {
  // Contraseña por defecto
  static defaultPassword = 'omar123';
  static data: UserModel | null = null; // Cambié el tipo de `data` a `UserModel | null`

  // Método para obtener los datos del usuario desde localStorage
  static getUserData(): UserModel | null {
    const storedUser = localStorage.getItem('user');
    console.log('Datos Traidos desde localStorage:', storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Método para cargar los datos del usuario en la variable `data`
  static loadUserData(): void {
    const userData = this.getUserData();
    if (userData) {
      this.data = userData; // Asignamos los datos a la variable `data`
    }
  }

  // Método para realizar el POST a la URL de validación
  static async UserPost(): Promise<void> {
    // Cargar los datos antes de hacer el POST
    this.loadUserData();

    // Mostrar los datos estructurados antes de enviarlos
    console.log('Datos que se enviarán en el POST:', this.data);

    // Asegurarnos de que los datos están en formato JSON (en caso de que no lo estén)
    const jsonData = this.data ? JSON.stringify(this.data) : null;

    console.log('Datos que se enviarán en el POST json:', jsonData);

    try {
      // Realizamos el POST con los datos del usuario a la URL de validación
      const response = await apiUser.post('User', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mostrar la respuesta de la API
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al hacer el POST:', error);
    }
  }
}
