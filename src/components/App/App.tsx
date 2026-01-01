import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { type Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { Toaster, toast } from 'react-hot-toast';
import styles from './App.module.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovies({ query });
      if (results.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(results);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      {}
      <Toaster position="top-right" reverseOrder={false} />

      {}
      <SearchBar onSubmit={handleSearch} />

      {}
      {loading && <Loader />}

      {}
      {error && <ErrorMessage />}

      {}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
