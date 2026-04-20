import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseAdd } from './../models/expenseModel';
import { environment } from './../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpenseService {

  private http = inject(HttpClient);

  private base = environment.apiBaseUrl;

  private ep = environment.endpoints;


  getExpensesList(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.base}${this.ep.expenses}`);
  }


  addExpense(expense: ExpenseAdd): Observable<Expense> {
    return this.http.post<Expense>(`${this.base}${this.ep.expensesAdd}`, expense);
  }


  editExpense(id: number, updatedExpense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.base}${this.ep.expensesUpdate(id)}`, updatedExpense);
  }


  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${this.ep.expensesDelete(id)}`);
  }
}
