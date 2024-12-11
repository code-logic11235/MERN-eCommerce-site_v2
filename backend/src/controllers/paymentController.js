import CatchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

//create stripe checkout session => api/payment/checkout_session
export const stripeCheckoutSession = CatchAsyncErrors(async (req, res, next) => {

    const body = req?.body
    const shipping_rate = body?.itemPrice >= 200 ? "shr_1QUdLERrKiiKVxLC6TfdpkpY" : "shr_1QUdLjRrKiiKVxLCgqA2VJUj";

    const line_items = body?.orderItems?.map((item)=> {
        return {
            price_data: {
                currency:"usd",
                Unit_amount: item?.price * 100,
                product_data: {
                    name: item?.name,
                    images: [item?.images],
                    metadata: { productId: item?.product },
                },
            },
            tax_rates: ["txr_1QUdeQRrKiiKVxLCzPtNT1wA"],
            quantity: item?.quantity
        }
    })
    const session = await stripe.Checkout.session.create({
        payment_method_types: ['card'],
        success_url: `${process.env.FRONTEND_URL}/me/orders`,
        cancel_url: `${process.env.FRONTEND_URL}`,
        customer_email: req?.user?.email,
        client_reference_id: req?.user?.id?.toString(),
        mode:"payment",
        shipping_option: [
            {
            shipping_rate,

            },
        ],
        line_items,

    })
    console.log(session)
    res.status(200).json({
        url: session.url
    })
})