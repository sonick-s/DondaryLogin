# Usa la imagen base de Node.js 18.20.4
FROM node:18.20.4

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración necesarios para las dependencias
COPY package.json package-lock.json yarn.lock ./

# Configuración de npm para mejorar la estabilidad en entornos de red
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Instala Quasar CLI globalmente
RUN npm install --location=global @quasar/cli

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usará Quasar dev (ajusta según tu configuración si no es 9000)
EXPOSE 9000

# Comando para lanzar la aplicación en modo desarrollo
CMD ["quasar", "dev"]


#comando para construir la imagen
#docker build -t dondary .
#comando para lansar el contenedor
#docker run -d -p 9000:9000 dondary
