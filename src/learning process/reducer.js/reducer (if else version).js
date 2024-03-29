//[]
let lastId = 0;

const reducer = (state = [], action) => {
  if (action.type === "budAdded")
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  else if (action.type === "bugRemoved")
    return state.filter((bug) => bug.id != action.payload.id);
  return state;
};

export default reducer;
