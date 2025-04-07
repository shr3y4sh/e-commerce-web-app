import PaymentClass from '../lib/payment.class.js';
import 'dotenv/config';

export const stripe = new PaymentClass(process.env.PAYMENT_API_SECRET_KEY);
