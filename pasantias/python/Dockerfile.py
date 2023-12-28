# Usa una imagen de Python 3.9 como base
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /app

ENV FLASK_DEBUG=1
# Copia el archivo requirements.txt al contenedor
#COPY requirements.txt .

# Copia el código fuente al contenedor
COPY . /app/
# Instala las dependencias
RUN pip install -r requirements.txt


EXPOSE 5000

# Establece el comando predeterminado para ejecutar el servidor de Python
CMD ["python", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5000"]
