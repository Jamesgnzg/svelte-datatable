import type { TableData } from "./tableData";

export interface DataTableRowsProps {
  striped: boolean;
  columnKeys: string[];
  index: number;
  data: TableData;
  colspan: number;
  rowExpansion?: Function;
}
