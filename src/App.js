import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/upload" element={<MovieForm />} />
        <Route path="/update/:id" element={<MovieForm />} />
      </Routes>
    </Router>
  );
};

export default App;
