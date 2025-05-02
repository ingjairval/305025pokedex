# PokeDex - Despliegue en Vercel

Este repositorio contiene el código fuente y la documentación necesaria para el despliegue de la aplicación PokeDex en Vercel, desarrollada  para Pueblo Paleta Inc.

## Configuración inicial de la cuenta en Vercel

En este documento, se explicará paso a paso cómo crear una cuenta en Vercel y cómo configurarla para comenzar a desplegar aplicaciones.

### 1. Creación de la cuenta en Vercel

1. Visita el sitio web oficial de Vercel: [https://vercel.com/]

2. Haz clic en el botón "Sign Up" para iniciar el proceso de registro.

3. Vercel ofrece varias opciones para registrarse:
   - Con GitHub
   - Con Gitlabs
   - Con BitBucket

   Para este tutorial, utilizaremos la opción de GitHub por su integración directa con repositorios.

4. Selecciona "Continue with GitHub".

5. Autoriza a Vercel para acceder a tu cuenta de GitHub. Si es tu primera vez usando Vercel, deberás permitir el acceso a tus repositorios.

6. Una vez autorizado, serás redirigido al dashboard de Vercel.

### 2. Importar proyecto

1. En el dashboard de Vercel, haz clic en "Add New > Project".

2. Selecciona el repositorio pokedex desde GitHub.

### 3.  Configuración inicial del proyecto

1. Framework preset: selecciona Angular.

2. Build command: npm run build

3. Output directory: dist/pokedex-angular (esto depende del nombre del proyecto generado por Angular)

### 4. Despliegue

1. Haz clic en Deploy.

2. Espera a que finalice el despliegue. Se te proporcionará una URL pública.


### 6. Seguridad

Para mejorar la seguridad de la aplicación y cumplir con los requisitos del escaneo de SecurityHeaders.com, se agregó un archivo vercel.json con encabezados HTTP seguros.

   ```bash
   {
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://pokeapi.co; connect-src 'self' https://pokeapi.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: http:; object-src 'none'; upgrade-insecure-requests;"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), camera=(), microphone=()"
        }
      ]
    }
  ]
}


   ```



### 7. Escaneo de seguridad
Una vez desplegada la aplicación y agregados los encabezados, se puede escanear la URL en:

https://securityheaders.com

La calificación esperada es A+, lo cual indica que la aplicación es segura.

## Autor

Nombre: Jairo Valderrama
Correo institucional: ingeniero.jairo.valderrama@gmail.com
