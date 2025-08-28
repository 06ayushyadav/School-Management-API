import School from "../models/school.models.js";  
import  calculateDistance  from "../utils/distance.utils.js";

export const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const data=await School.create({ name, address, latitude, longitude });

    return res
      .status(201)
      .json({ success: true, message: "School Added Successfully" , data});
  } catch (error) {
    next(error);
  }
};

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const schools = await School.findAll();

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        );
        return { ...school.dataValues, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json({ success: true, schools: sortedSchools });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
