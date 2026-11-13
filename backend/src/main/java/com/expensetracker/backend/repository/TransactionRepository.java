
package com.expensetracker.backend.repository;

import com.expensetracker.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

}
