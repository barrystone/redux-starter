// SNA
const logger = (params) => (store) => (next) => (action) => {
  console.log("Logging", params);
  next(action);
};

export default logger;
