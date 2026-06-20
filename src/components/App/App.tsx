import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleOrder = async (search: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(search);
      if (data.length === 0) {
        toast("No movies found for your request.");
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleOrder} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleClick} />
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster />
    </>
  );
}
