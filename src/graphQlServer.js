import { ApolloServer, PubSub as PS, makeExecutableSchema, AuthenticationError } from 'apollo-server-express'

import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import jwt from 'jsonwebtoken'
import path from 'path'

// const getAuth = async req => {
//   const token = req.headers['x-token']

//   if (token) {
//     try {
//       return await jwt.verify(token, process.env.SECRET)
//     } catch (e) {
//       throw new AuthenticationError(
//         'Your session expired. Sign in again.'
//       )
//     }
//   }
// }

// types
const typesArray = fileLoader(path.join(__dirname, './domain/**/*.gql'))
console.log(typesArray)

const typeDefs = mergeTypes(typesArray, { all: true })
// resolvers
const resolversArray = fileLoader(path.join(__dirname, './domain/**/*.resolvers.js'))
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
      // 'editor.theme': 'light'
    }
  },
  context: ({ req, connection }) => {
    console.log(req.t('a:dd'))
  }
})

// eslint-disable-next-line no-console
console.log(`Graphql endpoint ${server.graphqlPath}`)
/**
 * Events
 **/
export const PubSub = new PS()
// events array
const eventsArray = fileLoader(path.join(__dirname, './domain/**/*.events.js'))

// export event as object
// example of calling Events object: EVENTS.FOO.BOO
export const EVENTS = eventsArray.reduce(function (result, item) {
  var key = Object.keys(item)[0]
  result[key] = item[key]
  return result
}, {})

export default server
