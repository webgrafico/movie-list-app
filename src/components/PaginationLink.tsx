import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';

export default function PaginationLink({ totalPages }) {
  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get('page') || '1', totalPages);
          return (
            <Pagination
              page={page}
              count={10}
              renderItem={(item) => (
                <PaginationItem component={Link} to={`/${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
              )}
            />
          );
        }}
      </Route>
    </MemoryRouter>
  );
}
