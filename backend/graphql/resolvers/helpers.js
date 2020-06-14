const User = require("../../models/user");
const Event = require("../../models/event");
const { dateToString } = require("../../utils/date");

const getEvents = async (ids) => {
  try {
    const events = await Event.find({ _id: { $in: ids } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const getEvent = async (id) => {
  try {
    const event = await Event.findById(id);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return {
      ...user._doc,
      createdEvents: getEvents.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: getUser.bind(this, event.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: getUser.bind(this, booking._doc.user),
    event: getEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

module.exports = {
  getEvents,
  getEvent,
  getUser,
  transformEvent,
  transformBooking,
};
