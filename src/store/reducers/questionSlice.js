// src/features/questionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    answers: {}

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
        resetState: (state) => {
            Object.keys(initialState).forEach((key) => {
                state[key] = initialState[key];
            });
        },
    },
});

export const { setQuestions, updateAnswer , resetState } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

export default questionsSlice.reducer;
