import { graphQLSchemaFromRxSchema } from "rxdb/dist/lib/plugins/replication-graphql/index.js"
import { buildSchema } from "graphql"

const GraphQLSchemaBuilder = (schemas) => {
  const modifiedSchemas = schemas.map((schemaObj) => {
    const [collectionName, collectionData] = Object.entries(schemaObj)[0]

    if (collectionName.includes("_")) {
      const modifiedCollectionName = collectionName.replace(
        /_([a-z])/g,
        (match, letter) => letter.toUpperCase()
      )
      return { [modifiedCollectionName]: collectionData }
    } else {
      return schemaObj // If no underscore in collection name, return the original object
    }
  })

  const clone = modifiedSchemas.map(graphQLSchemaFromRxSchema)
  const queries = Object.values(clone).flatMap(({ queries }) => queries)
  const mutations = Object.values(clone).flatMap(({ mutations }) => mutations)
  const types = Object.values(clone).flatMap(({ types }) => types)
  const inputs = Object.values(clone).flatMap(({ inputs }) => inputs)
  const subscriptions = Object.values(clone).flatMap(
    ({ subscriptions }) => subscriptions
  )

  const queriesWithType = ["type Query {", ...queries, "}", ""]
  const mutationsWithType = ["type Mutation {", ...mutations, "}", ""]
  const subscriptionWithType = [
    "type Subscription {",
    ...subscriptions,
    "}",
    "",
  ]

  const lineBreak = String.fromCharCode(10)
  const queriesAsStrings = queriesWithType.join(lineBreak)
  const mutationsAsString = mutationsWithType.join(lineBreak)
  const subscriptionAsString = subscriptionWithType.join(lineBreak)
  const typesAsString = types.join(lineBreak)
  const inputsAsString = inputs.join(lineBreak)

  const final = queriesAsStrings
    .concat(lineBreak)
    .concat(mutationsAsString)
    .concat(lineBreak)
    .concat(subscriptionAsString)
    .concat(lineBreak)
    .concat(typesAsString)
    .concat(lineBreak)
    .concat(inputsAsString)

  return buildSchema(final)
}

export default GraphQLSchemaBuilder
