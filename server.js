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
