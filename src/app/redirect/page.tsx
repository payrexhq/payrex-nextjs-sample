import React from "react";
import axios from "axios";

type RedirectPageType = {
  searchParams: {
    payment_intent_id: string;
  };
};

const Page: React.FC<RedirectPageType> = async ({ searchParams }) => {
  let status = "";
  let amount = 0;

  try {
    const response = await axios.get(
      `${process.env.PAYREX_API_BASE_URL}/payment_intents/${searchParams.payment_intent_id}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYREX_API_KEY}:`
          ).toString("base64")}`,
        },
      }
    );

    status = response.data.status;
    amount = response.data.amount;

    if (status === "succeeded") {
      return <div>You have successfully paid {amount * 0.01}</div>;
    } else if (status === "awaiting_payment_method") {
      const lastPaymentError = response.data.last_payment_error.message

      return <div>There was an error processing your payment. Error message: {lastPaymentError}</div>;
    } else {
      return <div>Unknown status: {status}</div>;
    }
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default Page;
