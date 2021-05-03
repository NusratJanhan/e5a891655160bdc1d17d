import { useState, useMemo } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useFilters,
  useAsyncDebounce,
} from "react-table";
import { COLUMNS } from "./Column";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

import classes from "./Table.module.css";
import { Checkbox } from "./Checkbox";
import Modal from "../Modal/Modal";

function FilteringTable({ data }) {
  const [modalIsShown, setModalIsShown] = useState(false);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => datas, []);
  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);
  const showCardHandler = () => {
    setModalIsShown(true);
  };
  const hideCardHandler = () => {
    setModalIsShown(false);
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div onClick={showCardHandler}>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  // Render the UI for your table

  return (
    <div className={classes["table-div"]}>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalIsShown && (
        <Modal onClose={hideCardHandler}>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map((row) => row.original),
                },
                null,
                2
              )}
            </code>
          </pre>
          <div className={classes.actions}>
            <button onClick={hideCardHandler}>Close</button>
          </div>
        </Modal>
      )}

      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default FilteringTable;
