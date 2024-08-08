const express = require("express");
const cors = require("cors");
const primeStreamData = require("./primeStreamData");

const app = express();

const port = 4903;

app.use(cors("*")); //middleware
app.use("/static", express.static(__dirname + "/assets"));

// Main route to get all the data
app.get("/", (req, res) => res.json(primeStreamData));

// Route to fetch movies
app.get("/movies", (req, res) => {
  const movies = primeStreamData.filter((data) => data.category === "Movie");
  res.json(movies);
});

// Route to fetch TV Series
app.get("/tvseries", (req, res) => {
  const tvSeries = primeStreamData.filter(
    (data) => data.category === "TV Series"
  );
  res.json(tvSeries);
});

// Route to fetch by name
app.get("/query/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const movieList = primeStreamData.filter((movie) =>
    movie.title.toLowerCase().includes(name)
  );
  res.json(movieList);
});

// Route to update the bookmarked movies
// Route to update the bookmarked items
app.put("/primeStream/:title/bookmark", (req, res) => {
  const { title } = req.params;
  const { isBookmarked } = req.body;

  const item = primeStreamData.find((item) => item.title === title);
  if (item) {
    item.isBookmarked = isBookmarked;
    res.status(200).json({ message: "Bookmarked updated:", item });
  } else {
    res.status(404).json({ message: "Item not found:", item });
  }
});

app.listen(port, () =>
  console.log(`The app is running on http://localhost:${port}`)
);

module.exports = app;
