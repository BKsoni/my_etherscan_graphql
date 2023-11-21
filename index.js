const { ApolloServer } = require("apollo-server");
// Import schema from graphql-import
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
// Import schema definition
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    // Get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) => {
      return dataSources.ethDataSource.etherBalanceByAddress();
    },

    // Get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) => {
      return dataSources.ethDataSource.totalSupplyOfEther();
    },

    // Get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) => {
      return dataSources.ethDataSource.getLatestEthereumPrice();
    },

    // Get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) => {
      return dataSources.ethDataSource.getBlockConfirmationTime();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set server timeout to 0
server.timeout = 0;

// Start Apollo Server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
