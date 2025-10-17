import type { TableData } from "./tableData";

export interface DataTableRowsProps {
  columnKeys: string[];
  data: TableData;
  colspan: number;
  rowExpansion?: Function;
}
