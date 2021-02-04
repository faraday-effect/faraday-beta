// Configure Apollo client.

module.exports = {
  client: {
    service: {
      name: "faraday-client",
      localSchemaFile: "../server/schema.graphql",
    },
  },
};
