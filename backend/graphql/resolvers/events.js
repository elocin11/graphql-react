const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../utils/date");
const { transformEvent } = require("./helpers");

module.exports = {
  events: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const event = new Event({
      title: args.input.title,
      description: args.input.description,
      price: args.input.price,
      date: dateToString(args.input.date),
      creator: "5ee33e1df650632c889141cf",
    });

    try {
      const result = await event.save();
      const user = await User.findById("5ee33e1df650632c889141cf");

      if (!user) {
        throw new Error("User not found");
      }

      user.createdEvents.push(event);
      user.save();

      return transformEvent(result);
    } catch (error) {
      throw error;
    }
  },
};
