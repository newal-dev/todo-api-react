require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Request logging: pipe morgan's output into winston
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});