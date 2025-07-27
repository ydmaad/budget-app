import { useEffect, useState } from "react";
import "./App.css";
import type { Transaction } from "./types";
import TransactionSummary from "./components/TransactionSummary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  // 모든 거래내역
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // 수정 모드
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // 수정 중인 거래의 ID를 저장
  const [editingId, setEditingId] = useState<string | null>(null);

  // 거래 내역 추가, 수정, 삭제시 localStorage에 저장
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      const data = JSON.parse(saved);
      setTransactions(data);
    }
  }, []);

  // 새로운 거래를 거래 목록에 추가하는 함수
  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, newTransaction]);
  };
  // console.log(transactions);

  // 거래 삭제 함수
  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  // 거래 수정 모드로 전환하는 함수
  const handleEdit = (transaction: Transaction) => {
    setIsEditing(true);
    setEditingId(transaction.id);
  };

  // 수정 완료 함수
  const handleUpdate = (updatedTransaction: Transaction) => {
    const updateTransaction = transactions.map((transaction) => {
      if (transaction.id === editingId) {
        return updatedTransaction;
      }
      return transaction;
    });

    setTransactions(updateTransaction);
    setIsEditing(false);
    setEditingId(null);
  };

  // 수정 취소 함수
  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  // 총 수입
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // 총 지출
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  //
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-center text-[#3D74B6] text-4xl my-5">
        My Budget Tracker
      </h1>

      {/* 거래 내역 추가 폼 */}
      <TransactionForm onAddTransaction={addTransaction} />

      {/* 총 잔액 */}
      <TransactionSummary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        balance={balance}
      />

      {/* 거래 내역 리스트 */}
      <TransactionList
        transactions={transactions}
        editingId={editingId}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
