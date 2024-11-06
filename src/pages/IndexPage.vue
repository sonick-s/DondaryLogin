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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface UserModel {
  id?: string;
  name: string;
  lastName: string;
  cedula: string;
  email: string;
  password?: string; // Si decides agregar un campo de contraseña
}

export default defineComponent({
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        cedula: '',
        email: '',
        password: '',  // Agrega esta propiedad si deseas capturar la contraseña
      },
    };
  },
  methods: {
    register() {
      // Crear un objeto que coincida con el modelo UserModel
      const user: UserModel = {
        name: this.form.firstName,
        lastName: this.form.lastName,
        cedula: this.form.cedula,
        email: this.form.email,
        password: this.form.password, // Si decides capturar la contraseña
      };

      // Guardar los datos del formulario en localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Confirmar que los datos se guardaron correctamente
      console.log('Datos del formulario guardados en localStorage:', user);

      // Limpiar el formulario después de guardar los datos
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.cedula = '';
      this.form.email = '';
      this.form.password = ''; // Limpiar el campo de contraseña si lo tienes
    },
  },
});
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
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
</style>
