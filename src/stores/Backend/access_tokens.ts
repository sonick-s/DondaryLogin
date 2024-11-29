import { apiUser } from '../../boot/axios';
import { UserModel } from '../../models/spgct.models.user';

export class UserService {
  // Contraseña por defecto
  static defaultPassword = '';
  static data: UserModel | null = null;

  // Método para generar contraseñas seguras
  static generate() {
    const length = 20; // Longitud de la contraseña (más larga)
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/`~-=\\';
    let password = '';

    // Garantizar que la contraseña incluya al menos un carácter de cada tipo
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    // Generar al menos un carácter de cada tipo
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    // Completar el resto de la contraseña
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Mezclar los caracteres de la contraseña para que no sigan un patrón
    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

    this.defaultPassword = password;
    return this.defaultPassword;
  }

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
      this.data = userData;
    }
  }

  // Método para realizar el POST a la URL de validación
  static async UserPost(): Promise<void> {
    this.loadUserData();
    console.log('Datos que se enviarán en el POST:', this.data);
    const jsonData = this.data ? JSON.stringify(this.data) : null;
    console.log('Datos que se enviarán en el POST json:', jsonData);
    try {
      const response = await apiUser.post('login', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al hacer el POST:', error);
    }
  }
}
