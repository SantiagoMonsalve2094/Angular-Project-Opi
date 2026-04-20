import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense } from '../../models/expenseModel';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.html',
  styleUrl: './expense-edit.css',
})
export class ExpenseEdit {
  @Input() expense: Expense | null = null;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
