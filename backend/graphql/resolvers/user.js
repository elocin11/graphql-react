const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const exist = await User.findOne({ email: args.input.email });

      if (exist) {
        throw new Error("User exists already.");
      }

      const password = await bcrypt.hash(args.input.password, 12);

      const user = new User({
        email: args.input.email,
        password: password,
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: null,
      };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist!");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Password is incorrect!");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", {
      expiresIn: "1h",
    });

    return {
      _id: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
