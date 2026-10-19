export interface BankAccount {
    id: string;
    accountNumber: string;
    accountType: 'Savings' | 'Checking' | 'Business';
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'Active' | 'Inactive' | 'Closed';
}