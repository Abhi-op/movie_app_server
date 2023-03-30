require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3301;
app.use(cors({credentials:true}));
app.use(bodyParser.urlencoded({extended:false}));


async function startServer() {
  const  apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        introspection: true,
    playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app,path:'/api' });
}

startServer();






process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
});


app.listen({ port }, () => console.log(
  `🚀 Server ready at http://localhost:${port}/api`,
));