// import { PubSub, EVENTS } from '../../graphQlServer'
export default {
  Query: {
    users: () => {},
    user: () => {
    }
  },
  Mutation: {
    register: (root, args) => 'registered successfully ',
    login: (root, args, context, info) => {
      return 'user is logged in with username: ' + args.username
    }
  }
}
