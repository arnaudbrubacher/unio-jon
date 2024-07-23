import { addRxPlugin, createRxDatabase } from "rxdb"
import { getRxStoragePouch, addPouchPlugin } from "rxdb/plugins/pouchdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import schemas from "./schemas"
import {
  pullQueryBuilderFromRxSchema,
  pullStreamBuilderFromRxSchema,
  pushQueryBuilderFromRxSchema,
  RxDBReplicationGraphQLPlugin,
} from "rxdb/plugins/replication-graphql"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"

addPouchPlugin(require("pouchdb-adapter-idb"))
addRxPlugin(RxDBReplicationGraphQLPlugin)

addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBDevModePlugin)

const initialize = async () => {
  const db = await createRxDatabase({
    name: "placeholder",
    storage: getRxStoragePouch("idb"),
    ignoreDuplicate: true,
  })

  schemas.forEach(async (schema) => {
    const collection = await db.addCollections(schema)
    const batchSize = 50

    const collectionName = Object.keys(collection)[0]
    let cleanedCollectionName = collectionName

    if (cleanedCollectionName.includes("_")) {
      cleanedCollectionName = cleanedCollectionName
        .split("_")
        .map((word, index) => {
          if (index === 0) {
            return word
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1)
          }
        })
        .join("")
    }

    const pullQueryBuilder = pullQueryBuilderFromRxSchema(
      cleanedCollectionName,
      schema[collectionName],
      schema
    )

    const pushQueryBuilder = pushQueryBuilderFromRxSchema(
      cleanedCollectionName,
      schema[collectionName]
    )

    const pullStreamBuilder = pullStreamBuilderFromRxSchema(
      cleanedCollectionName,
      schema[collectionName]
    )

    const replicationState = collection[collectionName].syncGraphQL({
      url: {
        http: process.env.REACT_APP_SYNCHRONIZER_URL + "/graphql",
        // ws: 'ws://example.com/subscriptions' // <- The websocket has to use a different url.
      },
      push: {
        batchSize,
        queryBuilder: pushQueryBuilder,
      },
      headers: {
        Authorization: "Bearer abcde...",
      },
      pull: {
        batchSize,
        queryBuilder: pullQueryBuilder,
        streamQueryBuilder: pullStreamBuilder,
      },
      deletedField: "deleted",
    })

    // show replication-errors in logs
    replicationState.error$.subscribe((err) => {
      console.error("replication error:")
      console.dir(err)
    })
  })

  return db
}

export default initialize
