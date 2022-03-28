import React, { useContext, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Context, UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";

const Paiement = () => {
  const stripePromise = loadStripe(
    "pk_test_51KcH7pAXiO93TvpGpboAgIoZyeXzfxhomXJ57b1ouJdDGbyts8zvTsHMeyinv0fOQxL9eAvLHs57GW3T2U507GCN00QiHSm3pP"
  );
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default Paiement;

function CheckoutForm() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const {
    setGamesArray,
    state: { gamesArray },
  } = React.useContext(Context);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const getClientSecret = () => {
    return fetch("/api/paiement-stripe", {
      method: "POST",
      body: JSON.stringify({ amount: gamesArray.length * 5 }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  };

  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = await getClientSecret();
    console.log("clientSecret", user);
    const paymentResult = await stripe.confirmCardPayment(
      clientSecret.message,
      {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
          },
        },
      }
    );
    setPaymentLoading(false);
    if (paymentResult.error) {
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("Paiement effectué avec succes!", {
          duration: 2000,
        });
        // Create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`);

        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, {
          gamesArray: gamesArray,
          uid: user.uid,
          displayName: user.displayName,
        });

        await batch.commit();
        setGamesArray([]);
        setTimeout(() => {
          router.push(`/welcome/${user.uid}`);
        }, 2000);
      }
    }
  };

  return (
    <div
      style={{
        paddingTop: "146px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit={payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
