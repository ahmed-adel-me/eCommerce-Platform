module.exports = (obj1, obj2) => {
  const keys2 = new Set(Object.keys(obj2));

  return obj1.every((item) => {
    return Object.keys(item).every((key) => keys2.has(key));
  });
};
