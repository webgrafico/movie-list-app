import { AppContext } from '../App';
import { Alert, Backdrop, Box, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { useContext } from 'react';

const Header = () => {
  const appContext = useContext(AppContext);

  const setClose = () => {
    appContext?.setError(false);
  };

  return (
    <>
      <Typography component='div'>
        <Box sx={{ fontSize: 'h5.fontSize', m: 1, fontWeight: 'bold', textAlign: 'center', marginTop: '40px' }}>
          Rated movies
        </Box>
      </Typography>

      <Grid container mt={4} spacing={2}>
        <Snackbar
          open={appContext?.error}
          autoHideDuration={3000}
          onClose={setClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key={'top ' + 'center'}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {appContext?.errorMessage}
          </Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={appContext?.isFetching || false}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    </>
  );
};

export default Header;
