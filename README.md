# Gestor de Encuestas

## Descripción

El proyecto **Gestor de Encuestas** es una aplicación web que permite a los usuarios registrarse, iniciar sesión y responder encuestas. Los resultados de las encuestas son almacenados en una base de datos MySQL y se pueden gestionar a través de una interfaz web.

## Tecnologías utilizadas

- **Backend**: Node.js, Express, MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Base de datos**: MySQL

## Instalación

### Requisitos previos

- Tener **Node.js** y **npm** instalados en tu máquina.
- Tener **MySQL** configurado y funcionando en tu máquina.

### Pasos para ejecutar el proyecto

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/JuanBuitrago04/GestorEncuestas.git
   cd GestorEncuestas
   ```

2. **Instala las dependencias**

    ```bash
   cd backend
    npm install
    ```

    
3. **Configura la base de datos**

   Asegúrate de que tienes una base de datos MySQL llamada gestor_encuestas. Si no tienes, puedes crearla y ejecutar los scripts de migración para crear las tablas necesarias.


4. **Ejecuta el servidor**

Para iniciar el servidor backend:

   ```bash
   node --watch server.js
   ```
El servidor estará corriendo en http://localhost:3000.


5. **Accede a la aplicación web**

Abre index.html en el navegador para interactuar con el frontend.

## API Endpoints

### 1. **POST /api/register**
   - Registra un nuevo usuario.
   - **Request**:
     - `{ "username": "usuario123", "email": "usuario@ejemplo.com", "password": "contraseñaSegura123" }`
   - **Response**:
     - 201: Usuario creado correctamente.
     - 400: Error, correo electrónico ya registrado.

### 2. **POST /api/login**
   - Inicia sesión y devuelve un token JWT.
   - **Request**:
     - `{ "email": "usuario@ejemplo.com", "password": "contraseñaSegura123" }`
   - **Response**:
     - 200: `{ "token": "<jwt_token>" }`
     - 400: Credenciales incorrectas.

### 3. **GET /api/surveys**
   - Obtiene todas las encuestas disponibles.
   - **Response**:
     - 200: `{ surveys: [...] }`

### 4. **POST /api/surveys/:id/response**
   - Envía las respuestas a una encuesta específica.
   - **Request**:
     - `{ "answers": [{ "question_id": 1, "answer": "Sí" }, { "question_id": 2, "answer": "No" }] }`
   - **Response**:
     - 201: Respuestas guardadas correctamente.
     - 400: Error al guardar respuestas.

