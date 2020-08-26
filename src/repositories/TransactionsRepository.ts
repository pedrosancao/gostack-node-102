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
    return this.transactions.reduce(
      ({ income, outcome, total }, { type, value }) => {
        const balance = { income, outcome, total };
        if (type === 'income') {
          balance.income += value;
          balance.total += value;
        } else if (type === 'outcome') {
          balance.outcome += value;
          balance.total -= value;
        }
        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
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
