import Footer from './components/Footer';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import { IMovie, IMovieListSchema } from './interfaces/IMovie';
import api from './services/axios';
import { getPageParamfromUrl } from './utils';
import { Grid, Container, Pagination, PaginationItem } from '@mui/material';
import { ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  const getDataMovie = (_, page) => {
    fetchData(`/movie/top_rated?language=en-US&page=${page}`);
  };

  const fetchData = (url: string) => {
    setIsFetching(true);
    api
      .get<IMovieListSchema>(url)
      .then((response) => {
        if (response.data) {
          setMoviesSchema(response.data);
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

  useEffect(() => {
    fetchData(`/movie/top_rated?language=en-US&page=${getPageParamfromUrl()}`);
  }, []);

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
