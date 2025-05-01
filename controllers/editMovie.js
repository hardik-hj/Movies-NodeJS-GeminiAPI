const mongoose = require("mongoose");

const editMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const { movie_id, movie_name, info, rating } = req.body;

  // Ensure movie_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movie_id)) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid movie ID format.",
    });
  }

  // Update the movie
  const updateResult = await moviesModel.updateOne(
    { _id: movie_id },
    { movie_name, info, rating },
    { runValidators: true }
  );

  // Check if any document was updated
  if (updateResult.nModified === 0) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie not found or no changes were made.",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Movie updated successfully",
  });
};

module.exports = editMovie;
