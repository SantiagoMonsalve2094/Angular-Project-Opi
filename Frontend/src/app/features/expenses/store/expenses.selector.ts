import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpensesState } from './expenses.state';


//Crea un selector raiz que apunta al feature state llamado 'expenses'. Este estado va a ser del tipo ExpensesState
export const selectExpensesState = createFeatureSelector<ExpensesState>('expenses');


//va a devolver la lista de gastos del estado, usando el selector raiz
export const selectExpensesList = createSelector(
  selectExpensesState,
  (state) => state.expensesList,
);


//va a devolver el total de gastos del estado, usando el selector raiz
export const selectTotalExpenses = createSelector(selectExpensesState, (state) => state.total);
