import { Avatar, ListItem, ListItemAvatar, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Fragment } from 'react';
import { IMovieListSchema } from 'src/interfaces/IMovie';

interface IMovieList {
  schema: IMovieListSchema;
}

const MovieList: React.FC<IMovieList> = ({ schema }: IMovieList) => {
  const { page, results, total_pages, total_results } = schema;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const baseUrlImg = 'https://image.tmdb.org/t/p/original/';

  const handleListItemClick = (id: number) => {
    console.log('movie id: ', id);
  };

  const getVoteAverage = (votes: number) => ((votes / 10) * 5).toFixed(2);

  return (
    <Typography component='div'>
      <ul>
        <li>Total Pages: {total_pages}</li>
        <li>Total Results: {total_results}</li>
      </ul>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List component='nav' aria-label='secondary mailbox folder'>
          {results.map((movie) => (
            <ListItem alignItems='flex-start' key={movie.id}>
              <ListItemAvatar>
                <Avatar key={movie.id} alt={movie.title} src={baseUrlImg + movie.poster_path} />
              </ListItemAvatar>
              <ListItemButton key={movie.id} onClick={() => handleListItemClick(movie.id)}>
                <ListItemText primary={movie.title} />

                <Rating
                  name='size-small'
                  defaultValue={parseInt(getVoteAverage(movie.vote_average))}
                  size='small'
                  readOnly
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Typography>
  );
};

export default MovieList;
