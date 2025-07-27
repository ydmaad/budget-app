interface TransactionsSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const TransactionSummary = ({
  totalIncome,
  totalExpense,
  balance,
}: TransactionsSummaryProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mt-6 text-center">
        <div className="bg-[#EAF1FB] p-4 rounded shadow">
          <p className="text-sm text-gray-500">총 수입</p>
          <p className="text-xl font-bold text-[#3D74B6]">
            {totalIncome.toLocaleString()}원
          </p>
        </div>
        <div className="bg-[#FDEDEC] p-4 rounded shadow">
          <p className="text-sm text-gray-500">총 지출</p>
          <p className="text-xl font-bold text-[#DC3C22]">
            {totalExpense.toLocaleString()}원
          </p>
        </div>
        <div className="bg-[#F7F7F7] p-4 rounded shadow">
          <p className="text-sm text-gray-500">잔액</p>
          <p className="text-xl font-bold text-[#3D74B6]">
            {balance.toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
