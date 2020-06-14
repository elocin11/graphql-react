const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const auth = require("./middleware/auth");

const app = express();

app.use(auth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-poztd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
