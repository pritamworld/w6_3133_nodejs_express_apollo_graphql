import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieSchema from './schemas/schema.js';
import movieResolvers from './resolvers/resolvers.js';
import mongoose from 'mongoose';

//import ApolloServer
import { ApolloServer }  from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
// Express app
const app = express();

//Store sensitive information to env variables
dotenv.config();
//console.log(process.env);

//mongoDB Atlas Connection String
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.CLUSTER_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

//TODO - Replace you Connection String here
const connectDB = async() => {
    await mongoose.connect(DB_CONNECTION)
}

async function startServer() {
    //Define Apollo Server
    const server = new ApolloServer({
      typeDefs: movieSchema,
      resolvers: movieResolvers
    });

    //Start the Apollo Server
    await server.start();

    //Apply middleware to the Express app
    app.use(
      '/graphql', 
      cors(),
      express.json(),
      expressMiddleware(server)
    );

    //Start Express server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);
      //Connect to MongoDB Atlas
      try {
          connectDB()
          console.log('Connected to MongoDB Atlas');
      } catch (error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
    })
}

startServer();
