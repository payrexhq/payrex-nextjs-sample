"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import {loadPayrex} from "payrex-js"

type PaymentFormType = {
  paymentIntentClientSecret: string;
};

const PaymentForm: React.FC<PaymentFormType> = ({
  paymentIntentClientSecret,
}) => {
  const [payrex, setPayrex] = useState<any>(null);
  const [elements, setElements] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const initializePayrex = async () => {
      // Replace this with your PayRex Public API Key
      const payrexLib = await loadPayrex('pk_test_...');

      const appearance = {
        theme: "payrex",
      };

      // Creating an elements instance.
      const locElements = payrexLib.elements({
        appearance: appearance,
        clientSecret: paymentIntentClientSecret,
      });

      // Creating a payment element instance.
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

      // Mounting the payment element to an HTML div element with id payment-form.
      paymentElement.mount("#payment-form");

      setElements(locElements);
      setPayrex(payrexLib);
    }

    initializePayrex(); 
  }, []);

  const payAction = async () => {
    setIsPaying(true);
    if(payrex !== null) {
      await payrex.attachPaymentMethod({
        elements: elements,
        options: {
          // This is the URL where the user will be redirected after authentication. Replace this with your own URL.
          return_url: `${window.location.href}/redirect`,
        },
      });
    }
    setIsPaying(false)
  };

  return (
    <>
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
