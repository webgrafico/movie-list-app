import { Grid, Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

interface IFooter {
  totalPages?: number;
  currentPage?: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Footer: React.FC<IFooter> = ({ totalPages = 1, currentPage = 1, onChange }) => {
  return (
    <>
      <Grid py={2} container direction='row' justifyContent='center' alignItems='center'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onChange}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`/${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
          )}
        />
      </Grid>
    </>
  );
};

export default Footer;
