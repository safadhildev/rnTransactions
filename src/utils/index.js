export const insertString = (original, toInsert, index) => {
  return original.slice(0, index) + toInsert + original.slice(index);
};

export const objectToArray = obj => {
  return Object.entries(obj).map(([key, value]) => ({key, value}));
};
