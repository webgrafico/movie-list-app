import MovieList from './components/MovieList';
import PaginationLink from './components/PaginationLink';
import { IMovieListSchema } from './interfaces/IMovie';
import api from './services/axios';
import getPageParamfromUrl from './utils';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Snackbar,
  Typography
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ErrorApi {
  response: {
    status: number;
    data: {
      errors: string[];
    };
  };
}

const App = () => {
  const [moviesList, setMoviesList] = useState<IMovieListSchema>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState(
    'Não foi possível listar os filmes devido a limitação da API. Tente novamente em alguns segundos'
  );

  const fetchMovies = async () => {
    try {
      const { data } = await api.get(`/movie/top_rated?language=en-US&page=${getPageParamfromUrl()}`);
      return data;
    } catch (e) {
      const error = e as ErrorApi;
      setIsError(true);

      if (error.response.status === 422) {
        setErrorMessage(`API Error: ${error.response.data.errors[0]}`);
        throw new Error(error.response.data.errors[0]);
      }
      setErrorMessage(errorMessage);
      throw new Error(errorMessage);
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
      })
      .finally(() => setIsLoading(false));
  };

  const debounceFetchHandler = useCallback(debounce(fetchHandler, 500), []);

  useEffect(() => {
    return () => {
      debounceFetchHandler();
    };
  }, []);

  const autoHide = () => {
    setIsError(false);
  };

  return (
    <div>
      <Container maxWidth='sm'>
        <Typography component='div'>
          <Box sx={{ fontSize: 'h5.fontSize', m: 1, fontWeight: 'bold', textAlign: 'center' }}>Movie List</Box>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Snackbar
              open={isError}
              autoHideDuration={3000}
              onClose={autoHide}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              key={'top ' + 'center'}
            >
              <Alert severity='error' sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Grid>

          <Grid item xs={12}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
              <CircularProgress color='inherit' />
            </Backdrop>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3}>
              <Grid item xs={12} pt={2}>
                <MovieList schema={moviesList} />
              </Grid>
            </Paper>
          </Grid>

          <Grid py={2} container direction='row' justifyContent='center' alignItems='center'>
            <Pagination
              count={moviesList.total_pages}
              page={getPageParamfromUrl()}
              onChange={debounceFetchHandler}
              renderItem={(item) => (
                <PaginationItem component={Link} to={`/${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
