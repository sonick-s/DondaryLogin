<template>
  <div class="app-container">
    <!-- Contenedor de la información a la izquierda -->
    <div class="info-container">
      <h1 class="app-title">Regístrate en la app SPGCT</h1>
      <p class="app-description">
        SPGCT
      </p>
      <label for="Equipos">Grupos que participaron:</label>
      <div class="equipos">
        <div class="dropdown">
          <button class="dropbtn">Construccion Fase 01</button>
          <div class="dropdown-content">
            <a href="#">Daniela Gualli | 0992462559</a>
            <a href="#">Ismael Llamatumbi | 0980993652</a>
            <a href="#">Abigail Tutillo | 0959094951</a>
            <a href="#">Brayan Jimenez | 0987842124</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Construccion Fase 02</button>
          <div class="dropdown-content">
            <a href="https://www.linkedin.com/in/omar-sani-b9733a2b9">Omar Sani | 0959491061</a>
            <a href="#">Opción 2</a>
            <a href="#">Opción 3</a>
          </div>
        </div>

        <select id="fase 02" name="fase 02">
          <option value="Construcicon">Construccion Fase 2</option>
          <option value="Andres">Andres Moya | 0988091107</option>
          <option value="Jean">Jean De la Cruz | 0997431311</option>
          <option value="Lisbeth">Lisbeth Esmeralda | 0994846279</option>
          <option value="Omar">Omar Sani | 0959491061</option>
        </select>

        <details>
          <summary>Fase 03</summary>
          <ul>
            <li>Deploy</li>
            <li>
              <a href="https://www.linkedin.com/in/omar-sani-b9733a2b9" target="_blank">
                Omar Sani | 0959491061
              </a>
            </li>
            <li>Stalyn Fernandez | 0968809537</li>
            <li>Darwin Campues | 0986265270</li>
            <li>Micheal Garcia | 0988493858</li>
          </ul>
        </details>


      </div>

    </div>

    <!-- Contenedor del formulario e imagen a la derecha -->
    <div class="form-container">
      <form @submit.prevent="register">
        <div class="form-group-inline">
          <div class="form-group">
            <label for="firstName">Nombres</label>
            <input type="text" id="firstName" v-model="form.firstName" required placeholder="Introduce tus nombres" />
          </div>

          <div class="form-group">
            <label for="lastName">Apellidos</label>
            <input type="text" id="lastName" v-model="form.lastName" required placeholder="Introduce tus apellidos" />
          </div>
        </div>

        <div class="form-group">
          <label for="cedula">Cédula</label>
          <input type="text" id="cedula" v-model="form.cedula" required placeholder="Introduce tu cédula sin guion" />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Introduce tu correo electrónico" />
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <!-- Enlace para restablecer la contraseña -->
      <p class="reset-password-link">
        <router-link to="/reset-password">Recuperar Contraseña</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserService } from '../stores/Backend/access_tokens';
import { UserModel } from '../models/spgct.models.user';

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
      const newPassword = UserService.generate();
      const user: UserModel = {
        id: {},
        name: this.form.firstName,
        lastName: this.form.lastName,
        cedula: this.form.cedula,
        email: this.form.email,
        password: newPassword,
      };

      try {
        localStorage.setItem('user', JSON.stringify(user));
        await UserService.UserPost();
        this.form.firstName = '';
        this.form.lastName = '';
        this.form.cedula = '';
        this.form.email = '';

        console.log('contraseña enviada a correo electronico');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  },
});
</script>

<style scoped>
/* Estilo principal del contenedor */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  position: center;
  color: #333;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/public/icons/Imagen_Fondo_Resgistro.png') center/cover no-repeat;
  /* Imagen de fondo */
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  /* Aplica la transparencia solo a la imagen */
  z-index: -1;
  /* Asegura que la imagen de fondo quede detrás del contenido */
}


.info-container {
  max-width: 50%;
  padding: 2rem;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: left;
}

.app-description {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #000;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
}

.form-container {
  max-width: 40%;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
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
  border-radius: 4px;
  border: 1px solid #ccc;
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

.reset-password-link {
  text-align: center;
  margin-top: 10px;
}

.reset-password-link a {
  color: #007bff;
  text-decoration: none;
}

.reset-password-link a:hover {
  text-decoration: underline;
}

/* Responsividad */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
    padding: 1rem;
  }

  .info-container {
    max-width: 100%;
    text-align: center;
  }

  .form-container {
    max-width: 100%;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .app-description {
    font-size: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .form-group-inline {
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  input,
  button {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.5rem;
  }

  .app-description {
    font-size: 0.8rem;
  }

  .form-container {
    padding: 1rem;
  }

  .form-group-inline {
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  input,
  button {
    font-size: 0.8rem;
  }
}

/* Estilo para el contenedor del div con la clase 'equipos' */
.equipos {
  max-width: 600px;
  margin: 0 auto;
  /* Centra el contenedor */
  padding: 10px;
  /* Fondo gris claro */
  border-radius: 10px;
  /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* Sombra suave */
  display: flex;
  /* Usamos flexbox para alinearlos en horizontal */
  justify-content: space-between;
  /* Espacio uniforme entre los selects */
  gap: 20px;
  /* Espaciado entre los selects */
}

/* Estilo para las etiquetas */
label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  /* Espacio debajo de la etiqueta */
  color: #333;
}

/* Estilo para las listas desplegables */
select {
  width: 30%;
  /* Cada select ocupará el 30% del contenedor */
  padding: 12px;
  margin: 0;
  /* Elimina el margen para que no se desalineen */

  /* Fondo blanco */
  transition: border-color 0.3s ease;
  /* Transición para el borde cuando se enfoca */
}

/* Efecto de enfoque para las listas desplegables */
select:focus {
  border-color: #007bff;
  /* Cambia el borde a azul cuando está enfocado */
  outline: none;
  /* Elimina el contorno por defecto */
}
</style>
<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
