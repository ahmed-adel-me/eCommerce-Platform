export default (asyncFunc) => {
  return async (...args) => {
    try {
      return await asyncFunc(...args);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      throw new Error(errorMessage);
    }
  };
};
