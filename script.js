let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  if (description && amount && date) {
    const expense = { description, amount, date, category };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  } else {
    alert('Please fill out all fields');
  }

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('date').value = '';
}

function renderExpenses(filterCategory = 'All') {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  let total = 0;
  const categoryTotals = {};

  expenses
    .filter(expense => filterCategory === 'All' || expense.category === filterCategory)
    .forEach((expense, index) => {
      total += expense.amount;

      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;

      const expenseItem = document.createElement('li');
      expenseItem.innerHTML = `
        ${expense.description} - ₱${expense.amount.toFixed(2)} (${expense.category}) - ${expense.date}
        <button onclick="deleteExpense(${index})">Remove</button>
      `;
      expenseList.appendChild(expenseItem);
    });

  document.getElementById('totalAmount').innerText = total.toFixed(2);

  const categoryTotalContainer = document.getElementById('categoryTotals');
  categoryTotalContainer.innerHTML = '';
  for (const [category, amount] of Object.entries(categoryTotals)) {
    const categoryTotalItem = document.createElement('div');
    categoryTotalItem.classList.add('category-total');
    categoryTotalItem.innerText = `${category}: ₱${amount.toFixed(2)}`;
    categoryTotalContainer.appendChild(categoryTotalItem);
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

function filterExpenses() {
  const filterCategory = document.getElementById('filterCategory').value;
  renderExpenses(filterCategory);
}

function sortExpenses() {
  expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderExpenses();
}

window.onload = () => renderExpenses();
