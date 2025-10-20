import type { DataTableBodyProps } from "./DataTableBodyProps";
import type { TableData } from "./tableData";

type RowsInherited = Pick<
  DataTableBodyProps,
  "colSpan" | "columnKeys" | "striped" | "rowExpansion"
>;

interface RowsProps {
  index: number;
  data: TableData;
}

export type DataTableRowsProps = RowsInherited & RowsProps;
