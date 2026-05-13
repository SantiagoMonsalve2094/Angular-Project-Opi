import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { of } from 'rxjs';

import { ExpenseList } from './expense-list';
import { expensesReducer } from '../../store/expenses.reducer';
import { ExpenseService } from '../../services/expenseService';

describe('ExpenseList', () => {
  let component: ExpenseList;
  let fixture: ComponentFixture<ExpenseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseList],
      providers: [
        provideStore({ expenses: expensesReducer }),
        { provide: ExpenseService, useValue: { getExpensesList: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
