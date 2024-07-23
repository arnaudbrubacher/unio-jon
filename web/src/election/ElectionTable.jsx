import { useState } from "react"
import { useRxData } from "rxdb-hooks"
import { useNavigate } from "react-router"
import Table from "../common/components/tables/Table"
import FormSchema from "./ElectionFormSchema"

const ElectionTable = () => {
  const [formInfo] = useState(FormSchema)
  const navitage = useNavigate()

  const { result, isFetching } = useRxData("election", (collection) => {
    return collection.find()
  })

  if (isFetching) {
    return "loading ..."
  }

  return (
    <>
      <Table
        columns={formInfo}
        data={result}
        onRowClick={(electionId) => {
          navitage(`/election/${electionId}`)
        }}
      />
    </>
  )
}

export default ElectionTable
