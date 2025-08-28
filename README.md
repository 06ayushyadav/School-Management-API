# School Management APIs (Node.js + Express + MySQL)

## Objective
This project implements a set of REST APIs using **Node.js**, **Express.js**, and **MySQL** to manage school data.  
It allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a user’s location.

---

## Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize ORM (optional)

---

## Database Setup
Create a `schools` table in MySQL:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
