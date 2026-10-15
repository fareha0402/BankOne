import { BankAccount } from './types';

const accountsData: BankAccount[] = [
    {
        id: '1',
        accountNumber: '1234567890',
        accountType: 'savings',
        balance: 1000,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
    },
    {
        id: '2',
        accountNumber: '0987654321',
        accountType: 'checking',
        balance: 500,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Inactive'
    },
    {
        id: '3',
        accountNumber: '1122334455',
        accountType: 'business',
        balance: 2000,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
    }
]
export default accountsData