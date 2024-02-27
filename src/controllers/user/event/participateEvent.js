const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { Transaction } = require("../../../models");
const razorpay = require("./razorpay");

function generateTransactionId() {
  return `ID-${Math.random() * 5}${Date.now()}`;
}

module.exports = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    console.log("initiate payment", req.body);
    arr = [];
    if (!isValidObjectId(eventId))
      throw new ApiError("Provide valid event Id", 400);
    const event = await Event.findById(eventId);
    if (!event) throw new ApiError("Provide valid event Id", 400);

    const transactionId = generateTransactionId();

    const transactionData = await Transaction.create({
      orderId: order.id,
      userId: req.user._id,
      transactionId,
      transaction_by: "user",
      amount: order.amount,
    });

    if (!transactionData) throw new ApiError("Please try Again!", 500);

    const order = await razorpay.orders.create({
      amount: event.price,
      currency: "INR",
      receipt: `booking-${transactionId}`,
      partial_payment: false,
    });

    if (!order) throw new ApiError("Order not created!", 400);
    // // if (!booking_id) throw new ApiError("Booking ID required", 400);
    // // if (!isValidObjectId(booking_id))
    // //   throw new ApiError("Invalid booking id.", 400);
    // // const booking = await Booking.findById(booking_id);
    // // if (!booking) throw new ApiError("Invalid Booking ID", 400);
    // // const userPayment = await UserPayment.findOne({ booking: booking_id });
    // // if (!userPayment) throw new ApiError("Booking not found", 400);
    // // find what is paid what is due then calculate total amount when recieved webhook
    // // find user payment then update data accordingly in payment booking

    // // booking service mode
    // // online -- consult charge(will be zero) + service charge(x)
    // // onsite -- consult charge(x) will be paid only, service charge will be paid later

    // // const amount = Number(booking.consult_charge) + booking.service_mode === 'online' ? Number(booking.service_charge) : 0;
    // let amount = 0;
    // // if (!booking.consult_charge_paid) amount += Number(booking.consult_charge);

    // if (booking.service_mode === "online") {
    //   if (!booking.service_charge_paid)
    //     amount += Number(booking.service_charge);
    // }

    // if (booking.service_mode === "onsite") {
    //   if (
    //     !booking.service_charge_paid &&
    //     booking.booking_status === "delivered"
    //   )
    //     amount += Number(booking.service_charge);
    // }

    // if (!amount) throw new ApiError(`No amount to pay. [test: ${amount}]`, 400);
    // console.log("amount", amount);
    // const totalAmount = (amount + amount * 0.18).toFixed(2) * 100; //added gst 18%
    // console.log("amount", totalAmount);
    // const order = await razorpay.orders.create({
    //   amount: totalAmount,
    //   currency: "INR",
    //   receipt: `booking-${booking_id}`,
    //   partial_payment: false,
    // });
    // console.log("ORDER", order);

    return res.status(200).json({
      status: true,
      message: "Payment Order Details",
      data: { order },
    });
  } catch (error) {
    console.log("catech ", error, error.stack);
    next(error);
  }
};
/*
  // const payment = await razorpay.paymentLink.create({
    //   amount: totalAmount,
    //   currency: 'INR',
    //   accept_partial: false,
    //   description: 'sample description',
    //   customer: {
    //     name: 'abc',
    //     email: 'abc@gmail.comm',
    //     contact: '234243243',
    //   },
    //   notify: {
    //     sms: false,
    //     email: false,
    //   },
    //   reminder_enable: true,
    //   callback_url: 'http://3.108.62.109:3001/api/user/payment_callback/',
    //   callback_method: 'get',
    // });

*/
