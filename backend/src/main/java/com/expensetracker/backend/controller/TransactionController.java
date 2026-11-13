
package com.expensetracker.backend.controller;

import com.expensetracker.backend.model.Transaction;
import com.expensetracker.backend.service.TransactionService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // Add transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return service.addTransaction(transaction);
    }

    // Get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    // Get transaction by ID
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return service.getTransactionById(id);
    }

    // Update transaction
    @PutMapping("/{id}")
    public Transaction updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction) {
        return service.updateTransaction(id, transaction);
    }

    // Delete transaction
    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        service.deleteTransaction(id);
        return "Transaction deleted successfully";
    }
}
