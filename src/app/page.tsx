import type { Metadata } from 'next';
import axios from "axios";
import PaymentForm from "./PaymentForm";

export default async function Page() {
  let paymentIntentClientSecret;

  try {
    const response = await axios.post(
      `${process.env.PAYREX_API_BASE_URL}/payment_intents`,
      {
        currency: 'PHP',
        payment_methods: ['card', 'gcash'],
        amount: 15000
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYREX_API_KEY}:`
          ).toString('base64')}`
        }
      }
    )

    paymentIntentClientSecret = response.data.client_secret
  } catch (e) {
    console.error(e)
  }

  return <>
    <PaymentForm paymentIntentClientSecret={paymentIntentClientSecret} />
  </>
  
}

export const metadata: Metadata = {
  title: "Sample Payment Demo"
};