
export const log = (msg) => {
  const prefix = '# GraphQL Server: ';
  if (typeof msg === 'string') {
      console.log(prefix + msg);
  } else {
      console.log(prefix + JSON.stringify(msg, null, 2));
  }
}

export const sortByUpdatedAtAndPrimary = (a, b) => {
  if (a.updatedAt > b.updatedAt) return 1;
  if (a.updatedAt < b.updatedAt) return -1;

  if (a.updatedAt === b.updatedAt) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      else return 0;
  }
}

/**
 * Returns true if the request is authenticated
 * throws if not.
 * In a real world app you would parse and validate the bearer token.
 * @link https://graphql.org/graphql-js/authentication-and-express-middleware/
 */
 export const authenticateRequest = (request) => {
  const authHeader = request.header('authorization');
  const splitted = authHeader.split(' ');
  const token = splitted[1];
  validateBearerToken(token);
}

export const validateBearerToken = (token) => {
  //if (token === JWT_BEARER_TOKEN) {
      return true;
  // } else {
  //     console.log('token not valid ' + token);
  //     throw new Error('not authenticated');
  // }
}
