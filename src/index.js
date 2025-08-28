import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import addSchoolRoutes from "./routes/school.routes.js";
import listSchoolsRoutes  from "./routes/school.routes.js";
import sequelize from "./config/db.connection.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    console.log("Database synced");

  } catch (error) {
    console.log("DB connection failed:", error)
  }
}

connectToDatabase();

app.use("/api", addSchoolRoutes);
// http://localhost:3000/api/addSchool
app.use("/api", listSchoolsRoutes);
// http://localhost:3000/api/listSchools


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
