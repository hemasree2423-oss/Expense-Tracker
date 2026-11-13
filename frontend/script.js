
const API_URL = "http://localhost:8080/api/transactions";

const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

let editingId = null;
let allTransactions = [];
let incomeExpenseChart = null;
let categoryChart = null;

// Load all transactions
function loadTransactions() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load transactions");
            }
            return response.json();
        })
        .then(transactions => {
            allTransactions = transactions;
            displayTransactions(allTransactions);
            updateSummary(allTransactions);
            updateCharts(allTransactions);
        })
        .catch(error => {
            console.error(error);
            alert("Cannot connect to backend.");
        });
}

// Display transactions
function displayTransactions(transactions) {
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        const values = [
            transaction.title,
            "₹" + transaction.amount,
            transaction.type,
            transaction.category,
            transaction.date
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.background = "#2563eb";
        editButton.style.marginRight = "5px";

        editButton.addEventListener("click", function() {
            editTransaction(transaction);
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#dc2626";

        deleteButton.addEventListener("click", function() {
            deleteTransaction(transaction.id);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        transactionList.appendChild(row);
    });
}

// Calculate summary
function updateSummary(transactions) {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "INCOME") {
            income += Number(transaction.amount);
        } else if (transaction.type === "EXPENSE") {
            expenses += Number(transaction.amount);
        }
    });

    document.getElementById("income").textContent =
        "₹" + income.toFixed(2);

    document.getElementById("expenses").textContent =
        "₹" + expenses.toFixed(2);

    document.getElementById("balance").textContent =
        "₹" + (income - expenses).toFixed(2);
}

// Add or update transaction
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const transaction = {
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    let url = API_URL;
    let method = "POST";

    if (editingId !== null) {
        url = API_URL + "/" + editingId;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.text();
    })
    .then(() => {
        alert(editingId !== null
            ? "Transaction updated!"
            : "Transaction added!");

        resetForm();
        loadTransactions();
    })
    .catch(error => {
        console.error(error);
        alert("Unable to save transaction.");
    });
});

// Fill form with existing transaction
function editTransaction(transaction) {
    editingId = transaction.id;

    document.getElementById("title").value = transaction.title;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.type;
    document.getElementById("category").value = transaction.category;
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value =
        transaction.description || "";

    document.getElementById("formHeading").textContent =
        "Edit Transaction";

    document.getElementById("submitButton").textContent =
        "Save Changes";

    document.getElementById("cancelButton").style.display = "block";

    form.scrollIntoView({ behavior: "smooth" });
}

// Cancel editing
document.getElementById("cancelButton").addEventListener("click", resetForm);

function resetForm() {
    form.reset();
    editingId = null;

    document.getElementById("formHeading").textContent =
        "Add Transaction";

    document.getElementById("submitButton").textContent =
        "Add Transaction";

    document.getElementById("cancelButton").style.display = "none";
}

// Delete transaction
function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) {
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Transaction deleted!");
        loadTransactions();
    })
    .catch(error => {
        console.error(error);
        alert("Unable to delete transaction.");
    });
}

// Load transactions when page opens
loadTransactions();
// Search transactions by title
document.getElementById("searchInput").addEventListener("input", filterTransactions);

// Filter by type
document.getElementById("typeFilter").addEventListener("change", filterTransactions);

// Filter by category
document.getElementById("categoryFilter").addEventListener("input", filterTransactions);

function filterTransactions() {
    const search = document.getElementById("searchInput").value.toLowerCase();

    const type = document.getElementById("typeFilter").value;

    const category = document.getElementById("categoryFilter").value.toLowerCase();

    const filtered = allTransactions.filter(transaction => {
        return transaction.title.toLowerCase().includes(search) &&
               (type === "ALL" || transaction.type === type) &&
               transaction.category.toLowerCase().includes(category);
    });

    displayTransactions(filtered);
}

function updateCharts(transactions) {

    let income = 0;
    let expenses = 0;

    let categories = {};

    transactions.forEach(transaction => {

        if (transaction.type === "INCOME") {
            income += Number(transaction.amount);
        }

        if (transaction.type === "EXPENSE") {
            expenses += Number(transaction.amount);

            if (categories[transaction.category]) {
                categories[transaction.category] += Number(transaction.amount);
            } else {
                categories[transaction.category] = Number(transaction.amount);
            }
        }
    });

    // Destroy old charts before creating new ones
    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }

    if (categoryChart) {
        categoryChart.destroy();
    }

    // Income vs Expenses chart
    const ctx1 = document.getElementById("incomeExpenseChart");

    incomeExpenseChart = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["Income", "Expenses"],
            datasets: [{
                label: "Amount (₹)",
                data: [income, expenses],
                backgroundColor: ["#16a34a", "#dc2626"]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Category chart
    const ctx2 = document.getElementById("categoryChart");

    categoryChart = new Chart(ctx2, {
        type: "doughnut",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    "#2563eb",
                    "#16a34a",
                    "#f59e0b",
                    "#dc2626",
                    "#9333ea",
                    "#0891b2"
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}
