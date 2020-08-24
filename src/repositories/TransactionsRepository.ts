import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDataTransferInterface {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, { value }) => total + value, 0);
    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, { value }) => total + value, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({
    title,
    type,
    value,
  }: TransactionDataTransferInterface): Transaction {
    const id = uuid();
    const transaction = { id, title, type, value };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
