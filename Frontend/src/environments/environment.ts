export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5127',
  endpoints: {
    expenses: '/expenses',
    expensesAdd: '/expenses/add',
    expensesUpdate: (id: number) => `/expenses/update/${id}`,
    expensesDelete: (id: number) => `/expenses/delete/${id}`,
  },
};
