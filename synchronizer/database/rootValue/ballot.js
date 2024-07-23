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

const ballot = {
  pullBallot: async (args, request) => {
    log("## pullBallot()")
    log(args)
    authenticateRequest(request)

    const lastId = args.checkpoint ? args.checkpoint.id : ""
    const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0

    try {
      const res = await client.query(
        "SELECT * FROM ballot WHERE updatedAt > ".concat(minUpdatedAt)
      )
      if (res.rows.length > 0)
        documents.push(...res.rows.map((row) => ({ ...row, deleted: false })))
    } catch (err) {
      throw new Error("Failed to pull ballot from database")
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

    pubsub.publish("streamBallot:", {
      streamBallot: ret,
    })

    console.log("pullBallot() ret:")
    console.log(JSON.stringify(ret, null, 4))
    return ret
  },
  pushBallot: (args, request) => {
    log("## pushBallot()")
    log(args)
    authenticateRequest(request)

    const rows = args.ballotPushRow
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
          "INSERT INTO ballot (id, updatedAt, user_id, person_name, election_id, question_one, question_two) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [
            doc.id,
            doc.updatedAt,
            doc.user_id,
            doc.person_name,
            doc.election_id,
            doc.question_one,
            doc.question_two,
          ]
        )
      } catch (err) {
        throw new Error("Failed to insert new ballot")
      }
    })

    pubsub.publish("streamBallot:", {
      streamBallot: {
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
  streamBallot: (args) => {
    log("## streamBallot:()")

    console.dir(args)
    const authHeaderValue = args.headers.Authorization
    const bearerToken = authHeaderValue.split(" ")[1]

    validateBearerToken(bearerToken)

    return pubsub.asyncIterator("streamBallot:")
  },
}

export default ballot
