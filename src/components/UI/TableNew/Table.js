import React, { useState, Fragment } from "react";
import Pagination from "rc-pagination";
const tableHead = {
  title: "Title",
  author: "Author",
  createdAt: "Created At",
  url: "URL",
};
// const tableHead =["Title", "Author","Created At","URL"];

const Table = (props) => {
  const countPerPage = props.countPerPage;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [collection, setCollection] = useState(props.data);

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };
  const headRow = () => {
    return Object.value(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  return (
    <Fragment>
      <div className="search">
        <input value={value} />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody>
          <tr>{tableData()}</tr>
        </tbody>
      </table>
      <Pagination />
    </Fragment>
  );
};

export default Table;
