import { ApolloServer } from 'apollo-server'
import { createApplication } from 'graphql-modules'
import Database from './models/Database';
import AssignmentModule from './modules/assignment'
import OperationsModule from './modules/operations';

(async function start(): Promise<void> {
  // Initialize GraphQL modules
  const application = createApplication({
    modules: [
      AssignmentModule,
      OperationsModule
    ]
  })

  // This is the aggregated schema
  const schema = application.createSchemaForApollo()

  // Initialize database. Sequelize creates tables on bootstrapping
  const db = Database.instance
  await db.init()

  // Start the server
  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
})();
