const mongoose = require("mongoose");

const getSingleMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const movie_id = req.params.movie_id;

  // Ensure movie_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movie_id)) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid movie ID format.",
    });
  }

  const movieData = await moviesModel.findById(movie_id);

  if (!movieData) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie not found.",
    });
  }

  res.status(200).json({
    status: "Success",
    data: movieData,
  });
};

module.exports = getSingleMovie;
