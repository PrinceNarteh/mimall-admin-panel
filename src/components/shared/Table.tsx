import { Icon } from "@iconify/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  ColumnSort,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export type SortDirection = "asc" | "desc";

export type SortingState = ColumnSort[];

export type SortingTableState = {
  sorting: SortingState;
};

interface TableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  data: T[] | undefined;
  actionButton?: () => React.ReactElement;
  linkPath?: string;
}

const Table = <T extends object>({
  columns = [],
  data = [],
  actionButton = undefined,
  linkPath = undefined,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const memorizedData = useMemo(() => data, [data]);
  const table = useReactTable({
    data: memorizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting: sorting,
      globalFilter,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });
  const navigate = useNavigate();

  const handleClick = (id: string) => navigate(`${linkPath}/${id}`);

  return (
    <div className="bg-white p-5 min-w-5xl mx-auto overflow-x-auto mt-5">
      <div className="h-20 text-blue-900 text-xl font-bold flex justify-between items-center">
        <div className="h-9 w-72 bg-[#F4F6FB] flex rounded-lg p-2">
          <Icon icon="circum:search" className="h-5 w-5 ml-3" />

          <input
            type="text"
            name="name"
            value={globalFilter ?? ""}
            placeholder="Search"
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="bg-[#F4F6FB] w-full outline-none p-2 placeholder:text-gray-700 text-sm placeholder:font-normal placeholder:mb-3"
          />
        </div>

        {actionButton && actionButton()}
      </div>

      <table className="w-full p-2">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="px-3 text-slate-400 text-[14px] font-bold leading-tight text-left"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`${
                    header.column.getCanSort() ? "cursor-pointer" : ""
                  }`}
                  style={{
                    width:
                      header.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : header.getSize(),
                  }}
                >
                  <span className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* {header.column.getIsSorted() !== false
                      ? {
                          asc: (
                            <Icon
                              icon="ic:baseline-arrow-drop-up"
                              fontSize={25}
                            />
                          ),
                          desc: (
                            <Icon
                              icon="ic:baseline-arrow-drop-down"
                              fontSize={25}
                            />
                          ),
                        }[header.column.getIsSorted()]
                      : null} */}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`cursor-pointer hover:bg-blue-100 duration-300 ${
                row.index % 2 === 0 ? "bg-slate-100" : ""
              }`}
              // {...(linkPath && {
              //   onClick: () => handleClick(row.original._id),
              // })}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-2"
                  style={{
                    width:
                      cell.column.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent mt-3"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
