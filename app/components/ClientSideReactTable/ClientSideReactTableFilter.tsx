import { Column, Table as ReactTable } from '@tanstack/react-table'
import React from 'react'


interface ClientSideReactTableProps {
    column: Column<any, any>
    table: ReactTable<any>
  }

const ClientSideReactTableFilter = ({column,table}: ClientSideReactTableProps) => {

    // const firstValue = table
    //     .getPreFilteredRowModel()
    //     .flatRows[0]?.getValue(column.id)
    // console.log('firstValue', firstValue);

    const columnFilterValue = column.getFilterValue();

  return (
    <input 
        className="input input-xs"
        type="text"
        value={(columnFilterValue ?? '') as string}
        placeholder={"Search..."} 
        onChange={e => column.setFilterValue(e.target.value)}
      
    />
  )
}

export default ClientSideReactTableFilter