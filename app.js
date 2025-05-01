const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const addMovie = require("./controllers/addMovie");
const getAllMovies = require("./controllers/getAllMovies");
const getSingleMovie = require("./controllers/getSingleMovie");
const editMovie = require("./controllers/editMovie");
const deleteMovie = require("./controllers/deleteMovie");
const movieRecom = require("./controllers/movieRecom");

const app = express();
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => console.log("Connection to MongoDB is successful!"))
  .catch(() => console.log("Connection to MongoDB failed!"));

// Load Models
require("./models/movies.model");

// Routes
app.post("/api/movies", addMovie);
app.get("/api/movies", getAllMovies);
app.get("/api/movies/:movie_id", getSingleMovie);
app.patch("/api/movies", editMovie);
app.delete("/api/movies/:movie_id", deleteMovie);
app.get("/api/movies/genai/getRecommendation", movieRecom);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(400).json({ error: err.message || "Something went wrong" });
});

// Start server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
