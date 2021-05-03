import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  { Header: "Title", accessor: "title", Filter: ColumnFilter },
  {
    Header: "Author",
    accessor: "author",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "URL",
    accessor: "url",
    disabledFilters: true,
  },
];
