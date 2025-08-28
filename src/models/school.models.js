import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";

const School = sequelize.define(
  "School",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "schools",
    timestamps: false, // disables createdAt, updatedAt
  }
);

export default School;

