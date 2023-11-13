'use client'

import React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    Row,
  } from '@tanstack/react-table'
import { RegistrationData } from '@/app/types'
import ClientSideReactTableFilter from '@/app/components/ClientSideReactTable/ClientSideReactTableFilter'


const columnHelper = createColumnHelper<RegistrationData>()

const columns = [
    columnHelper.display({
        id:"actions",
        cell: props=>(<RowActions row={props.row} />)
    }),
    columnHelper.accessor('operator_registration_number',{
        header:()=>'Operator Registration Number'
    }),
    columnHelper.accessor('postal_code',{
        header:()=>'Postal Code'
    }),
    columnHelper.accessor('property_type',{
        header:()=>'Property Type'
    }),
    columnHelper.accessor('ward_name',{
        header:()=>'ward Name'
    }),
    columnHelper.accessor('ward_number',{
        header:()=>'Ward Number'
    }),
];



const RowActions = ({row}:{row:Row<RegistrationData>})=>{

    const startCrawl = ()=>{
        console.log('Start Crawl - row', row.getValue("operator_registration_number"));
    }

    return (<React.Fragment>
            <button className='btn btn-ghost btn-xs' onClick={row.getToggleExpandedHandler()}>{row.getIsExpanded() ? '👇' : '👉'}</button>
            <button className='btn btn-ghost btn-xs' onClick={startCrawl}>🕷️</button>
            </React.Fragment>
            )
}

const ClientSideReactTable = ({registrationList}:{registrationList:RegistrationData[]}) => {

    const getRowCanExpand = (row:Row<RegistrationData>)=>{
        return true;
    }

    const renderSubComponent = ({row}:{row:Row<RegistrationData>})=>{
        return <div>Sub content</div>
    }

    const table = useReactTable({
        data:registrationList,
        columns,
        getRowCanExpand,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel:getExpandedRowModel()
    })
  return (
    <div className="flex flex-col gap-2 justify-center content-center w-[99%]">
        <table className='table table-zebra table-pin-rows'>
            <thead>
                {table.getHeaderGroups().map(headerGroup=> (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header=>(
                            <th key={header.id}>
                                {header.isPlaceholder
                                ?null
                                :flexRender(header.column.columnDef.header, header.getContext())}

                                {header.column.getCanFilter()?(
                                    <div>
                                        <ClientSideReactTableFilter
                                            column={header.column}
                                            table={table}
                                            />
                                    </div>
                                ):null}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}><tr>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                )}
                </React.Fragment>
            ))}
            </tbody>
        </table>
        <div className="flex items-center justify-center gap-2 p-4">
            <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            >
            {'<<'}
            </button>
            <button
            className="btn btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            {'<'}
            </button>
            <button
            className="btn btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            {'>'}
            </button>
            <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            >
            {'>>'}
            </button>
            <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
            </strong>
            </span>
            <span className="flex items-center gap-1">
            | Go to page:
            <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
            />
            </span>
            <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
                table.setPageSize(Number(e.target.value))
            }}
            className="select select-sm"
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select>
        </div>
        {/* Debug information
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  )
}


export default ClientSideReactTable