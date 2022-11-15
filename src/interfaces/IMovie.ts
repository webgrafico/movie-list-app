export interface IMovie {
  title: string;
  overview: string;
  vote_average: number;
  id: number;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  release_date: string;
  vote_count: number;
}
export interface IMovieListSchema {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
