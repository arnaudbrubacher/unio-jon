import React, { useMemo } from "react"
import MaterialReactTable from "material-react-table"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"

const TableColumn = (field) => ({
  accessorKey: field.name,
  header: field.label,
  Cell: ({ cell }) => {
    switch (typeof cell.getValue()) {
      case "boolean": {
        return (
          <span>
            {cell.getValue() === true ? (
              <CheckCircleIcon color="success" />
            ) : (
              <RemoveCircleIcon color="error" />
            )}
          </span>
        )
      }
      case "object":
      default: {
        return <span>{cell.getValue()}</span>
      }
    }
  },
})

const Table = ({ columns, data, onRowClick }) => {
  const tableColumns = useMemo(
    () =>
      columns
        .filter((column) => column.type !== "image" && column.type !== "object")
        .map(TableColumn),
    [columns]
  )

  return (
    <MaterialReactTable
      muiTableContainerProps={{
        sx: {
          minHeight: "70vh",
        },
      }}
      columns={tableColumns}
      data={data}
      getRowId={(originalRow) => originalRow.id}
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          onRowClick(row.id)
        },
        sx: {
          cursor: "pointer",
        },
      })}
    />
  )
}

export default Table
