import Alert from './components/Alert';
import Loading from './components/Loading';
import MovieList from './components/MovieList';
import PaginationLink from './components/PaginationLink';
import { IMovieListSchema } from './interfaces/IMovie';
import api from './services/axios';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
  const [moviesList, setMoviesList] = useState<IMovieListSchema>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1
  });

  const fetchMovies = async () => {
    try {
      const { data } = await api.get(`/movie/top_rated?language=en-US&page=${pagination.page}`);
      // console.log('movies2: ', data);
      return data;
    } catch (error) {
      setIsError(true);
      throw new Error('Erro ao buscar filmes');
    }
  };

  const fetchHandler = () => {
    setIsLoading(true);
    fetchMovies()
      .then((movies: IMovieListSchema) => {
        if (!movies) {
          setIsError(true);
        }
        setMoviesList(movies);
        // console.log('movies1: ', movies);
      })
      .finally(() => setIsLoading(false));
  };

  const debounceFetchHandler = useCallback(debounce(fetchHandler, 500), []);

  useEffect(() => {
    return () => {
      debounceFetchHandler();
    };
  }, []);

  return (
    <div>
      <h1>Movie List - Top Rated</h1>

      <Alert
        isVisible={isError}
        message='Não foi possível listar os filmes devido a limitação da API. Tente novamente em alguns segundos'
      />

      <Loading isVisible={isLoading} />

      <MovieList schema={moviesList} />

      <PaginationLink totalPages={moviesList.total_pages} />
    </div>
  );
};

export default App;
