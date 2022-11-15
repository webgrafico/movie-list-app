import { AppContext } from '../App';
import { BASE_URL_IMG } from '../constants/constants';
import { IMovie } from '../interfaces/IMovie';
import { getVoteAverage } from '../utils/utils';
import {
  Box,
  Button,
  ImageListItem,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IMovieDetail {}

const MovieDetail: React.FC<IMovieDetail> = () => {
  const appContext = useContext(AppContext);

  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const id = movieId as unknown as number;

  const movie = appContext?.movies.find((movie) => movie.id == id) || ({} as IMovie);

  return (
    <>
      <Typography>
        <Paper elevation={3}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ p: 2, fontWeight: 'bold', textAlign: 'left', marginTop: '40px' }}>Detalhes</Box>
            <Button variant='contained' size='small' sx={{ m: 2 }} onClick={() => navigate(-1)}>
              Voltar
            </Button>

            <Typography variant='body1' gutterBottom>
              <Box sx={{ fontSize: 'h3.fontSize', p: 2, fontWeight: 'bold', textAlign: 'left' }}>{movie.title}</Box>
              <ImageListItem>
                <img src={BASE_URL_IMG + movie.backdrop_path} loading='lazy' width={100} />
              </ImageListItem>
              <Box p={2} paddingBottom={0} paddingTop={3}>
                <strong>Descrição</strong>
              </Box>
              <Box p={2} marginBottom={5}>
                {movie.overview}
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Adulto</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.adult ? 'sim' : 'não'}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Língua original</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.original_language}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Título original</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.original_title}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Popularidade</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.popularity}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Data de lançamento</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.release_date}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Média de votos</strong>
                      </TableCell>
                      <TableCell align='right'>
                        <Rating
                          name='size-small'
                          defaultValue={parseInt(getVoteAverage(movie.vote_average))}
                          size='medium'
                          readOnly
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <strong>Total de votos</strong>
                      </TableCell>
                      <TableCell align='right'>{movie.vote_count}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Box>
        </Paper>
      </Typography>
    </>
  );
};

export default MovieDetail;
