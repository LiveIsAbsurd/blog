export const change = (state, setState, stValue, e) => {
  const value = stValue === 'agree' ? e.target.checked : e.target.value;
  setState({ ...state, [stValue]: value });
};

export const submit = (state, e) => {
  e.preventDefault();
  console.log(state);
};
