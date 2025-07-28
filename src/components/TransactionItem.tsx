import React from "react";
import type { Transaction } from "../types";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transactions: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem = React.memo(
  ({ transaction, onEdit, onDelete }: TransactionItemProps) => {
    return (
      <>
        <div
          className={`bg-white border-l-4 rounded shadow p-4 ${
            transaction.type === "income"
              ? "border-[#3D74B6]"
              : "border-[#DC3C22]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{transaction.date}</p>
              <p className="font-medium">{transaction.category}</p>
              <p
                className={`text-lg font-bold ${
                  transaction.type === "income"
                    ? "text-[#3D74B6]"
                    : "text-[#DC3C22]"
                }`}
              >
                {transaction.amount.toLocaleString()}원
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(transaction)}
                className="bg-[#EAC8A6] px-3 py-1 rounded text-white"
              >
                수정
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="bg-[#DC3C22] px-3 py-1 rounded text-white"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default TransactionItem;
