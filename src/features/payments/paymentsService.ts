import type { PaymentRequest ,PaymentResponse} from "./types";

class PaymentsService {
    async submitPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
        return Promise.resolve({
            transactionId: 'TXN-1001',
            status: 'success',
            message: 'Payment submitted successfully',
        })
    }
}
export default new PaymentsService();