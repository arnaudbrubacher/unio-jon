const FormSchema = (errors) => [
  {
    type: "Text",
    name: "name",
    label: "Titre de l'élection",
  },
  {
    type: "Text",
    name: "description",
    label: "Description",
  },
  {
    type: "Dropdown",
    name: "status",
    label: "Statut",
    options: [
      "configuration",
      "registration",
      "notice",
      "voter",
      "verification",
      "tally",
      "post-tally",
      "reserved",
    ],
  },
  {
    type: "Text",
    name: "notice_interval_hours",
    label: "Notice interval hours",
  },
  {
    type: "Text",
    name: "participant_number",
    label: "Participants Number",
  },
  {
    type: "Date",
    name: "voting_start_datetime",
    label: "Notice interval hours",
  },
  {
    type: "Date",
    name: "voting_end_datetime",
    label: "Notice interval hours",
  },
  {
    type: "Text",
    name: "question_one.question_text",
    label: "Question 1",
  },
  {
    type: "Text",
    name: "question_two.question_text",
    label: "Question 2",
  },
]

export default FormSchema
