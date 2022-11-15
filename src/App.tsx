import Footer from './components/Footer';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import { DEBOUNCE_MS_VALUE } from './constants/constants';
import { IMovie, IMovieListSchema } from './interfaces/IMovie';
import api from './services/axios';
import { getPageParamfromUrl } from './utils/utils';
import { CircularProgress, Container, Grid, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { createContext, SetStateAction, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

export interface IAppContext {
  isFetching: boolean;
  setIsFetching: React.Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
  movies: IMovie[];
}

export const AppContext = createContext<null | IAppContext>(null);

const App = () => {
  const errorMessageDefault = 'Não foi possível listar os filmes. Tente novamente em alguns segundos';
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessageDefault);
  const [moviesSchema, setMoviesSchema] = useState<IMovieListSchema>();
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const getDataMovie = (_, page) => {
    fetchData(`/movie/popular?language=en-US&page=${page}`);
  };

  const fetchData = (url: string, cb?) => {
    setIsFetching(true);
    api
      .get<IMovieListSchema>(url)
      .then((response) => {
        if (response.data) {
          setMoviesSchema(response.data);
          cb && cb(response.data);
        }
      })
      .catch((e) => {
        setError(true);
        console.log(e);
        throw new Error(e.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const debouncedFetchData = debounce((query, cb) => {
    const queryParam = query.trim() && query.length === 3;

    queryParam
      ? fetchData(`/search/movie?query=${query}`, cb)
      : fetchData(`/movie/popular?language=en-US&page=${getPageParamfromUrl()}`);
  }, DEBOUNCE_MS_VALUE);

  const shouldGoBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchData(`/movie/popular?language=en-US&page=${getPageParamfromUrl()}`);
  }, []);

  useEffect(() => {
    query &&
      debouncedFetchData(query, (res) => {
        setMoviesSchema(res);
      });
  }, [query]);

  return (
    <AppContext.Provider
      value={{
        isFetching,
        setIsFetching,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        movies: moviesSchema?.results || []
      }}
    >
      <Container>
        <Header />

        <Grid container>
          <Grid>
            <TextField
              id='outlined-basic'
              label='Procurar'
              variant='outlined'
              value={query}
              onFocus={shouldGoBack}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Grid>
          <Grid p={1}>{isFetching && <CircularProgress />}</Grid>
        </Grid>

        <Routes>
          <Route path='/' element={<MovieList movies={moviesSchema?.results || []} />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
        </Routes>

        <Footer
          totalPages={moviesSchema?.total_pages}
          currentPage={getPageParamfromUrl()}
          onChange={(_, page) => getDataMovie(_, page)}
        />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
