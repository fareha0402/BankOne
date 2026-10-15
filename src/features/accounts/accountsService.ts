import accountsData from "./accountsData";
import type { BankAccount } from "./types";

class AccountsService {
    async getAccounts(): Promise<BankAccount[]> {
        return Promise.resolve(accountsData);
    }
    //  async getAccounts(signal?: AbortSignal): Promise<BankAccount[]> {
    //     const response = await fetch('https://api.example.com/accounts', { signal });
    //     if(!response.ok) {
    //         throw new Error('Failed to fetch accounts');
    //     }
    //     return response.json() as Promise<BankAccount[]>;
    // }
}
export default new AccountsService();