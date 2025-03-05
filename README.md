# Prueba Técnica - Aplicación Marvel con Login

## Descripción

Este proyecto es una aplicación web desarrollada con React y Next.js que implementa un sistema de inicio de sesión con validación de reCAPTCHA y una interfaz para visualizar personajes de Marvel utilizando la API oficial de Marvel.

## Tecnologías Utilizadas

- **Frontend**: React, Next.js
- **Estilos**: Tailwind CSS
- **Autenticación**: Sistema propio con validación de reCAPTCHA
- **Notificaciones**: Sonner (alternativa moderna a SweetAlert)
- **API**: Marvel API

## Requisitos Previos

- Node.js (versión 18 o superior)
- Cuenta de desarrollador en [Marvel Developer Portal](https://developer.marvel.com/) para obtener las claves de API
- Cuenta en [Google reCAPTCHA](https://www.google.com/recaptcha/admin) para obtener una clave de sitio (opcional, ya que se incluye una clave de prueba)

## Funcionalidades Implementadas

### 1. Sistema de Inicio de Sesión

- Formulario con campos de usuario y contraseña
- Integración con Google reCAPTCHA
- Validación de credenciales:
  - Usuario: `admin@admin.com`
  - Contraseña: `Admin`
- Notificaciones de error y éxito
- Redirección a dashboard tras inicio de sesión exitoso

### 2. Dashboard de Personajes Marvel

- Tabla con listado de personajes de Marvel
- Visualización de imagen, nombre y descripción de cada personaje
- Vista detallada al hacer clic en el nombre del personaje
- Funcionalidad de cierre de sesión

## Instrucciones de Uso

### 1. **Inicio de Sesión**

1. Acceder a la página principal
2. Ingresar las credenciales:
   - Email: `admin@admin.com`
   - Contraseña: `Admin`
3. Completar el reCAPTCHA
4. Hacer clic en "Iniciar Sesión"

### 2. **Explorar Personajes**

1. Navegar por la tabla de personajes
2. Hacer clic en el nombre de un personaje para ver detalles
3. Cerrar la vista detallada con el botón X
4. Cerrar sesión con el botón "Cerrar Sesión"


## Notas Adicionales

- La aplicación utiliza Tailwind CSS para los estilos
- Se implementó SweetAlert para las notificaciones.
- El reCAPTCHA implementado es la versión 2 de Google reCAPTCHA

## Mejoras Futuras

- Implementar sistema de registro de usuarios
- Añadir persistencia de sesión con cookies o localStorage
- Implementar paginación en la tabla de personajes
- Añadir búsqueda y filtros para los personajes
- Implementar modo oscuro
