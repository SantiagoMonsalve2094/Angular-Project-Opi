import { createReducer, on } from '@ngrx/store';
import { addExpense, deleteExpense, editExpense, loadExpenses } from './expenses.actions';
import { initialState } from './expenses.state';


const sumTotal = (expenses: { amount: number }[]) => expenses.reduce((acc, e) => acc + e.amount, 0);


export const expensesReducer = createReducer(
  initialState,

  on(loadExpenses, (state, { expenses }) => ({
    ...state,
    expensesList: expenses,
    total: sumTotal(expenses),
  })),

  on(addExpense, (state, { expense }) => {
    const expensesList = [...state.expensesList, expense];

    return {
      ...state,
      expensesList,
      total: sumTotal(expensesList),
    };
  }),

  on(editExpense, (state, { expense }) => {
    const expensesList = state.expensesList.map((e) => (e.id === expense.id ? expense : e));

    return {
      ...state,
      expensesList,
      total: sumTotal(expensesList),
    };
  }),

  on(deleteExpense, (state, { id }) => {
    const expensesList = state.expensesList.filter((e) => e.id !== id);

    return {
      ...state,
      expensesList,
      total: sumTotal(expensesList),
    };
  }),
);
