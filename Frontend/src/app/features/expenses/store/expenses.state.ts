import { Expense } from './../models/expenseModel';

export interface ExpensesState {

  expensesList: Expense[];

  total: number;
}


export const initialState: ExpensesState = {
  expensesList: [],

  total: 0,
};
