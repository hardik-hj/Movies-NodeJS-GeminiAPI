const { GoogleGenAI } = require("@google/genai");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const movieRecom = async (req, res) => {
  try {
    const moviesModel = mongoose.model("movies");
    const allMovies = await moviesModel.find({});

    // If no movies are in the database, send an appropriate message
    if (allMovies.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "No movies found in the database.",
      });
    }

    const movieString = allMovies.map((el) => el.movie_name).join(",");
    const prompt = `I need 3 movies recommendation based on these movies : ${movieString}. Only List movie names. Keep your answer very short! Dont give same result everytime`;
    
    console.log("Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro-exp-03-25',
      contents: prompt,
    });

    console.log("Response:", response.text);
    
    res.status(200).json({ answer: response.text });
  } catch (error) {
    console.error("Error in generating movie recommendation:", error);
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong while generating movie recommendations.",
    });
  }
};

module.exports = movieRecom;
