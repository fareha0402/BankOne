import { useEffect, useState } from 'react';
// import accountsData from './accountsData';
import accountsService from './accountsService';
import type { BankAccount } from './types';
import { useQuery } from '@tanstack/react-query';

// using tanstack query to fetch accounts data from the service and handle loading, error, and search functionality.
function Accounts() {
    const [searchTerm, setSearchTerm] = useState('');
    const {
        data: accounts = [],
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => accountsService.getAccounts(),
    });


    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredAccounts = accounts.filter((account) => {
        return (
            account.accountNumber.includes(normalizedSearch) ||
            account.accountType.includes(normalizedSearch) ||
            account.balance.toString().includes(normalizedSearch)
        );
    });
   
    return (
        <div>
            <h2>Accounts</h2>
            <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {isPending ? (
                        <tr>
                            <td colSpan={5}>Loading accounts...</td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan={5} style={{ color: 'red' }}>
                                {error instanceof Error
                                    ? error.message
                                    : 'Failed to fetch accounts.'}</td>
                            
                        </tr>
                    ) : filteredAccounts.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No accounts found.</td>
                        </tr>
                    ) : (
                        filteredAccounts.map((account) => (
                            <tr key={account.id}>
                                <td>{account.accountNumber}</td>
                                <td>{account.accountType}</td>
                                <td>{account.balance}</td>
                                <td>{account.status}</td>
                                <td>{account.currency}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Accounts;