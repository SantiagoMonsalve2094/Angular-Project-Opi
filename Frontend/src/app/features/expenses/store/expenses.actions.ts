import { createAction, props } from '@ngrx/store';
import { Expense } from './../models/expenseModel';

export const LOAD_EXPENSES = '[Expenses] Load Expenses';
export const ADD_EXPENSE = '[Expenses] Add Expense';
export const EDIT_EXPENSE = '[Expenses] Edit Expense';
export const DELETE_EXPENSE = '[Expenses] Delete Expense';


export const loadExpenses = createAction(LOAD_EXPENSES, props<{ expenses: Expense[] }>());


export const addExpense = createAction(ADD_EXPENSE, props<{ expense: Expense }>());


export const editExpense = createAction(EDIT_EXPENSE, props<{ expense: Expense }>());


export const deleteExpense = createAction(DELETE_EXPENSE, props<{ id: Expense['id'] }>());
