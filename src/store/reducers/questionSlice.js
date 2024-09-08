import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    answers: {},
    result: {}
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        updateAnswer(state, action) {
            const { questionId, answer } = action.payload;
            state.answers[questionId] = answer;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        resetState: (state) => {
            Object.keys(initialState).forEach((key) => {
                state[key] = initialState[key];
            });
        },
    },
});

export const { setQuestions, updateAnswer, resetState, setResult } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

export default questionsSlice.reducer;
