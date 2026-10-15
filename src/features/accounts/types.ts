export interface BankAccount {
    id: string;
    accountNumber: string;
    accountType: 'savings' | 'checking' | 'business';
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'Active' | 'Inactive' | 'Closed';
}