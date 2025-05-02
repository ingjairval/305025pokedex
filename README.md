# PokeDex - Despliegue en Railway

Este repositorio contiene el código fuente y la documentación necesaria para el despliegue de la aplicación PokeDex en Railway, desarrollada por PumasLab para Pueblo Paleta Inc.

## Configuración inicial de la cuenta en Railway

En este documento, se explicará paso a paso cómo crear una cuenta en Railway y cómo configurarla para comenzar a desplegar aplicaciones.

### 1. Creación de la cuenta en Railway

1. Visita el sitio web oficial de Railway: [https://railway.app/](https://railway.app/)

2. Haz clic en el botón "Start Building" o "Sign Up" para iniciar el proceso de registro.

3. Railway ofrece varias opciones para registrarse:
   - Con GitHub
   - Con Google
   - Con correo electrónico

   Para este tutorial, utilizaremos la opción de GitHub por su integración directa con repositorios.

4. Selecciona "Continue with GitHub".

5. Autoriza a Railway para acceder a tu cuenta de GitHub. Si es tu primera vez usando Railway, deberás permitir el acceso a tus repositorios.

6. Una vez autorizado, serás redirigido al dashboard de Railway.

### 2. Configuración del plan gratuito

1. Railway ofrece un plan gratuito llamado "Developer" que permite:
   - $5 de crédito por mes
   - 512 MB de RAM
   - Uso compartido de CPU
   - 1 GB de almacenamiento
   - 3 proyectos activos

2. Por defecto, tu cuenta estará en este plan al registrarte. No es necesario realizar ninguna acción adicional para activarlo.

3. Verifica tu plan actual haciendo clic en tu avatar (esquina superior derecha) y seleccionando "Billing".

### 3. Configuración del método de pago (opcional)

1. Si planeas usar Railway más allá del plan gratuito, puedes configurar un método de pago.

2. Ve a "Billing" desde tu avatar en la esquina superior derecha.

3. Haz clic en "Add payment method" y sigue las instrucciones para agregar una tarjeta de crédito o débito.

4. Railway no cobrará automáticamente a menos que excedas los límites del plan gratuito.

### 4. Configuración de variables de entorno (para más adelante)

Railway permite configurar variables de entorno directamente desde su interfaz, lo cual es útil para almacenar información sensible como claves API, credenciales de base de datos, etc.

1. En el dashboard de Railway, selecciona tu proyecto.

2. Ve a la pestaña "Variables".

3. Aquí puedes agregar pares clave-valor para tus variables de entorno.

4. Para el despliegue de PokeDex, configuraremos estas variables más adelante en el proceso.

### 5. Configuración de notificaciones

1. Es recomendable configurar notificaciones para estar al tanto del estado de tus despliegues y el uso de recursos.

2. Ve a "Settings" desde tu avatar.

3. Selecciona "Notifications".

4. Configura las notificaciones según tus preferencias:
   - Email
   - Discord
   - Slack

### 6. Instalación de la CLI de Railway (opcional pero recomendado)

La CLI (Command Line Interface) de Railway te permite interactuar con tus proyectos desde la terminal.

1. Abre una terminal en tu sistema operativo.

2. Ejecuta el siguiente comando para instalar la CLI:

   ```bash
   npm i -g @railway/cli
   ```

3. Una vez instalada, inicia sesión ejecutando:

   ```bash
   railway login
   ```

4. Esto abrirá tu navegador para autenticarte. Una vez completado, estarás listo para usar la CLI.

### 7. Verificación de la configuración

Para asegurarte de que todo está correctamente configurado:

1. Accede al dashboard de Railway.

2. Verifica que puedas crear un nuevo proyecto haciendo clic en "New Project".

3. Confirma que puedas ver las diferentes opciones de despliegue:
   - Deploy from GitHub repo
   - Start from template
   - Empty project
   - Import from Heroku

Si puedes ver estas opciones, tu cuenta está correctamente configurada y lista para comenzar a desplegar aplicaciones.

## Próximos pasos

Una vez completada la configuración de tu cuenta en Railway, puedes proceder con el despliegue de la aplicación PokeDex siguiendo las instrucciones detalladas en el archivo [Despliegue.md](./Despliegue.md).
