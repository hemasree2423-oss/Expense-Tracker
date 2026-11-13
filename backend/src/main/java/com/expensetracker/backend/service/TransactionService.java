
package com.expensetracker.backend.service;

import com.expensetracker.backend.model.Transaction;
import com.expensetracker.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    // Add transaction
    public Transaction addTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    // Get all transactions
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    // Get transaction by ID
    public Transaction getTransactionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Transaction not found"));
    }

    // Update transaction
    public Transaction updateTransaction(Long id, Transaction updated) {
        Transaction old = getTransactionById(id);

        old.setTitle(updated.getTitle());
        old.setAmount(updated.getAmount());
        old.setType(updated.getType());
        old.setCategory(updated.getCategory());
        old.setDate(updated.getDate());
        old.setDescription(updated.getDescription());

        return repository.save(old);
    }

    // Delete transaction
    public void deleteTransaction(Long id) {
        repository.deleteById(id);
    }
}
