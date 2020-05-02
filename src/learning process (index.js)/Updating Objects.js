//Those two methods (Object of assignment) and (Spread operator) both are
//SHALLOW COPY!!

// const person = { name: "John" };
// const updated = Object.assign({}, person, { name: "Bob", age: 30 });

const person = {
  name: "John",
  address: {
    country: "US",
    city: "Houston",
  },
};
// const updated = { ...person, name: "Bob" };
// updated.address.city = "New York";

const updated = {
  ...person,
  name: "Bob",
  address: {
    ...person.address,
    city: "New York",
  },
};

console.log("person", person);
console.log("updated", updated);
