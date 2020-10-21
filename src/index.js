import "@babel/polyfill";
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from "./data";
import {resolvers} from "./resolvers";
import {prisma} from "./prisma";
import { fragmentReplacements } from "./resolvers";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
});
server.start(
  { port: process.env.PORT || 4000 },
  () => console.log('Server is running on localhost:4000')
);
