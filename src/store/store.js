import {configureStore, createSlice} from '@reduxjs/toolkit';

const incomesInitialState = [];
const expensesInitialState = [];

const incomesSlice = createSlice({
    name: 'incomes',
    initialState: incomesInitialState,
    reducers: {
        addIncome(state, action) {
            state.push(action.payload);
        }
    }
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: expensesInitialState,
    reducers: {
        addExpense(state, action) {
            state.push(action.payload);
        }
    }
});


export const store = configureStore({
    reducer: {
        incomes: incomesSlice.reducer,
        expenses: expensesSlice.reducer
    },
});

export const incomesActions = incomesSlice.actions;
export const expensesActions = expensesSlice.actions;
