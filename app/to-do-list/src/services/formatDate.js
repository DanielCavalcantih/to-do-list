const formatDate = (creationDate) => {
  const date = new Date(creationDate);
  const day = date.getDate();
  let month = date.getMonth();
  const year = date.getFullYear();
  if (day < 10 && month < 10) return ['0' + day, '0' + month, year].join('/');
  if (day < 10) return ['0' + day, month, year].join('/');
  if (month < 10) return [day, '0' + month, year].join('/');
  return [day, month, year].join('/');
};

export default formatDate;