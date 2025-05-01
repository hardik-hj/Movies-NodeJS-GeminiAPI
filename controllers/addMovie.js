const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const { movie_name, info, rating } = req.body;

  if (!movie_name || !info || !rating) {
    throw new Error("All fields are required");
  }

  await moviesModel.create({ movie_name, info, rating });

  res.status(200).json({
    status: "Success!",
    message: "Movie Added Successfully!",
  });
};

module.exports = addMovie;
