const mongoose = require("mongoose");

const getAllMovies = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const moviesData = await moviesModel.find({});

  res.status(200).json({
    status: "Success",
    message: "Fetched all movies successfully",
    data: moviesData,
  });
};

module.exports = getAllMovies;
