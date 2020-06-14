const bookingResolver = require("./booking");
const eventResolver = require("./events");
const userResolver = require("./user");

const resolvers = {
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};

module.exports = resolvers;
