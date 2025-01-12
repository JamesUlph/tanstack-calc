import { Link } from '@tanstack/react-router';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export function DataTable({ data, columns }: { data: any[]; columns: any }) {
  const [sorting, setSorting] = useState<any>(undefined);

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    initialState: {
      sorting: [
        {
          id: 'createdDateTime',
          desc: true,
        },
      ],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      Data Table
      <table className="w-full">
        <thead className="bg-indigo-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <span className="flex">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}{' '}
                      {header.column.getIsSorted() === 'asc' && <ArrowUp />}
                      {header.column.getIsSorted() === 'desc' && <ArrowDown />}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-700">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  align={(cell.column.columnDef.meta as any)?.align}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
