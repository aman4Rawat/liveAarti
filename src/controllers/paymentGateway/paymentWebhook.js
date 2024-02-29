const { ApiError } = require("../../errorHandler");
const { Transaction, Event } = require("../../models");

const payment_webhook = async (req, res, next) => {
  try {
    const order = req?.body?.payload?.order?.entity;
    //find booking and user payment usering order recipt id
    if (!order) throw new ApiError("Bad Request: No Order Found", 400);
    const [type, transactionId] = order.receipt.split("-");

    if (type === "booking") {
      console.log("booking webhook called");
      const booking = await Transaction.findOne({ transactionId });
      if (!booking) throw new ApiError("Bad Request: No Booking Found");
      const isUserExist = await User.findById(booking.userId);
      if (!isUserExist)
        throw new ApiError("Bad Request: No User Payment Found");

      if (order.status === "paid" && !order.due) {
        //online service payment
        if (booking.service_mode === "online") {
          booking.status = "success";
          // userPayment.service_charge_paid = true;
          // booking.service_charge_paid = true;
          // userPayment.payment_status = "success";
        }
        //onsite serevice payment
        if (booking.service_mode === "onsite") {
          // userPayment.payment_status = "due";
          if (booking.booking_status === "delivered") {
            // userPayment.service_charge_paid = true;
            // userPayment.payment_status = "success";
            // booking.service_charge_paid = true;
            booking.status = "success";
            booking.booking_status = "completed";
            booking.user_status = "completed";
          }
        }

        if (booking.booking_status === "initiated") {
          booking.status = "booked";
          // booking.user_status = "booked";
          // booking.status_info =
          //   "User has made the payment and service has been booked.";
          // userPayment.booking_status = "booked";
        }
      } else {
        booking.status = "pending";
      }
      // await userPayment.save();
      if (booking.status !== "pending") {
        await Event.findByIdAndUpdate(
          booking.eventId,
          {
            $push: { users: booking.userId },
          },
          { new: true }
        );
      }
      await booking.save();
      // console.log('user payment\n', userPayment);
      // console.log('booking\n', booking);
      return res.status(200).end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = payment_webhook;
/*
Pay Rs.59 of Rs.2180 i
webhook body ===
{
  entity: 'event',
  account_id: 'acc_LfdNH17D9YZRR1',
  event: 'order.paid',
  contains: [ 'payment', 'order' ],
  payload: { payment: { entity: [Object] }, order: { entity: [Object] } },
  created_at: 1695882151
}
order === ===
"entity": {
  "id": "order_DESlLckIVRkHWj",
  "entity": "order",
  "amount": 100,
  "amount_paid": 100,
  "amount_due": 0,
  "currency": "INR",
  "receipt": "rcptid #1",
  "offer_id": null,
  "status": "paid",//created,attempted,paid
  "attempts": 1,
  "notes": [],
  "created_at": 1567674581
}
payment === ===
"entity": {
  "id": "pay_DESlfW9H8K9uqM",
  "entity": "payment",
  "amount": 100,
  "currency": "INR",
  "status": "captured",
  "order_id": "order_DESlLckIVRkHWj",
  "invoice_id": null,
  "international": false,
  "method": "netbanking",
  "amount_refunded": 0,
  "refund_status": null,
  "captured": true,
  "description": null,
  "card_id": null,
  "bank": "HDFC",
  "wallet": null,
  "vpa": null,
  "email": "gaurav.kumar@example.com",
  "contact": "+919876543210",
  "notes": [],
  "fee": 2,
  "tax": 0,
  "error_code": null,
  "error_description": null,
  "created_at": 1567674599
}

=== === === === === === === === === === === === ===
payment callback url details
?razorpay_payment_id=pay_Mhees8ZuYQshyN
&razorpay_payment_link_id=plink_MhebjOG2IOW3FH
&razorpay_payment_link_reference_id=
&razorpay_payment_link_status=paid
&razorpay_signature=e8d1fe16cba12005570a4a0a39d8e87580a061cc976bbb48785e0acf9b26f91e

*/
