"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PaymentFormType = {
  paymentIntentClientSecret: string;
};

const PaymentForm: React.FC<PaymentFormType> = ({
  paymentIntentClientSecret,
}) => {
  const [payrex, setPayrex] = useState(null);
  const [elements, setElements] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (payrex !== null) {
      const appearance = {
        theme: "payrex",
      };

      const locElements = payrex.elements({
        appearance: appearance,
        clientSecret: paymentIntentClientSecret,
      });

      const paymentElement = locElements.create("payment", {
        layout: "accordion",
        // Set this if you want to try out setting default values on load of the element.
        /* defaultValues: {
          billingDetails: {
            name: "",
            phone: "",
            email: "",
            address: {
              line1: "",
              line2: "",
              country: "",
              city: "",
              state: "",
              postalCode: "",
            },
          },
        }, */
      });

      paymentElement.mount("#payment-form");

      setElements(locElements);
    }
  }, [payrex, paymentIntentClientSecret]);

  const payAction = async () => {
    setIsPaying(true);
    await payrex.attachPaymentMethod({
      elements: elements,
      options: {
        return_url: "http://demo.localhost/redirect",
      },
    });
    setIsPaying(false)
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_PAYREX_JS_BASE_URL}
        onLoad={() => {
          const locPayrex = window.Payrex(
            process.env.NEXT_PUBLIC_PAYREX_PUBLIC_API_KEY
          );

          setPayrex(locPayrex);
        }}
      />
      <button
        onClick={payAction}
        type="button"
        disabled={isPaying}
        className="bg-blue-400 py-2 px-8 m-2 rounded-md disabled:bg-blue-200"
      >
        Pay
        {isPaying && <Loader />}
      </button>
      <div
        style={{
          width: "600px",
          height: "500px",
          padding: "2rem",
        }}
        id="payment-form"
      ></div>
    </>
  );
};

export default PaymentForm;
