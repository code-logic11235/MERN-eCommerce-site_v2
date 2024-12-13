import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import CatchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import order from "../models/order.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//create stripe checkout session => api/payment/checkout_session
export const stripeCheckoutSession = CatchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    //shr_1QUdLERrKiiKVxLC6TfdpkpY comes from stripe shipping rate. stripe website
    const shippingInfo = body?.shippingInfo;


    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1QUdLERrKiiKVxLC6TfdpkpY"
        : "shr_1QUdLjRrKiiKVxLCgqA2VJUj";
        
    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          unit_amount: item?.price * 100,
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
        },
        tax_rates: ["txr_1QUdeQRrKiiKVxLCzPtNT1wA"],
        quantity: item?.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`, // move to this url on success
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?.id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
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

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      
      const product = await stripe.products.retrieve(item.price.product); // gets the actual name of product and its associated data like id and images
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};


// Create new order after payment   =>  /api/v1/payment/webhook

//stripe calls this end point and with it its own headers and body and what not 
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
 

  try {
    const signature = req.headers["stripe-signature"];
    // this function makes a connection to stripe from there we can have events like "checkout.session.completed"
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK
    );

    // after setting up stripe webhook (installing stripe cli and running stripe login and configuring your webhook on stripe.com)

    // payment recieved order recieved, 
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      
      // console.log(await stripe.products.retrieve(line_items.data[0].price.product))
      // getOrderItem takes our messy line_item we recieved from stripe session and converts it to clean organize obj
      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };
      // creates order using our order model
      await order.create(orderData);

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error => ", error);
  }
});