const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    retry: {
      max: 10,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /ECONNREFUSED/
      ],
      backoffBase: 1000,
      backoffExponent: 1.5,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test database connection with retry
async function connectWithRetry(maxRetries = 5, delay = 5000) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      return true;
    } catch (error) {
      retries++;
      console.error(`Unable to connect to the database (attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries >= maxRetries) {
        console.error('Max retries reached. Could not connect to database.');
        return false;
      }
      
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Define routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ 
      status: 'ok',
      database: 'connected' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      database: 'disconnected',
      message: error.message
    });
  }
});

// Start server
const startServer = async () => {
  console.log('Waiting for database connection...');
  
  // Initial delay to give the database time to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Try to connect to the database
  const connected = await connectWithRetry();
  
  // Start the server even if database connection fails
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    if (!connected) {
      console.log('WARNING: Server started without database connection. Some features may not work.');
    }
  });
};

startServer();