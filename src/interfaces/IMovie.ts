export interface IMovie {
  title: string;
  overview: string;
  vote_average: number;
  id: number;
}
export interface IMovieListSchema {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
