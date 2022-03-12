const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/games", (req, res) => {
  res.sendFile(path.join(__dirname, "/Models/games.json"));
});

app.get("/movies", (req, res) => {
  res.sendFile(path.join(__dirname, "/Models/movies.json"));
});

app.get("/tv-shows", (req, res) => {
  res.sendFile(path.join(__dirname, "/Models/tv-shows.json"));
});

app.post("/favorites", (req, res) => {
  addFavorite(req.body);

  res.send("POST SUCCESSFUL!");
});

app.delete("/games/:id/:type", (req, res) => {
  const id = req.params.id;
  const type = req.params.type;

  deleteFavorite(id, type);

  res.send("DELETE SUCCESSFUL!");
});

app.listen(4000, () => {
  console.log("app listening on port 4000");
});

const deleteFavorite = (id, type) => {
  const path = "./src/Models/" + String(type).toLowerCase() + "s.json";

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);

      return;
    }

    let favorites;

    try {
      favorites = JSON.parse(data);
    } catch (err) {
      console.log(err.message + ", defaulting to an empty array");
      favorites = [];
      id = 0;
    }

    // unique id
    favorites.forEach((favorite, index) => {
      if (favorite.id == id) {
        favorites.splice(index, 1);
      }
    });

    fs.writeFile(path, JSON.stringify(favorites, null, 2), (err) => {
      if (err) {
        console.log(err.message);

        return;
      }

      console.log("write successful");
    });
  });
};

const addFavorite = (favorite) => {
  const path = "./src/Models/" + String(favorite.type).toLowerCase() + "s.json";
  let id = 0;

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);

      return;
    }

    let favorites;

    try {
      favorites = JSON.parse(data);

      // unique id
      favorites.forEach((favorite) => {
        id += 1;
      });
    } catch (err) {
      console.log(err.message + ", defaulting to an empty array");
      favorites = [];
      id = 0;
    }

    favorite.id = id;

    favorites.push(favorite);

    fs.writeFile(path, JSON.stringify(favorites, null, 2), (err) => {
      if (err) {
        console.log(err.message);

        return;
      }

      console.log("write successful");
    });
  });

  id += 1;
};
