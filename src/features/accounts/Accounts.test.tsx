import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accounts from './Accounts';
import accountsService from './accountsService';
 
vi.mock('./accountsService', () => ({
    default: {
        getAccounts: vi.fn(),
    },
}));

describe('Accounts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays accounts returned by the service', async () => {
        vi.mocked(accountsService.getAccounts).mockResolvedValue([
            {
                id: '1',
                accountNumber: '12345678',
                accountType: 'Savings',
                balance: 5000,
                status: 'Active',
                currency: 'INR',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);

        render(<Accounts />);

        expect(
            await screen.findByText('12345678')
        ).toBeInTheDocument();

        expect(screen.getByText('Savings')).toBeInTheDocument();
        expect(screen.getByText('5000')).toBeInTheDocument();
    });
});