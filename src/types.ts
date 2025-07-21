export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}
