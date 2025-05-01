const mongoose = require("mongoose");

const deleteMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const movie_id = req.params.movie_id;

  // Ensure movie_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movie_id)) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid movie ID format.",
    });
  }

  const getMovie = await moviesModel.findOne({ _id: movie_id });
  if (!getMovie) {
    return res.status(404).json({
      status: "Failed",
      message: "The movie does not exist!",
    });
  }

  await moviesModel.deleteOne({ _id: movie_id });

  res.status(200).json({
    status: "Success",
    message: "Successful Movie Deletion",
  });
};

module.exports = deleteMovie;
