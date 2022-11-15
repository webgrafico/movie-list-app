import { IMovie } from '../interfaces/IMovie';
import { BASE_URL_IMG, getVoteAverage } from '../utils';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemButton, Paper, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Link as RouterLink } from 'react-router-dom';

interface IMovieList {
  movies: IMovie[];
}

const MovieList: React.FC<IMovieList> = ({ movies }) => {
  return (
    <>
      <Typography>
        <Paper elevation={3}>
          <Box sx={{ p: 2, fontWeight: 'bold', textAlign: 'left', marginTop: '40px' }}>Filmes</Box>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
              {movies.map((movie) => (
                <ListItem disablePadding>
                  <ListItemButton key={movie.id} to={`/movie/${movie.id}`} component={RouterLink}>
                    <ListItemAvatar>
                      <Avatar key={movie.id} alt={movie.title} src={BASE_URL_IMG + movie.poster_path} />
                    </ListItemAvatar>

                    <Grid container>
                      <Grid item xs={10}>
                        {movie.title}
                      </Grid>
                      <Grid item xs={2}>
                        <Rating
                          name='size-small'
                          defaultValue={parseInt(getVoteAverage(movie.vote_average))}
                          size='medium'
                          readOnly
                        />
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Typography>
    </>
  );
};

export default MovieList;
