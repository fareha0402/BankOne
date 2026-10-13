import { useState } from 'react';
import accountsData from './accountsData';

function Accounts() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAccounts = accountsData.filter((account) => {
        return (
            account.accountNumber.includes(searchTerm) ||
            account.accountType.includes(searchTerm) ||
            account.balance.toString().includes(searchTerm)
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
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.length === 0 ? (
                        <tr>
                            <td colSpan={3}>No accounts found.</td>
                        </tr>
                    ) : (
                        filteredAccounts.map((account) => (
                            <tr key={account.id}>
                                <td>{account.accountNumber}</td>
                                <td>{account.accountType}</td>
                                <td>{account.balance}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Accounts;