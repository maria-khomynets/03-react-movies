import { useState } from "react";
import { Toaster } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./App.module.css";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, currentPage], // ключ запиту
    queryFn: () => fetchMovies(query, currentPage), // функція запиту
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleOrder = (search: string) => {
    setQuery(search);
    setCurrentPage(1);
  };

  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const totalPages = data?.total_pages ?? 0;
  return (
    <>
      <SearchBar onSubmit={handleOrder} />
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data !== null && data !== undefined && data.results !== null && (
        <MovieGrid onSelect={handleClick} movies={data.results} />
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster />
    </>
  );
}
