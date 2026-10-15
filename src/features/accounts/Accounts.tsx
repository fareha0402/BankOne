import { useEffect, useState } from 'react';
// import accountsData from './accountsData';
import accountsService from './accountsService';
import type { BankAccount } from './types';
// Component using useEffect and abort controller to fetch accounts data from the service and handle loading, error, and search functionality.
function Accounts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredAccounts = accounts.filter((account) => {
        return (
            account.accountNumber.includes(normalizedSearch) ||
            account.accountType.includes(normalizedSearch) ||
            account.balance.toString().includes(normalizedSearch)
        );
    });
    useEffect(() => {
        const controller = new AbortController();
        const loadAccounts = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await accountsService.getAccounts(
                    controller.signal
                );
                    setAccounts(response);
            } catch (error) {
                if(error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setError('Failed to load accounts. Please try again later.');
            } finally {
                if(!controller.signal.aborted) {
                    setLoading(false);
            }
        }
        };

        loadAccounts();

        return () => {
            controller.abort();
        };
    }, []);
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
                    {loading ? (
                        <tr>
                            <td colSpan={5}>Loading accounts...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={5} style={{ color: 'red' }}>{error}</td>
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