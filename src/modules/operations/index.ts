import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'
import AssignmentProvider from '../assignment/provider'

import { IResolvers, IAssignment } from '../../interfaces/schema-typings'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
  Query: {
    assignments: async (parent, args, context, info): Promise<IAssignment[]> => {
      const provider = context.injector.get(AssignmentProvider)

      return provider.find()
    }
  },
  Mutation: {
    createAssignment: async (parent, { input }, context, info): Promise<IAssignment> => {
      const provider = context.injector.get(AssignmentProvider)

      return provider.create(input)
    }
  }
}

export const OperationsModule = createModule({
  id: 'operations',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers
})

export default OperationsModule