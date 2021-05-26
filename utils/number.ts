export const toLocaleString = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
