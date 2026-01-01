import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as constants from '../constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(constants.USER_TOKEN_NAME);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          comments: {
            merge(existing, incoming) {
              return incoming; // this is for when deleting comments to ignore the warning
            },
          },
          likes: {
            merge(existing, incoming) {
              return incoming; // this is for when removing likes to ignore the warning
            },
          },
        },
      },
    },
  }),
});

export default client;
