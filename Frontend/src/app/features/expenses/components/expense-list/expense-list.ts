import { Component, inject, OnInit, signal } from '@angular/core';
import { NgFor, NgClass, DatePipe, DecimalPipe, NgIf, AsyncPipe } from '@angular/common';
import { Expense, ExpenseCategory } from '../../models/expenseModel';
import { ExpenseAdd } from '../expense-add/expense-add';
import { ExpenseService } from '../../services/expenseService';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addExpense, deleteExpense, editExpense, loadExpenses } from '../../store/expenses.actions';
import { selectExpensesList, selectTotalExpenses } from '../../store/expenses.selector';

@Component({
  selector: 'app-expense-list',
  imports: [NgIf, NgFor, NgClass, DatePipe, DecimalPipe, AsyncPipe, ExpenseAdd],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit {

  private store = inject(Store);

  showModal = signal(false);

  modalMessage = signal('Agrega un nuevo gasto a tu lista');

  selectedExpense = signal<Expense | null>(null);

  // --- OPCION 1: Signal (Angular moderno) ------------------------------
  // En el template se usa: *ngFor="let expense of expensesList()"
  // expensesList = signal<Expense[]>([]);

  // --- OPCION 2: RxJS BehaviorSubject + async pipe ---------------------
  // En el template se usa: *ngFor="let expense of expensesList | async"
  // expensesList = new BehaviorSubject<Expense[]>([]);
  // total = new BehaviorSubject<number>(0);

  private expenseService: ExpenseService = inject(ExpenseService);

  constructor() {}

  /* OPCION 3: NgRx Store (activa) */
  // NgRx selectors (Observable)
  // En el template se usa: *ngFor="let expense of expensesList | async"
  expensesList = this.store.select(selectExpensesList);

  total = this.store.select(selectTotalExpenses);

  /** Carga los gastos desde el API y despacha al store */
  loadExpenses(): void {
    this.expenseService.getExpensesList().subscribe((expenses) => {
      // OPCION 1 - Signal:
      // this.expensesList.set(expenses);

      // OPCION 2 - BehaviorSubject:
      // this.expensesList.next(expenses);

      // Usa el action creator, NO un objeto literal con type
      this.store.dispatch(loadExpenses({ expenses }));
    });
  }

  ngOnInit(): void {
    // para las opciones 1 y 2, carga los gastos desde el API y actualiza la senal o el BehaviorSubject
    // this.expenseService.getExpensesList().subscribe((expenses) => {
    //   this.expensesList.set(expenses); // O this.expensesList.next(expenses);
    //   const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    //   this.total.set(total); // O this.total.next(total);
    // });

    // Carga inicial: llama al servicio y despacha al store
    this.loadExpenses();
  }

  openModal(): void {
    this.showModal.set(true);
  }

  onExpenseAdded(data: Omit<Expense, 'id'>): void {
    const current = this.selectedExpense();

    if (current) {
      this.expenseService.editExpense(current.id, { id: current.id, ...data }).subscribe((expense) => {
        this.store.dispatch(editExpense({ expense }));
        this.loadExpenses();
      });
    } else {
      this.expenseService.addExpense(data).subscribe((expense) => {
        this.store.dispatch(addExpense({ expense }));
        this.loadExpenses();
      });
    }

    this.selectedExpense.set(null);
    this.showModal.set(false);
  }

  editExpense(expense: Expense): void {
    this.selectedExpense.set(expense);
    this.showModal.set(true);
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.store.dispatch(deleteExpense({ id }));
      this.loadExpenses();

      if (this.selectedExpense()?.id === id) {
        this.selectedExpense.set(null);
      }
    });
  }

  getCategoryClass(category: ExpenseCategory): string {
    const map: Record<ExpenseCategory, string> = {
      [ExpenseCategory.Housing]: 'cat-housing',
      [ExpenseCategory.Food]: 'cat-food',
      [ExpenseCategory.Entertainment]: 'cat-entertainment',
      [ExpenseCategory.Health]: 'cat-health',
      [ExpenseCategory.Transport]: 'cat-transport',
      [ExpenseCategory.Others]: 'cat-others',
    };

    return map[category] ?? 'cat-others';
  }

  getCategoryName(category: ExpenseCategory): string {
    switch (category) {
      case ExpenseCategory.Housing:
        return 'Vivienda';
      case ExpenseCategory.Food:
        return 'Alimentacion';
      case ExpenseCategory.Entertainment:
        return 'Entretenimiento';
      case ExpenseCategory.Health:
        return 'Salud';
      case ExpenseCategory.Transport:
        return 'Transporte';
      case ExpenseCategory.Others:
        return 'Otros';
      default:
        return 'Otros';
    }
  }
}