# Despliegue de la Aplicación PokeDex en Railway

Este documento detalla el proceso completo para desplegar la aplicación PokeDex en Railway, incluyendo la configuración de encabezados de seguridad para cumplir con los requisitos establecidos por Pueblo Paleta Inc.

## Requisitos previos

Antes de iniciar el proceso de despliegue, asegúrate de tener:

1. Una cuenta activa en Railway (consulta [README.md](./README.md) para la configuración de la cuenta)
2. Una cuenta de GitHub
3. Git instalado en tu ordenador
4. Node.js y npm instalados (versión recomendada: Node.js 16.x o superior)
5. Angular CLI instalado (`npm install -g @angular/cli`)

## Paso 1: Clonar el repositorio de la aplicación PokeDex

Primero, vamos a clonar el repositorio que contiene el código fuente de la aplicación:

```bash
# Clonar el repositorio de la aplicación PokeDex
git clone https://github.com/rcuello/ac4dem1a.git
cd ac4dem1a/sistemas-distribuidos/poke-dex-lab
```

## Paso 2: Crear un nuevo repositorio en GitHub

Ahora, crearemos un nuevo repositorio en GitHub llamado "pokedex" y migraremos el código:

1. Visita [GitHub](https://github.com) e inicia sesión con tu cuenta.
2. Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository".
3. Nombra el repositorio como "pokedex".
4. Puedes añadir una descripción opcional como "Despliegue de la aplicación PokeDex para Pueblo Paleta Inc".
5. Deja el repositorio como público.
6. No inicialices el repositorio con un README, .gitignore o licencia.
7. Haz clic en "Create repository".

Ahora, vamos a migrar el código al nuevo repositorio:

```bash
# Crea un directorio temporal para el nuevo repositorio
mkdir ~/temp-pokedex
cd ~/temp-pokedex

# Copia los archivos de la aplicación
cp -r ~/ruta/al/ac4dem1a/sistemas-distribuidos/poke-dex-lab/* .

# Inicializa el repositorio Git
git init
git add .
git commit -m "Versión inicial de la aplicación PokeDex"

# Añade el repositorio remoto y sube los cambios
git remote add origin https://github.com/TU_USUARIO/pokedex.git
git branch -M main
git push -u origin main
```

## Paso 3: Añadir configuración de seguridad a la aplicación

Para mejorar la seguridad de la aplicación y lograr una puntuación alta en [SecurityHeaders.com](https://securityheaders.com/), debemos modificar la configuración del servidor. Crearemos un archivo `server.js` en la raíz del proyecto que actuará como proxy para nuestra aplicación Angular y añadirá los encabezados de seguridad necesarios.

1. Instala las dependencias necesarias:

```bash
npm install express helmet compression --save
```

2. Crea un archivo `server.js` en la raíz del proyecto:

```javascript
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Aplicar compresión para mejorar el rendimiento
app.use(compression());

// Configuración de Helmet con encabezados de seguridad personalizados
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://pokeapi.co"],
      connectSrc: ["'self'", "https://pokeapi.co"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: true },
  frameguard: { action: "deny" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
}));

// Servir archivos estáticos desde la carpeta 'dist/poke-dex-lab'
app.use(express.static(path.join(__dirname, 'dist/poke-dex-lab')));

// Añadir encabezados adicionales de seguridad
app.use(function(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'");
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Ruta para todas las solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/poke-dex-lab/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. Modifica el archivo `package.json` para incluir los scripts de construcción y ejecución:

```json
"scripts": {
  "ng": "ng",
  "start": "node server.js",
  "build": "ng build --configuration production",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "heroku-postbuild": "ng build --configuration production"
}
```

4. Guarda los cambios y súbelos al repositorio:

```bash
git add .
git commit -m "Añadir configuración de servidor Express con encabezados de seguridad"
git push origin main
```

## Paso 4: Configurar el proyecto en Railway

Ahora vamos a configurar y desplegar la aplicación en Railway:

1. Inicia sesión en [Railway](https://railway.app) con tu cuenta.
2. Haz clic en "New Project".
3. Selecciona "Deploy from GitHub repo".
4. Busca y selecciona tu repositorio "pokedex".
5. Railway detectará automáticamente que es una aplicación Node.js.
6. Haz clic en "Deploy" para iniciar el despliegue.

Railway comenzará el proceso de despliegue, que incluye:
- Clonar el repositorio
- Instalar dependencias (`npm install`)
- Ejecutar el script de construcción (`npm run build`)
- Iniciar la aplicación (`npm start`)

## Paso 5: Configurar variables de entorno (si es necesario)

Si la aplicación requiere variables de entorno específicas, puedes configurarlas en Railway:

1. Selecciona tu proyecto en el dashboard de Railway.
2. Ve a la pestaña "Variables".
3. Añade las variables necesarias como pares clave-valor.

Para esta aplicación, podríamos necesitar:

- `NODE_ENV=production`
- `PORT=3000`

## Paso 6: Configurar el dominio personalizado

Railway asigna automáticamente un subdominio para tu aplicación (por ejemplo, `tu-app.up.railway.app`). Para obtener una URL más amigable:

1. En el dashboard de tu proyecto en Railway, ve a la pestaña "Settings".
2. Desplázate hacia abajo hasta la sección "Domains".
3. Puedes utilizar el subdominio proporcionado por Railway o configurar un dominio personalizado:
   - Para usar un dominio propio, haz clic en "Add Domain".
   - Sigue las instrucciones para configurar los registros DNS necesarios.

## Paso 7: Verificar el despliegue

Una vez completado el despliegue, verifica que la aplicación esté funcionando correctamente:

1. Visita la URL proporcionada por Railway (por ejemplo, `tu-app.up.railway.app`).
2. Navega por la aplicación PokeDex para asegurarte de que todas las funcionalidades estén operativas.
3. Verifica que se estén cargando los datos de los Pokémon desde la API.

## Paso 8: Verificar la seguridad de la aplicación

Para cumplir con los requisitos de seguridad de Pueblo Paleta Inc., debemos evaluar la aplicación con SecurityHeaders.com:

1. Visita [https://securityheaders.com/](https://securityheaders.com/).
2. Ingresa la URL de tu aplicación desplegada y haz clic en "Scan".
3. Analiza los resultados. Deberíamos obtener una calificación alta (A o A+) gracias a la configuración de encabezados que hemos implementado.

Si no obtienes la calificación esperada, revisa los encabezados faltantes o incorrectos y actualiza el archivo `server.js` según sea necesario.

## Paso 9: Monitoreo y mantenimiento

Railway proporciona herramientas para monitorear el rendimiento y los registros de tu aplicación:

1. En el dashboard de tu proyecto, ve a la pestaña "Deployments" para ver el historial de despliegues.
2. La pestaña "Logs" te permite ver los registros en tiempo real de tu aplicación.
3. En "Metrics" puedes monitorear el uso de recursos como CPU, memoria y ancho de banda.

## Paso 10: Verificaciones adicionales de seguridad (opcional)

Para obtener puntos adicionales, realizaremos auditorías de seguridad usando herramientas complementarias:

### Análisis con OWASP ZAP

1. Descarga e instala [OWASP ZAP](https://www.zaproxy.org/download/).
2. Inicia la aplicación y selecciona "Automated Scan".
3. Ingresa la URL de tu aplicación desplegada y ejecuta el análisis.
4. Revisa el informe generado para identificar posibles vulnerabilidades.

### Análisis con SSL Labs

1. Visita [SSL Labs](https://www.ssllabs.com/ssltest/).
2. Ingresa la URL de tu aplicación desplegada y ejecuta el análisis.
3. Revisa la calificación y las recomendaciones proporcionadas.

## Solución de problemas comunes

### Error 503 - Service Unavailable

Este error puede ocurrir si:
- La aplicación no se está iniciando correctamente.
- El puerto especificado en `server.js` no coincide con el esperado por Railway.

Solución: Verifica los registros en la pestaña "Logs" de Railway para identificar el problema específico.

### Problemas con las dependencias

Si hay problemas con las dependencias:

```bash
# Verifica que todas las dependencias estén instaladas correctamente
npm install

# Actualiza el package-lock.json
npm install --package-lock-only

# Sube los cambios
git add .
git commit -m "Actualizar package-lock.json"
git push origin main
```

### La aplicación no muestra datos de Pokémon

Si la aplicación se carga pero no muestra datos:
- Verifica que la API de Pokémon esté permitida en la configuración de Content Security Policy en `server.js`.
- Asegúrate de que la API esté funcionando correctamente.

## Conclusión

Has completado exitosamente el despliegue de la aplicación PokeDex en Railway con configuraciones de seguridad avanzadas. La aplicación ahora está accesible públicamente y cumple con los requisitos de seguridad establecidos por Pueblo Paleta Inc.
