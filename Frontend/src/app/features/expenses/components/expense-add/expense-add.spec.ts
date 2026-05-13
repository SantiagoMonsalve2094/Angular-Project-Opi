import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAdd } from './expense-add';
import { ExpenseCategory } from '../../models/expenseModel';

describe('ExpenseAdd', () => {
  let component: ExpenseAdd;
  let fixture: ComponentFixture<ExpenseAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h2 with text "Nuevo Gasto"', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toEqual('Nuevo Gasto');
  });

  it('should emit a new expense', () => {
    let emittedExpense: any;
    component.expenseAdded.subscribe((expense) => {
      emittedExpense = expense;
    });

    component.form.setValue({
      description: 'Mercado',
      amount: 50000,
      date: '2026-05-08',
      category: ExpenseCategory.Food,
    });

    component.submit();

    expect(emittedExpense.description).toEqual('Mercado');
    expect(emittedExpense.amount).toEqual(50000);
  });
});
