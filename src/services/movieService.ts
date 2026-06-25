import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const token = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export async function fetchMovies(search: string): Promise<Movie[]> {
  const parameters = {
    params: {
      query: search,
    },
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  };
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    parameters,
  );

  return response.data.results;
}
