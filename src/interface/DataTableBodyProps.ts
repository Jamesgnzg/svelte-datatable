import type { TableData } from "./tableData";

export interface DataTableBodyProps {
  tableData: TableData[];
  colSpan: number;
  columnKeys: string[];
  rowExpansion?: Function;
  striped: boolean;
}
