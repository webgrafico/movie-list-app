const getPageParamfromUrl = () => {
  const query = new URLSearchParams(document.location.search);
  return parseInt(query.get('page') || '1');
};

const getVoteAverage = (votes: number) => ((votes / 10) * 5).toFixed(2);

const BASE_URL_IMG = 'https://image.tmdb.org/t/p/original/';

export { getPageParamfromUrl, getVoteAverage, BASE_URL_IMG };
