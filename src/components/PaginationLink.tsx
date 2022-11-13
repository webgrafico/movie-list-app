import getPageParamfromUrl from '../utils';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';

function Content({ totalPages }) {
  const page = getPageParamfromUrl();
  return (
    <Pagination
      page={page}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/list${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
      )}
    />
  );
}

export default function PaginationLink({ totalPages }) {
  return (
    <MemoryRouter initialEntries={['/list']} initialIndex={0}>
      <Routes>
        <Route path='*' element={<Content totalPages={totalPages} />} />
      </Routes>
    </MemoryRouter>
  );
}
