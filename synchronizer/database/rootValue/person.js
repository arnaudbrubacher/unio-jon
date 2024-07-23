import { pubsub } from "../../index.js"
import { client } from "../database.js"
import {
  authenticateRequest,
  log,
  sortByUpdatedAtAndPrimary,
  validateBearerToken,
} from "./RootValueHelpers.js"
import { lastOfArray } from "rxdb"

let documents = []

const person = {
  pullPerson: async (args, request) => {
    log("## pullPerson()")
    log(args)
    authenticateRequest(request)

    const lastId = args.checkpoint ? args.checkpoint.id : ""
    const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0

    try {
      const res = await client.query(
        "SELECT * FROM person WHERE updatedAt > ".concat(minUpdatedAt)
      )
      if (res.rows.length > 0)
        documents.push(...res.rows.map((row) => ({ ...row, deleted: false })))
    } catch (err) {
      throw new Error("Failed to pull person from database")
    }

    const sortedDocuments = documents.sort(sortByUpdatedAtAndPrimary)

    // only return where updatedAt >= minUpdatedAt
    const filterForMinUpdatedAtAndId = sortedDocuments.filter((doc) => {
      if (!args.checkpoint) return true
      if (doc.updatedAt < minUpdatedAt) return false
      if (doc.updatedAt > minUpdatedAt) return true
      if (doc.updatedAt === minUpdatedAt) {
        if (doc.id > lastId) return true
        else return false
      }
    })

    const limitedDocs = filterForMinUpdatedAtAndId.slice(0, args.limit)
    const last = lastOfArray(limitedDocs)
    const ret = {
      documents: limitedDocs,
      checkpoint: last
        ? {
            id: last.id,
            updatedAt: last.updatedat, // careful updatedat without camelCast // was not able to support camelCase with postgreSql
          }
        : {
            id: lastId,
            updatedAt: minUpdatedAt,
          },
    }

    pubsub.publish("streamPerson:", {
      streamPerson: ret,
    })

    console.log("pullPerson() ret:")
    console.log(JSON.stringify(ret, null, 4))
    return ret
  },
  pushPerson: (args, request) => {
    log("## pushPerson()")
    log(args)
    authenticateRequest(request)

    const rows = args.personPushRow
    const conflicts = []
    const writtenDocs = []

    let lastCheckpoint = {
      id: "",
      updatedAt: 0,
    }

    rows.forEach((row) => {
      const docId = row.newDocumentState.id
      const docCurrentMaster = documents.find((d) => d.id === docId)

      if (
        docCurrentMaster &&
        row.assumedMasterState &&
        docCurrentMaster.updatedAt !== row.assumedMasterState.updatedAt
      ) {
        conflicts.push(docCurrentMaster)
        return
      }

      const doc = row.newDocumentState
      documents = documents.filter((d) => d.id !== doc.id)
      documents.push(doc)

      lastCheckpoint.id = doc.id
      lastCheckpoint.updatedAt = doc.updatedAt
      writtenDocs.push(doc)

      // add to POSTGRESQL Database
      try {
        client.query(
          "INSERT INTO person (id, updatedAt, first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [
            doc.id,
            doc.updatedAt,
            doc.first_name,
            doc.last_name,
            doc.email,
            doc.phone_number,
          ]
        )
      } catch (err) {
        throw new Error("Failed to insert new person")
      }
    })

    pubsub.publish("streamPerson:", {
      streamPerson: {
        documents: writtenDocs,
        checkpoint: lastCheckpoint,
      },
    })

    console.log("## current documents:")
    console.log(JSON.stringify(documents, null, 4))
    console.log("## conflicts:")
    console.log(JSON.stringify(conflicts, null, 4))

    return conflicts
  },
  streamPerson: (args) => {
    log("## streamPerson:()")

    console.dir(args)
    const authHeaderValue = args.headers.Authorization
    const bearerToken = authHeaderValue.split(" ")[1]

    validateBearerToken(bearerToken)

    return pubsub.asyncIterator("streamPerson:")
  },
}

export default person
