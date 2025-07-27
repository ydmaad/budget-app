import React from "react";
import { useState } from "react";
import type { Transaction } from "../types";

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  // 폼 입력 데이터
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    category: "",
    type: "expense" as "income" | "expense",
  });

  // 거래 내역 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
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

    onAddTransaction(newTransaction);
    setFormData({
      amount: "",
      date: "",
      category: "",
      type: "expense",
    });
  };
  return (
    <>
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
    </>
  );
};

export default TransactionForm;
