import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense, ExpenseAdd as ExpenseAddModel, ExpenseCategory } from '../../models/expenseModel';

@Component({
  selector: 'app-expense-add',
  imports: [FormsModule],
  templateUrl: './expense-add.html',
  styleUrl: './expense-add.css',
})
export class ExpenseAdd implements OnInit {

  @Output() expenseAdded = new EventEmitter<ExpenseAddModel>();

  @Output() closed = new EventEmitter<void>();

  @Input() message!: string;

  @Input() editingExpense: Expense | null = null;

  readonly ExpenseCategory = ExpenseCategory;

  newExpense = {
    description: '',
    amount: 0,
    date: '',
    category: ExpenseCategory.Others,
  };


  ngOnInit(): void {
    if (this.editingExpense) {
      const date = new Date(this.editingExpense.date);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');

      this.newExpense = {
        description: this.editingExpense.description,
        amount: this.editingExpense.amount,
        date: `${yyyy}-${mm}-${dd}`,
        category: this.editingExpense.category,
      };
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.newExpense.date = `${yyyy}-${mm}-${dd}`;
  }


  close(): void {
    this.closed.emit();
  }


  submit(): void {
    if (!this.newExpense.description || !this.newExpense.amount || !this.newExpense.date) return;

    const [year, month, day] = this.newExpense.date.split('-').map(Number);

    this.expenseAdded.emit({
      description: this.newExpense.description,
      amount: this.newExpense.amount,
      date: new Date(year, month - 1, day),
      category: this.newExpense.category,
    });
  }
}
