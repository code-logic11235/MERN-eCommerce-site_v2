
import { isAuthenticatedUser } from '../middlewares/auth.js';
import { stripeCheckoutSession } from '../controllers/paymentController.js';


router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);




export default router;