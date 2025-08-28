
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schoolRoutes from "./routes/school.routes.js";
import { testConnection } from "./config/db.connection.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    status: "success",
    message: "School Management API is running!",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", async (req, res) => {
  try {
    const dbConnected = await testConnection();
    
    res.json({ 
      status: dbConnected ? "OK" : "WARNING",
      message: dbConnected ? "Server and database are healthy" : "Server running but database issues",
      database: dbConnected ? "Connected" : "Disconnected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message
    });
  }
});

// Routes
app.use("/api", schoolRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📋 Environment variables check:');
  console.log('MYSQLHOST:', process.env.MYSQLHOST || 'Not set');
  console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE || 'Not set');
  console.log('MYSQLUSER:', process.env.MYSQLUSER || 'Not set');
  console.log('MYSQLPORT:', process.env.MYSQLPORT || '3306');

  console.log('🔗 Attempting database connection...');
  const dbConnected = await testConnection();
  
  if (dbConnected) {
    console.log('Server running with database connection');
  } else {
    console.log('Server running without database connection');
  }
});