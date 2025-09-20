import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { InitializeDatabase } from './config/db.js';
import { errorHandler } from './middleware/errorhandler.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT);

app.use(cors()); // Enable CORS for all origins

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const startServer = async () => {
  try {
    await InitializeDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
