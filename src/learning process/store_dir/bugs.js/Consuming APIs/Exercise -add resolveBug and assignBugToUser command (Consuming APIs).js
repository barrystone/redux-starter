import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

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
    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugRemoved: (bugs, action) =>
      bugs.list.filter((bug) => bug.id !== action.payload.id),

    // resoveBug (command) - bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const idx = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[idx].userId = userId;
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

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    onSuccess: bugResolved.type,
    data: { resolved: true },
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    onSuccess: bugAssignToUser.type,
    data: { userId },
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
