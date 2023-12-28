# Imagen base
FROM node:18

# Establece el directorio de trabajo

WORKDIR /app

# Copia los archivos de la aplicación a la imagen
COPY package.json ./
COPY package-lock.json ./

# RUN apt-get update && apt-get install -y mysql-client
# Copia los archivos de la aplicación a la imagen
COPY ./ /app/
# Instala las dependencias de la aplicación
RUN npm install


# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npm","run", "start"]