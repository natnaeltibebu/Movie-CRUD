import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    cover: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/movies/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch movie");
          }
          return response.json();
        })
        .then((data) => {
          setFormData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch movie:", err);
          setError("Failed to fetch movie. Please try again.");
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      genre: "",
      cover: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:8000/movies/${id}`
      : "http://localhost:8000/movies";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            id ? "Failed to update movie" : "Failed to add movie"
          );
          return response.json();
        }
      })
      .then((data) => {
        console.log(id ? "Movie updated" : "Movie added", data);
        setSuccess(true);
        resetForm();
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(
          id
            ? "Failed to update movie. Please try again."
            : "Failed to add movie. Please try again"
        );
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div className="col-md-4 offset-md-3 mt-5 mx-auto">
      <h1 className="mx-auto text-center">{id ? "Update" : "Add"} Movie</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Movie {id ? "updated" : "added"} successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control rounded-1 p-2"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required="required"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            className="form-control rounded-1 p-2"
            id="genre"
            value={formData.genre}
            onChange={handleInputChange}
            placeholder="Enter genre"
            required="required"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cover" className="form-label">
            Cover Url
          </label>
          <input
            type="text"
            name="cover"
            className="form-control rounded-1 p-2"
            id="cover"
            value={formData.cover}
            onChange={handleInputChange}
            placeholder="Enter cover url"
            required="required"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 rounded-1 p-2">
          {id ? "Update" : "Add"}
        </button>
      </form>
      <div className="text-center mt-3">
        <a href="/" className="text-decoration-none">
          Back Home
        </a>
      </div>
    </div>
  );
};

export default MovieForm;
