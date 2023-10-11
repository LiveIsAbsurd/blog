const dateForm = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(new Date(date));
};

export default dateForm;
