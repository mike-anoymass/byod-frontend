import React, { useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';

function FacilityTable({ data, columns, setActiveTab, setSelected }) {
  const defaultColumn = useMemo(() => ({
    Filter: ColumnFilter,
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setPageSize(10);
  }, [setPageSize]);

  const handleDetails = (row) => {
    setActiveTab('details');
    setSelected(row);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center overflow-auto h-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholderText={"Search Profiles"} />
        <table {...getTableProps()} className="min-w-full text-left font-light h-full overflow-auto">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(col => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())} className="px-6 py-4">
                    {col.render("Header")}
                    <span>
                      {col.isSorted ? (col.isSortedDesc ? ' ▼' : ' ▲') : ''}
                    </span>
                    <div>
                      {col.canFilter ? col.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b transition duration-300 ease-in-out hover:bg-gray-300">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="whitespace-nowrap px-6 py-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="gap-3">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          <span>
            {' | '} Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              className="w-10 border-2 bg-gray-300 rounded-md px-1"
            />
          </span>
          <select
            value={pageSize}
            className="border-2 bg-gray-300 mx-1 px-1 py-[2px] rounded-lg"
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15, 20, 25, 100].map(pageSize => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' << '}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300">Previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300">Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{' >> '}</button>
        </div>
      </div>
    </>
  );
}

export default FacilityTable;
