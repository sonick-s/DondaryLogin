<template>
  <div class="reset-password-page">
    <div class="form-container">
      <h1>Restablecer Contraseña</h1>
      <p>Ingresa tu correo electrónico para restablecer tu contraseña.</p>
      <q-input
        v-model="email"
        label="Correo Electrónico"
        filled
        type="email"
        hint="Ingresa tu correo registrado"
        class="q-mb-md input-field"
      />
      <q-btn
        label="Enviar"
        color="primary"
        @click="sendResetLink"
        class="send-button"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref(''); // Variable para el correo electrónico

function sendResetLink() {
  if (email.value) {
    // Lógica para enviar enlace de restablecimiento de contraseña
    console.log(`Enlace enviado a ${email.value}`);
  } else {
    console.log('Por favor ingresa un correo electrónico válido.');
  }
}
</script>

<style scoped>
.reset-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
  background-image: url('/icons/Imagen_Fondo_Resgistro.png'); /* Imagen de fondo */
  background-size: cover; /* Ajusta la imagen al tamaño de la pantalla */
  background-position: center; /* Centra la imagen */
  color: #333;
  font-family: 'Arial', sans-serif;
}

.form-container {
  background-color: #fff; /* Fondo blanco */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave para el contenedor */
  text-align: center;
  width: 100%;
  max-width: 450px; /* Ancho máximo del formulario */
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #222;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
  color: #555;
}

.input-field {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.send-button {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
