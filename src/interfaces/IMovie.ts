export interface IMovie {
  title: string;
  overview: string;
  vote_average: number;
  id: number;
  backdrop_path: string;
  poster_path: string;
}
export interface IMovieListSchema {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
