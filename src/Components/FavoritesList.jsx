import "../CSS/favorites-list.css";

const FacoritesList = ({ favorites }) => {
  const handleDelete = (id, type) => {
    fetch(`http://localhost:4000/${type}s/${id}/${type}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      {favorites.map((favorite) => (
        <div className="grid-child" key={favorite.id}>
          <div className="favorite-container">
            <img
              className="img"
              src={`../images/${favorite.image}`}
              alt="img"
            />
            <p>
              <strong>Title</strong>: {favorite.title}
            </p>
            <p>
              <strong>Rating</strong>: {favorite.rating}
            </p>
            <p>
              <strong>Type</strong>: {favorite.type}
            </p>
            <div
              className="delete-btn"
              onClick={() =>
                handleDelete(favorite.id, String(favorite.type).toLowerCase())
              }
            >
              Delete
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FacoritesList;
