import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequest: (bugs, action) => {
      bugs.loading = true;
    },
    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
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
  bugsRequest,
  bugsRequestFailed,
} = slice.actions;

export default slice.reducer;

// ActionCreator
const url = "/bugs";
// () => fn(dispatch,geState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequest.type,
      onSuccess: bugReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugsRequest.type,
//     onSuccess: bugReceived.type,
//     onError: bugsRequestFailed.type,
//   });

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
