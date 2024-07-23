import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import schemas from "./database/schemas.js"
import { PubSub } from "graphql-subscriptions"
import { graphqlHTTP } from "express-graphql"
import rootValue from "./database/rootValue/index.js"
import { db } from "./database/database.js"
import GraphQLSchemaBuilder from "./database/GraphQLSchemaBuilder.js"

dotenv.config()
const app = express()

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://web.grayrock-dce05556.canadaeast.azurecontainerapps.io",
]

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  })
)

// Handle OPTIONS requests for GraphQL endpoint
app.options("/graphql", (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.status(200).send()
})

const port = 3101

db()

export const pubsub = new PubSub()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchemaBuilder(schemas),
    rootValue: rootValue,
    graphiql: true,
  })
)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log("Example app listening on ...")
})
