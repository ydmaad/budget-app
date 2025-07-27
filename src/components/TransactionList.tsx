import type { Transaction } from "../types";
import EditTransactionForm from "./EditTransactionForm";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  editingId: string | null;
  onEdit: (transactioin: Transaction) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTransaciton: Transaction) => void;
  onCancel: () => void;
}

const TransactionList = ({
  transactions,
  editingId,
  onEdit,
  onDelete,
  onUpdate,
  onCancel,
}: TransactionListProps) => {
  return (
    <>
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
                <EditTransactionForm
                  transaction={transaction}
                  onUpdate={onUpdate}
                  onCancel={onCancel}
                />
              ) : (
                // 거래 내역 리스트
                <TransactionItem
                  transaction={transaction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default TransactionList;
