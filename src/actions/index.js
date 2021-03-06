import axios from "axios";

import { sendToken } from "../middleware/sendToken";

export const ADD_NOTE = "ADD_NOTE";
export const ADDING = "ADDING";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const GETTING = "GETTING";
export const GOT = "GOT";
export const ADD_TAG = "ADD_TAG";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_USER = "CREATE_USER";
export const ERROR = "ERROR";

let token = localStorage.getItem("notesAuthToken");
let config = { headers: { Authorization: token } };

export const addNote = note => dispatch => {
  dispatch({
    type: ADDING
  });
  axios
    .post("https://floating-mesa-40947.herokuapp.com/api/notes", note, config)
    .then(response => {
      dispatch({ type: ADD_NOTE, note: response.data });
    });
};
export function addTag(tag, id) {
  return {
    type: ADD_TAG,
    tag,
    id
  };
}

export const editNote = (id, note) => dispatch => {
  axios
    .put(
      `https://floating-mesa-40947.herokuapp.com/api/notes/${id}`,
      note,
      config
    )
    .then(response => {
      dispatch({
        type: EDIT_NOTE,
        note: response.data,
        id: response.data._id
      });
    });
};
export const deleteNote = id => dispatch => {
  axios
    .delete(`https://floating-mesa-40947.herokuapp.com/api/notes/${id}`, config)
    .then(response => {
      dispatch({
        type: DELETE_NOTE,
        id: id
      });
    });
};

export const getNotes = user => dispatch => {
  dispatch({ type: GETTING });
  axios
    .get(
      `https://floating-mesa-40947.herokuapp.com/api/notes/user/${user}`,
      config
    )
    .then(response => {
      console.log(response);
      dispatch({ type: GOT, notes: response.data });
    });
};
export const createUser = user => dispatch => {
  dispatch({ type: ADDING });
  console.log(user);
  axios
    .post("https://floating-mesa-40947.herokuapp.com/api/user", user, config)
    .then(response => {
      dispatch({
        type: CREATE_USER,
        user: response
      });
    });
};

export const signInSuccess = response => {
  return {
    type: SIGN_IN,
    user: response
  };
};

export const errorHandler = response => {
  return {
    type: ERROR,
    error: response
  };
};

export const signIn = user => dispatch => {
  axios
    .post(
      `https://floating-mesa-40947.herokuapp.com/api/user/login`,
      user,
      config
    )
    .then(response => {
      if (response.data.success) {
        dispatch({ type: SIGN_IN, user: response.data.user });
        localStorage.setItem("notesAuthToken", response.data.token);
      } else {
        dispatch({ type: ERROR, error: "Incorrect credentials" });
      }
    });
};

export const signOut = () => dispatch => {
  localStorage.removeItem("notesAuthToken");
  dispatch({
    type: SIGN_OUT
  });
};
