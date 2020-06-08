import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (bugs, action) =>
      bugs.list.filter((bug) => bug.id !== action.payload.id),

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignToUser: (bugs, action) => {
      const idx = bugs.list.findIndex((bug) => bug.id === action.payload.bugId);
      bugs.list[idx].userId = action.payload.userId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignToUser,
  bugReceived,
} = slice.actions;

export default slice.reducer;

// ActionCreator
const url = "/bugs";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugReceived.type,
  });

// Selector

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
