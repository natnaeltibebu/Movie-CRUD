import { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (movieId) => {
    fetch(`http://localhost:8000/movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie.");
        }
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="container px-4 py-5" id="custom-cards">
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {movies.map((movie) => (
          <div className="col" key={movie.id}>
            <div
              className="card card-cover overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: `url(${movie.cover})`,
                backgroundSize: "cover",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <ul className=" list-unstyled mt-auto mx-auto">
                  <li className="mx-auto">
                    <h5 className="pt-5 mt-5 mb-4 lh-1 fw-bold mx-auto text-center">
                      {movie.title}
                    </h5>
                  </li>
                  <li className="mx-auto text-center ">
                    <a
                      href={`/update/${movie.id}`}
                      className="btn btn-sm rounded-1 btn-outline-light me-1 px-3"
                    >
                      Update
                    </a>
                    <a
                      href=""
                      className="btn btn-sm rounded-1 btn-light ms-1 px-3"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto text-center">
        <a
          href="/upload"
          className="btn btn-lg btn-dark rounded-1 shadow-lg px-4"
        >
          Add Movie
        </a>
      </div>
    </div>
  );
};

export default MovieList;
