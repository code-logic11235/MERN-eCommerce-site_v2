import CatchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//create stripe checkout session => api/payment/checkout_session
export const stripeCheckoutSession = CatchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    //shr_1QUdLERrKiiKVxLC6TfdpkpY comes from stripe shipping rate
    const shippingInfo = body?.shippingInfo;

    const shipping_rate =
      body?.itemPrice >= 200
        ? "shr_1QUdLERrKiiKVxLC6TfdpkpY"
        : "shr_1QUdLjRrKiiKVxLCgqA2VJUj";
        
    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          unit_amount: item?.price * 100,
          product_data: {
            name: item?.name,
            images: [item?.images],
            metadata: { productId: item?.product },
          },
        },
        tax_rates: ["txr_1QUdeQRrKiiKVxLCzPtNT1wA"],
        quantity: item?.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?.id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemPrice: body?.itemsPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });
    res.status(200).json({
      url: session.url,
    });
  }
);
