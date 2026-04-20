export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
}

export type ExpenseAdd = Omit<Expense, 'id'>;

export enum ExpenseCategory {
  Housing = 0,
  Food = 1,
  Entertainment = 2,
  Health = 3,
  Transport = 4,
  Others = 5,
}
