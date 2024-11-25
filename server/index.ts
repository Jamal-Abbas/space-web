import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import axios from 'axios';

const typeDefs = `#graphql
  type Rocket {
    rocket_name: String
  }

  type Links {
    flickr_images: [String]
    mission_patch: String
    video_link: String
  }

  type Launch {
    id: ID
    mission_name: String
    launch_date_utc: String
    rocket: Rocket
    launch_success: Boolean
    links: Links
    details: String
  }

  type Query {
    launches: [Launch]
  }
`;

const resolvers = {
  Query: {
    launches: async () => {
      try {
        const response = await axios.get('https://api.spacexdata.com/v3/launches');
        const validLaunches = response.data.filter((launch: any) => {
          return launch && launch.mission_name && launch.launch_date_utc && launch.id;
        });
        console.log(`Successfully fetched ${validLaunches.length} valid launches`);
        return validLaunches;
      } catch (error) {
        console.error('Error fetching launches:', error);
        throw new Error('Failed to fetch launches from SpaceX API');
      }
    },
  },
};

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    },
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 