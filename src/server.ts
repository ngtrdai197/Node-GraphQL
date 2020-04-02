import "reflect-metadata";
import { AddressInfo } from "net";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as jwt from "express-jwt";

import { authChecker } from './auth-checker'

(async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.resolver.{ts,js}"],
    authMode: "error",
    authChecker
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, user: req.user }), // `req.user` comes from `express-jwt`
  });
  const app: express.Application = express();
  app.use(
    jwt({
      secret: "TypeGraphQL",
      credentialsRequired: false,
      getToken: function fromHeaderOrQuerystring(req: any) {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
    })
  );
  apolloServer.applyMiddleware({ app });

  const server = app.listen(3000, "127.0.0.1", () => {
    const { address, port } = server.address() as AddressInfo;
    console.log(
      `Server started at http://%s:%s${apolloServer.graphqlPath} 🚀`,
      address,
      port
    );
  });
})();
