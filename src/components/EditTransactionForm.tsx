import { useState } from "react";
import type { Transaction } from "../types";
interface EditTransactionFormProps {
  transaction: Transaction;
  onUpdate: (updateTransaction: Transaction) => void;
  onCancel: () => void;
}

const EditTransactionForm = ({
  transaction,
  onUpdate,
  onCancel,
}: EditTransactionFormProps) => {
  // 수정 폼 입력 데이터
  const [editFormData, setEditFormData] = useState({
    amount: transaction.amount.toString(),
    date: transaction.date,
    category: transaction.category,
    type: transaction.type,
  });

  const handleUpdate = () => {
    if (!editFormData.amount || Number(editFormData.amount) <= 0)
      return alert("금액을 입력해주세요!!");
    if (!editFormData.date) return alert("날짜를 입력해주세요!!");
    if (!editFormData.category) return alert("카테고리를 입력해주세요!!");

    const updatedTransaction = {
      ...transaction,
      amount: Number(editFormData.amount),
      date: editFormData.date,
      category: editFormData.category,
      type: editFormData.type,
    };

    onUpdate(updatedTransaction);
  };

  return (
    <>
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
            onClick={onCancel}
            className="bg-[#DC3C22] text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTransactionForm;
