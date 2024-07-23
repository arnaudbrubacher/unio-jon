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

const election = {
  pullElection: async (args, request) => {
    log("## pullElection()")
    log(args)
    authenticateRequest(request)

    const lastId = args.checkpoint ? args.checkpoint.id : ""
    const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0

    try {
      const res = await client.query(
        "SELECT * FROM election WHERE updatedAt > ".concat(minUpdatedAt)
      )
      if (res.rows.length > 0)
        documents.push(...res.rows.map((row) => ({ ...row, deleted: false })))
    } catch (err) {
      throw new Error("Failed to pull election from database")
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

    pubsub.publish("streamElection:", {
      streamElection: ret,
    })

    console.log("pullElection() ret:")
    console.log(JSON.stringify(ret, null, 4))
    return ret
  },
  pushElection: (args, request) => {
    log("## pushElection()")
    log(args)
    authenticateRequest(request)

    const rows = args.electionPushRow
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
          "INSERT INTO election (id, updatedAt, name, description, status, notice_interval_hours, participant_number, voting_start_datetime, voting_end_datetime, question_one, question_one_option_one, question_one_option_two, question_two, question_two_option_one, question_two_option_two) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
          [
            doc.id,
            doc.updatedAt,
            doc.name,
            doc.description,
            doc.status,
            doc.notice_interval_hours,
            doc.participant_number,
            doc.voting_start_datetime,
            doc.voting_end_datetime,
            doc.question_one,
            doc.question_one_option_one,
            doc.question_one_option_two,
            doc.question_two,
            doc.question_two_option_one,
            doc.question_two_option_two,
          ]
        )
      } catch (err) {
        throw new Error("Failed to insert new election")
      }
    })

    pubsub.publish("streamElection:", {
      streamElection: {
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
  streamElection: (args) => {
    log("## streamElection:()")

    console.dir(args)
    const authHeaderValue = args.headers.Authorization
    const bearerToken = authHeaderValue.split(" ")[1]

    validateBearerToken(bearerToken)

    return pubsub.asyncIterator("streamElection:")
  },
}

export default election
