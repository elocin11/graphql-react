const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformEvent, transformBooking } = require("./helpers");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const event = await Event.findOne({ _id: args.id });
      const booking = new Booking({
        user: "5ee33e1df650632c889141cf",
        event: event,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const booking = await Booking.findById(args.id).populate("event");
      await Booking.deleteOne({ _id: args.id });
      console.log(booking);
      return transformEvent(booking.event);
    } catch (error) {
      throw error;
    }
  },
};
