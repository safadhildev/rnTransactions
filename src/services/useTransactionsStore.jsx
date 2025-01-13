import {create} from 'zustand';
import {insertString} from '../utils';
import moment from 'moment';

const response = {
  data: [
    {
      refId: '123ABC',
      transferDate: '2024-10-15T12:34:56Z', // Mock transfer date in UTC
      recipientName: 'John Doe',
      transferName: 'Salary Payment',
      amount: 1500.0,
    },
    {
      refId: '456DEF',
      transferDate: '2024-09-21T09:12:45Z', // Mock transfer date in UTC
      recipientName: 'Jane Smith',
      transferName: 'Invoice Payment',
      amount: 2300.75,
    },
    {
      refId: '789GHI',
      transferDate: '2024-10-05T16:18:30Z', // Mock transfer date in UTC
      recipientName: 'Robert Brown',
      transferName: 'Refund',
      amount: -500.0, // Negative amount for a refund
    },
    {
      refId: '101JKL',
      transferDate: '2024-08-30T11:47:22Z', // Mock transfer date in UTC
      recipientName: 'Emily Davis',
      transferName: 'Bonus Payment',
      amount: 1200.0,
    },
  ],
};

// Create the store
const useTransactionsStore = create((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  // Action to fetch items from an API
  fetchTransactions: async () => {
    try {
      set({isLoading: true});
      setTimeout(() => {
        const data = response.data;
        set({transactions: data, isLoading: false});
      }, 2000);
    } catch (error) {
      console.error(
        'useTransactionsStore >> fetchTransactions >> Error >>',
        error,
      );
      set({transactions: get().transactions, isLoading: false});
    }
  },

  // Action to get single stored transaction
  getTransactionById: id => {
    const transactions = get().transactions;
    const transaction = transactions.find(item => item?.refId === id);
    const isIncoming = transaction?.amount > 0;
    const parsedAmount =
      transaction?.amount < 0
        ? `${insertString(transaction?.amount?.toFixed(2), 'RM ', 1)}`
        : `RM ${transaction?.amount?.toFixed(2)}`;

    const parsedDate = moment(transaction?.transferDate).format(
      'DD/MM/YYYY hh:mm:ss',
    );
    return {
      ...transaction,
      amount: parsedAmount,
      transferDate: parsedDate,
      isIncoming,
    };
  },
}));

export default useTransactionsStore;
