const schemas = [
  {
    person: {
      schema: {
        title: "person",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          updatedAt: {
            type: "number",
            minimum: 0,
            maximum: 1000000000000000,
            multipleOf: 1,
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone_number: {
            type: "string",
          },
          elections: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      checkpointFields: ["id", "updatedAt"],
      deletedField: "deleted",
    },
  },
  {
    election: {
      schema: {
        title: "election",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          updatedAt: {
            type: "number",
            minimum: 0,
            maximum: 1000000000000000,
            multipleOf: 1,
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          status: {
            type: "string",
          },
          notice_interval_hours: {
            type: "string",
          },
          voting_start_datetime: {
            type: "string",
          },
          voting_end_datetime: {
            type: "string",
          },
          question_one: {
            type: "string",
          },
          question_one_option_one: {
            type: "string",
          },
          question_one_option_two: {
            type: "string",
          },
          question_two: {
            type: "string",
          },
          question_two_option_one: {
            type: "string",
          },
          question_two_option_two: {
            type: "string",
          },
          participants: {
            type: "array",
            items: {
              type: "string",
            },
          },
          participant_number: {
            type: "string",
          },
        },
      },
      checkpointFields: ["id", "updatedAt"],
      deletedField: "deleted",
    },
  },
  {
    person_election: {
      schema: {
        title: "person_election",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          updatedAt: {
            type: "number",
            minimum: 0,
            maximum: 1000000000000000,
            multipleOf: 1,
          },
          user_id: {
            type: "string",
          },
          election_id: {
            type: "string",
            // Reference to election schema's primaryKey
          },
        },
      },
      checkpointFields: ["id"],
      deletedField: "deleted",
    },
  },
  {
    ballot: {
      schema: {
        title: "ballot",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: { type: "string", maxLength: 100 },
          updatedAt: {
            type: "number",
            minimum: 0,
            maximum: 1000000000000000,
            multipleOf: 1,
          },
          user_id: {
            type: "string",
          },
          person_name: { type: "string" },
          election_id: {
            type: "string",
            ref: "election", // Reference to the "election" schema
          },
          question_one: { type: "string" },
          question_two: { type: "string" }, // Assuming question_two is an object type
        },
      },
      checkpointFields: ["id", "updatedAt"],
      deletedField: "deleted",
    },
  },
]

export default schemas
