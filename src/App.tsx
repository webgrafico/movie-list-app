import MovieList from './components/MovieList';
import PaginationLink from './components/PaginationLink';
import { IMovieListSchema } from './interfaces/IMovie';
import api from './services/axios';
import getPageParamfromUrl from './utils';
import { Alert, Backdrop, Box, CircularProgress, Collapse, Container, Grid, Paper, Typography } from '@mui/material';
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
    console.log(' getPageParamfromUrl() ', getPageParamfromUrl());
    try {
      const { data } = await api.get(`/movie/top_rated?language=en-US&page=${getPageParamfromUrl()}`);
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
      <Container maxWidth='sm'>
        <Typography component='div'>
          <Box sx={{ fontSize: 'h5.fontSize', m: 1, fontWeight: 'bold', textAlign: 'center' }}>
            Movie List - Top Rated
          </Box>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Collapse in={isError}>
              <Alert severity='error'>
                Não foi possível listar os filmes devido a limitação da API. Tente novamente em alguns segundos
              </Alert>
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            {/* <Loading isVisible={isLoading} /> */}
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
            <PaginationLink totalPages={moviesList.total_pages} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
