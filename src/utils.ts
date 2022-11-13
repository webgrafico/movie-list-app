const getPageParamfromUrl = () => {
  const query = new URLSearchParams(document.location.search);
  return parseInt(query.get('page') || '1');
};

export default getPageParamfromUrl;
