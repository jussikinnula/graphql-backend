import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'
import { IResolvers } from '../../interfaces/schema-typings'
import AssignmentProvider from './provider'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

// We will supply Assignment specific resolvers here later
const resolvers: IResolvers = {
}

export const Assignment = createModule({
  id: 'assignments',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers,
  providers: [AssignmentProvider]
})

export default Assignment