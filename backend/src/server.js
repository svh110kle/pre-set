const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Polyfill global.fetch for Node versions that don't provide it (Node < 18).
// If `node-fetch` is installed it will be used; otherwise the app will
// surface a clear error when attempting to call a provider.
if (typeof global.fetch !== 'function') {
  try {
    // node-fetch v2 exports a function compatible with global.fetch in CJS
    // eslint-disable-next-line global-require
    global.fetch = require('node-fetch');
    console.log('[server] using node-fetch polyfill for global.fetch');
  } catch (err) {
    // No fetch available — we'll let provider code throw a helpful error.
    console.log('[server] global.fetch not available and node-fetch not installed');
  }
}

const envPath = fs.existsSync(path.resolve(__dirname, '..', '.env'))
  ? path.resolve(__dirname, '..', '.env')
  : path.resolve(__dirname, '..', 'env.sample');

dotenv.config({
  path: envPath,
});

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS ||
  process.env.CLIENT_URL ||
  'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    project: process.env.PROJECT_NAME || '{{PROJECT_NAME}}',
  });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `[server] ${process.env.PROJECT_NAME || '{{PROJECT_NAME}}'} backend listening on port ${PORT}`
    );
  });
});

