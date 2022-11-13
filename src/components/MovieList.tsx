import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import * as React from 'react';
import { IMovieListSchema } from 'src/interfaces/IMovie';

interface IMovieList {
  schema: IMovieListSchema;
}

const MovieList: React.FC<IMovieList> = ({ schema }: IMovieList) => {
  const { page, results, total_pages, total_results } = schema;
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <ul>
        <li>Page: {page}</li>
        <li>Total Pages: {total_pages}</li>
        <li>Total Results: {total_results}</li>
      </ul>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List component='nav' aria-label='secondary mailbox folder'>
          {results.map((movie) => (
            <ListItemButton
              key={movie.id}
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText primary={movie.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default MovieList;
