const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const mongoose = require("mongoose");
const typeDefs = require("./Schema/typeDefs");
const resolvers = require("./Schema/Resolves");
const http = require("http");
const cors = require("cors");
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require("apollo-server-core");

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  app.use(webpackMiddleware(webpack(webpackConfig)));
  const httpServer = http.createServer(app);
  app.use(cors());

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: "my-graph-id@my-graph-variant",
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });

  const MONGO_URI =
    "mongodb://taskapp:concoc221992@cluster0-shard-00-00.b0gk7.mongodb.net:27017,cluster0-shard-00-01.b0gk7.mongodb.net:27017,cluster0-shard-00-02.b0gk7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-gui3h0-shard-0&authSource=admin&retryWrites=true&w=majority";
  if (!MONGO_URI) {
    throw new Error("You must provide a MongoLab URI");
  }

  mongoose.Promise = global.Promise;
  mongoose.connect(MONGO_URI).then(() => console.log("Successfull"));

  mongoose.connection
    .once("open", () => console.log("Connected to MongoLab instance."))
    .on("error", (error) =>
      console.log("Error connecting to MongoLab:", error)
    );

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
