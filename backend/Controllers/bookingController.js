import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    //get currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorId);

    console.log(req.userId, "this is user id");
    const user = await User.findById(req.userId);
    console.log(user, "log user");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    //create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: 10000,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo || "empty"],
            },
          },
          quantity: 1,
        },
      ],
    });

    // create new booking
    console.log({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: 10000,
      session: session.id,
    });
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: 10000,
      session: session.id,
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid ", session });
  } catch (err) {
    console.log(err, "this");
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
