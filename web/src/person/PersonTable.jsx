
import { useState } from "react"
import Table from "../common/components/tables/Table"
import FormSchema from "./PersonFormSchema"
import { useQuery } from 'react-query'

const PersonTable = () => {
  const [formInfo,] = useState(FormSchema)

  const { isLoading, error, data: users } = useQuery('users', () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`).then(res => res.json())
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Table
        columns={formInfo}
        data={users}
      />
    </>
  )
}

export default PersonTable
