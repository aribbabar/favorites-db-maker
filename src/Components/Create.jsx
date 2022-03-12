import "../CSS/create.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [preference, setPreference] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const favorite = { title, preference, rating, type, image };

    fetch("http://localhost:4000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorite),
    }).then(() => {
      console.log("new favorite added");
      navigate("/");
    });
  };

  return (
    <>
      <header id="create-header">
        <Link className="btn-round" to="/">
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
      </header>
      <main id="create-main">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="preference"
            value={preference}
            pattern="[0-9]"
            placeholder="Preference"
            onChange={(e) => {
              setPreference(e.target.value);
            }}
            required
          />
          <input
            type="number"
            name="rating"
            value={rating}
            placeholder="Rating"
            onChange={(e) => {
              setRating(e.target.value);
            }}
            required
          />
          <div className="radio-container">
            <label>Game</label>
            <div className="input-container">
              <input
                type="radio"
                name="type"
                id=""
                value="Game"
                onClick={() => setType("Game")}
                required
              />
            </div>
          </div>
          <div className="radio-container">
            <label htmlFor="">Movie</label>
            <div className="input-container">
              <input
                type="radio"
                name="type"
                id=""
                value="Movie"
                onClick={() => setType("Movie")}
              />
            </div>
          </div>
          <div className="radio-container">
            <label>TV-Show</label>
            <div className="input-container">
              <input
                type="radio"
                name="type"
                value="TV-Show"
                onClick={() => setType("TV-Show")}
              />
            </div>
          </div>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0].name)}
          />
          <input className="submit-btn" type="submit" value="Add" />
        </form>
      </main>
    </>
  );
};

export default Create;
