<template>
  <div class="register-container">
    <h2>Registrarse en la app SPGCT</h2>
    <form @submit.prevent="register">
      <div class="form-group-inline">
        <div class="form-group">
          <label for="firstName">Nombres</label>
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            required
            placeholder="Introduce tus nombres"
          />
        </div>

        <div class="form-group">
          <label for="lastName">Apellidos</label>
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            required
            placeholder="Introduce tus apellidos"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="cedula">Cédula</label>
        <input
          type="text"
          id="cedula"
          v-model="form.cedula"
          required
          placeholder="Introduce tu cédula sin guion"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Introduce tu correo electrónico"
        />
      </div>

      <button type="submit">Registrarse</button>
    </form>
    <div class="image-container">
      <img
        src="/icons/Imagen_Fondo_Resgistro.png"
        alt="Descripción de la imagen"
        class="background-image"
      />
      <div class="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserService } from '../stores/Backend/access_tokens';

export interface UserModel {
  id?: string;
  name: string;
  lastName: string;
  cedula: string;
  email: string;
  password: string;
}

export default defineComponent({
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        cedula: '',
        email: '',
      },
    };
  },
  methods: {
    async register() {
      // Crear un objeto que coincida con el modelo UserModel
      const user: UserModel = {
        name: this.form.firstName,
        lastName: this.form.lastName,
        cedula: this.form.cedula,
        email: this.form.email,
        password: UserService.defaultPassword, // Asigna la contraseña por defecto
      };

      try {
        // Guardar los datos del formulario en localStorage antes de enviarlos
        localStorage.setItem('user', JSON.stringify(user));

        // Enviar los datos del usuario a la API solo si tiene la contraseña por defecto
        await UserService.postUserDataWithDefaultPassword();

        // Limpiar el formulario después de guardar los datos
        this.form.firstName = '';
        this.form.lastName = '';
        this.form.cedula = '';
        this.form.email = '';
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  },
});
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group-inline {
  display: flex;
  gap: 10px;
}

.form-group {
  flex: 1;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 60%;
  z-index: -1;
}
</style>
