import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Transaction } from "./types";
import TransactionSummary from "./components/TransactionSummary";
import TransactionItem from "./components/TransactionItem";

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
  // 수정 폼 입력 데이터
  const [editFormData, setEditFormData] = useState({
    amount: "",
    date: "",
    category: "",
    type: "expense" as "income" | "expense",
  });

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

  // 거래 내역 폼 제출 처리 함수
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0)
      return alert("금액을 입력해주세요!!");
    if (!formData.date) return alert("날짜를 입력해주세요!!");
    if (!formData.category) return alert("카테고리를 입력해주세요!!");

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
    setEditFormData({
      amount: transaction.amount.toString(),
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
    });
  };

  // 수정 완료 함수
  const handleUpdate = () => {
    if (!editFormData.amount || Number(editFormData.amount) <= 0)
      return alert("금액을 입력해주세요!!");
    if (!editFormData.date) return alert("날짜를 입력해주세요!!");
    if (!editFormData.category) return alert("카테고리를 입력해주세요!!");

    const updateTransaction = transactions.map((transaction) => {
      if (transaction.id === editingId) {
        return {
          ...transaction,
          amount: Number(editFormData.amount),
          date: editFormData.date,
          category: editFormData.category,
          type: editFormData.type,
        };
      } else {
        return transaction;
      }
    });
    setTransactions(updateTransaction);
    setIsEditing(false);
    setEditingId(null);

    setEditFormData({
      amount: "",
      date: "",
      category: "",
      type: "expense",
    });
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

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-center text-[#3D74B6] text-4xl my-5">
        My Budget Tracker
      </h1>

      {/* 거래 내역 추가 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded max-w-lg mx-auto shadow-md space-y-2"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="금액"
            className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="카테고리"
            className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
          />
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "income" | "expense",
              })
            }
            className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
          >
            <option value="income">수익</option>
            <option value="expense">지출</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#3D74B6] text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          추가
        </button>
      </form>

      {/* 총 잔액 */}
      <TransactionSummary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        balance={balance}
      />

      {/* 거래 내역 리스트 */}
      <div className="mt-8 space-y-4 max-w-lg mx-auto">
        {transactions
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) return -1;
            if (new Date(a.date) < new Date(b.date)) return 1;
            return 0;
          })
          .map((transaction) => (
            <div key={transaction.id}>
              {editingId === transaction.id ? (
                // 거래내역 수정 폼
                <div className="bg-white p-4 rounded max-w-lg mx-auto shadow-md space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="number"
                      value={editFormData.amount}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          amount: e.target.value,
                        })
                      }
                      placeholder="금액"
                      className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
                    />
                    <input
                      type="date"
                      value={editFormData.date}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          date: e.target.value,
                        })
                      }
                      className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={editFormData.category}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          category: e.target.value,
                        })
                      }
                      placeholder="카테고리"
                      className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
                    />
                    <select
                      value={editFormData.type}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          type: e.target.value as "income" | "expense",
                        })
                      }
                      className="border border-[#EAC8A6] rounded px-3 py-2 w-full"
                    >
                      <option value="income">수익</option>
                      <option value="expense">지출</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-[#3D74B6] text-white px-4 py-2 rounded hover:opacity-90 transition"
                    >
                      수정 완료
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-[#DC3C22] text-white px-4 py-2 rounded hover:opacity-90 transition"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                // 거래 내역 리스트
                <TransactionItem
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
