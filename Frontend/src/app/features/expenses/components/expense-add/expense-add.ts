import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expense, ExpenseAdd as ExpenseAddModel, ExpenseCategory } from '../../models/expenseModel';

@Component({
  selector: 'app-expense-add',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-add.html',
  styleUrl: './expense-add.css',
})
export class ExpenseAdd implements OnInit {

  private fb = inject(FormBuilder);

  @Output() expenseAdded = new EventEmitter<ExpenseAddModel>();

  @Output() closed = new EventEmitter<void>();

  @Input() message!: string;

  @Input() editingExpense: Expense | null = null;

  readonly ExpenseCategory = ExpenseCategory;

  form = this.fb.nonNullable.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required],
    category: [ExpenseCategory.Others, Validators.required],
  });


  ngOnInit(): void {
    if (this.editingExpense) {
      const date = new Date(this.editingExpense.date);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');

      this.form.setValue({
        description: this.editingExpense.description,
        amount: this.editingExpense.amount,
        date: `${yyyy}-${mm}-${dd}`,
        category: this.editingExpense.category,
      });
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.form.patchValue({
      date: `${yyyy}-${mm}-${dd}`,
    });
  }


  close(): void {
    this.closed.emit();
  }


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newExpense = this.form.getRawValue();

    const [year, month, day] = newExpense.date.split('-').map(Number);

    this.expenseAdded.emit({
      description: newExpense.description,
      amount: Number(newExpense.amount),
      date: new Date(year, month - 1, day),
      category: newExpense.category,
    });
  }
}
