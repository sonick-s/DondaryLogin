<template>
  <div class="app-container">
    <!-- Contenedor de la información a la izquierda -->
    <div class="info-container">
      <h1 class="app-title">Regístrate en la app SPGCT</h1>
      <p class="app-description">SPGCT</p>
      <label for="Equipos">Grupos que participaron:</label>
      <div class="equipos">
        <div class="dropdown">
          <button class="dropbtn">Construcción</button>
          <div class="dropdown-content">
            <a href="mailto:gualli.maria@intsuperior.edu.ec"
              >Daniela Gualli | 0992462559</a
            >
            <br />
            <a href="mailto:christopher.llamatumbi@intsuperior.edu.ec"
              >Ismael Llamatumbi | 0980993652</a
            >
            <br />
            <a href="mailto:joselin.tutillo@intsuperior.edu.ec"
              >Abigail Tutillo | 0959094951</a
            ><br />
            <a href="mailto:brayan.jimenez@intsuperior.edu.ec"
              >Brayan Jimenez | 0987842124</a
            >
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Construcción</button>
          <div class="dropdown-content">
            <a href="mailto:andres.moya@intsuperior.edu.ec"
              >Andres Moya | 0988091107</a
            ><br />
            <a href="mailto:jean.delacruz@intsuperior.edu.ec"
              >Jean De la Cruz | 0997431311</a
            ><br />
            <a href="mailto:lisbeth.esmeralda@intsuperior.edu.ec"
              >Lisbeth Esmeralda | 0994846279</a
            >
            <br />
            <div class="omar">
              <a href="https://www.linkedin.com/in/omar-sani-b9733a2b9"
                >Omar Sani | 0959491061</a
              >
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Lanzamiento</button>
          <div class="dropdown-content">
            <div class="omar">
              <a href="https://www.linkedin.com/in/omar-sani-b9733a2b9"
                >Omar Sani | 0959491061</a
              >
            </div>
            <br />
            <a href="mailto:stalynfg5@gmail.com">Stalyn Fernandez 0968809537</a>
            <br />
            <a href="mailto:darwincampiues2908@gmail.com"
              >Darwin Campues 0986265270</a
            ><br />
            <a href="mailto:mg8462654@gmail.com">Micheal Garcia 0988493858</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenedor del formulario e imagen a la derecha -->
    <div class="form-container">
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

      <!-- Enlace para restablecer la contraseña -->
      <p class="reset-password-link">
        <router-link to="/reset-password">Recuperar Contraseña</router-link>
      </p>
    </div>
  </div>
  <div id="customAlert" class="custom-alert">
    <div class="alert-content">
      <span id="alertMessage"></span>
      <button onclick="closeAlert()" class="close-btn">Cerrar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserService } from '../stores/Backend/access_tokens';
import { UserModel } from '../models/spgct.models.user';

function showAlert(message: string): void {
  const alertBox = document.getElementById('customAlert') as HTMLElement;
  const alertMessage = document.getElementById('alertMessage') as HTMLElement;

  alertMessage.innerText = message; // Asigna el mensaje a la alerta
  alertBox.style.display = 'flex'; // Muestra la alerta
}

function closeAlert(): void {
  const alertBox = document.getElementById('customAlert') as HTMLElement;
  alertBox.style.display = 'none'; // Oculta la alerta
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

        // Llamar a showAlert para mostrar la alerta
        showAlert(
          'Gracias por registrarse en AppSpgct - Revise su correo electronico'
        );

        // Opcional: Cerrar la alerta después de un cierto tiempo (por ejemplo, 5 segundos)
        setTimeout(() => {
          closeAlert();
        }, 5000);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
  },
});
</script>
<style scoped>
.custom-alert {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.alert-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.alert-content span {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
}

.close-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #0056b3;
}

.omar {
  background-color: #6f87fd87;
}
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
  overflow: hidden;
}
.equipos {
  display: flex;
  flex-direction: row; /* Disposición en fila (row) */
  gap: 20px; /* Espacio entre los elementos */
  max-width: 600px;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/public/icons/Imagen_Fondo_Resgistro.png') center/cover
    no-repeat;
  opacity: 0.5;
  z-index: -1;
}

.info-container {
  max-width: 50%;
  padding: 2rem;
}

.app-title,
.app-description {
  text-align: left;
  color: #333;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.app-description {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 2rem;
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
  gap: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #333;
}

input,
select,
button {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
}

button:hover {
  background-color: #0056b3;
}

.reset-password-link {
  text-align: center;
  margin-top: 1rem;
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

  .info-container,
  .form-container {
    max-width: 100%;
    text-align: center;
  }

  .form-container {
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

  input,
  button {
    font-size: 0.8rem;
  }
}

/* Estilo para las listas desplegables */
select {
  width: 30%;
  padding: 12px;
  margin: 0;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #007bff;
  outline: none;
}

/* Estilo para los dropdowns */
.dropdown {
  width: 100%;
  position: relative;
}

.dropbtn {
  max-width: 200px;
  background-color: #868f9787;
  color: #ffffff;
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #ffffff;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropbtn:hover {
  background-color: #5a6268;
  border-color: #495057;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 200px;
  border-radius: 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  font-size: 0.95rem;
  color: #333;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

@media (max-width: 768px) {
  .dropbtn {
    font-size: 1rem;
    padding: 10px;
  }

  .dropdown-content {
    min-width: 180px;
  }
}
</style>
