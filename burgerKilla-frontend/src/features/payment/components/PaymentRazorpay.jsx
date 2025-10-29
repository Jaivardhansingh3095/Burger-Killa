import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../services/apiOrder';
import { useRazorpayOrder } from '../useRazorpayOrder';
import { clearCart, selectCart } from '../../cart/cartSlice';
import { DELIVERY_CHARGES_PER_KM, GST_CHARGES } from '../../../utils/helpers';
import { closePaymentSession } from '../../../services/apiSession';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { addNewOrder } from '../../../services/apiUser';

// import Razorpay from 'razorpay';

function PaymentRazorpay({ delAddress, user }) {
  const orderDraft = JSON.parse(sessionStorage.getItem('orderDraft'));
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    createRazorpayOrder,
    razorpayOrderCreating,
    razorpayOrderCreated,
    razorpayOrder,
  } = useRazorpayOrder();

  if (razorpayOrderCreated) {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: razorpayOrder.order, // Amount is in currency subunits.
      currency: razorpayOrder.currency,
      name: 'Burger Killa', //your business name
      description: 'Test Transaction',
      image: './logo-black.png',
      order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });

        const orderItems = cart.map((product) => {
          const addons = product.addOns.map((item) => {
            return item._id;
          });

          return {
            item: product._id,
            addons,
            quantity: product.quantity,
          };
        });
        try {
          const order = await createOrder({
            orderItems,
            deliveryAddress: delAddress,
            paymentSession: queryClient.getQueryData(['get-payment-session'])
              ._id,
            deliveryTime: 30,
            totalAmount: orderDraft.amount,
            gst: GST_CHARGES,
            deliveryFee: DELIVERY_CHARGES_PER_KM * 5,
            isPaid: true,
          });

          await closePaymentSession({
            sessionId: orderDraft.sessionId,
            orderId: order._id,
            status: 'completed',
          });

          await addNewOrder({ orderId: order._id });

          dispatch(clearCart());

          navigate(`/thank-you/${order._id}`, {
            replace: true,
          });
        } catch (err) {
          console.error(err);
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user.name, //your customer's name
        email: user.email,
        contact: user.phoneNumber, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        sessionId: orderDraft.sessionId,
      },
      theme: {
        color: '#3399cc',
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function (response) {
      console.log({
        code: response.error.code,
        description: response.error.description,
        source: response.error.source,
        step: response.error.step,
        reason: response.error.reason,
        order_id: response.error.metadata.order_id,
        payment_id: response.error.metadata.payment_id,
      });
    });
    razorpay.open();
  }

  return (
    <div className="w-full flex flex-col justify-start items-start py-2 px-2 sm:py-4 sm:px-6 rounded-2xl shadow-[1px_1px_2px_1px] shadow-gray-200">
      <h3 className="text-sm font-semibold text-nowrap sm:text-lg">
        DEBIT / CREDIT CARD
      </h3>
      <div className="flex items-center justify-between w-full">
        <span className="text-xs sm:text-[1rem]">
          Pay using debit / credit / UPI
        </span>
        <button
          onClick={() => {
            //const orderDraft = JSON.parse(sessionStorage.getItem('orderDraft'));
            createRazorpayOrder({
              amount: orderDraft.amount * 100,
              receipt: `receipt ${orderDraft.sessionId}`,
              currency: 'INR',
            });
          }}
          disabled={razorpayOrderCreating}
          className="shadow-[0px_1px_2px_2px] shadow-blue-200 bg-blue-700 text-white rounded-xl border border-transparent py-1.5 sm:py-2 px-3 sm:px-5 flex justify-center items-center gap-2 cursor-pointer hover:bg-blue-600 hover:shadow-none transition-all duration-200 ease-in"
        >
          <img
            src="https://cashfreelogo.cashfree.com/assets_images/pg/pa/svg/razorpay.svg"
            alt="razorpay icon"
            className="w-5 h-5"
          />
          <span className="text-sm sm:text-[1rem] font-semibold tracking-widest text-shadow-2xs text-shadow-gray-900">
            RazorPay
          </span>
        </button>
      </div>
    </div>
  );
}

export default PaymentRazorpay;
