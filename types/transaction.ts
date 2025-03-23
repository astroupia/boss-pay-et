export interface TransactionDetails {
  id: string;
  name: string;
  amount: number;
  currency: string;
  date: string;
  time: string;
  recipient: string;
  cardNumber: string;
  fee: number;
  residualBalance: number;
  type: "incoming" | "outgoing";
  category: string;
  status: "completed" | "pending" | "failed";
}

export interface TransactionGroup {
  date: string;
  transactions: TransactionDetails[];
}
