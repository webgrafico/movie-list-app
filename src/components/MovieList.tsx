import { List, ListItem, ListItemProps, ListItemText } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IMovieListSchema } from 'src/interfaces/IMovie';

interface IMovieList {
  schema: IMovieListSchema;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.default
    }
  })
);

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component='a' {...props} />;
};

const MovieList: React.FC<IMovieList> = ({ schema }: IMovieList) => {
  const { page, results, total_pages, total_results } = schema;
  const classes = useStyles();

  return (
    <div>
      <ul>
        <li>Page: {page}</li>
        <li>Total Pages: {total_pages}</li>
        <li>Total Results: {total_results}</li>
      </ul>

      <div className={classes.root}>
        <List component='nav'>
          {results.map((movie) => (
            <ListItemLink key={movie.id} href={`/details?id=${movie.id}`}>
              <ListItemText primary={movie.title} />
            </ListItemLink>
          ))}
        </List>
      </div>
    </div>
  );
};

export default MovieList;
