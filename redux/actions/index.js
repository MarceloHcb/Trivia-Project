export const ADD_USER = 'ADD_USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const TOTAL_SCORE = 'TOTAL_SCORE';
export const RESET_STATE = 'RESET_STATE';

export const addUser = (gravatarEmail, name) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
    name,
  },
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const totalScore = (payload) => ({
  type: TOTAL_SCORE,
  payload,
});

export const resetState = () => ({
  type: RESET_STATE,
});
