import type { DataTableBodyProps } from "./DataTableBodyProps";
import type { TableData } from "./tableData";

type TableProps = Pick<
  DataTableBodyProps,
  "colSpan" | "columnKeys" | "striped" | "rowExpansion"
>;

interface RowsProps {
  index: number;
  data: TableData;
}

export type DataTableRowsProps = TableProps & RowsProps;
