import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'

import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
// import {schemaDirectives} from './directives/auth'
import path from 'path'
// types
const typesArray = fileLoader(path.join(__dirname, './domain/**/*.graphql'))
const typeDefs = mergeTypes(typesArray, { all: true })
// resolvers
const resolversArray = fileLoader(path.join(__dirname, './domain/**/*.resolver.js'))
const resolvers = mergeResolvers(resolversArray)
/**
*
*Apollo Server
*
*/

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
const endpoint = '/graphql'

// GraphQL: Schema
const server = new ApolloServer({
  schema,
  playground: {
    endpoint,
    settings: {
      'editor.theme': 'light'
    }
  }
})

// eslint-disable-next-line no-console
console.log(`Graphql endpoint ${server.graphqlPath}`)
export default server
