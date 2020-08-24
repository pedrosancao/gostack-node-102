import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface DataTransferInterface {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: DataTransferInterface): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (['income', 'outcome'].indexOf(type) < 0) {
      throw Error('Invalid transaction type');
    }
    if (type === 'outcome' && value > total) {
      throw Error('Insuficient funds.');
    }
    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
