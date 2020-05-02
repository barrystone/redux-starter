add = (a) => {
  return (b) => {
    return a + b;
  };
};

const add2 = (a) => (b) => {
  return a + b;
};

console.log(add(1)(5));
