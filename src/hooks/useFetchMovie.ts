// interface ErrorApi {
//     response: {
//       status: number;
//       data: {
//         errors: string[];
//       };
//     };
//   }
import { AppContext } from '../App';
import { IMovie, IMovieListSchema } from '../interfaces/IMovie';
import api from '../services/axios';
import { getPageParamfromUrl } from '../utils';
import debounce from 'lodash.debounce';
import { useCallback, useContext, useEffect, useState } from 'react';

// export const fetchMovies = async () => {
//     try {
//       const { data } = await api.get<IMovieListSchema>(`/movie/top_rated?language=en-US&page=${getPageParamfromUrl()}`);
//       return data;
//     } catch (e) {
//       const error = e as ErrorApi;
//       setIsError(true);

//       if (error.response.status === 422) {
//         setErrorMessage(`API Error: ${error.response.data.errors[0]}`);
//         throw new Error(error.response.data.errors[0]);
//       }
//       return {} as IMovieListSchema;
//       setErrorMessage(errorMessage);
//       throw new Error(errorMessage);
//     }
//   };

// const fetchHandler = () => {
//   setIsLoading(true);
//   fetchMovies()
//     .then((movies: IMovieListSchema) => {
//       if (!movies) {
//         setIsError(true);
//       }
//       setMoviesList(movies);
//     })
//     .finally(() => setIsLoading(false));
// };

// const debounceFetchHandler = useCallback(debounce(fetchHandler, 500), []);

// {
//     page: 0,
//     results: [],
//     total_pages: 0,
//     total_results: 0
//   }

export interface IFetchMovie {
  data: IMovieListSchema;
  error: boolean;
  isFetching: boolean;
}

export default function fetchMovie<T = any>(url: string) {
  const [data, setData] = useState<T>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setIsFetching(true);
    api
      .get<T>(url)
      .then((response) => {
        if (response.data) setData(response.data);
      })
      .catch((e: Error) => {
        setError(true);
        throw new Error(e.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const debounceFetchHandler = useCallback(debounce(fetchData, 500), [data]);

  useEffect(() => {
    // debounceFetchHandler();
    fetchData();
  }, []);

  return { data, isFetching, error } as IFetchMovie;
}
