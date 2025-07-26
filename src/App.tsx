import { useState, type FormEvent } from "react";
import "./App.css";
import type { Transaction } from "./types";

function App() {
  // 모든 거래내역
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // 폼 입력 데이터
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    category: "",
    type: "expense" as "income" | "expense",
  });
  // 수정 모드
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // 수정 중인 거래의 ID를 저장
  const [editingId, setEditingId] = useState<string | null>(null);

  // 새로운 거래를 거래 목록에 추가하는 함수
  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, newTransaction]);
  };
  // console.log(transactions);

  // 폼 제출 처리 함수
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now().toString(),
      amount: Number(formData.amount),
      date: formData.date,
      category: formData.category,
      type: formData.type,
    };

    addTransaction(newTransaction);
    setFormData({
      amount: "",
      date: "",
      category: "",
      type: "expense",
    });
  };

  // 거래 삭제 함수
  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  // 거래 수정 모드로 전환하는 함수
  const handleEdit = (transaction: Transaction) => {
    setIsEditing(true);
    setEditingId(transaction.id);
    setFormData({
      amount: transaction.amount.toString(),
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="금액"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="카테고리"
        />
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as "income" | "expense",
            })
          }
        >
          <option value="income">수익</option>
          <option value="expense">지출</option>
        </select>
        <button type="submit">추가</button>
      </form>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <div>
              <p>{transaction.type === "income" ? "수익" : "지출"}</p>
              <p>{transaction.date}</p>
              <p>{transaction.category}</p>
              <p>{transaction.amount.toLocaleString()}원</p>
              <button onClick={() => handleEdit(transaction)}>수정</button>
              <button onClick={() => handleDelete(transaction.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
